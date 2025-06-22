import { model, Schema } from 'mongoose';
import { IBanner } from './banaer.interface';


const bannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);


export const Banner = model<IBanner>('Banner', bannerSchema);
