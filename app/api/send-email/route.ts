import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text, html } = await request.json();

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In production, these should be set in .env.local
    // For development/testing, you can use Ethereal Email (https://ethereal.email/)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.ethereal.email',
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      auth: {
        user: process.env.EMAIL_SERVER_USER || 'test@ethereal.email',
        pass: process.env.EMAIL_SERVER_PASSWORD || 'testpassword',
      },
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Student Copilot" <noreply@studentcopilot.com>',
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Provide the Ethereal URL if using the fallback for testing
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('Preview URL: %s', previewUrl);
    }

    return NextResponse.json({ success: true, messageId: info.messageId, previewUrl });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
