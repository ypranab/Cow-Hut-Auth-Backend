import config from "../../../config/index";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import httpStatus from "http-status";

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  return newUser;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });

  return result;
};

const getAllUsers = async () => {
  const result = await User.find({});

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const updateProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    fields: ["name", "phoneNumber", "address"],
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  return result;
};

const getProfile = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne(
    { userId: id },
    { name: 1, phoneNumber: 1, address: 1 }
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  return result;
};

export const UserService = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
};
