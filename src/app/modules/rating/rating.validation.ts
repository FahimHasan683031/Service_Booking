import { z } from 'zod';

export const createRatingZodSchema = z.object({
  body: z.object({
    service: z.string({ required_error: 'Service ID is required' }),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});



const updateRatingValidation =z.object({
    service: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  })

export const RatingValidation = {
  createRatingZodSchema,
  updateRatingValidation,
};
