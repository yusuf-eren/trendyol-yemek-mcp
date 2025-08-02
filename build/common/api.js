"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUrl = buildUrl;
exports.trendyolRequest = trendyolRequest;
const axios_1 = __importDefault(require("axios"));
const USER_AGENT = 'trendyol-yemek-mcp/1.0.0';
function buildUrl(baseUrl, params) {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
        }
    });
    return url.toString();
}
async function trendyolRequest(url, options = {}) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
        ...options.headers,
    };
    // TODO: Add authorization. currently it's not working.
    if (process.env.TRENDYOL_API_KEY) {
        headers['Authorization'] = `Bearer ${process.env.TRENDYOL_API_KEY}`;
    }
    const config = {
        method: options.method || 'GET',
        headers,
        data: options.body ? JSON.stringify(options.body) : undefined,
    };
    try {
        const response = await (0, axios_1.default)(url, config);
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const status = error.response?.status || 0;
            const responseBody = error.response?.data;
            throw new Error(`API request failed with status ${status}. Body: ${responseBody}`);
        }
        throw error;
    }
}
