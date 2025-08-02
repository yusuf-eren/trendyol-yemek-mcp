"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRestaurantsByLocationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const base_1 = require("./base");
exports.SearchRestaurantsByLocationSchema = base_1.BaseSearchOptions.extend({
    latitude: zod_1.default.number().min(-90).max(90),
    longitude: zod_1.default.number().min(-180).max(180),
    searchQuery: zod_1.default.string().describe('The search query'),
});
