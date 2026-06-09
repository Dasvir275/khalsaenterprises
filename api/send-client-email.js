import nodemailer from 'nodemailer'

function buildClientHtml(subject, bodyText) {
  const lines = bodyText.replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#f59e0b);padding:36px 32px;text-align:center;">
            <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:16px;margin:0 auto 16px;display:table-cell;vertical-align:middle;text-align:center;font-size:32px;line-height:64px;">🏢</div>
            <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Khalsa HiTech Enterprises</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Technology & Government Services</p>
          </td>
        </tr>

        <!-- Subject bar -->
        <tr>
          <td style="background:#fff7ed;padding:14px 32px;border-bottom:2px solid #fed7aa;">
            <p style="margin:0;font-size:13px;color:#9a3412;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Re: ${subject}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px;background:#fff;">
            <p style="margin:0 0 24px;font-size:16px;color:#1a1a1a;line-height:1.75;">${lines}</p>

            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="tel:+917009073061" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#f97316,#f59e0b);color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">📞 Call Us</a>
                </td>
                <td>
                  <a href="https://wa.me/917009073061" style="display:inline-block;padding:12px 24px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">💬 WhatsApp</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #eee;margin:0;"></td></tr>

        <!-- Company details -->
        <tr>
          <td style="padding:24px 32px;background:#fafafa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;padding-right:24px;">
                  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1a1a1a;">Dasvir Singh</p>
                  <p style="margin:0 0 2px;font-size:12px;color:#666;">B.Tech CSE, Thapar University</p>
                  <p style="margin:0 0 2px;font-size:12px;color:#f97316;font-weight:600;">SIH 2023 Winner · AI Software Engineer</p>
                </td>
                <td style="vertical-align:top;text-align:right;">
                  <p style="margin:0 0 2px;font-size:12px;color:#555;">📞 70090-73061</p>
                  <p style="margin:0 0 2px;font-size:12px;color:#555;">✉️ dasvirsingh07@gmail.com</p>
                  <p style="margin:0;font-size:12px;color:#555;">🌐 www.khalsaenterprises.com</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Address footer -->
        <tr>
          <td style="background:#111;padding:18px 32px;text-align:center;">
            <p style="margin:0 0 4px;color:#666;font-size:11px;">📍 Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab – 144211</p>
            <p style="margin:0;color:#444;font-size:11px;">⏰ Monday – Saturday: 9:00 AM – 7:00 PM</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { to, subject, body, attachment } = req.body

  if (!to || !subject || !body) return res.status(400).json({ error: 'to, subject, body are required' })

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Email credentials not configured in environment variables.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ''),
      },
    })

    const mailOptions = {
      from: `"Khalsa HiTech Enterprises" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: buildClientHtml(subject, body),
    }

    if (attachment?.data) {
      mailOptions.attachments = [{
        filename: attachment.name || 'attachment',
        content:  attachment.data,
        encoding: 'base64',
      }]
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-client-email error:', err.message)
    res.status(500).json({ error: err.message })
  }
}
