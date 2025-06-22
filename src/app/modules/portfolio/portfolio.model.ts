import mongoose, { Schema } from 'mongoose';
import { IPortfolio } from './portfolio.interface';

const portfolioSchema = new Schema<IPortfolio>(
  {
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    details: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);
