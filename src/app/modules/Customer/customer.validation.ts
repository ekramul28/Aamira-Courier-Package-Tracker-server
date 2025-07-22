import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const createCustomerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    customer: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
    }),
  }),
});

export const CustomerValidations = {
  createCustomerValidationSchema,
};
