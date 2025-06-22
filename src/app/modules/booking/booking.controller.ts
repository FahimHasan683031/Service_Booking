import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

// createBooking
const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      customer:req.user.id,
      ...req.body,
    };
    const result = await BookingService.createBookingToDB(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Booking created successfully',
      data: result,
    });
  }
);

// get all Booking
const getALLBooking= catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking data retrieved successfully',
    data: result,
  });
});

// get single Booking
const getsingleBooking= catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getSingleBookingFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking data retrieved successfully',
    data: result,
  });
});


//update profile
const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await BookingService.updateProfileToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Booking updated successfully',
      data: result,
    });
  }
);

// delete Booking
const deleteBooking= catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.deleteBooking(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking delete successfully',
    data: result,
  });
});


export const BookingController = { 
  createBooking, 
  getsingleBooking, 
  getALLBooking,
  updateBooking ,
  deleteBooking
};
