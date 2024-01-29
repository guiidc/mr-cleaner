import db from '../database/connection'
import { type LogAccess } from '@prisma/client'

export default class AccessLogRepository {
  public async save (user_id: string): Promise<LogAccess> {
    return await db.logAccess.create({ data: { user_id } })
  }
}
