# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Body:**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Save the template and copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `abcdefghijk123456`)

## Step 5: Update Your Code
Open `src/components/Contact.tsx` and replace these values:

```typescript
const serviceId = 'service_8p7djun'  // Replace with your Service ID
const templateId = 'template_hvf689g'  // Replace with your Template ID
const publicKey = 'yFDEoojliq9cWT999-0m7'  // Replace with your Public Key
```

## Step 6: Test the Form
1. Run your portfolio: `npm run dev`
2. Fill out the contact form
3. Submit and check your email inbox
4. You should receive the message!

## Template Variables Used:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_email}}` - Your email (automatically set)

## Troubleshooting:
- **Emails not arriving?** Check your spam folder
- **Error sending?** Verify your Service ID, Template ID, and Public Key
- **Rate limit?** Free plan allows 200 emails/month
- **Need more emails?** Upgrade to a paid plan

## Alternative: Use Environment Variables (Recommended)
Create a `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the code to use:
```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```

Don't forget to add `.env` to your `.gitignore` file!
