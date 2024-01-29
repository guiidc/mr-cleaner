import { body } from 'express-validator'

export const loginValidation = [
  body('email').isEmail().withMessage('E-mail inválido').bail(),

  body('password').exists().withMessage('A senha é obrigatória.').bail()
    .isString().withMessage('Senha inválida').bail()
    .isLength({ min: 6 }).withMessage('Credenciais inválidas ou inexistente.').bail()
]
