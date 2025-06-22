import { z } from 'zod';

export const createPortfolioZodSchema = z.object({
  provider: z.string().min(1, 'Provider ID is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  details: z.string().min(1, 'Details are required'),
});


const updatePortfolioZodSchema = z.object({
  provider: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  details: z.string().optional(),
});

export const PortfolioValidation = {
  createPortfolioZodSchema,
  updatePortfolioZodSchema,
};
