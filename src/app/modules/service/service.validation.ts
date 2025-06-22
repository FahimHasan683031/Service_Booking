import { z } from 'zod';


export const createServiceZodSchema = z.object({
  category: z.string().min(1, 'Category is required'), 
  name: z.string().min(1, 'Service name is required'), 
  details: z.string().min(1, 'Service details are required'),
  price: z.number().min(0, 'Price must be a positive number'), 
});


const updateServiceZodSchema = z.object({
  category: z.string().optional(), 
  image: z.string().optional(),  
  name: z.string().optional(), 
  details: z.string().optional(),
  price: z.number().optional(), 
});



export const ServiceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
};
