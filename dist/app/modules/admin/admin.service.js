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
exports.AdminService = void 0;
const config_1 = __importDefault(require("../../../config"));
const admin_model_1 = require("./admin.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    if (!admin.password) {
        admin.password = config_1.default.default_admin_pass;
    }
    const newAdmin = yield admin_model_1.Admin.create(admin);
    if (!newAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin ");
    }
    return newAdmin;
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ id });
    return result;
});
exports.AdminService = {
    createAdmin,
    getSingleAdmin,
};
