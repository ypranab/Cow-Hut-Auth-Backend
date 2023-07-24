import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";

const cowSchema = new Schema<ICow>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>("Cow", cowSchema);
