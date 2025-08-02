import z from 'zod';
import { BaseSearchOptions } from './base';

export interface SearchRestaurantsByLocationResponse {
  restaurants: RestaurantSearchResult[];
  restaurantCount: number;
}

export interface RestaurantSearchResult {
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
  products: any[]; // can replace with specific type if needed
  workingHours: string;
  deliveryType: string;
  tyGoImageUrl: string;
  workingHoursInterval: string[];
  location: {
    neighborhoodName: string;
    distance: number;
  };
  locationId: number;
  closed: boolean;
  campaignText?: string;
  promotions?: {
    id: number;
    bannerUrl: string;
    productGroupTag: string;
    promotionName: string;
  }[];
  tempClosed: boolean;
  winAsYouEatImageUrl?: string;
  marketing?: {
    delphoi: Record<string, string>;
  };
  sponsored: boolean;
  deliveryFees: {
    maxBasketPrice: number;
    minBasketPrice: number;
    shippingPrice: number;
  }[];
}

export const SearchRestaurantsByLocationSchema = BaseSearchOptions.extend({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  searchQuery: z.string().describe('The search query'),
});
