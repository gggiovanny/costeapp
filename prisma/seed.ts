import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const fixedCosts = [
  { costName: 'Luz', montlyCost: 500 },
  { costName: 'Agua', montlyCost: 200 },
  { costName: 'Sueldos', montlyCost: 2000 },
  { costName: 'Gas', montlyCost: 1000 },
];

async function seed() {
  await Promise.all(fixedCosts.map(fixedCost => db.fixedCost.create({ data: fixedCost })));
}

seed();
