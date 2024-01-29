import { query } from 'express-validator'

export const getShortestPath = [
  query('origin_x')
    .optional().isNumeric().withMessage('Origem X é inválida').bail().toFloat(),

  query('origin_y')
    .optional().isNumeric().withMessage('Origem Y é inválida').bail().toFloat()
]
