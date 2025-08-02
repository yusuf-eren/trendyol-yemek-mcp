"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRestaurantsByLocation = searchRestaurantsByLocation;
const api_1 = require("../../common/api");
const constants_1 = require("../../common/constants");
async function searchRestaurantsByLocation(params) {
    const url = (0, api_1.buildUrl)(`${constants_1.API_RESTAURANT_URL}/restaurants/in/search`, {
        searchQuery: params.searchQuery,
        latitude: params.latitude,
        longitude: params.longitude,
        pageSize: params.pageSize,
    });
    return (0, api_1.trendyolRequest)(url);
}
