import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Adjust the path based on your folder structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  try {
    switch (req.method) {
      case "DELETE":
        // Handle DELETE request
        await prisma.employee.delete({
          where: { id: Number(id) },
        });
        return res.status(200).json({ message: "Employee deleted successfully" });

      case "PUT":
        // Handle PUT request for updating employee details
        const { firstName, lastName, email, telephone, manager, status } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !telephone || !status) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedEmployee = await prisma.employee.update({
          where: { id: Number(id) },
          data: { firstName, lastName, email, telephone, manager, status },
        });
        return res.status(200).json(updatedEmployee);

      default:
        // Handle unsupported HTTP methods
        res.setHeader("Allow", ["DELETE", "PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

