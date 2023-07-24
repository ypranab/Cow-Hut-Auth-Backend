"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string(),
        role: zod_1.z.enum(["buyer", "seller"]),
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "address is erquired",
        }),
        budget: zod_1.z.number({
            required_error: "Budget is required",
        }),
        income: zod_1.z.number({
            required_error: "incomer is required",
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum(["buyer", "seller"]).optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
