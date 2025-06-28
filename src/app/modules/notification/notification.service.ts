import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';





// // get all Notification
// const getAllNotifications = async (chatId:string): Promise<INotification[]> => {
//   const Notifications = Notification.find({chatRoomId:chatId})
//   return Notifications
// }

// // get single Notification
// const getSingleNotificationFromDB = async (id: string
// ): Promise<Partial<INotification>> => {
//   const isExistNotification = await Notification.findById(id)
//   if (!isExistNotification) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, "Notification doesn't exist!");
//   }

//   return isExistNotification;
// };


// // update Notification
// const updateNotificationToDB = async (
//   id: string,
//   payload: Partial<INotification>
// ): Promise<Partial<INotification | null>> => {
//   const isExistNotification = await Notification.findById(id);
//   if (!isExistNotification) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, "Notification doesn't exist!");
//   }

//    const updateDoc = await Notification.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });

 

//   return updateDoc;

// };


// delete Notification
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
