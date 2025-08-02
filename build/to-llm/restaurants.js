"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredRestaurantToLLMString = filteredRestaurantToLLMString;
exports.searchedRestaurantToLLMString = searchedRestaurantToLLMString;
exports.restaurantProductsToLLMString = restaurantProductsToLLMString;
exports.scrapedProductsToLLMString = scrapedProductsToLLMString;
function filteredRestaurantToLLMString(r, index) {
    const status = r.isClosed ? 'Currently closed' : 'Open now';
    const promoText = r.promotions?.map((p) => `- ${p.promotionName}`).join('\n') ||
        'No promotions';
    const stamps = r.stampsInfos?.map((s) => s.name).join(', ') || 'None';
    return `
  Restaurant ${index + 1}: ${r.name}
  ID: ${r.id}
  Cuisines: ${r.kitchen}
  Location: ${r.location.neighborhoodName} (${r.location.distance} km away)
  Rating: ${r.rating} ${r.ratingText}
  Delivery: ${r.averageDeliveryInterval}, Min. basket ₺${r.minBasketPrice}
  Status: ${status}
  Campaign: ${r.campaignText || 'None'}
  Promotions:
  ${promoText}
  Loyalty Programs: ${stamps}
  `.trim();
}
function searchedRestaurantToLLMString(r, index) {
    const status = r.closed ? 'Currently closed' : 'Open now';
    const promoText = r.promotions?.map((p) => `- ${p.promotionName}`).join('\n') ||
        'No promotions';
    const deliveryFeesText = r.deliveryFees?.length
        ? r.deliveryFees
            .map((fee) => `Min: ₺${fee.minBasketPrice}, Max: ₺${fee.maxBasketPrice}, Shipping: ₺${fee.shippingPrice}`)
            .join(' | ')
        : 'No delivery fee info';
    return `
Restaurant ${index + 1}: ${r.name}
ID: ${r.id}
Cuisines: ${r.kitchen}
Location: ${r.location.neighborhoodName} (${r.location.distance} km away)
Rating: ${r.rating} ${r.ratingText}
Delivery: ${r.averageDeliveryInterval}, Min. basket ₺${r.minBasketPrice}
Status: ${status}
Working Hours: ${r.workingHours}
Campaign: ${r.campaignText || 'None'}
Closed: ${r.closed ? 'Yes' : 'No'}
Promotions:
${promoText}
Delivery Fees: ${deliveryFeesText}
Sponsored: ${r.sponsored ? 'Yes' : 'No'}
`.trim();
}
function restaurantProductsToLLMString(products) {
    return `
  ${products.map((p) => `${p.categoryName}: ${p.productCount}`).join('\n')}
  `.trim();
}
function scrapedProductsToLLMString(category) {
    const productsText = category.products
        .map((p, i) => `
Product ${i + 1}: ${p.title}
Description: ${p.description}
Price: ${p.price}
Discounted Price: ${p.discountedPrice || 'None'}
Image: ${p.image}`)
        .join('\n\n');
    return `
Category: ${category.categoryName} (${category.productCount})
${productsText}
  `.trim();
}
