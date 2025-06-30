import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';





// // get all Notification
// const getAllNotifications = async (chatId:string): Promise<INotification[]> => {
//   const Notifications = Notification.find({chatRoomId:chatId})
//   return Notifications
// }





const deleteNotification = async (
  id: string,
) => {
  const isExistNotification = await Notification.findById(id);
  if (!isExistNotification) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Notification doesn't exist!");
  }


  const deleteNotification = await Notification.deleteOne({ _id: id });
  return deleteNotification;
};

export const NotificationService = {
  // getSingleNotificationFromDB,
  // updateNotificationToDB,
  // getAllNotifications,
  deleteNotification
};
