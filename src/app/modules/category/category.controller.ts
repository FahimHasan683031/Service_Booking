import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

// createCategory
const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
     let image = getSingleFilePath(req.files, 'image');
    const data = {
      image,
      ...req.body,
    };
    const result = await CategoryService.createCategoryToDB(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Category created successfully',
      data: result,
    });
  }
);

// get all category
const getAllCategory = catchAsync(async(req:Request,res:Response)=>{
  const result = await CategoryService.getAllCategory();
  sendResponse(res,{
    success:true,
    statusCode:StatusCodes.OK,
    message:"Category retrieved successFully ",
    data:result
  })
})

// get single Category
const getCategory= catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategoryFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Ban data retrieved successfully',
    data: result,
  });
});


//update profile
const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await CategoryService.updateProfileToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Category updated successfully',
      data: result,
    });
  }
);

// delete Category
const deleteCategory= catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category delete successfully',
    data: result,
  });
});


export const CategoryController = { 
  createCategory, 
  getCategory, 
  updateCategory ,
  deleteCategory,
  getAllCategory
};
