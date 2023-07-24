import mongoose, { Schema, Types, model } from "mongoose";
import { IUser, UserModel } from "./users.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser, UserModel>(
  {
    userId: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["seller", "buyer"],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  let user = null;
  user = await User.findOne(
    { phoneNumber },
    { userId: 1, password: 1, role: 1 }
  ).lean();

  return user;
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// bcrypt pssword
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.userId) {
    user.userId = user._id.toString();
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
