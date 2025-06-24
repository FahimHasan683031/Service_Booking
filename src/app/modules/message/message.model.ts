import { Schema, model } from "mongoose";
import { IMessage } from "./message.interface";


const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  chatRoomId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = model<IMessage>('Message', messageSchema);




