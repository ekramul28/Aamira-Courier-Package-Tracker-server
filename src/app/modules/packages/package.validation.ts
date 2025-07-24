import { z } from 'zod';
import { PackageStatus } from './package.interface';

export const createPackageValidationSchema = z.object({
  body: z.object({
    packageId: z.string(),
    status: z.enum([
      'CREATED',
      'PICKED_UP',
      'IN_TRANSIT',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'EXCEPTION',
      'CANCELLED',
    ] as [PackageStatus, ...PackageStatus[]]),
    lat: z.number().optional(),
    lon: z.number().optional(),
    eventTimestamp: z.string(),
    receivedAt: z.string(),
    note: z.string().optional(),
    eta: z.string().optional(),
  }),
});

export const updatePackageValidationSchema = z.object({
  body: z.object({
    status: z
      .enum([
        'CREATED',
        'PICKED_UP',
        'IN_TRANSIT',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'EXCEPTION',
        'CANCELLED',
      ] as [PackageStatus, ...PackageStatus[]])
      .optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    eventTimestamp: z.string().optional(),
    receivedAt: z.string().optional(),
    note: z.string().optional(),
    eta: z.string().optional(),
  }),
});
