// pages/api/taules/delete.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const { idRestaurant, numTaula } = req.body;
            const deletedTaula = await prisma.taula.deleteMany({
                where: {
                    idRestaurant,
                    numTaula,
                },
            });
            res.status(200).json(deletedTaula);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}