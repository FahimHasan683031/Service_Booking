import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IBanner } from './banaer.interface';
import { Banner } from './banaer.model';

const createBannerToDB = async (payload: Partial<IBanner>): Promise<IBanner> => {
  //create banner
  const createBanner = await Banner.create(payload);

  if (!createBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Banner');
  }
  return createBanner;
};

// get single banner
const getBannerFromDB = async (id:string
): Promise<Partial<IBanner>> => {
  const isExistBanner = await Banner.findById(id);
  if (!isExistBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Banner doesn't exist!");
  }

  return isExistBanner;
};


// update banner
const updateProfileToDB = async (
  id:string,
  payload: Partial<IBanner>
): Promise<Partial<IBanner | null>> => {
  const isExistBanner = await Banner.findById(id);
  if (!isExistBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Banner doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistBanner.image);
  }

  const updateDoc = await Banner.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};


// delete Banner
const deleteBanner = async (
  id:string,
) => {
  const isExistBanner = await Banner.findById(id);
  if (!isExistBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Banner doesn't exist!");
  }

  //unlink file here
  if (isExistBanner) {
    unlinkFile(isExistBanner.image);
  }
  const deleteBanner = await Banner.deleteOne({ _id: id });
  return deleteBanner;
};

export const BannerService = {
  createBannerToDB,
  getBannerFromDB,
  updateProfileToDB,
  deleteBanner
};
