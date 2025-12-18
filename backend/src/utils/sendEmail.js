// Primary Resend to send Mails (API based)

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (
  to,
  subject,
  body,
  isHtml = false,
  attachments = []
) => {
  try {
    await resend.emails.send({
      from: '"BMSCE | BCEP" <bcep@notrishi.tech>',
      to: Array.isArray(to) ? to : [to],
      subject,
      [isHtml ? "html" : "text"]: body,
      attachments:
        attachments.length > 0
          ? attachments.map((file) => ({
              filename: file.filename,
              content: file.content,
            }))
          : undefined,
    });
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
};



// Backup Zoho mail via SMTP (commented until needed)
// const nodemailer = require("nodemailer");

// module.exports = async (
//   to,
//   subject,
//   body,
//   isHtml = false,
//   attachments = []
// ) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: Number(process.env.SMTP_PORT) === 465,
//     auth: {
//       user: process.env.SMTP_EMAIL_USER,
//       pass: process.env.SMTP_EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // It's good practice to define a "From" address
//     to,
//     subject,
//     [isHtml ? "html" : "text"]: body,
//     attachments,
//   });
// };

// Google SMTP Bakcup (commented until needed)
// const nodemailer = require("nodemailer");

// module.exports = async (to, subject, body, isHtml = false, attachments = []) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     [isHtml ? "html" : "text"]: body,
//     attachments
//   });
// };
