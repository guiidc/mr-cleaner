import { type Request, type Response } from 'express'
import exceptionHandler from '../middlewares/exception-handler'
import { validationResult } from 'express-validator'
import type UserService from '../services/UserService'
import { type UserLoginRequestDTO } from '../DTO/usersDTO'

export default class UserController {
  constructor (private readonly userService: UserService) {}

  public async login (req: Request<UserLoginRequestDTO>, res: Response): Promise<Response<any> | undefined> {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: validationErrors.array()[0].msg })
      }

      const accessToken = await this.userService.login(req.body)
      res.setHeader('Access-Token', accessToken)
      return res.status(200).json({ message: 'Login realizado com sucesso.' })
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }
}
