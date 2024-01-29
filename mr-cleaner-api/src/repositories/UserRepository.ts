import db from '../database/connection'
import { type User } from '@prisma/client'

export default class UserRepository {
  public async getByEmail (email: string): Promise<User | null> {
    return await db.user.findFirst({ where: { email } })
  }

  public async updateLastAccessToken (id: string, token: string): Promise<User> {
    return await db.user.update({
      where: { id },
      data: { last_access_token: token }
    })
  }
}
