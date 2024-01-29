import type CompanyRepository from '../repositories/CompanyRepository'
import { type Company } from '@prisma/client'
import NotFoundException from '../exceptions/NotFoundException'
import { type CompanyCreateRequestDTO } from '../DTO/companiesDTO'
import InvalidArgumentException from '../exceptions/InvalidArgumentException'

export default class CompanyService {
  constructor (
    private readonly companyRepository: CompanyRepository
  ) {}

  public async save (companyData: CompanyCreateRequestDTO): Promise<Company> {
    const sanitizedCompanyPhone = companyData.phone.replace(/\D/g, '')

    if (sanitizedCompanyPhone.length !== 11) {
      throw new InvalidArgumentException('Telefone inválido.')
    }

    let rescuedCompany = await this.companyRepository.getByEmail(companyData.email)

    if (rescuedCompany !== null) {
      throw new InvalidArgumentException('E-mail já cadastrado para outra empresa.')
    }

    rescuedCompany = await this.companyRepository.getByPhone(companyData.phone)

    if (rescuedCompany !== null) {
      throw new InvalidArgumentException('Telefone já cadastrado para outra empresa.')
    }

    rescuedCompany = await this.companyRepository.getByCoordinates(companyData.coordinate_x, companyData.coordinate_y)

    if (rescuedCompany !== null) {
      throw new InvalidArgumentException('Coordenadas já cadastradas para outra empresa.')
    }

    return await this.companyRepository.save(companyData)
  }

  public async getById (id: string): Promise<Company> {
    const rescuedCompany = await this.companyRepository.getById(id)

    if (rescuedCompany === null) {
      throw new NotFoundException('Empresa não encontrada.')
    }

    return rescuedCompany
  }

  public async update (id: string, companyData: CompanyCreateRequestDTO): Promise<Company> {
    let rescuedCompany = await this.companyRepository.getById(id)

    if (rescuedCompany === null) {
      throw new NotFoundException('Empresa não encontrada.')
    }

    rescuedCompany = await this.companyRepository.getByEmail(companyData.email)

    if (rescuedCompany != null && rescuedCompany.id !== id) {
      throw new InvalidArgumentException('Telefone já cadastrado para outra empresa.')
    }

    rescuedCompany = await this.companyRepository.getByPhone(companyData.phone)

    if (rescuedCompany != null && rescuedCompany.id !== id) {
      throw new InvalidArgumentException('Telefone já cadastrado para outra empresa.')
    }

    rescuedCompany = await this.companyRepository.getByCoordinates(companyData.coordinate_x, companyData.coordinate_y)

    if (rescuedCompany != null && rescuedCompany.id !== id) {
      throw new InvalidArgumentException('Coordenadas já cadastradas para outra empresa.')
    }

    return await this.companyRepository.update(id, companyData)
  }

  public async list (): Promise<Company[]> {
    return await this.companyRepository.list()
  }

  public async delete (id: string): Promise<void> {
    const rescuedCompany = await this.companyRepository.getById(id)

    if (rescuedCompany === null) {
      throw new NotFoundException('Empresa não encontrada.')
    }

    await this.companyRepository.delete(id)
  }
}
