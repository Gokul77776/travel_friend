import emailjs from "@emailjs/browser";

export const sendEmailNotification = async ({ fromName, toEmail, message }) => {
  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,    
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  
      {
        from_name: fromName,
        to_email: toEmail,
        message: message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY     
    );

    console.log("Email successfully sent!", result.text);
  } catch (error) {
    console.error("Email sending failed", error);
  }
};
