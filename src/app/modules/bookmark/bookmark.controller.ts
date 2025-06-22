import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { BookmarkService } from './bookmark.service';

// createBookmark
const addBookmark = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await BookmarkService.addBookmard(req.body,req.user);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Bookmark created successfully',
      data: result,
    });
  }
);






// delete Bookmark
const deleteBookmark= catchAsync(async (req: Request, res: Response) => {
  const result = await BookmarkService.deleteBookmark(req.body,req.user);;

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Bookmark delete successfully',
    data: result,
  });
});


export const BookmarkController = { 
  addBookmark, 
  deleteBookmark
};
