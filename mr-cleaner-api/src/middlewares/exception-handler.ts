import { type Request, type Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import NotFoundException from '../exceptions/NotFoundException'
import InvalidArgumentException from '../exceptions/InvalidArgumentException'
import UnauthorizedException from '../exceptions/UnauthorizedException'

interface ErrorApiResponse {
  message: string
}
export default async function exceptionHandler (err: Error, req: Request<any>, res: Response): Promise<Response<ErrorApiResponse>> {
  console.log(err)

  if (err instanceof UnauthorizedException) {
    return res.status(401).json({ message: err.message })
  }

  if (err instanceof NotFoundException) {
    return res.status(404).json({ message: err.message })
  }

  if (err instanceof InvalidArgumentException) {
    return res.status(400).json({ message: err.message })
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token de acesso inválido.' })
  }

  return res.status(500).json({ message: 'Erro interno no servidor' })
}
