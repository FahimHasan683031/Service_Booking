import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { BannerService } from './banaer.service';

// createBanner
const createBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
     let image = getSingleFilePath(req.files, 'image');
    const data = {
      image,
      ...req.body,
    };
    const result = await BannerService.createBannerToDB(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Banner created successfully',
      data: result,
    });
  }
);

// get single banner
const getBanner= catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getBannerFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Ban data retrieved successfully',
    data: result,
  });
});


//update profile
const updateBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await BannerService.updateProfileToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Banner updated successfully',
      data: result,
    });
  }
);

// delete Banner
const deleteBanner= catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.deleteBanner(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner delete successfully',
    data: result,
  });
});


export const BannerController = { 
  createBanner, 
  getBanner, 
  updateBanner ,
  deleteBanner
};
