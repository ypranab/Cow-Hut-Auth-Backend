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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = require("../users/users.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const admin_model_1 = require("../admin/admin.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    let user = new users_model_1.User();
    const isUserExist = yield user.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    //match password
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) {
        const passwordMatched = yield user.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
        if (!passwordMatched) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password incorrect");
        }
    }
    //access token
    const { userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const admin = new admin_model_1.Admin();
    const isAdminExist = yield admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    //match password
    if (isAdminExist.password) {
        const passwordMatched = yield admin.isPasswordMatched(password, isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password);
        if (!passwordMatched) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password incorrect");
        }
    }
    //access token
    const { adminId, role } = isAdminExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ adminId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ adminId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refereshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new users_model_1.User();
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh token");
    }
    const { userId } = verifiedToken;
    const isUserExist = yield user.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user not found");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: user.userId,
        role: user.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const refereshTokenAdmin = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = new admin_model_1.Admin();
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh token");
    }
    const { adminId } = verifiedToken;
    const isAdminExist = yield admin.isAdminExist(adminId);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "admin not found");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        adminId: admin.adminId,
        role: admin.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUser,
    loginAdmin,
    refereshToken,
    refereshTokenAdmin,
};
