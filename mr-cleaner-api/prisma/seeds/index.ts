import { seedRoles } from './roles'
import { seedUsers } from './users'
import db from '../../src/database/connection'
async function main (): Promise<void> {
  const roles = await seedRoles()
  await seedUsers(roles)
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
