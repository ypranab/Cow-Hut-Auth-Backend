import { Request, Response } from "express";
import { UserService } from "./users.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./users.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully !",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users retrieved successfully !",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully !",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  console.log(userId);

  const result = await UserService.getProfile(userId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully !",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.userId;
  const updatedData = req.body;

  const result = await UserService.updateProfile(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully !",
    data: result,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
};
