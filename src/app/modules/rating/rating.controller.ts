import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { RatingService } from './rating.service';

// createRating
const createRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      customer:req.user.id,
      ...req.body,
    };
    const result = await RatingService.createRatingToDB(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Rating created successfully',
      data: result,
    });
  }
);





//update profile
const updateRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
   const data = {
      customer:req.user.id,
      ...req.body,
    };
    const result = await RatingService.updateProfileToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Rating updated successfully',
      data: result,
    });
  }
);

// delete Rating
const deleteRating= catchAsync(async (req: Request, res: Response) => {
  const result = await RatingService.deleteRating(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Rating delete successfully',
    data: result,
  });
});


export const RatingController = { 
  createRating, 
  updateRating ,
  deleteRating
};
