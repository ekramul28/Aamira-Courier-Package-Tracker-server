import { z } from 'zod';

export const createTrackingValidationSchema = z.object({
  body: z.object({
    packageId: z.string(),
    status: z.string(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    timestamp: z.string(),
    eta: z.string().optional(),
    note: z.string().optional(),
  }),
});
