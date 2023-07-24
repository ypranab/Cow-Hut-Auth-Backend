import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { IRefreshTokenResponse } from "../auth/auth.interface";
import config from "../../../config";
import { AuthService } from "../auth/auth.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = req.body;
  const result = await AdminService.createAdmin(admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refereshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Logged in token received",
    data: result,
  });
});

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;

//   const result = await AuthService.loginUser(loginData);

//   const { refreshToken, ...others } = result;

//   // set refresh token
//   const cookieOptions = {
//     secure: config.env === "production",
//     httpOnly: true,
//   };
//   res.cookie("refreshToken", refreshToken, cookieOptions);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Admin login successfull",
//     data: others,
//   });
// });

export const AdminController = {
  createAdmin,
  refreshToken,
};
