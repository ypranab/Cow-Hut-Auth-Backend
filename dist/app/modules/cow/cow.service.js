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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const cow_model_1 = require("./cow.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_constant_1 = require("./cow.constant");
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    let newCowAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // transaction returns array not object
        // console.log("cow", cow);
        const newCow = yield cow_model_1.Cow.create([cow], { session });
        if (!newCow.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Cow");
        }
        newCowAllData = newCow[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newCowAllData) {
        newCowAllData = yield cow_model_1.Cow.findOne({ _id: newCowAllData._id }).populate({
            path: "seller",
        });
    }
    return newCowAllData;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    //console.log(searchTerm, filterData);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (minPrice && maxPrice) {
        andConditions.push({
            price: {
                $gte: minPrice,
                $lte: maxPrice,
            },
        });
    }
    //const result = await Cow.find({});
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOne({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    return result;
});
const updateCow = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.Cow.findOne({ _id: id, seller: userId });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCow = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOneAndDelete({ _id: id, seller: userId });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    return result;
});
exports.CowService = {
    createCow,
    updateCow,
    getAllCows,
    getSingleCow,
    deleteCow,
};
