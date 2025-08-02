import { z } from 'zod';

export const BaseSearchOptions = z.object({
  pageSize: z.number().min(1).max(50).optional().default(20),
  page: z
    .number()
    .min(1)
    .optional()
    .default(1)
    .describe('Page number. if not necessary do not set anything other than 1'),
});
