import db from '../database/connection'
import { type Company } from '@prisma/client'
import { type CompanyCreateRequestDTO } from '../DTO/companiesDTO'

export default class CompanyRepository {
  public async getById (id: string): Promise<Company | null> {
    return await db.company.findUnique({ where: { id } })
  }

  public async getByEmail (email: string): Promise<Company | null> {
    return await db.company.findUnique({ where: { email } })
  }

  public async getByPhone (phone: string): Promise<Company | null> {
    return await db.company.findUnique({ where: { phone } })
  }

  public async getByCoordinates (coordinate_x: number, coordinate_y: number): Promise<Company | null> {
    return await db.company.findFirst({ where: { coordinate_x, coordinate_y } })
  }

  public async save (companyData: CompanyCreateRequestDTO): Promise<Company> {
    return await db.company.create({ data: companyData })
  }

  public async list (): Promise<Company[]> {
    return await db.company.findMany()
  }

  public async update (id: string, companyData: CompanyCreateRequestDTO): Promise<Company> {
    return await db.company.update({ where: { id }, data: companyData })
  }

  public async delete (id: string): Promise<void> {
    await db.company.delete({ where: { id } })
  }
}
