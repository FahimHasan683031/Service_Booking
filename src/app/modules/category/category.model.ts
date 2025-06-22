import { model, Schema } from 'mongoose';
import { ICategory } from './category.interface';


const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      unique:true,
      required: true,
    },

    image: {
      type: String,
      required:true,
    },
    description:{
      type:String,
      required:false
    }
  },
  { timestamps: true }
);


export const Category = model<ICategory>('Category', CategorySchema);
