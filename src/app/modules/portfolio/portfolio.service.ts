import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IPortfolio } from './portfolio.interface';
import { Portfolio } from './portfolio.model';
import { User } from '../user/user.model';

const createPortfolioToDB = async (payload: Partial<IPortfolio>): Promise<IPortfolio> => {
  // Check provider exist
  if (!await User.findById(payload.provider)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Provider dosent exist')
  }

  // create Portfolio
  const createPortfolio = await Portfolio.create(payload);

  if (!createPortfolio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Portfolio');
  }
  return createPortfolio;
};

// get single Portfolio
const getPortfolioFromDB = async (id: string
): Promise<Partial<IPortfolio>> => {
  const isExistPortfolio = await Portfolio.findById(id).populate(
    {
      path: 'provider',
      select: 'name email role image',
    } 
  );
  if (!isExistPortfolio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Portfolio doesn't exist!");
  }

  return isExistPortfolio;
};


// get all Portfolio
const getAllPortfolio = async (): Promise<IPortfolio[]> => {
  const caregorys = await Portfolio.find();
  return caregorys
}


// update Portfolio
const updateProfileToDB = async (
  id: string,
  payload: Partial<IPortfolio>
): Promise<Partial<IPortfolio | null>> => {
  const isExistPortfolio = await Portfolio.findById(id);
  if (!isExistPortfolio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Portfolio doesn't exist!");
  }

  //remove existing files from storage
  if (isExistPortfolio) {  
    isExistPortfolio.images.forEach(image => {
      unlinkFile(image);
    });
  }

  const updateDoc = await Portfolio.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};


// delete Portfolio
const deletePortfolio = async (
  id: string,
) => {
  const isExistPortfolio = await Portfolio.findById(id);
  if (!isExistPortfolio) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Portfolio doesn't exist!");
  }

  //remove existing files from storage
  if (isExistPortfolio) {  
    isExistPortfolio.images.forEach(image => {
      unlinkFile(image);
    });
  }
  const deletePortfolio = await Portfolio.deleteOne({ _id: id });
  return deletePortfolio;
};

export const PortfolioService = {
  createPortfolioToDB,
  getPortfolioFromDB,
  updateProfileToDB,
  deletePortfolio,
  getAllPortfolio
};
