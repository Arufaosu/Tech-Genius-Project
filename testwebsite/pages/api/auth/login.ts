import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"; // To serialize the cookie

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    console.log("Login Attempt:", email, password); // Log for debugging

    // Check if the credentials are correct
    if (email === "hradmin@test.com" && password === "TestPass1234") {
      // Serialize cookie to mark the user as authenticated
      const cookie = serialize("authenticated", "true", {
        httpOnly: true, // Ensures the cookie is sent only in HTTP requests
        secure: process.env.NODE_ENV === "production", // Secure cookie only in production
        sameSite: "Strict", // Restrict cookie from being sent in cross-site requests
        path: "/", // Cookie accessible throughout the entire site
        maxAge: 60 * 60 * 24 * 7, // Cookie expires after 7 days (optional)
      });

      // Set the cookie header in the response
      res.setHeader("Set-Cookie", cookie);

      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

