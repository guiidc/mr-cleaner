import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { type Role } from '@prisma/client'

export interface TokenPayload {
  id: string
  name: string
  email: string
  role: Role
}

export default class TokenProvider {
  secret: string
  constructor () {
    this.secret = process.env.JWT_SECRET!
  }

  generateToken (data: TokenPayload): string {
    const tokenPayload = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role
    }
    return jwt.sign(tokenPayload, this.secret, {
      expiresIn: '1d',
      issuer: 'MrClean',
      subject: data.email
    })
  }

  verifyToken (token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload
  }
}
