import { model, Schema } from 'mongoose';
import { IPayment } from './payment.interface';


const PaymentSchema = new Schema<IPayment>(
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


export const Payment = model<IPayment>('Payment', PaymentSchema);
