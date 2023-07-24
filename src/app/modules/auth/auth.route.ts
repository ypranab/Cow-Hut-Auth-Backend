import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { UserValidation } from "../users/users.validation";
import { UserController } from "../users/users.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
router.post(
  "/refresh-token-admin",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refereshTokenAdmin
);

export const AuthRoutes = router;
