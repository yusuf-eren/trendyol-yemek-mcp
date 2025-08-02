"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const puppeteer_1 = __importDefault(require("puppeteer"));
(async () => {
    const browser = await puppeteer_1.default.launch({ headless: false });
    await browser.setCookie({
        name: 'tgo-lang',
        value: 'tr',
        domain: 'tgoyemek.com',
    });
    await browser.setCookie({
        name: 'tgo-pid',
        value: (0, uuid_1.v4)(),
        domain: 'tgoyemek.com',
    });
    await browser.setCookie({
        name: 'tgo-sid',
        value: (0, uuid_1.v4)(),
        domain: 'tgoyemek.com',
    });
    await browser.setCookie({
        name: 'tgo-address',
        value: encodeURIComponent(JSON.stringify({
            addressName: 'İstanbul',
            latitude: '41.105222',
            longitude: '28.789203',
        })),
        domain: 'tgoyemek.com',
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    const restoranId = '191437';
    const restaurantDetailUrl = `https://tgoyemek.com/restoranlar/${restoranId}`;
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
            if (!productCount)
                return null;
            const products = Array.from(section.querySelectorAll('div[role="button"]')).map((productEl) => {
                const title = productEl.querySelector('h6')?.textContent?.trim() || '';
                const description = productEl.querySelector('p')?.textContent?.trim() || '';
                const price = productEl
                    .querySelector('span.title-3-semibold')
                    ?.textContent?.trim() || '';
                const discountedPriceEl = Array.from(productEl.querySelectorAll('span')).find((el) => el.classList.contains('bg-[#E4F9FB]'));
                const discountedPrice = discountedPriceEl?.textContent?.trim() || '';
                const image = productEl.querySelector('img')?.src || '';
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
    console.log(JSON.stringify([data[0]], null, 2));
    await browser.close();
})();
