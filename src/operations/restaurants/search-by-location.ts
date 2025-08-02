import { z } from 'zod';
import { buildUrl, trendyolRequest } from '../../common/api';
import { API_BASE_URL } from '../../common/constants';
import {
  SearchRestaurantsByLocationResponse,
  SearchRestaurantsByLocationSchema,
} from '../../types/restaurants/search-by-location';

export async function searchRestaurantsByLocation(
  params: z.infer<typeof SearchRestaurantsByLocationSchema>
) {
  const url = buildUrl(`${API_BASE_URL}/restaurants/in/search`, {
    searchQuery: params.searchQuery,
    latitude: params.latitude,
    longitude: params.longitude,
    pageSize: params.pageSize,
  });

  return trendyolRequest<SearchRestaurantsByLocationResponse>(url);
}
