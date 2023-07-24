import express from "express";
import { UserController } from "./users.controller";
import validateRequest from "../../middleWares/validateRequest";
import { UserValidation } from "./users.validation";
import auth from "../../middleWares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";

const router = express.Router();
router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getProfile
);
router.patch(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateProfile
);

router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

export const UserRoutes = router;
