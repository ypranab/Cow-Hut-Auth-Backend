"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: [
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh",
        ],
    },
    breed: {
        type: String,
        enum: [
            "Brahman",
            "Nellore",
            "Sahiwal",
            "Gir",
            "Indigenous",
            "Tharparkar",
            "Kankrej",
        ],
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: ["for sale", "sold"],
    },
    category: {
        type: String,
        enum: ["Dairy", "Beef", "Dual Purpose"],
    },
    // seller: {
    //   type: String,
    //   required: true,
    // },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);
