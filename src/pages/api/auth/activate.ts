import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const { ACTIVATION_TOKEN_SECRET } = process.env;

interface UserToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { token } = req.body;
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken;
    const userDb = await User.findById(userToken.id);
    if (userDb.emailVerified == true) {
      res.status(400).json({ message: "Email address already verified." });
    }
    await User.findByIdAndUpdate(userDb.id, { emailVerified: true });
    res.json({
      message: "Your account has been successfully verified.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}