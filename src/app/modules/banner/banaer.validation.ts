import { z } from 'zod';

const createBannerZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
  }),
});

const updateBannerZodSchema = z.object({
  title: z.string().optional(),
  image: z.string().optional(),
});

export const BannerValidation = {
  createBannerZodSchema,
  updateBannerZodSchema,
};
