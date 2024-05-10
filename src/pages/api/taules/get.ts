// pages/api/taules/get.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { idRestaurant } = req.query;
            if (idRestaurant) {
                const taulesRestaurant = await prisma.taula.findMany({
                    where: {
                        idRestaurant: Number(idRestaurant),
                    },
                });
                res.status(200).json(taulesRestaurant);
                return;
            } else {
                res.status(405).json({ error: "Method not allowed" });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}