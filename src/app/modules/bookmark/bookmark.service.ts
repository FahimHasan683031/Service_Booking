import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Service } from '../service/service.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';


const addBookmard = async (payload: { serviceId: string }, user: JwtPayload) => {
const { serviceId } = payload;
  // check service isExist
  if (!await Service.findById(serviceId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Service dosent exist');
  }

  const res = await User.findByIdAndUpdate(user.id, {
    $addToSet: {
      bookmarks: serviceId
    },
  },
  { new: true }
)
   //check bookmark is add or not
  if (!res) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Faild to add bookemark')
  }

  return res;
};






// delete Bookmark
const deleteBookmark = async (
 payload: { serviceId: string }, user: JwtPayload,
) => {
  const { serviceId } = payload;

console.log(serviceId)
  const res = await User.findByIdAndUpdate(
    user.id,
    {
      $pull: { bookmarks: serviceId },
    },
    { new: true }
  );

  //check bookmark is removed or not
  if (!res) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Faild to delete bookemark')
  }

  return res;
};

export const BookmarkService = {
  addBookmard,
  deleteBookmark
};
