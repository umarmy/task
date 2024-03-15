import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const clearDb = async () => {
  await prisma.product.deleteMany({})
  await prisma.supplier.deleteMany({})
}

const seedDb = async () => {
  for (let i = 0; i <= 1000; i++) {
    const supplier = await prisma.supplier.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number()
      },
    })

    await prisma.product.create({
      data: {
        name: faker.lorem.lines(1),
        description: faker.lorem.lines(2),
        category: faker.number.int({ min: 1, max: 5 }),
        price: faker.number.binary({ min: 1, max: 999 }),
        quantity: faker.number.int({ min: 10, max: 100 }),
        supplier_id: supplier.id
      }
    })
  }
}

// main().catch((e) => {
//   console.error(e);
//   process.exit(1)
// }).finally(async () => {
//   await prisma.$disconnect;
// })

async function main() {
  await clearDb()
  await seedDb()
}

void main()
