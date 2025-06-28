// models/Notification.ts
import { Schema, model } from 'mongoose';
import { INotification } from './notification.interface';


const notificationSchema = new Schema<INotification>({
  title: { type: String, required: true },
  userId: { type: Schema.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, {
  timestamps: true,
});

export const Notification = model('Notification', notificationSchema);
