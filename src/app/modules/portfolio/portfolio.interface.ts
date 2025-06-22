import { Types } from 'mongoose';

export type IPortfolio = {
  provider: Types.ObjectId;
  title: string;
  category: string;
  details: string;
  images: string[]; 
};

