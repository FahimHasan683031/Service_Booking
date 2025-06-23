import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IPayment } from './payment.interface';
import Stripe from 'stripe';
import config from '../../../config';

const stripe = new Stripe(config.stripe_secret_key as string);



export const createPaymentIntent = async (payload:IPayment) => {
  const { amount, serviceId, customerId } = payload;


  if (!amount || !serviceId || !customerId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields!");
  }

 
   const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: 'usd',
       payment_method_types: ['card'],
      metadata: {
        serviceId,
        customerId,
      },
    });

    console.log(paymentIntent)

    return paymentIntent.client_secret;
};

export const PaymentService={
  createPaymentIntent
}