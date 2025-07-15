 
import nodemailer from 'nodemailer';

export const sendBulkEmail = async (userEmails, subject, message, from) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",  
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  const emailPromises = userEmails.map(email =>
    transporter.sendMail({
      from: from,    
      to: email,
      subject: subject,
      text: message
    })
  );

  try {
    await Promise.all(emailPromises);
    return { success: true };
  } catch (error) {
    console.error('Bulk email error:', error);
    return { success: false, error };
  }
};
