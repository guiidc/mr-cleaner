import { Router } from 'express'
import CompanyController from '../controllers/CompanyController'
import CompanyRepository from '../repositories/CompanyRepository'
import CompanyService from '../services/CompanyService'
import * as validations from '../validations/companies'
import * as middlewares from '../middlewares'

const companyRepository = new CompanyRepository()
const companyService = new CompanyService(companyRepository)
const companyController = new CompanyController(companyService)
export function companyRoutes (): Router {
  const router = Router()
  router.use(middlewares.verifyUser)
  router.get('/:company_id', validations.getSingleCompany, companyController.getById.bind(companyController))
  router.get('/', companyController.list.bind(companyController))
  router.post('/', validations.createCompany, companyController.save.bind(companyController))
  router.put('/:company_id', validations.updateCompany, companyController.update.bind(companyController))
  router.delete('/:company_id', validations.removeCompany, companyController.delete.bind(companyController))
  return router
}
