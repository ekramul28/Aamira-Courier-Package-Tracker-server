import { z } from 'zod';
import { PackageStatus } from './package.interface';

export const createPackageValidationSchema = z.object({
  body: z.object({
    packageId: z.string().optional(),
    orderer_name: z.string().min(1, 'Orderer name is required'),
    home_address: z.string().min(1, 'Home address is required'),
    phone_number: z.string().min(1, 'Phone number is required'),
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
    orderer_name: z.string().min(1, 'Orderer name is required').optional(),
    home_address: z.string().min(1, 'Home address is required').optional(),
    phone_number: z.string().min(1, 'Phone number is required').optional(),
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
