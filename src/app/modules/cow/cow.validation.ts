import { z } from "zod";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string(),
    age: z.number(),
    price: z.number().optional(),
    location: z.enum([...cowLocation] as [string, ...string[]]),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: "breed is erquired",
    }),
    weight: z.number({
      required_error: "weight is required",
    }),
    label: z.enum([...cowLabel] as [string, ...string[]], {
      required_error: "label is required",
    }),
    category: z.enum([...cowCategory] as [string, ...string[]]),
    seller: z.string(),
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

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...cowLocation] as [string, ...string[]]).optional(),
    breed: z.enum([...cowBreed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...cowLabel] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategory] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
