import { z } from 'zod';

export const createNotificationNotificationZodSchema = z.object({
  sender: z.string().min(1, 'Sender is required'), 
  Notification: z.string().min(1, 'Notification cannot be empty'),
  NotificationRoomId: z.string().min(1, 'Notification Room ID is required'),
});

const updateNotificationZodSchema = z.object({
 Notification: z.string().min(1, 'Notification cannot be empty'),
});

export const NotificationValidation = {
  createNotificationNotificationZodSchema,
  updateNotificationZodSchema,
};
