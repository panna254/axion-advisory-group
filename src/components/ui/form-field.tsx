"use client";

import * as React from "react";

import { IconCaretDown, IconError } from "@/components/icons";
import { cn } from "@/lib/utils";

type BaseProps = {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
};

type InputVariantProps = { as?: "input" } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "className"
>;

type TextareaVariantProps = { as: "textarea" } & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "className"
>;

type SelectVariantProps = { as: "select"; children: React.ReactNode } & Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "className"
>;

export type FormFieldProps = BaseProps &
  (InputVariantProps | TextareaVariantProps | SelectVariantProps);

/**
 * Strips the field-block props (label, helper/error text, the `as`
 * discriminant, etc.) off, leaving only what belongs on the native
 * input/textarea/select element — id and className are re-applied
 * explicitly by the caller, so this also drops those two.
 */
function omitFieldProps<T extends BaseProps & { as?: string }>(
  props: T,
): Omit<T, keyof BaseProps | "as"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- these are extracted only to exclude them from `rest`
  const { id, label, required, helperText, error, className, as, ...rest } = props;
  return rest;
}

/**
 * Shared control styling. Border, focus ring, hover and disabled states are
 * identical across input/textarea/select; only height and a couple of
 * select-only utilities differ, so those are appended per-branch below.
 *
 * `border-destructive` is appended last (conditionally) so tailwind-merge
 * lets it win over the plain `border-input` — the two are the only pair
 * here that share a bare (unmodified) utility group.
 */
const CONTROL_BASE = cn(
  "w-full text-body font-sans text-foreground bg-card",
  "border border-input rounded-lg px-sm py-xs",
  "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
  "hover:border-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring",
  "disabled:bg-muted disabled:text-muted-foreground disabled:border-border disabled:cursor-not-allowed",
);

export function FormField(props: FormFieldProps) {
  const { id, label, required, helperText, error, className } = props;

  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;
  const ariaInvalid = error ? true : undefined;

  let control: React.ReactNode;

  if (props.as === "textarea") {
    control = (
      <textarea
        {...omitFieldProps(props)}
        id={id}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid}
        className={cn(CONTROL_BASE, "min-h-32 resize-y", error && "border-destructive", className)}
      />
    );
  } else if (props.as === "select") {
    control = (
      <div className="relative">
        <select
          {...omitFieldProps(props)}
          id={id}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid}
          className={cn(
            CONTROL_BASE,
            "min-h-11 appearance-none pr-xl",
            error && "border-destructive",
            className,
          )}
        />
        <IconCaretDown
          size="sm"
          className="pointer-events-none absolute right-sm top-1/2 -translate-y-1/2 text-stroke-systems"
        />
      </div>
    );
  } else {
    control = (
      <input
        {...omitFieldProps(props)}
        id={id}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid}
        className={cn(CONTROL_BASE, "min-h-11", error && "border-destructive", className)}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-2xs">
      <label htmlFor={id} className="text-caption font-sans font-medium text-foreground">
        {label}
        {required ? <span className="text-muted-foreground"> (required)</span> : null}
      </label>
      {control}
      {helperText ? (
        <p id={helperId} className="text-caption text-muted-foreground">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="flex items-start gap-2xs text-caption font-medium text-destructive">
          <IconError size="sm" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
