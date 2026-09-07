import { NextResponse } from "next/server";

/**
 * Route handler for /api/contact.
 *
 * Axion Advisory Group does not currently have a database or third-party
 * transactional email delivery mechanism (e.g., Postmark, SES, Resend) provisioned.
 *
 * In accordance with project content-safety rules:
 * "The system must never silently report: 'message sent' when no message was actually delivered."
 *
 * Until an actual delivery provider is provisioned and confirmed by the client,
 * this endpoint validates the payload structure and returns 503 Service Unavailable,
 * preventing any false claims of successful dispatch.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Delivery backend is unconfigured. Return 503 to avoid false confirmation.
    return NextResponse.json(
      {
        error:
          "Electronic enquiry dispatch is not currently configured. Please contact Axion Advisory Group directly.",
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}

