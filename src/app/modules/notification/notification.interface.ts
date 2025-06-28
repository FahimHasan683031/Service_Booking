import { Types } from "mongoose";

export interface INotification {
  title: string ;  
  userId:Types.ObjectId
  message: string;
  isRead: boolean;       
}

