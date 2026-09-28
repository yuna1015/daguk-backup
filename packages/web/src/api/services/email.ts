import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, text, html, replyTo }: SendEmailOptions) {
  const { data, error } = await resend.emails.send({
    from: "Daguk Textile <onboarding@resend.dev>",
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
    replyTo,
  });

  if (error) throw new Error(`Email failed: ${error.message}`);
  return data;
}
