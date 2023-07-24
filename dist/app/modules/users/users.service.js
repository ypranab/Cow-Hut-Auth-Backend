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
exports.UserService = void 0;
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = require("./users.model");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = index_1.default.default_user_pass;
    }
    const newUser = yield users_model_1.User.create(user);
    if (!newUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
    }
    return newUser;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findOne({ _id: id });
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.find({});
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield users_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const result = yield users_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return result;
});
exports.UserService = {
    createUser,
    getSingleUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
