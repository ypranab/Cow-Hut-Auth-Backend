import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "../users/users.model";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  const result = await OrderService.createOrder(order);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await OrderService.getOrders(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully!",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;

  const orderId = req.params.id;
  const result = await OrderService.getSingleOrder(orderId, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
