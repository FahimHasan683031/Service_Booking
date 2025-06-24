import { z } from 'zod';

export const createMessageMessageZodSchema = z.object({
  sender: z.string().min(1, 'Sender is required'), 
  message: z.string().min(1, 'Message cannot be empty'),
  MessageRoomId: z.string().min(1, 'Message Room ID is required'),
});

const updateMessageZodSchema = z.object({
 message: z.string().min(1, 'Message cannot be empty'),
});

export const MessageValidation = {
  createMessageMessageZodSchema,
  updateMessageZodSchema,
};
