import nodemailer from "nodemailer";

import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    // console.log(emailType,"sE",userId)
    try {
        // create hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        // console.log(hashedToken,"sE")
    if (emailType === "VERIFY") {
        // console.log(userId ,"sE")
      const res =await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    //   console.log(res)
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USER,
          pass: process.env.USER_PASSWORD
        }
      });
// console.log(transport)
    const mailOptions = {
      from: "fulariakash007@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }
        or copy and paste the link below to your browser.</br> ${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}
 </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    console.log(mailResponse,"Se")
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
