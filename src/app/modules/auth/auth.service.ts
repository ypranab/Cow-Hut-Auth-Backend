import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/users.model";
import { Secret } from "jsonwebtoken";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Admin } from "../admin/admin.model";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  let user = new User();

  const isUserExist = await user.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  //match password
  if (isUserExist?.password) {
    const passwordMatched = await user.isPasswordMatched(
      password,
      isUserExist?.password
    );

    if (!passwordMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "password incorrect");
    }
  }

  //access token
  const { userId, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const admin = new Admin();

  const isAdminExist = await admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }

  //match password
  if (isAdminExist.password) {
    const passwordMatched = await admin.isPasswordMatched(
      password,
      isAdminExist?.password
    );
    if (!passwordMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "password incorrect");
    }
  }

  //access token
  const { adminId, role } = isAdminExist;

  const accessToken = jwtHelpers.createToken(
    { adminId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { adminId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refereshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User();
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh token");
  }

  const { userId } = verifiedToken;
  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: user.userId,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const refereshTokenAdmin = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  const admin = new Admin();
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh token");
  }

  const { adminId } = verifiedToken;
  const isAdminExist = await admin.isAdminExist(adminId);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "admin not found");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      adminId: admin.adminId,
      role: admin.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  loginAdmin,
  refereshToken,
  refereshTokenAdmin,
};
