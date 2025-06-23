import { z } from 'zod';

const createPaymentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
  }),
});

const updatePaymentZodSchema = z.object({
  title: z.string().optional(),
  image: z.string().optional(),
});

export const PaymentValidation = {
  createPaymentZodSchema,
  updatePaymentZodSchema,
};
