"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundException_1 = __importDefault(require("../exceptions/NotFoundException"));
const InvalidArgumentException_1 = __importDefault(require("../exceptions/InvalidArgumentException"));
class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    save(companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const sanitizedCompanyPhone = companyData.phone.replace(/\D/g, '');
            if (sanitizedCompanyPhone.length !== 11) {
                throw new InvalidArgumentException_1.default('Telefone inválido.');
            }
            let rescuedCompany = yield this.companyRepository.getByEmail(companyData.email);
            if (rescuedCompany !== null) {
                throw new InvalidArgumentException_1.default('E-mail já cadastrado para outra empresa.');
            }
            rescuedCompany = yield this.companyRepository.getByPhone(companyData.phone);
            if (rescuedCompany !== null) {
                throw new InvalidArgumentException_1.default('Telefone já cadastrado para outra empresa.');
            }
            rescuedCompany = yield this.companyRepository.getByCoordinates(companyData.coordinate_x, companyData.coordinate_y);
            if (rescuedCompany !== null) {
                throw new InvalidArgumentException_1.default('Coordenadas já cadastradas para outra empresa.');
            }
            return yield this.companyRepository.save(companyData);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rescuedCompany = yield this.companyRepository.getById(id);
            if (rescuedCompany === null) {
                throw new NotFoundException_1.default('Empresa não encontrada.');
            }
            return rescuedCompany;
        });
    }
    update(id, companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            let rescuedCompany = yield this.companyRepository.getById(id);
            if (rescuedCompany === null) {
                throw new NotFoundException_1.default('Empresa não encontrada.');
            }
            rescuedCompany = yield this.companyRepository.getByEmail(companyData.email);
            if (rescuedCompany != null && rescuedCompany.id !== id) {
                throw new InvalidArgumentException_1.default('Telefone já cadastrado para outra empresa.');
            }
            rescuedCompany = yield this.companyRepository.getByPhone(companyData.phone);
            if (rescuedCompany != null && rescuedCompany.id !== id) {
                throw new InvalidArgumentException_1.default('Telefone já cadastrado para outra empresa.');
            }
            rescuedCompany = yield this.companyRepository.getByCoordinates(companyData.coordinate_x, companyData.coordinate_y);
            if (rescuedCompany != null && rescuedCompany.id !== id) {
                throw new InvalidArgumentException_1.default('Coordenadas já cadastradas para outra empresa.');
            }
            return yield this.companyRepository.update(id, companyData);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.companyRepository.list();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rescuedCompany = yield this.companyRepository.getById(id);
            if (rescuedCompany === null) {
                throw new NotFoundException_1.default('Empresa não encontrada.');
            }
            yield this.companyRepository.delete(id);
        });
    }
}
exports.default = CompanyService;
