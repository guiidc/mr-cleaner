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
exports.pathRoutes = void 0;
const express_1 = require("express");
const PathController_1 = __importDefault(require("../controllers/PathController"));
const PathService_1 = __importDefault(require("../services/PathService"));
const CompanyRepository_1 = __importDefault(require("../repositories/CompanyRepository"));
const middleware = __importStar(require("../middlewares"));
const validation = __importStar(require("../validations/paths"));
const companyRepository = new CompanyRepository_1.default();
const pathService = new PathService_1.default(companyRepository);
const pathController = new PathController_1.default(pathService);
function pathRoutes() {
    const router = (0, express_1.Router)();
    router.use(middleware.verifyUser);
    router.get('/', validation.getShortestPath, pathController.getShortestPath.bind(pathController));
    return router;
}
exports.pathRoutes = pathRoutes;
