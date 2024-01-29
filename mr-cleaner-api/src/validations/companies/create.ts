import { body } from 'express-validator'

export const createCompany = [
  body('name')
    .isString().withMessage('Nome inválido.').bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('Nome deve ter entre 1 e 255 caracteres.').bail(),

  body('email')
    .isEmail().withMessage('E-mail inválido.').bail(),

  body('phone')
    .isString().withMessage('Telefone inválido.').bail()
    .isNumeric().withMessage('Telefone inválido.').bail(),

  body('coordinate_x')
    .isNumeric().withMessage('Coordenada X inválida.').bail().toFloat(),

  body('coordinate_y')
    .isNumeric().withMessage('Coordenada Y inválida.').bail().toFloat()
]
