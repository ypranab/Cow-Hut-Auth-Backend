import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  adminId: string;
  phoneNumber: string;
  role: "admin";
  password: string;
  name: UserName;
  address: string;
  needsPasswordChange: true | false;
};

export type IAdminMethods = {
  isAdminExist(id: string): Promise<Partial<IAdmin> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
