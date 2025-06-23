import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';

// createPayment
const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PaymentService.createPaymentIntent(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Payment intent created successfully!',
      data: result,
    });
  }
);






export const PaymentController = { 
  createPayment, 
};
