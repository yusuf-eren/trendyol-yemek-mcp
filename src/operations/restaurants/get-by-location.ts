import { z } from 'zod';
import { buildUrl, trendyolRequest } from '../../common/api';
import { API_BASE_URL } from '../../common/constants';
import {
  FilterRestaurantsResponse,
  GetRestaurantsByLocationSchema,
  MutfakTypes,
} from '../../types/restaurants/get-by-location';

// Utility function to convert mutfak string values to numbers for API
function convertMutfakToNumbers(mutfakArray: string[]): number[] {
  return mutfakArray
    .map((mutfak) => {
      const entry = Object.entries(MutfakTypes).find(
        ([key, value]) => value === mutfak
      );
      return entry ? parseInt(entry[0], 10) : 0;
    })
    .sort((a, b) => b - a);
}

export async function getRestaurantsByLocation(
  params: z.infer<typeof GetRestaurantsByLocationSchema>
): Promise<FilterRestaurantsResponse> {
  const url = buildUrl(`${API_BASE_URL}/restaurants/filters`, {
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

  return trendyolRequest<FilterRestaurantsResponse>(url);
}
