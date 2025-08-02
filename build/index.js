#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const get_by_location_1 = require("./operations/restaurants/get-by-location");
const restaurants_1 = require("./to-llm/restaurants");
const get_by_location_2 = require("./types/restaurants/get-by-location");
const search_by_location_1 = require("./types/restaurants/search-by-location");
const search_by_location_2 = require("./operations/restaurants/search-by-location");
const get_restaurant_products_1 = require("./types/restaurants/get-restaurant-products");
const get_restaurant_products_2 = require("./operations/restaurants/get-restaurant-products");
const server = new mcp_js_1.McpServer({
    name: 'trendyol-yemek-mcp',
    version: '1.0.0',
    title: 'Trendyol Yemek MCP',
    capabilities: {
        resources: {},
        tools: {},
    },
});
server.tool('getRestaurantsByLocation', 'get restaurants by location', get_by_location_2.GetRestaurantsByLocationSchema.shape, async (args) => {
    try {
        const validatedParams = get_by_location_2.GetRestaurantsByLocationSchema.parse(args);
        const result = await (0, get_by_location_1.getRestaurantsByLocation)(validatedParams);
        return {
            content: [
                {
                    type: 'text',
                    text: result.restaurants
                        .map(restaurants_1.filteredRestaurantToLLMString)
                        .join('\n\n'),
                },
            ],
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${errorMessage}`,
                },
            ],
            isError: true,
        };
    }
});
server.tool('searchRestaurantsByLocation', 'search restaurants by location', search_by_location_1.SearchRestaurantsByLocationSchema.shape, async (args) => {
    try {
        const validatedParams = search_by_location_1.SearchRestaurantsByLocationSchema.parse(args);
        const result = await (0, search_by_location_2.searchRestaurantsByLocation)(validatedParams);
        return {
            content: [
                {
                    type: 'text',
                    text: result.restaurants
                        .map(restaurants_1.searchedRestaurantToLLMString)
                        .join('\n\n'),
                },
            ],
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${errorMessage}`,
                },
            ],
            isError: true,
        };
    }
});
server.tool('getRestaurantProducts', 'get restaurant products', get_restaurant_products_1.GetRestaurantProductsSchema.shape, async (args) => {
    try {
        const validatedParams = get_restaurant_products_1.GetRestaurantProductsSchema.parse(args);
        const result = await (0, get_restaurant_products_2.getRestaurantProducts)(validatedParams);
        return {
            content: [
                {
                    type: 'text',
                    text: result.map(restaurants_1.scrapedProductsToLLMString).join('\n\n'),
                },
            ],
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${errorMessage}`,
                },
            ],
        };
    }
});
async function runServer() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error('Trendyol Yemek MCP Server running on stdio');
}
runServer().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
