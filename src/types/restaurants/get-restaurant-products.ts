import z from 'zod';

export interface ScrapedProduct {
  title: string;
  description: string;
  price: string;
  discountedPrice: string;
  image: string;
}

export interface ScrapedCategory {
  categoryName: string;
  productCount: string;
  products: ScrapedProduct[];
}

// export type ScrapeRestaurantProductsResponse =z ScrapedCategory[];
export type GetRestaurantProductsResponse = ScrapedCategory[];

export const GetRestaurantProductsSchema = z.object({
  restaurantId: z.string().describe('The restaurant id'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
