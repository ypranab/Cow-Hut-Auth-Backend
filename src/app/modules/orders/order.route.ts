import express from "express";
import { OrderValidation } from "./order.validation";
import validateRequest from "../../middleWares/validateRequest";
import { OrderController } from "./order.controller";
import auth from "../../middleWares/auth";
import { ENUM_USER_ROLE } from "../../../enum/user";

const router = express.Router();

router.post(
  "/",
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);

router.get(
  "/",
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  OrderController.getOrders
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  OrderController.getSingleOrder
);

export const OrderRoute = router;
