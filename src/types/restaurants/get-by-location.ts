import { z } from 'zod';
import { BaseSearchOptions } from './base';

export interface RestaurantLocation {
  neighborhoodName: string;
  distance: number;
}

export interface MarketingDelphoi {
  tv040: string;
  tv076: string;
  tv108: string;
  tv152: string;
  tv153: string;
  tv246: string;
}

export interface Marketing {
  delphoi: MarketingDelphoi;
}

export interface Promotion {
  id: number;
  bannerUrl: string;
  productGroupTag: string;
  promotionName: string;
}

export interface DeliveryFee {
  // Add properties based on actual data structure
  [key: string]: any;
}

export interface StampInfo {
  name: string;
  icon: string;
  backgroundColor: string;
}

export interface Restaurant {
  id: number;
  supplierId: number;
  deeplink: string;
  name: string;
  kitchen: string;
  averageDeliveryInterval: string;
  minBasketPrice: number;
  rating: number;
  ratingText: string;
  ratingBackgroundColor: string;
  imageUrl: string;
  logoUrl: string;
  deliveryTypeImage: string;
  deliveryType: string;
  campaignText: string;
  workingHours: string;
  isClosed: boolean;
  closed: boolean;
  workingHoursInterval: string[];
  location: RestaurantLocation;
  tempClosed: boolean;
  winAsYouEatImageUrl: string;
  marketing: Marketing;
  sponsored: boolean;
  promotions: Promotion[];
  deliveryFees: DeliveryFee[];
  stampsInfos: StampInfo[];
}

export interface FilterRestaurantsResponse {
  restaurants: Restaurant[];
  links: {
    next: {
      href?: string;
    };
    prev: {
      href?: string;
    };
  };
  restaurantCount: number;
  filterCount: number;
}

export const MutfakTypes = {
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
} as const;

export enum SortTypeEnum {
  DEFAULT = 'DEFAULT',
  RESTAURANT_SCORE = 'RESTAURANT_SCORE',
  RESTAURANT_DISTANCE = 'RESTAURANT_DISTANCE',
  RESTAURANT_RATING_COUNT = 'RESTAURANT_RATING_COUNT',
  RESTAURANT_NAME = 'RESTAURANT_NAME',
}

export enum PaymentMethodEnum {
  ALL = 'ALL',
  ONLINE_CARD = 'ONLINE_CARD',
  MULTINET = 'MULTINET',
  SODEXO = 'SODEXO',
  EDENRED = 'EDENRED',
  SETCARD = 'SETCARD',
}

export const MutfakSchema = z.enum([
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
export const MutfakArraySchema = z.array(MutfakSchema);
export type MutfakArray = string[];

export const PaymentMethodSchema = z.nativeEnum(PaymentMethodEnum);
export const PaymentMethodArraySchema = z.array(PaymentMethodSchema);
export type PaymentMethodArray = PaymentMethodEnum[];

// Restaurant search by coordinates
export const GetRestaurantsByLocationOptions = BaseSearchOptions.extend({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  mutfak: MutfakArraySchema.optional().default([]),
  sortType: z
    .nativeEnum(SortTypeEnum)
    .optional()
    .describe(
      'This is the sort type. If you want to get all restaurants, do not set anything'
    ),
  averageRatingScore: z
    .enum(['4.5', '4.0'])
    .optional()
    .describe(
      'This is the average rating score. If you want to get all restaurants, do not set anything'
    ),
  paymentMethods: z
    .array(z.nativeEnum(PaymentMethodEnum))
    .optional()
    .default([])
    .describe(
      'This is the payment methods. If you want to get all restaurants, do not set anything'
    ),
  minBasketPrice: z
    .enum(['200', '300', '400'])
    .optional()
    .describe(
      'This is the minimum basket price. If you want to get all restaurants, do not set anything'
    ),
  averageDeliveryTime: z
    .enum(['20', '30', '40'])
    .optional()
    .describe(
      'This is the average delivery time. If you want to get all restaurants, do not set anything'
    ),
  closestRestaurantDistance: z
    .enum(['0.5', '1', '2'])
    .optional()
    .describe(
      'This is the closest restaurant distance. If you want to get all restaurants, do not set anything. 0.5 is 500 meters, 1 is 1 km, 2 is 2 km'
    ),
});

export const GetRestaurantsByLocationSchema = GetRestaurantsByLocationOptions;
