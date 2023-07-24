import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middleWares/validateRequest";
import { AdminValidation } from "./admin.validation";
import { AuthValidation } from "../auth/auth.validation";
import { AuthController } from "../auth/auth.controller";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginAdmin
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refereshTokenAdmin
);

//router.get("/:id", AdminController.getSingleAdmin);

// router.get('/', AdminController.getAllAdmins);

// router.delete('/:id', AdminController.deleteAdmin);

export const AdminRoutes = router;
