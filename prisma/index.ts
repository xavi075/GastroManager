const { PrismaClient } = require('@prisma/client');
const { NextApiRequest, NextApiResponse } = require('next');
// import { IPlat } from '@/utils/interfaces';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
require('dotenv').config();
app.use(cors({
  origin: 'http://localhost:3000' // Permitir solo solicitudes desde http://localhost:3000
}));

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

app.get('/taules', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    const idRestaurant = req.query.idRestaurant;
    const allTaules = await prisma.taula.findMany({
      where: {
        idRestaurant: Number(idRestaurant),
      }
    });
    res.json(allTaules)
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

app.post('/taules', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    const { idRestaurant, numTaula, afegir } = req.body
    console.log(req.body)
    if (afegir) {
      const crearTaula = await prisma.taula.create({
        data: {
          idRestaurant,
          numTaula,
        }
      })
      res.json(crearTaula)
    } else {
      const eliminarTaula = await prisma.taula.deleteMany({
        where: {
            idRestaurant,
            numTaula,
        }
      })
      res.json(eliminarTaula)
    }
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

app.get('/comanda', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    // const idRestaurant = req.params.idRestaurant;
    const idTaula = req.query.idTaula;
    const comandaActiva = await prisma.comanda.findMany({
      where: {
        // idRestaurant: idRestaurant,
        idTaula: Number(idTaula),
        dataFi: null
      },
      include: {
        taula: true
      }
    });
    res.json(comandaActiva)
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

app.get('/liniesComanda', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    const idComanda = req.query.idComanda;
    const liniesComanda = await prisma.liniaComanda.findMany({
      where: {
        idComanda: Number(idComanda)
      },
      include: {
        plat: true
      }
    });
    res.json(liniesComanda)
  }
  catch (e: any) {
    res.json({ error: e.message })
  }
})

app.get('/liniesMenu', async (req: typeof NextApiRequest, res: typeof NextApiResponse) => {
  try {
    const idComanda = req.query.idComanda;
    const liniesMenu = await prisma.liniaMenu.findMany({
      where: {
        idComanda: Number(idComanda)
      },
      include: {
        menu: true
      }
    });
    res.json(liniesMenu)
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

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})



