import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const fixedCosts = [
  { id: 1, costName: 'Luz', montlyCost: 500 },
  { id: 2, costName: 'Agua', montlyCost: 200 },
  { id: 3, costName: 'Sueldos', montlyCost: 2000 },
  { id: 4, costName: 'Gas', montlyCost: 1000 },
];

async function seed() {
  for (const fixedCost of fixedCosts) {
    await db.fixedCost.upsert({
      where: { id: fixedCost.id },
      update: fixedCost,
      create: fixedCost,
    });
  }
  for (let id = 5; id < 40; id++) {
    const fakeFixedCost = {
      id,
      costName: `test ${id}`,
      montlyCost: id * 1000,
    };

    await db.fixedCost.upsert({
      where: { id: fakeFixedCost.id },
      update: fakeFixedCost,
      create: fakeFixedCost,
    });
  }
}

seed();
