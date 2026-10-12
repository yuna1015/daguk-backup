import { Resend } from "resend";

let _resend: Resend | null = null;

// Lazy init: constructing Resend without an API key throws immediately,
// which would crash the whole serverless module at import time if done
// at module scope. Deferring it means a missing key only fails sendEmail.
function getResend() {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  replyTo?: string;
} & ({ html: string; text?: string } | { text: string; html?: string });

export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, replyTo } = options;
  const { data, error } = await getResend().emails.send({
    from: "Daguk Textile <onboarding@resend.dev>",
    to: Array.isArray(to) ? to : [to],
    subject,
    replyTo,
    ...("html" in options && options.html ? { html: options.html } : { text: (options as { text: string }).text }),
  });

  if (error) throw new Error(`Email failed: ${error.message}`);
  return data;
}
