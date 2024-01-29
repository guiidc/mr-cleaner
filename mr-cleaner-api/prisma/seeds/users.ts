import db from '../../src/database/connection'
import { type Role, type User } from '@prisma/client'
import bcrypt from 'bcryptjs'

const usersList = [
  {
    name: 'Admin',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('123456', 12)
  }
]

export async function seedUsers (rolesList: Role[]): Promise<User[]> {
  const promises = usersList.map(async (user) => (
    await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: user.password,
        role_id: rolesList[0].id
      }
    })
  ))
  const insertedUsers = await Promise.all(promises)

  insertedUsers.forEach((user) => {
    console.log(`🙋🏻‍User ${user.name} created with id ${user.id}`)
  })

  return insertedUsers
}
