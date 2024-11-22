// pages/api/departments/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Make sure prisma is correctly imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const departments = await prisma.department.findMany();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: "Error fetching departments" });
    }
  }
}

