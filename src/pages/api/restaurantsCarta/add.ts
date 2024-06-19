import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { nom, adreca, nif } = req.body;

            // comprova si el restaurant ja existeix
            const existingRestaurant = await prisma.restaurant.findUnique({
                where: { nif: nif }
            });
            if (existingRestaurant) {
                return res.status(409).json({ error: "Restaurant already exists" })
            }

            const newRestaurant = await prisma.restaurant.create({
                data: {
                    nom: nom,
                    adreca: adreca,
                    nif: nif
                },
            });
            res.status(200).json(newRestaurant);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}