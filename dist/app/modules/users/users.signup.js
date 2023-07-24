"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignupRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(users_validation_1.UserValidation.createUserZodSchema), users_controller_1.UserController.createUser);
exports.UserSignupRoute = router;
