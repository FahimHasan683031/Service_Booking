import { Types } from 'mongoose';

export type TRating = {
  service: Types.ObjectId;
  customer: Types.ObjectId;
  rating: number;
  comment?: string;
};

