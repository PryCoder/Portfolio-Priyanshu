import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Check message with Gemini API
    try {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a content filter. Respond with ONLY "BAD" if this message contains any profanity, hate speech, harassment, or demeaning words in ANY language. Respond with ONLY "OK" if it's clean.\n\nMessage:\n${message}`
                  }
                ]
              }
            ]
          })
        }
      );

      const geminiData = await geminiResponse.json();
      const aiResult = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (aiResult === "BAD") {
        return NextResponse.json(
          { message: "Your message contains inappropriate language." },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { message: "Content moderation failed." },
        { status: 500 }
      );
    }

    // 2️⃣ Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 }
    );
  }
}