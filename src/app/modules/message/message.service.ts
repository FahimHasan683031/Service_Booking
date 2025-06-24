import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IMessage } from './message.interface';
import { Message } from './message.model';





// get all Message
const getAllMessages = async (chatId:string): Promise<IMessage[]> => {
  const messages = Message.find({chatRoomId:chatId})
  return messages
}

// get single Message
const getSingleMessageFromDB = async (id: string
): Promise<Partial<IMessage>> => {
  const isExistMessage = await Message.findById(id)
  if (!isExistMessage) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Message doesn't exist!");
  }

  return isExistMessage;
};


// update Message
const updateMessageToDB = async (
  id: string,
  payload: Partial<IMessage>
): Promise<Partial<IMessage | null>> => {
  const isExistMessage = await Message.findById(id);
  if (!isExistMessage) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Message doesn't exist!");
  }

   const updateDoc = await Message.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

 

  return updateDoc;

};


// delete Message
const deleteMessage = async (
  id: string,
) => {
  const isExistMessage = await Message.findById(id);
  if (!isExistMessage) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Message doesn't exist!");
  }


  const deleteMessage = await Message.deleteOne({ _id: id });
  return deleteMessage;
};

export const MessageService = {
  getSingleMessageFromDB,
  updateMessageToDB,
  getAllMessages,
  deleteMessage
};
