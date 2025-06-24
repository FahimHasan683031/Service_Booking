import { Types } from "mongoose";

export interface IMessage {
  sender: Types.ObjectId;  
  message: string;
  chatRoomId: string;       
  timestamp: Date;
}

