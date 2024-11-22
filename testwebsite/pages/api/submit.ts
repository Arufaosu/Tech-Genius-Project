// pages/api/submit.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, telephone, manager, status } = req.body;

    try {
      // Create new employee record
      const employee = await prisma.employee.create({
        data: {
          firstName,
          lastName,
          email,
          telephone,
          manager,
          status
        },
      });
      res.status(200).json(employee);
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ error: "Error creating employee" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

