import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';


// get all Notification
// const getALLNotification= catchAsync(async (req: Request, res: Response) => {
//   const result = await NotificationService.getAllNotifications(req.params.chatId);

//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     Notification: 'Notification data retrieved successfully',
//     data: result,
//   });
// });

// // get single Notification
// const getsingleNotification= catchAsync(async (req: Request, res: Response) => {
//   const result = await NotificationService.getSingleNotificationFromDB(req.params.id);

//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     Notification: 'Notification data retrieved successfully',
//     data: result,
//   });
// });


// //update profile
// const updateNotification = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
   
//     let image = getSingleFilePath(req.files, 'image');

//     const data = {
//       image,
//       ...req.body,
//     };
//     const result = await NotificationService.updateNotificationToDB(req.params.id, data);

//     sendResponse(res, {
//       success: true,
//       statusCode: StatusCodes.OK,
//       Notification: 'Notification updated successfully',
//       data: result,
//     });
//   }
// );

// // delete Notification
// const deleteNotification= catchAsync(async (req: Request, res: Response) => {
//   const result = await NotificationService.deleteNotification(req.params.id);

//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     Notification: 'Notification delete successfully',
//     data: result,
//   });
// });


// export const NotificationController = { 
//   getsingleNotification, 
//   getALLNotification,
//   updateNotification ,
//   deleteNotification
// };
