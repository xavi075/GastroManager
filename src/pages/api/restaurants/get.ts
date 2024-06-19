// pages/api/restaurants/get.js
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
            const { email } = req.query;
            if (idRestaurant){
                const restaurant = await prisma.restaurant.findUnique({
                    where: {
                        id: Number(idRestaurant),
                    },
                });
                res.status(200).json(restaurant);
                return;
            } else if (email) {
              if (!email || typeof email !== 'string') {
                return res.status(400).json({ message: 'Invalid email parameter' });
              }

              try {
                const user = await prisma.usuari.findUnique({
                  where: { email: email },
                  include: { restaurant: true },
                });

                if (!user || !user.restaurant) {
                  return res.status(404).json({ message: 'Restaurant not found' });
                }

                const { id, nom } = user.restaurant;
                return res.status(200).json({ id, nom });

              } catch (error) {
                console.error('Error fetching restaurant:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
              } 
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

