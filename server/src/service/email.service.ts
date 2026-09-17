import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
})

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
    await transporter.sendMail({
        from: `ProjectHub <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Verify your ProjectHub email",
        text: `Your ProjectHub verification code is: ${verificationCode}. This code expires in 10 minutes.`,
        html: 
            `
                <h2>Verify your ProjectHub email</h2>
                <p>Your verification code is:</p>
                <h1>${verificationCode}</h1>
                <p>This code expires in <strong>10 minutes</strong>.</p>
                <p>If you didn't create a ProjectHub account, you can ignore this email.</p>
            `,
    })
}