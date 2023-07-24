"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        age: zod_1.z.number(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.cowLocation]),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed], {
            required_error: "breed is erquired",
        }),
        weight: zod_1.z.number({
            required_error: "weight is required",
        }),
        label: zod_1.z.enum([...cow_constant_1.cowLabel], {
            required_error: "label is required",
        }),
        category: zod_1.z.enum([...cow_constant_1.cowCategory]),
        seller: zod_1.z.string(),
        // seller: z.object({
        //   phoneNumber: z.string(),
        //   password: z.string(),
        //   name: z.object({
        //     firstName: z.string({
        //       required_error: "First Name is required",
        //     }),
        //     lastName: z.string({
        //       required_error: "Last Name is required",
        //     }),
        //   }),
        //   address: z.string({
        //     required_error: "address is erquired",
        //   }),
        //   budget: z.number(),
        //   income: z.number(),
        // }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.cowLocation]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cow_constant_1.cowLabel]).optional(),
        category: zod_1.z.enum([...cow_constant_1.cowCategory]).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
