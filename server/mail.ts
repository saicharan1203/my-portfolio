import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

interface ContactMessage {
    name: string;
    email: string;
    message: string;
    subject?: string;
}

export async function sendContactEmail(to: string, message: ContactMessage) {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        console.warn("MAIL_USER or MAIL_PASS environment variables are not set. Email sending disabled.");
        return false;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            replyTo: message.email,
            subject: message.subject || `New Contact Message from ${message.name}`,
            text: `
Name: ${message.name}
Email: ${message.email}
Message:
${message.message}
      `,
            html: `
<h3>New Contact Message</h3>
<p><strong>Name:</strong> ${message.name}</p>
<p><strong>Email:</strong> ${message.email}</p>
<p><strong>Message:</strong></p>
<p>${message.message.replace(/\n/g, '<br>')}</p>
      `,
        });
        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}
