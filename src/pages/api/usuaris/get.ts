import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
        const {id} = req.query;
        if (id) {
          const usuaris = await prisma.usuari.findMany({
            where: {
              id: Number(id)
            }
          });
          res.status(200).json(usuaris);
        } else {
          const usuaris = await prisma.usuari.findMany();
          res.status(200).json(usuaris);
        }
    } catch (error) {
      res.status(500).json({ message: "Error getting usuaris" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}