// pages/api/employees.ts

import prisma from "../../lib/prisma"; // Assuming prisma client is initialized here

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all employees from the database
      const employees = await prisma.employee.findMany();
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

