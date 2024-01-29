import type PathService from '../services/PathService'
import exceptionHandler from '../middlewares/exception-handler'
import { type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

export default class PathController {
  constructor (private readonly pathService: PathService) {}

  public async getShortestPath (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: validationErrors.array()[0].msg })
      }

      const originX = req.query.origin_x as number | undefined
      const originY = req.query.origin_y as number | undefined

      const path = await this.pathService.getShortestPath(originX, originY)
      return res.status(200).json(path)
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }
}
