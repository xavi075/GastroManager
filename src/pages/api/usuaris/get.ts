// pages/api/usuaris/get.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import exp from "constants";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const { id } = req.query;
            if (id) {
                const usuari = await prisma.usuari.findUnique({
                    where: {
                        id: Number(id),
                    },
                    select: {
                        id: true,
                        email: true,
                        nom: true,
                        contrasenya_hash: false,
                        dataCreacioUsuari: true,
                        rol: true,
                        restaurant: true,
                    },
                });
                res.status(200).json(usuari);
                return;
            } else {
                const usuaris = await prisma.usuari.findMany({
                    select: {
                        id: true,
                        email: true,
                        nom: true,
                        contrasenya_hash: false,
                        dataCreacioUsuari: true,
                        rol: true,
                        restaurant: true,
                    },
                });
                res.status(200).json(usuaris);
                return;
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}