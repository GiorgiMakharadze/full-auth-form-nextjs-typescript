import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models/User";
import { createResetToken } from "@/utils/tokens";
import sendMail from "@/utils/sendMail";
import { resetPasswordEmail } from "@/components/emailTemplates/reset";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist" });
    }

    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.NEXTAUTH_URL}/reset/${user._id}`;
    await sendMail(
      email,
      user.name,
      user.image,
      url,
      "Reset your password",
      resetPasswordEmail
    );

    res.json({
      message: "An Email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
