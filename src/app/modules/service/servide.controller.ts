import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';

// createService
const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    const result = await ServiceService.createServiceToDB(req);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Service created successfully',
      data: result,
    });
  }
);

// get all Service
const getAllService = catchAsync(async(req:Request,res:Response)=>{
  const result = await ServiceService.getAllService(req.query);
  sendResponse(res,{
    success:true,
    statusCode:StatusCodes.OK,
    message:"Service retrieved successFully ",
    data:result
  })
})

// get single Service
const getService= catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getServiceFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'service data retrieved successfully',
    data: result,
  });
});


//update profile
const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await ServiceService.updateProfileToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Service updated successfully',
      data: result,
    });
  }
);

// delete Service
const deleteService= catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.deleteService(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service delete successfully',
    data: result,
  });
});


export const ServiceController = { 
  createService, 
  getService, 
  updateService ,
  deleteService,
  getAllService
};
