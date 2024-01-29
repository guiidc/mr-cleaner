import db from '../database/connection'
import { type Role } from '@prisma/client'

export default class RoleRepository {
  public async getById (id: string): Promise<Role | null> {
    return await db.role.findFirst({ where: { id } })
  }
}
