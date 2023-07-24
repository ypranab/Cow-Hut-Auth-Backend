import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { CowController } from "./cow.controller";
import { CowValidation } from "./cow.validation";
import auth from "../../middleWares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";

const router = express.Router();

router.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  CowController.getSingleCow
);

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  CowController.getAllCows
);

router.delete("/:id", auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
);
export const CowRoutes = router;
