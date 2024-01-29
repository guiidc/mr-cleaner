import { type Request, type Response } from 'express'
import type CompanyService from '../services/CompanyService'
import { type CompanyCreateRequestDTO } from '../DTO/companiesDTO'
import exceptionHandler from '../middlewares/exception-handler'
import { validationResult } from 'express-validator'

export default class CompanyController {
  constructor (
    private readonly companyService: CompanyService
  ) {}

  public async getById (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: validationErrors.array()[0].msg })
      }

      const company = await this.companyService.getById(req.params.company_id)
      return res.status(200).json(company)
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }

  public async list (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const companies = await this.companyService.list()
      return res.status(200).json(companies)
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }

  public async save (req: Request<CompanyCreateRequestDTO>, res: Response): Promise<Response | undefined> {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: validationErrors.array()[0].msg })
      }

      const company = await this.companyService.save(req.body)
      return res.status(201).json(company)
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }

  public async update (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: validationErrors.array()[0].msg })
      }

      const company = await this.companyService.update(req.params.company_id, req.body)
      return res.status(200).json(company)
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response | undefined> {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: validationErrors.array()[0].msg })
      }

      await this.companyService.delete(req.params.company_id)
      return res.status(204).json()
    } catch (err) {
      await exceptionHandler(err, req, res)
    }
  }
}
