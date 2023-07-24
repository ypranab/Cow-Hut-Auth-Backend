"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string(),
        buyer: zod_1.z.string(),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
