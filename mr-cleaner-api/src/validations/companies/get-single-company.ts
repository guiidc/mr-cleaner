import { param } from 'express-validator'

export const getSingleCompany = [
  param('company_id')
    .isUUID().withMessage('ID da empresa inválido.').bail()
]
