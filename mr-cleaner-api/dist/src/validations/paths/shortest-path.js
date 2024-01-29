"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortestPath = void 0;
const express_validator_1 = require("express-validator");
exports.getShortestPath = [
    (0, express_validator_1.query)('origin_x')
        .optional().isNumeric().withMessage('Origem X é inválida').bail().toFloat(),
    (0, express_validator_1.query)('origin_y')
        .optional().isNumeric().withMessage('Origem Y é inválida').bail().toFloat()
];
