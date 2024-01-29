"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = void 0;
const express_1 = require("express");
const CompanyController_1 = __importDefault(require("../controllers/CompanyController"));
const CompanyRepository_1 = __importDefault(require("../repositories/CompanyRepository"));
const CompanyService_1 = __importDefault(require("../services/CompanyService"));
const validations = __importStar(require("../validations/companies"));
const middlewares = __importStar(require("../middlewares"));
const companyRepository = new CompanyRepository_1.default();
const companyService = new CompanyService_1.default(companyRepository);
const companyController = new CompanyController_1.default(companyService);
function companyRoutes() {
    const router = (0, express_1.Router)();
    router.use(middlewares.verifyUser);
    router.get('/:company_id', validations.getSingleCompany, companyController.getById.bind(companyController));
    router.get('/', companyController.list.bind(companyController));
    router.post('/', validations.createCompany, companyController.save.bind(companyController));
    router.put('/:company_id', validations.updateCompany, companyController.update.bind(companyController));
    router.delete('/:company_id', validations.removeCompany, companyController.delete.bind(companyController));
    return router;
}
exports.companyRoutes = companyRoutes;
