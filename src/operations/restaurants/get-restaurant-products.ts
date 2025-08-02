import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import {
  GetRestaurantProductsSchema,
  GetRestaurantProductsResponse,
} from '../../types/restaurants/get-restaurant-products';

export async function getRestaurantProducts(
  params: z.infer<typeof GetRestaurantProductsSchema>
): Promise<GetRestaurantProductsResponse> {
  const browser = await puppeteer.launch({ headless: true });
  await browser.setCookie({
    name: 'tgo-lang',
    value: 'tr',
    domain: 'tgoyemek.com',
  });
  await browser.setCookie({
    name: 'tgo-pid',
    value: uuidv4(),
    domain: 'tgoyemek.com',
  });
  await browser.setCookie({
    name: 'tgo-sid',
    value: uuidv4(),
    domain: 'tgoyemek.com',
  });
  await browser.setCookie({
    name: 'tgo-address',
    value: encodeURIComponent(
      JSON.stringify({
        addressName: 'İstanbul',
        latitude: params.latitude,
        longitude: params.longitude,
      })
    ),
    domain: 'tgoyemek.com',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  const restaurantDetailUrl = `https://tgoyemek.com/restoranlar/${params.restaurantId}`;
  await page.goto(restaurantDetailUrl, { waitUntil: 'networkidle0' });

  const url = await page.url();
  console.log('URL:', url);
  if (new URL(url).pathname !== new URL(restaurantDetailUrl).pathname) {
    throw new Error("Couldn't navigate to the restaurant detail page");
  }

  // Wait for product sections to load
  await page.waitForSelector('section');

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));

    return sections
      .map((section) => {
        const categoryNameEl = section.querySelector('h3');
        const productCountEl = section.querySelector('span');

        const categoryName = categoryNameEl?.textContent?.trim() || '';
        const productCountText = productCountEl?.textContent?.trim() || '';

        // Extract number from "(6 Ürün)" -> 6
        const match = productCountText.match(/\((\d+)\s*Ürün\)/);
        const productCount = match ? parseInt(match[1], 10) : null;

        // If no valid product count, skip this section
        if (!productCount) return null;

        const products = Array.from(
          section.querySelectorAll('div[role="button"]')
        ).map((productEl) => {
          const title =
            productEl.querySelector('h6')?.textContent?.trim() || '';
          const description =
            productEl.querySelector('p')?.textContent?.trim() || '';
          const price =
            productEl
              .querySelector('span.title-3-semibold')
              ?.textContent?.trim() || '';

          const discountedPriceEl = Array.from(
            productEl.querySelectorAll('span')
          ).find((el) => el.classList.contains('bg-[#E4F9FB]'));
          const discountedPrice = discountedPriceEl?.textContent?.trim() || '';

          const image =
            (productEl.querySelector('img') as HTMLImageElement)?.src || '';

          return {
            title,
            description,
            price,
            discountedPrice,
            image,
          };
        });

        return {
          categoryName,
          productCount: `${productCount} Ürün`,
          products,
        };
      })
      .filter(Boolean);
  });

  await browser.close();

  return data as GetRestaurantProductsResponse;
}
