import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getMultipleFilesPath, getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { PortfolioService } from './portfolio.service';

// createPortfolio
const createPortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
     let image = getMultipleFilesPath(req.files, 'image');
    const data = {
      images:image,
      ...req.body,
    };
    const result = await PortfolioService.createPortfolioToDB(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Portfolio created successfully',
      data: result,
    });
  }
);

// get all Portfolio
const getAllPortfolio = catchAsync(async(req:Request,res:Response)=>{
  const result = await PortfolioService.getAllPortfolio();
  sendResponse(res,{
    success:true,
    statusCode:StatusCodes.OK,
    message:"Portfolio retrieved successFully ",
    data:result
  })
})

// get single Portfolio
const getPortfolio= catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioService.getPortfolioFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Ban data retrieved successfully',
    data: result,
  });
});


//update portfolio
const updatePortfolio = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
     let image = getMultipleFilesPath(req.files, 'image');
    const data = {
      images:image,
      ...req.body,
    };
    const result = await PortfolioService.updateProfileToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Portfolio updated successfully',
      data: result,
    });
  }
);

// delete Portfolio
const deletePortfolio= catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioService.deletePortfolio(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Portfolio delete successfully',
    data: result,
  });
});


export const PortfolioController = { 
  createPortfolio, 
  getPortfolio, 
  updatePortfolio ,
  deletePortfolio,
  getAllPortfolio
};
