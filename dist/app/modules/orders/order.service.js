"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const users_model_1 = require("../users/users.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(seller, buyer, cow);
    //let result = await Order.create(order);
    let newOrder = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let buyer = yield users_model_1.User.findById(order.buyer);
        let cow = yield cow_model_1.Cow.findById(order.cow);
        let seller = yield users_model_1.User.findById(cow === null || cow === void 0 ? void 0 : cow.seller);
        if ((buyer === null || buyer === void 0 ? void 0 : buyer.budget) < (cow === null || cow === void 0 ? void 0 : cow.price)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "not enough budget");
        }
        if ((cow === null || cow === void 0 ? void 0 : cow.label) === "sold out") {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "sold out");
        }
        const result = yield order_model_1.Order.create([order], { session });
        newOrder = result[0];
        if (buyer && seller && cow) {
            if (buyer) {
                buyer.budget = buyer.budget - cow.price;
            }
            if (seller) {
                seller.income = seller.income + cow.price;
            }
        }
        buyer = yield users_model_1.User.findByIdAndUpdate({ _id: order.buyer }, {
            budget: buyer === null || buyer === void 0 ? void 0 : buyer.budget,
        });
        seller = yield users_model_1.User.findByIdAndUpdate({ _id: cow === null || cow === void 0 ? void 0 : cow.seller }, {
            income: seller === null || seller === void 0 ? void 0 : seller.income,
        });
        cow = yield cow_model_1.Cow.findByIdAndUpdate({ _id: order.cow }, {
            label: "sold out",
        });
        if (newOrder) {
            newOrder = yield order_model_1.Order.findOne({ _id: newOrder._id })
                .populate("cow")
                .populate("buyer")
                .session(session);
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newOrder;
});
const getOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ userId });
    let result = [];
    if ((user === null || user === void 0 ? void 0 : user.role) === "buyer") {
        const orders = yield order_model_1.Order.find({ buyer: userId })
            .populate("cow")
            .populate("buyer");
        for (const order of orders) {
            result.push(order);
        }
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === "seller") {
        const sellerCows = yield cow_model_1.Cow.find({ seller: userId });
        for (const sellerCow of sellerCows) {
            const orders = yield order_model_1.Order.find({ cow: sellerCow._id })
                .populate("cow")
                .populate("buyer");
            for (const order of orders) {
                result.push(order);
            }
        }
    }
    else {
        result = yield order_model_1.Order.find().populate("cow").populate("buyer");
    }
    return result;
});
exports.OrderService = {
    createOrder,
    getOrders,
};
