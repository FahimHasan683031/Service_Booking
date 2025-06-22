import { model, Schema } from 'mongoose';
import { IBookedSlots, IService } from './service.interface';

const bookedSlotsSchema = new Schema<IBookedSlots>({
  date:Date,
  time: [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM"
]
})

const serviceSchema = new Schema<IService>({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  provider: { type:Schema.Types.ObjectId, ref: 'User', required: true },
  bookedSlots:{
    type:[bookedSlotsSchema],
    default:[]
  },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating', default:[] }],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
}, {
  timestamps: true
});


export const Service = model<IService>('Service', serviceSchema);
