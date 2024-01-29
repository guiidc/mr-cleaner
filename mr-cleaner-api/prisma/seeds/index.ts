import { PrismaClient } from '@prisma/client'
import { seedRoles } from './roles'
import { seedUsers } from './users'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  const roles = await seedRoles()
  await seedUsers(roles)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
