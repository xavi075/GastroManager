const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();


const prisma = new PrismaClient();

app.get('/rols', async (req:any, res:Express.Response) => {
  try {
    const allRols = await prisma.rol.findMany()
    res.json(allRols)
    }
    catch (e: any) {
    res.json({ error: e.message })
    }
})

// async function main() {
//   // TODO: Escriure Prisma Client queries
//   const crearRol = await prisma.rol.create({
//     data: {
//       nomRol: 'Administrador',
//     },
//   })
    
//   const allRols = await prisma.rol.findMany()
//   // console.log(allRols)
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