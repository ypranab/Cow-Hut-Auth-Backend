"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const users_validation_1 = require("./users.validation");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_1 = require("../../../enum/user");
const router = express_1.default.Router();
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getSingleUser);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getAllUsers);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteUser);
router.patch("/:id", (0, validateRequest_1.default)(users_validation_1.UserValidation.updateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.updateUser);
exports.UserRoutes = router;
