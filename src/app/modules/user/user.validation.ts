import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    phone: z.number().optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    password: z.string({ required_error: 'Password is required' }),
    reEnter_password: z.string({ required_error: 'Password is required' }),
    profile: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  image: z.string().optional(),
  phone: z.number().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
