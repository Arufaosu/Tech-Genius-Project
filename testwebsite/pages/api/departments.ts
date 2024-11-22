// pages/api/departments.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Assuming prisma is set up in lib/prisma.ts

// Handler to get all departments and create new department
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const departments = await prisma.department.findMany(); // Fetch departments from DB
      res.status(200).json(departments); // Return departments as JSON response
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  } else if (req.method === "POST") {
    // Handle creating new department
    const { name, manager, status } = req.body;
    try {
      const department = await prisma.department.create({
        data: {
          name,
          manager,
          status,
        },
      });
      res.status(201).json(department); // Return created department
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Failed to create department" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // Handle unsupported methods
  }
}

