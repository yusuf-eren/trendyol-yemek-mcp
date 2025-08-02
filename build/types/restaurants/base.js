"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSearchOptions = void 0;
const zod_1 = require("zod");
exports.BaseSearchOptions = zod_1.z.object({
    pageSize: zod_1.z.number().min(1).max(50).optional().default(20),
    page: zod_1.z
        .number()
        .min(1)
        .optional()
        .default(1)
        .describe('Page number. if not necessary do not set anything other than 1'),
});
