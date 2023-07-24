import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  userId: string;
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
  needsPasswordChange: true | false;
};

export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
