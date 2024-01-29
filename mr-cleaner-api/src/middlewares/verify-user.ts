import { type Request, type Response, type NextFunction } from 'express'
import TokenProvider, { type TokenPayload } from '../providers/TokenProvider'
import db from '../database/connection'

export async function verifyUser (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
  const tokenProvider = new TokenProvider()

  const accessToken = req.headers.authorization ?? req.headers.Authorization

  if (accessToken === undefined) {
    return res.status(401).json({ message: 'Token de acesso ausente.' })
  }

  const sanitizedToken = (accessToken as string).replace('Bearer ', '')

  let payload: TokenPayload

  try {
    payload = tokenProvider.verifyToken(sanitizedToken)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Token de acesso inválido.' })
  }
  const rescuedUser = await db.user.findUnique({ where: { id: payload.id } })

  if (rescuedUser === null) {
    return res.status(401).json({ message: 'Usuário não encontrado.' })
  }
  req.user = rescuedUser
  next()
}
