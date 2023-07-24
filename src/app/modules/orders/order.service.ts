import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Cow } from "../cow/cow.model";
import { User } from "../users/users.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  //console.log(seller, buyer, cow);

  //let result = await Order.create(order);
  let newOrder = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let buyer = await User.findById(order.buyer);
    let cow = await Cow.findById(order.cow);
    let seller = await User.findById(cow?.seller);

    if ((buyer?.budget as number) < (cow?.price as number)) {
      throw new ApiError(httpStatus.FORBIDDEN, "not enough budget");
    }
    if (cow?.label === "sold out") {
      throw new ApiError(httpStatus.FORBIDDEN, "sold out");
    }

    const result = await Order.create([order], { session });
    newOrder = result[0];

    if (buyer && seller && cow) {
      if (buyer) {
        buyer.budget = buyer.budget - cow.price;
      }
      if (seller) {
        seller.income = seller.income + cow.price;
      }
    }
    buyer = await User.findByIdAndUpdate(
      { _id: order.buyer },
      {
        budget: buyer?.budget,
      }
    );
    seller = await User.findByIdAndUpdate(
      { _id: cow?.seller },
      {
        income: seller?.income,
      }
    );
    cow = await Cow.findByIdAndUpdate(
      { _id: order.cow },
      {
        label: "sold out",
      }
    );

    if (newOrder) {
      newOrder = await Order.findOne({ _id: newOrder._id })
        .populate("cow")
        .populate("buyer")
        .session(session);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newOrder;
};

const getOrders = async (userId: string): Promise<IOrder[] | null> => {
  const user = await User.findOne({ userId });

  let result = [];
  if (user?.role === "buyer") {
    const orders = await Order.find({ buyer: userId })
      .populate("cow")
      .populate("buyer");

    for (const order of orders) {
      result.push(order);
    }
  } else if (user?.role === "seller") {
    const sellerCows = await Cow.find({ seller: userId });
    for (const sellerCow of sellerCows) {
      const orders = await Order.find({ cow: sellerCow._id })
        .populate("cow")
        .populate("buyer");

      for (const order of orders) {
        result.push(order);
      }
    }
  } else {
    result = await Order.find().populate("cow").populate("buyer");
  }

  return result;
};

const getSingleOrder = async (
  orderId: string,
  user: any
): Promise<IOrder | null> => {
  let result = null;

  if (user?.role === "buyer") {
    result = await Order.findOne({ _id: orderId, buyer: user.userId })
      .populate("cow")
      .populate("buyer");
  } else if (user?.role === "seller") {
    const sellerCows = await Cow.find({ seller: user.userId });
    console.log(sellerCows, "seller cows");

    for (const sellerCow of sellerCows) {
      if (!result) {
        result = await Order.findOne({ _id: orderId, cow: sellerCow._id })
          .populate("cow")
          .populate("buyer");
      }
    }
  } else if (user.role === "admin") {
    result = await Order.findOne({ _id: orderId });
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found !");
  }
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
