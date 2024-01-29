import db from '../../src/database/connection'
import { type Role } from '@prisma/client'
const rolesList = [
  { role: 'admin' },
  { role: 'user' }
]

export async function seedRoles (): Promise<Role[]> {
  const promises = rolesList.map(async (role) => (
    await db.role.upsert({
      where: { role: role.role },
      update: {},
      create: {
        role: role.role
      }
    })
  ))
  const insertedRoles = await Promise.all(promises)

  insertedRoles.forEach((role) => {
    console.log(`🔑 Role ${role.role} inserted with id ${role.id}`)
  })

  return insertedRoles
}
