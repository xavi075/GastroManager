// pages/api/comanda/get.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { idTaula } = req.query;
            if (idTaula) {
                const comandaActiva = await prisma.comanda.findMany({
                    where: {
                        idTaula: Number(idTaula),
                        dataFi: null
                    },
                    include: {
                        taula: true
                    }
                });
                res.status(200).json(comandaActiva);
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