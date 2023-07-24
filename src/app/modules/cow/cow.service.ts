import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { ICow, ICowFilters } from "./cow.interface";
import httpStatus from "http-status";
import { Cow } from "./cow.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { cowSearchableFields } from "./cow.constant";

const createCow = async (cow: ICow): Promise<ICow | null> => {
  let newCowAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // transaction returns array not object
    // console.log("cow", cow);
    const newCow = await Cow.create([cow], { session });

    if (!newCow.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Cow");
    }

    newCowAllData = newCow[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newCowAllData) {
    newCowAllData = await Cow.findOne({ _id: newCowAllData._id }).populate({
      path: "seller",
    });
  }
  return newCowAllData;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;
  //console.log(searchTerm, filterData);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
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
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findOne({ _id: id });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }
  return result;
};

const updateCow = async (
  id: string,
  userId: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id, seller: userId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCow = async (id: string, userId: string): Promise<ICow | null> => {
  const result = await Cow.findOneAndDelete({ _id: id, seller: userId });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }

  return result;
};

export const CowService = {
  createCow,
  updateCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
