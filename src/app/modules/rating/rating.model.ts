import { Schema, model } from 'mongoose';
import { TRating } from './rating.interface';

const RatingSchema = new Schema<TRating>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can rate a service only once
// RatingSchema.index({ user: 1, service: 1 }, { unique: true });

export const Rating = model<TRating>('Rating', RatingSchema);

