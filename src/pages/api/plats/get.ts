// pages/api/plats/get.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { copyFileSync } from "fs";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { idGrup } = req.query;
            const { idPlat } = req.query;
            console.log("Id grup", idGrup, "Id Plat", idPlat)
            if (idPlat){
                console.log("Obtenir un sol plat")
                const plat = await prisma.plat.findMany({
                    where: {
                        id: Number(idPlat),
                    },
                });
                res.status(200).json(plat);
                return;
            } else if (idGrup) {
                console.log("Obtenir tots els plats")
                const plats = await prisma.plat.findMany({
                    where: {
                        idGrup: Number(idGrup),
                    },
                });
                res.status(200).json(plats);
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