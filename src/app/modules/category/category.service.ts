import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryToDB = async (payload: Partial<ICategory>): Promise<ICategory> => {
  // Check category isExist
  const isExistCategory = await Category.findOne({name:payload.name})
  if(isExistCategory){
    throw new ApiError(StatusCodes.BAD_REQUEST, "This category already Exist")
  }
  //create Category
  const createCategory = await Category.create(payload);

  if (!createCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Category');
  }
  return createCategory;
};

// get single Category
const getCategoryFromDB = async (id:string
): Promise<Partial<ICategory>> => {
  const isExistCategory = await Category.findById(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist!");
  }

  return isExistCategory;
};


// get all category
const getAllCategory = async ():Promise<ICategory[]>=>{
  const caregorys = await Category.find();
  return caregorys
}


// update Category
const updateProfileToDB = async (
  id:string,
  payload: Partial<ICategory>
): Promise<Partial<ICategory | null>> => {
  const isExistCategory = await Category.findById(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistCategory.image);
  }

  const updateDoc = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};


// delete Category
const deleteCategory = async (
  id:string,
) => {
  const isExistCategory = await Category.findById(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist!");
  }

  //unlink file here
  if (isExistCategory) {
    unlinkFile(isExistCategory.image);
  }
  const deleteCategory = await Category.deleteOne({ _id: id });
  return deleteCategory;
};

export const CategoryService = {
  createCategoryToDB,
  getCategoryFromDB,
  updateProfileToDB,
  deleteCategory,
  getAllCategory
};
