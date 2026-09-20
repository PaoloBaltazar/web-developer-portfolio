"use server";

import { Resend } from "resend";
import { profile } from "@/lib/content";
import type { ContactState } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot: real people never fill a hidden field.
  const trap = String(formData.get("company") ?? "").trim();

  const values = { name, email, message };

  if (trap) {
    // Silently accept so bots do not learn anything from the response.
    return { status: "success", message: "Thanks — your message is on its way." };
  }

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 100) errors.name = "That name is too long.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Tell me a little more — 10 characters minimum.";
  if (message.length > 5000) errors.message = "That message is too long (5000 characters max).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — the message was not delivered.",
    );
    return {
      status: "error",
      message: `Sending is not configured yet. Please email me directly at ${profile.email}.`,
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#0a0a0a">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#808080">
            Portfolio enquiry
          </p>
          <p style="margin:0 0 16px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <div style="white-space:pre-wrap;padding:16px;background:#f4f4f4;border-radius:8px">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return {
        status: "error",
        message: `Something went wrong sending that. Please email me directly at ${profile.email}.`,
        values,
      };
    }

    return {
      status: "success",
      message: "Thanks — your message is on its way. I usually reply within a day.",
    };
  } catch (err) {
    console.error("[contact] Unexpected failure:", err);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email me directly at ${profile.email}.`,
      values,
    };
  }
}
