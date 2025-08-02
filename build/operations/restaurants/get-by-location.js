"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByLocation = getRestaurantsByLocation;
const api_1 = require("../../common/api");
const constants_1 = require("../../common/constants");
const get_by_location_1 = require("../../types/restaurants/get-by-location");
// Utility function to convert mutfak string values to numbers for API
function convertMutfakToNumbers(mutfakArray) {
    return mutfakArray
        .map((mutfak) => {
        const entry = Object.entries(get_by_location_1.MutfakTypes).find(([key, value]) => value === mutfak);
        return entry ? parseInt(entry[0], 10) : 0;
    })
        .sort((a, b) => b - a);
}
async function getRestaurantsByLocation(params) {
    const url = (0, api_1.buildUrl)(`${constants_1.API_BASE_URL}/restaurants/filters`, {
        latitude: params.latitude,
        longitude: params.longitude,
        pageSize: params.pageSize,
        page: params.page,
        sortType: params.sortType,
        mutfak: convertMutfakToNumbers(params.mutfak).join(','),
        paymentMethods: params.paymentMethods.join(','),
        averageRatingScore: params.averageRatingScore,
        minBasketPrice: params.minBasketPrice,
        averageDeliveryTime: params.averageDeliveryTime,
        closestRestaurantDistance: params.closestRestaurantDistance,
    });
    return (0, api_1.trendyolRequest)(url);
}
