import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";  // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query; // Get department ID from URL query parameter

  if (method === "DELETE") {
    try {
      // Delete the department from the database by ID
      const deletedDepartment = await prisma.department.delete({
        where: {
          id: Number(id), // Ensure id is a number
        },
      });

      // Return the deleted department's data
      res.status(200).json(deletedDepartment);
    } catch (error) {
      console.error("Error deleting department:", error);
      res.status(500).json({ error: "Error deleting department" });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

