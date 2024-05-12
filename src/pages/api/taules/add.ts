// pages/api/taules/add.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { idRestaurant, numTaula } = req.body;
            const createdTaula = await prisma.taula.create({
                data: {
                    idRestaurant,
                    numTaula
                },
            });
            res.status(200).json(createdTaula);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}