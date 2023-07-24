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
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const AdminSchema = new mongoose_1.Schema({
    adminId: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin"],
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// bcrypt pssword
AdminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = this;
        if (!admin.adminId) {
            admin.adminId = admin._id.toString();
        }
        admin.password = yield bcrypt_1.default.hash(admin.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
AdminSchema.methods.isAdminExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let admin = null;
        admin = yield exports.Admin.findOne({ phoneNumber }, { adminId: 1, password: 1, role: 1, needsPasswordChange: 1 }).lean();
        return admin;
    });
};
AdminSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
exports.Admin = (0, mongoose_1.model)("Admin", AdminSchema);
