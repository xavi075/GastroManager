const { PrismaClient } = require('@prisma/client');
const { NextApiRequest, NextApiResponse } = require('next');
const express = require('express');
const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get('/rols', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    const allRols = await prisma.rol.findMany()
    res.json(allRols)
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

app.get('/plats', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    const allPlats = await prisma.plat.findMany()
    res.json(allPlats)
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

app.post('/plats', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  console.log(req.body.nom)
  try {
    const { nom, preu } = req.body
    console.log(req.body)
    const crearPlat = await prisma.plat.create({
      data: {
        nom,
        preu,
        // idGrup
      }
    })
    res.json(crearPlat)
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

// async function main() {
//   // TODO: Escriure Prisma Client queries
//   const crearRol = await prisma.rol.create({
//     data: {
//       nomRol: 'Cuiner',
//     },
//   })
    
//   const allRols = await prisma.rol.findMany()
//   console.log(allRols)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})



