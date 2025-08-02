# Trendyol Yemek MCP

A Model Context Protocol (MCP) server that provides access to Trendyol Yemek's restaurant and menu data. This MCP allows AI assistants to search for restaurants, filter by various criteria, and retrieve detailed menu information from Turkey's popular food delivery platform.

## Features

- **Restaurant Discovery**: Find restaurants by location with advanced filtering
- **Restaurant Search**: Search restaurants by name within specific areas
- **Menu Scraping**: Retrieve complete menus with prices, descriptions, and images
- **Comprehensive Filtering**: Filter by cuisine type, rating, delivery time, payment methods, and more
- **Turkish Market Focus**: Optimized for Turkish food delivery market with local cuisine categories

## Current Operations

### 1. `getRestaurantsByLocation`
Retrieves restaurants filtered by location and various criteria.

**Parameters:**
- `latitude` & `longitude` (required): Geographic coordinates
- `pageSize` & `page`: Pagination controls
- `mutfak` (optional): Array of cuisine types (see supported cuisines below)
- `sortType` (optional): Sorting options
  - `DEFAULT`: Default sorting
  - `RESTAURANT_SCORE`: Sort by restaurant score
  - `RESTAURANT_DISTANCE`: Sort by distance
  - `RESTAURANT_RATING_COUNT`: Sort by rating count
  - `RESTAURANT_NAME`: Sort alphabetically
- `averageRatingScore` (optional): Filter by rating ('4.5', '4.0')
- `paymentMethods` (optional): Payment method filters
  - `ONLINE_CARD`, `MULTINET`, `SODEXO`, `EDENRED`, `SETCARD`
- `minBasketPrice` (optional): Minimum order amount ('200', '300', '400' TL)
- `averageDeliveryTime` (optional): Delivery time filters ('20', '30', '40' minutes)
- `closestRestaurantDistance` (optional): Distance filters ('0.5', '1', '2' km)

**Returns:** List of restaurants with details including name, rating, delivery time, minimum order, and more.

### 2. `searchRestaurantsByLocation`
Searches for restaurants by name/query within a specific location.

**Parameters:**
- `latitude` & `longitude` (required): Geographic coordinates
- `searchQuery` (required): Text to search for restaurant names
- `pageSize` & `page`: Pagination controls

**Returns:** Matching restaurants with search results.

### 3. `getRestaurantProducts`
Scrapes the complete menu and products from a specific restaurant.

**Parameters:**
- `restaurantId` (required): Numeric ID of the restaurant
- `latitude` & `longitude` (required): Geographic coordinates (for location context)

**Returns:** Complete menu organized by categories, including:
- Product names, descriptions, and prices
- Discounted prices (if available)
- Product images
- Category names and product counts

## Supported Cuisine Types

The system supports 25 different cuisine categories:

### Turkish Specialties
- `Kebap` - Traditional Turkish kebabs
- `PideLahmacun` - Turkish flatbreads
- `MantiMakarna` - Dumplings and pasta
- `EvYemekleri` - Home-style Turkish dishes
- `Borek` - Turkish pastries
- `CigKofte` - Raw meatballs
- `Meze` - Turkish appetizers
- `Corba` - Soups
- `Tantuni` - Turkish wraps

### International Cuisines
- `Burger` - Burgers
- `Pizza` - Pizza
- `UzakDogu` - Far Eastern cuisine
- `DunyaCafe` - World cuisine
- `Steak` - Steak houses

### Meat & Protein
- `Doner` - Doner kebab
- `Kofte` - Meatballs
- `Tavuk` - Chicken dishes

### Beverages & Desserts
- `KahveIcecek` - Coffee and beverages
- `Tatli` - Desserts
- `Dondurma` - Ice cream

### Other Categories
- `SalataSaglik` - Salads and healthy food
- `Kahvalti` - Breakfast
- `TostSandvic` - Toasts and sandwiches
- `SokakLezzetleri` - Street food
- `PastaneFirin` - Bakeries

## Technical Implementation

- **API Integration**: Uses Trendyol's internal APIs (`api.tgoapis.com`)
- **Web Scraping**: Puppeteer-based scraping for dynamic menu content
- **Data Validation**: Comprehensive Zod schemas for type safety
- **Error Handling**: Proper error responses with meaningful messages
- **Localization**: Supports Turkish language and currency (TL)
- **Headless Browser**: Automated menu scraping with proper cookie management

## Installation & Usage

### For End Users (Using Published Package)

If you want to use this MCP server with an AI assistant that supports MCP:

#### Option 1: Using npx (Recommended for one-time use)
```bash
# Run directly without installing globally
npx trendyol-yemek-mcp
```

#### Option 2: Global Installation
```bash
# Install the published package globally
npm install -g trendyol-yemek-mcp

# Run the MCP server
trendyol-yemek-mcp
```

**Note:** The package is available on npm as `trendyol-yemek-mcp`. Using `npx` is recommended for testing or one-time usage as it doesn't require global installation.

### For Developers (Local Development)

```bash
# Clone the repository
git clone <repository-url>
cd trendyol-yemek-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run the MCP server
npm start
```

### MCP Client Configuration

To use this MCP server with an MCP client (like Claude Desktop, etc.), add it to your MCP configuration:

```json
{
  "mcpServers": {
    "trendyol-yemek": {
      "command": "trendyol-yemek-mcp",
      "args": []
    }
  }
}
```

## Dependencies

- `@modelcontextprotocol/sdk`: MCP server implementation
- `axios`: HTTP client for API requests
- `puppeteer`: Web scraping for restaurant menus
- `cheerio`: HTML parsing
- `zod`: Schema validation
- `uuid`: Unique identifier generation

## API Endpoints

The MCP server integrates with Trendyol's internal APIs:
- Base API: `https://api.tgoapis.com/web-discovery-apidiscovery-santral`
- Restaurant API: `https://api.tgoapis.com/web-restaurant-apirestaurant-santral`

## Development Status

This project is currently in development. The core functionality is implemented and functional, but additional features and improvements are planned.

## License

ISC License
