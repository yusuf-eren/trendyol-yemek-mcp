import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getRestaurantsByLocation } from './operations/restaurants/get-by-location';
import {
  filteredRestaurantToLLMString,
  scrapedProductsToLLMString,
  searchedRestaurantToLLMString,
} from './to-llm/restaurants';
import { GetRestaurantsByLocationSchema } from './types/restaurants/get-by-location';
import { SearchRestaurantsByLocationSchema } from './types/restaurants/search-by-location';
import { searchRestaurantsByLocation } from './operations/restaurants/search-by-location';
import { GetRestaurantProductsSchema } from './types/restaurants/get-restaurant-products';
import { getRestaurantProducts } from './operations/restaurants/get-restaurant-products';

const server = new McpServer({
  name: 'trendyol-yemek-mcp',
  version: '1.0.0',
  title: 'Trendyol Yemek MCP',
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'getRestaurantsByLocation',
  'get restaurants by location',
  GetRestaurantsByLocationSchema.shape,
  async (args) => {
    try {
      const validatedParams = GetRestaurantsByLocationSchema.parse(args);
      const result = await getRestaurantsByLocation(validatedParams);
      return {
        content: [
          {
            type: 'text',
            text: result.restaurants
              .map(filteredRestaurantToLLMString)
              .join('\n\n'),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
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
  }
);

server.tool(
  'searchRestaurantsByLocation',
  'search restaurants by location',
  SearchRestaurantsByLocationSchema.shape,
  async (args) => {
    try {
      const validatedParams = SearchRestaurantsByLocationSchema.parse(args);
      const result = await searchRestaurantsByLocation(validatedParams);
      return {
        content: [
          {
            type: 'text',
            text: result.restaurants
              .map(searchedRestaurantToLLMString)
              .join('\n\n'),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
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
  }
);

server.tool(
  'getRestaurantProducts',
  'get restaurant products',
  GetRestaurantProductsSchema.shape,
  async (args) => {
    try {
      const validatedParams = GetRestaurantProductsSchema.parse(args);
      const result = await getRestaurantProducts(validatedParams);
      return {
        content: [
          {
            type: 'text',
            text: result.map(scrapedProductsToLLMString).join('\n\n'),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Trendyol Yemek MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
