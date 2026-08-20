import dotenv from "dotenv";
dotenv.config({ quiet: true });
import nodemailer from "nodemailer";


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Reset Your Password",
    html: `<p>Your Otp for  Password reset is <b>${otp} </b>. It Expires in 5 minutes.</p>`,
  })
}