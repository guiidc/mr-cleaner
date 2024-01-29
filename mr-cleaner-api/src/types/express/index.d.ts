// to make the file a module and avoid the TypeScript error
import { type User } from '@prisma/client'

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
