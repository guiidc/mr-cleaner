import { Router } from 'express'
import PathController from '../controllers/PathController'
import PathService from '../services/PathService'
import CompanyRepository from '../repositories/CompanyRepository'
import * as middleware from '../middlewares'
import * as validation from '../validations/paths'

const companyRepository = new CompanyRepository()
const pathService = new PathService(companyRepository)
const pathController = new PathController(pathService)
export function pathRoutes (): Router {
  const router = Router()
  router.use(middleware.verifyUser)
  router.get('/', validation.getShortestPath, pathController.getShortestPath.bind(pathController))
  return router
}
