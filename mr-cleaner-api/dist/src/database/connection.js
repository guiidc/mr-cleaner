"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const client_1 = require("@prisma/client");
const globalForPrisma = global;
const db = globalForPrisma.prisma ||
    new client_1.PrismaClient({ log: ['error'] });
exports.default = db;
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = db;
