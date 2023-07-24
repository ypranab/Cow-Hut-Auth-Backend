import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    phoneNumber: z.string(),
    role: z.enum(["buyer", "seller"]),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
    }),
    address: z.string({
      required_error: "address is erquired",
    }),
    budget: z.number({
      required_error: "Budget is required",
    }),
    income: z.number({
      required_error: "incomer is required",
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum(["buyer", "seller"]).optional(),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
