import { param } from 'express-validator'

export const removeCompany = [
  param('company_id')
    .isUUID().withMessage('ID da empresa inválido.').bail()
]
