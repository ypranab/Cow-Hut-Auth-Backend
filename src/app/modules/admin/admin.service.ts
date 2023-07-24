import config from "../../../config";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  if (!admin.password) {
    admin.password = config.default_admin_pass as string;
  }

  const newAdmin = await Admin.create(admin);
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin ");
  }

  return newAdmin;
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id });
  return result;
};

export const AdminService = {
  createAdmin,
  getSingleAdmin,
};
