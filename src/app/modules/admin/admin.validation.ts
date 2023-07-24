import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string(),
    role: z.string().optional(),
    password: z.string(),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    address: z.string(),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
