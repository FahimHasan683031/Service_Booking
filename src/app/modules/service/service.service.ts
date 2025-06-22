import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IService } from './service.interface';
import { Service } from './service.model';
import { Request } from 'express';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { Category } from '../category/category.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createServiceToDB = async (req: Request): Promise<IService> => {
  const payload = req.body;


  // Check category isExist
  const isExistCategory = await Category.findById(payload.category)
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category dosent Exist")
  }

  let image = getSingleFilePath(req.files, 'image');
  const data = {
    provider: req.user.id,
    image,
    ...req.body,
  };

  // create Service
  const createService = await Service.create(data);
  if (!createService) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Service');
  }
  return createService;
};

// get single Service
const getServiceFromDB = async (id: string
): Promise<Partial<IService>> => {
  const isExistService = await Service.findById(id);
  if (!isExistService) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Service doesn't exist!");
  }

  return isExistService;
};


// get all Service
const getAllService = async (query: Record<string, unknown>): Promise<IService[]> => {
  const serviceQuery = new QueryBuilder(Service.find(),query)
  .search(["name"])
  .filter()
  .sort()
  .paginate()
  .fields();
  const services = await serviceQuery.modelQuery;
  return services
}


// update Service
const updateProfileToDB = async (
  id: string,
  payload: Partial<IService>
): Promise<Partial<IService | null>> => {
  const isExistService = await Service.findById(id);
  if (!isExistService) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Service doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistService.image);
  }

  const updateDoc = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};


// delete Service
const deleteService = async (
  id: string,
) => {
  const isExistService = await Service.findById(id);
  if (!isExistService) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Service doesn't exist!");
  }

  //unlink file here
  if (isExistService) {
    unlinkFile(isExistService.image);
  }
  const deleteService = await Service.deleteOne({ _id: id });
  return deleteService;
};

export const ServiceService = {
  createServiceToDB,
  getServiceFromDB,
  updateProfileToDB,
  deleteService,
  getAllService
};
