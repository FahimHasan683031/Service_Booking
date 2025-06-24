import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { MessageService } from './message.service';


// get all Message
const getALLMessage= catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getAllMessages(req.params.chatId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Message data retrieved successfully',
    data: result,
  });
});

// get single Message
const getsingleMessage= catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getSingleMessageFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Message data retrieved successfully',
    data: result,
  });
});


//update profile
const updateMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await MessageService.updateMessageToDB(req.params.id, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Message updated successfully',
      data: result,
    });
  }
);

// delete Message
const deleteMessage= catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.deleteMessage(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Message delete successfully',
    data: result,
  });
});


export const MessageController = { 
  getsingleMessage, 
  getALLMessage,
  updateMessage ,
  deleteMessage
};
