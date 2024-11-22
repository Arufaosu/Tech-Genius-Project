import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Clear the authentication cookie
    const cookie = serialize("authenticated", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      expires: new Date(0), // Set the cookie to expire immediately
    });

    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ message: "Logout successful" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

