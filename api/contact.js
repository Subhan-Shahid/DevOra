const { Resend } = require('resend');

// POST /api/contact
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const message = String(body.message || '').trim();

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const TO = process.env.CONTACT_TO;
    const FROM = process.env.CONTACT_FROM; // Verified sender on Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY || !TO || !FROM) {
      return res.status(500).json({ error: 'Server email configuration is missing.' });
    }

    const resend = new Resend(RESEND_API_KEY);

    const name = `${firstName} ${lastName}`.trim();
    const subject = `New inquiry from ${name}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const html = `
      <div>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">${escapeHtml(message)}</pre>
      </div>
    `;

    await resend.emails.send({
      from: FROM,
      to: TO.split(',').map(s => s.trim()).filter(Boolean),
      reply_to: email,
      subject,
      text,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[api/contact] error', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
};

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
