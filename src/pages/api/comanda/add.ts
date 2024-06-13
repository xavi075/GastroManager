// pages/api/comanda/add.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { isDeepStrictEqual } from "util";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body);
    if (req.method === "PUT") {
        try {
            const { idTaula } = req.query;
            console.log(idTaula)
            const createdComanda = await prisma.comanda.create({
                data: {
                    dataInici: new Date(),
                    idTaula: Number(idTaula),
                }
            });
            console.log(createdComanda)
            res.status(200).json(createdComanda);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}