import { z } from 'zod';

export const createEventValidationSchema = z.object({
  body: z.object({
    packageId: z.string(),
    type: z.string(),
    status: z.string(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    eventTimestamp: z.string(),
    receivedAt: z.string(),
    note: z.string().optional(),
    eta: z.string().optional(),
  }),
});
