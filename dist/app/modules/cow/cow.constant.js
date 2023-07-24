"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFilterableFields = exports.cowSearchableFields = exports.cowCategory = exports.cowLocation = exports.cowBreed = exports.cowLabel = void 0;
exports.cowLabel = ["for sale", "sold"];
exports.cowBreed = [
    "Brahman",
    "Nellore",
    "Sahiwal",
    "Gir",
    "Indigenous",
    "Tharparkar",
    "Kankrej",
];
exports.cowLocation = [
    "Dhaka",
    "Chattogram",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Comilla",
    "Rangpur",
    "Mymensingh",
];
exports.cowCategory = ["Dairy", "Beef", "Dual Purpose"];
exports.cowSearchableFields = ["location", "breed", "category"];
exports.cowFilterableFields = [
    "searchTerm",
    "location",
    "breed",
    "category",
    "minPrice",
    "maxPrice",
];
