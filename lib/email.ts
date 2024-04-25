import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  const htmlCode = `<br />`;
  await transporter.sendMail({
    from: `"Adrian 👻" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: htmlCode + html,
  });
}
