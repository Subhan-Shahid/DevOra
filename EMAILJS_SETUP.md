# EmailJS Setup Instructions

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (e.g., "service_abc123")

## 3. Create Email Templates

### Template 1: Admin Notification (for you)
1. Go to "Email Templates" → "Create New Template"
2. Template ID: `template_admin_notification`
3. Subject: `New Contact Form Submission - DevOra`
4. Content:
```
New contact form submission from DevOra website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

---
This email was sent automatically from your DevOra contact form.
```

### Template 2: Auto-Response (for sender)
1. Create another template
2. Template ID: `template_autoresponse`
3. Subject: `Thank you for contacting DevOra`
4. Content:
```
Hello {{to_name}},

Thank you for contacting the DevOra team. We have received your message and will reach out to you shortly.

Best regards,
The DevOra Team

---
This is an automated response. Please do not reply to this email.
```

## 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., "user_abc123xyz")

## 5. Update Contact.js
Replace the placeholder values in `src/components/Contact.js`:

```javascript
const SERVICE_ID = 'your_service_id_here';           // From step 2
const TEMPLATE_ID = 'template_admin_notification';    // From step 3.1
const AUTORESPONSE_TEMPLATE_ID = 'template_autoresponse'; // From step 3.2
const PUBLIC_KEY = 'your_public_key_here';           // From step 4
```

## 6. Test the Setup
1. Run `npm install` to install the EmailJS dependency
2. Start your development server: `npm start`
3. Fill out and submit the contact form
4. Check:
   - You receive the admin notification at subhanshahid1920@gmail.com
   - The sender receives the auto-response

## Troubleshooting
- **Emails not sending**: Check EmailJS dashboard for error logs
- **Templates not working**: Ensure variable names match ({{from_name}}, {{to_name}}, etc.)
- **Service issues**: Verify your email service is properly connected and authenticated
- **Rate limits**: Free EmailJS accounts have monthly limits (200 emails/month)

## Security Notes
- Never commit your actual EmailJS keys to version control
- Consider using environment variables for production:
  ```javascript
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  ```
