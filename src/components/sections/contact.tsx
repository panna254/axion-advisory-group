"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";

import { IconAddress, IconHours, IconPhone } from "@/components/icons";
import { CtaButton } from "@/components/ui/cta-button";
import { FormField } from "@/components/ui/form-field";
import { INTEREST_OPTIONS } from "@/lib/services-data";

/**
 * Contact — Section 10, asymmetric split (info ~42% / form ~58%).
 *
 * See `docs/research/components/contact.spec.md` for the full contract.
 * Client Component: the form owns a four-state submit machine
 * (idle -> submitting -> success | error) that plain JSX cannot express.
 *
 * `address`, `phone`, `hours` and `consentText` are all currently unsourced
 * anywhere in the project, so every caller today renders with none of them
 * supplied. That is the section's correct default state, not a fallback to
 * design around later: an absent info line simply omits its `<li>`, and an
 * absent `consentText` puts the whole form behind the not-yet-live notice
 * (see `NOT_LIVE_NOTICE` below) rather than collecting personal data without
 * consent wording on file.
 */
export interface ContactProps {
  address?: string;
  phone?: string;
  hours?: string;
  /** Data-protection consent wording. Undefined disables the entire form. */
  consentText?: string;
  /** Response-time promise for the success state. Undefined omits the line. */
  slaText?: string;
}

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
};

type RequiredField = "name" | "email" | "message";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  interest: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NOT_LIVE_NOTICE =
  "Enquiry form is not yet live pending data-protection review.";

/** Required-field rules only. Company, phone and interest have none. */
function validateField(field: RequiredField, values: FormValues): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim() ? undefined : "Enter your name.";
    case "email":
      if (!values.email.trim()) return "Enter your email.";
      return EMAIL_PATTERN.test(values.email.trim())
        ? undefined
        : "Enter a valid email address.";
    case "message":
      return values.message.trim() ? undefined : "Enter a message.";
  }
}

function validateAll(values: FormValues): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};
  for (const field of ["name", "email", "message"] as const) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

export function Contact({
  address,
  phone,
  hours,
  consentText,
  slaText,
}: ContactProps = {}) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<RequiredField, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // The consent gate: while `consentText` is unsourced, the form cannot
  // legally collect anything. This is a hard content-safety rule, not a
  // styling choice — see ANTI-SLOP CONSTRAINTS in the spec.
  const formLive = Boolean(consentText);
  const submitting = status === "submitting";
  const fieldsDisabled = !formLive || submitting;
  const hasInfoLines = Boolean(address || phone || hours);

  // Value updates only. Validation never runs on keystroke, per FormField's
  // own house rule and the spec's explicit instruction — only handleBlur
  // and handleSubmit below touch `errors`.
  function handleChange(field: keyof FormValues) {
    return (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;
      setValues((previous) => ({ ...previous, [field]: value }));
    };
  }

  function handleRequiredBlur(field: RequiredField) {
    return (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValues = { ...values, [field]: event.target.value };
      setTouched((previous) => ({ ...previous, [field]: true }));
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, nextValues),
      }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formLive || submitting) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`Contact submission failed with status ${response.status}`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl items-start">
          <div className="lg:col-span-5">
            <h2 className="text-h2 font-display font-normal text-foreground mb-lg">
              Contact
            </h2>
            {hasInfoLines ? (
              <ul className="flex flex-col gap-md">
                {address ? (
                  <li className="flex items-start gap-sm">
                    <IconAddress size="md" className="text-stroke-systems" />
                    <span className="text-body text-foreground">{address}</span>
                  </li>
                ) : null}
                {phone ? (
                  <li className="flex items-start gap-sm">
                    <IconPhone size="md" className="text-stroke-systems" />
                    <span className="text-body text-foreground">{phone}</span>
                  </li>
                ) : null}
                {hours ? (
                  <li className="flex items-start gap-sm">
                    <IconHours size="md" className="text-stroke-systems" />
                    <span className="text-body text-foreground">{hours}</span>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            {status === "success" ? (
              <div role="status">
                <p className="text-h3 font-display">
                  Received. We will reply to the email address you gave.
                </p>
                {slaText ? (
                  <p className="text-body text-muted-foreground">{slaText}</p>
                ) : null}
              </div>
            ) : (
              <>
                {status === "error" ? (
                  <p
                    role="alert"
                    className="bg-destructive/10 border border-destructive rounded-lg p-md text-destructive mb-md"
                  >
                    That did not send. Try again, or email us directly.
                  </p>
                ) : null}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <FormField
                      id="contact-name"
                      label="Full name"
                      required
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange("name")}
                      onBlur={handleRequiredBlur("name")}
                      error={touched.name ? errors.name : undefined}
                      disabled={fieldsDisabled}
                    />
                    <FormField
                      id="contact-email"
                      label="Email"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleRequiredBlur("email")}
                      error={touched.email ? errors.email : undefined}
                      disabled={fieldsDisabled}
                    />
                    <FormField
                      id="contact-company"
                      label="Company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={handleChange("company")}
                      disabled={fieldsDisabled}
                    />
                    <FormField
                      id="contact-phone"
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={handleChange("phone")}
                      disabled={fieldsDisabled}
                    />
                    <div className="sm:col-span-2">
                      <FormField
                        id="contact-interest"
                        label="Which service"
                        as="select"
                        value={values.interest}
                        onChange={handleChange("interest")}
                        disabled={fieldsDisabled}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {INTEREST_OPTIONS.map((option) => (
                          <option key={option.slug} value={option.slug}>
                            {option.label}
                          </option>
                        ))}
                      </FormField>
                    </div>
                    <div className="sm:col-span-2">
                      <FormField
                        id="contact-message"
                        label="Message"
                        as="textarea"
                        required
                        value={values.message}
                        onChange={handleChange("message")}
                        onBlur={handleRequiredBlur("message")}
                        error={touched.message ? errors.message : undefined}
                        disabled={fieldsDisabled}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      {formLive ? (
                        <p className="text-caption text-muted-foreground">
                          {consentText}
                        </p>
                      ) : (
                        <p className="text-body font-medium text-muted-foreground">
                          {NOT_LIVE_NOTICE}
                        </p>
                      )}
                    </div>
                  </div>
                  <CtaButton
                    variant="primary"
                    type="submit"
                    pending={submitting}
                    disabled={!formLive || submitting}
                    className="w-full sm:w-auto sm:self-start mt-sm"
                  >
                    Send enquiry
                  </CtaButton>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
