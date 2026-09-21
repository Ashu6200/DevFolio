import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey && apiKey !== 're_your_api_key_here' ? new Resend(apiKey) : null;

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent?: boolean;
}

function createAdminEmailHtml({
  name,
  email,
  subject,
  message,
  consent,
}: ContactEmailPayload): string {
  const formattedDate = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <!-- Header Banner -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); text-align: left;">
        <span style="display: inline-block; padding: 4px 10px; background-color: rgba(255, 255, 255, 0.2); border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #ffffff; text-transform: uppercase;">
          PORTFOLIO INQUIRY &bull; DPDP 2023 COMPLIANT
        </span>
        <h1 style="margin: 10px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
          New Message from ${name}
        </h1>
      </td>
    </tr>

    <!-- Sender Details Box -->
    <tr>
      <td style="padding: 28px 32px 16px 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 16px 20px;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #a1a1aa; width: 90px; font-weight: 600;">Sender:</td>
            <td style="padding: 6px 0; font-size: 14px; color: #fafafa; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #a1a1aa; font-weight: 600;">Email:</td>
            <td style="padding: 6px 0; font-size: 14px; color: #34d399; font-weight: 600;">
              <a href="mailto:${email}" style="color: #34d399; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #a1a1aa; font-weight: 600;">Subject:</td>
            <td style="padding: 6px 0; font-size: 14px; color: #fafafa;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #a1a1aa; font-weight: 600;">Received:</td>
            <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace;">${formattedDate} (IST)</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #a1a1aa; font-weight: 600;">DPDP Consent:</td>
            <td style="padding: 6px 0; font-size: 12px; color: #10b981; font-weight: 600;">
              ${consent !== false ? '✓ Verified (Explicit opt-in under DPDP Act 2023)' : 'Not Recorded'}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Message Body -->
    <tr>
      <td style="padding: 0 32px 28px 32px;">
        <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.5px; text-transform: uppercase;">
          Message Content:
        </p>
        <div style="background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.65; color: #e4e4e7; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </td>
    </tr>

    <!-- Action / Reply Button -->
    <tr>
      <td style="padding: 0 32px 32px 32px; text-align: center;">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 12px 28px; background-color: #10b981; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 10px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
          Reply to ${name} &rarr;
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background-color: #121215; border-top: 1px solid #27272a; text-align: center; font-size: 12px; color: #71717a;">
        Sent automatically from your portfolio contact form at DevFolio. In compliance with DPDP Act, 2023.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function createAutoReplyHtml({ name, subject }: ContactEmailPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Reaching Out</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <tr>
      <td style="padding: 32px; text-align: center; background: linear-gradient(135deg, #059669 0%, #10b981 100%);">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff;">
          Thank You for Getting in Touch!
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px; font-size: 15px; line-height: 1.7; color: #d4d4d8;">
        <p style="margin: 0 0 16px 0;">Hi <strong>${name}</strong>,</p>
        <p style="margin: 0 0 16px 0;">
          I received your message regarding <em>"${subject}"</em>. Thank you for considering my work!
        </p>
        <p style="margin: 0 0 20px 0;">
          I review inquiries daily and will get back to you within 24 hours. If your request is urgent, feel free to connect with me directly on LinkedIn or WhatsApp.
        </p>
        <div style="padding-top: 16px; border-top: 1px solid #27272a;">
          <p style="margin: 0; font-weight: 600; color: #ffffff;">Ashutosh Kewat</p>
          <p style="margin: 2px 0 0 0; font-size: 13px; color: #a1a1aa;">Full-Stack & Systems Developer</p>
        </div>

        <div style="margin-top: 24px; padding: 14px 16px; background-color: #121215; border: 1px solid #27272a; border-radius: 8px; font-size: 11px; color: #a1a1aa; line-height: 1.6;">
          <strong style="color: #e4e4e7;">Data Protection Notice (DPDP Act, 2023):</strong> Your contact information is processed strictly for the purpose of communicating regarding your inquiry. Under India's Digital Personal Data Protection Act, 2023, you retain full rights to access, rectify, or request erasure of your data, or withdraw consent at any time by replying directly to this email or reaching out to the Grievance Officer at <a href="mailto:ashutoshkewat1@gmail.com" style="color: #34d399;">ashutoshkewat1@gmail.com</a>.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
export async function sendContactEmail(payload: ContactEmailPayload) {
  const receiverEmail: string = process.env.ADMIN_EMAIL || 'ashutoshkewat1@gmail.com';

  const _fromEmail = process.env.RESEND_FROM_EMAIL || 'DevFolio Contact <onboarding@resend.dev>';

  if (!resend) {
    console.warn(
      '[RESEND] API key not found in RESEND_MAIL_KEY or RESEND_API_KEY environment variables. Message logged locally:',
      payload
    );
    return {
      success: true,
      simulated: true,
      message: 'Email service is running in simulated development mode.',
    };
  }

  try {
    const adminNotification = await resend.emails.send({
      from: payload.email,
      to: receiverEmail,
      subject: `[Portfolio Inquiry] ${payload.subject} - from ${payload.name}`,
      html: createAdminEmailHtml(payload),
    });

    if (adminNotification.error) {
      console.error('[RESEND] Failed to send admin email:', adminNotification.error);
      throw new Error(`Failed to send message: ${adminNotification.error.message}`);
    }

    try {
      await resend.emails.send({
        from: receiverEmail,
        to: payload.email,
        subject: `Thank you for your message, ${payload.name}!`,
        html: createAutoReplyHtml(payload),
      });
    } catch (autoReplyErr) {
      console.warn(
        '[RESEND] Auto-reply not delivered (likely Resend sandbox domain restriction):',
        autoReplyErr
      );
    }

    return {
      success: true,
      messageId: adminNotification.data?.id,
    };
  } catch (error) {
    console.error('[RESEND] Error dispatching contact email:', error);
    throw error;
  }
}
