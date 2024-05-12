// pages/api/liniesComanda/get.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { idComanda } = req.query;
            if (idComanda) {
                const liniesComanda = await prisma.liniaComanda.findMany({
                    where: {
                        idComanda: Number(idComanda)
                    },
                    include: {
                        plat: true
                    }
                });
                res.status(200).json(liniesComanda);
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
  