/**
 * Contact form configuration
 *
 * Option A — FormSubmit (works immediately, no API keys):
 *   Set method to 'formsubmit' and set recipientEmail to your inbox.
 *   On the first submission, FormSubmit sends a verification link to that address — click it once.
 *
 * Option B — EmailJS:
 *   Set method to 'emailjs' and fill in publicKey, serviceId, templateId from https://www.emailjs.com
 *   Template variables should use: {{from_name}}, {{from_email}}, {{phone}}, {{service}}, {{message}}
 */
window.TEKZO_CONTACT = {
  method: 'formsubmit',

  recipientEmail: 'tektoitsolutions@gmail.com',

  emailjs: {
    publicKey: '',
    serviceId: '',
    templateId: ''
  }
};
