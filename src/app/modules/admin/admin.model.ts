import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    adminId: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin"],
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

// bcrypt pssword
AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (!admin.adminId) {
    admin.adminId = admin._id.toString();
  }
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

AdminSchema.methods.isAdminExist = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  let admin = null;
  admin = await Admin.findOne(
    { phoneNumber },
    { adminId: 1, password: 1, role: 1 }
  ).lean();

  return admin;
};

AdminSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
