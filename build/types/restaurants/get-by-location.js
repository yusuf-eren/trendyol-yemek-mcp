"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRestaurantsByLocationSchema = exports.GetRestaurantsByLocationOptions = exports.PaymentMethodArraySchema = exports.PaymentMethodSchema = exports.MutfakArraySchema = exports.MutfakSchema = exports.PaymentMethodEnum = exports.SortTypeEnum = exports.MutfakTypes = void 0;
const zod_1 = require("zod");
const base_1 = require("./base");
exports.MutfakTypes = {
    1: 'Burger',
    2: 'Doner',
    3: 'Kofte',
    4: 'Steak',
    5: 'Tavuk',
    6: 'Kebap',
    7: 'Pizza',
    8: 'Tatli',
    9: 'MantiMakarna',
    10: 'SalataSaglik',
    11: 'Dondurma',
    12: 'Kahvalti',
    13: 'EvYemekleri',
    14: 'PideLahmacun',
    15: 'PastaneFirin',
    16: 'KahveIcecek',
    17: 'TostSandvic',
    18: 'SokakLezzetleri',
    20: 'UzakDogu',
    21: 'DunyaCafe',
    23: 'Borek',
    24: 'CigKofte',
    25: 'Meze',
    26: 'Corba',
    27: 'Tantuni',
};
var SortTypeEnum;
(function (SortTypeEnum) {
    SortTypeEnum["DEFAULT"] = "DEFAULT";
    SortTypeEnum["RESTAURANT_SCORE"] = "RESTAURANT_SCORE";
    SortTypeEnum["RESTAURANT_DISTANCE"] = "RESTAURANT_DISTANCE";
    SortTypeEnum["RESTAURANT_RATING_COUNT"] = "RESTAURANT_RATING_COUNT";
    SortTypeEnum["RESTAURANT_NAME"] = "RESTAURANT_NAME";
})(SortTypeEnum || (exports.SortTypeEnum = SortTypeEnum = {}));
var PaymentMethodEnum;
(function (PaymentMethodEnum) {
    PaymentMethodEnum["ALL"] = "ALL";
    PaymentMethodEnum["ONLINE_CARD"] = "ONLINE_CARD";
    PaymentMethodEnum["MULTINET"] = "MULTINET";
    PaymentMethodEnum["SODEXO"] = "SODEXO";
    PaymentMethodEnum["EDENRED"] = "EDENRED";
    PaymentMethodEnum["SETCARD"] = "SETCARD";
})(PaymentMethodEnum || (exports.PaymentMethodEnum = PaymentMethodEnum = {}));
exports.MutfakSchema = zod_1.z.enum([
    'Burger',
    'Doner',
    'Kofte',
    'Steak',
    'Tavuk',
    'Kebap',
    'Pizza',
    'Tatli',
    'MantiMakarna',
    'SalataSaglik',
    'Dondurma',
    'Kahvalti',
    'EvYemekleri',
    'PideLahmacun',
    'PastaneFirin',
    'KahveIcecek',
    'TostSandvic',
    'SokakLezzetleri',
    'UzakDogu',
    'DunyaCafe',
    'Borek',
    'CigKofte',
    'Meze',
    'Corba',
    'Tantuni',
]);
exports.MutfakArraySchema = zod_1.z.array(exports.MutfakSchema);
exports.PaymentMethodSchema = zod_1.z.nativeEnum(PaymentMethodEnum);
exports.PaymentMethodArraySchema = zod_1.z.array(exports.PaymentMethodSchema);
// Restaurant search by coordinates
exports.GetRestaurantsByLocationOptions = base_1.BaseSearchOptions.extend({
    latitude: zod_1.z.number().min(-90).max(90),
    longitude: zod_1.z.number().min(-180).max(180),
    mutfak: exports.MutfakArraySchema.optional().default([]),
    sortType: zod_1.z
        .nativeEnum(SortTypeEnum)
        .optional()
        .describe('This is the sort type. If you want to get all restaurants, do not set anything'),
    averageRatingScore: zod_1.z
        .enum(['4.5', '4.0'])
        .optional()
        .describe('This is the average rating score. If you want to get all restaurants, do not set anything'),
    paymentMethods: zod_1.z
        .array(zod_1.z.nativeEnum(PaymentMethodEnum))
        .optional()
        .default([])
        .describe('This is the payment methods. If you want to get all restaurants, do not set anything'),
    minBasketPrice: zod_1.z
        .enum(['200', '300', '400'])
        .optional()
        .describe('This is the minimum basket price. If you want to get all restaurants, do not set anything'),
    averageDeliveryTime: zod_1.z
        .enum(['20', '30', '40'])
        .optional()
        .describe('This is the average delivery time. If you want to get all restaurants, do not set anything'),
    closestRestaurantDistance: zod_1.z
        .enum(['0.5', '1', '2'])
        .optional()
        .describe('This is the closest restaurant distance. If you want to get all restaurants, do not set anything. 0.5 is 500 meters, 1 is 1 km, 2 is 2 km'),
});
exports.GetRestaurantsByLocationSchema = exports.GetRestaurantsByLocationOptions;
