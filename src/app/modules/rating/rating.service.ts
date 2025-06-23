import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Rating } from './rating.model';
import { Service } from '../service/service.model';
import mongoose from 'mongoose';
import { TRating } from './rating.interface';




// create Rating
export const createRatingToDB = async (payload: Partial<TRating>) => {
  const { service } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //Check if the service exists
    const isServiceExist = await Service.findById(service).session(session);
    if (!isServiceExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Service doesn't exist!");
    }

    // Create the rating document
    const createdRating = await Rating.create([payload], { session });
    if (!createdRating?.[0]) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Rating');
    }

    const ratingId = createdRating[0]._id;

    //Push the rating ID into the service document
    const pushResult = await Service.findByIdAndUpdate(
      service,
      { $push: { ratings: ratingId } },
      { session }
    );

    if (!pushResult) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update Service with rating');
    }

    // Aggregate average rating and total reviews
    const aggResult = await Rating.aggregate([
      { $match: { service: new mongoose.Types.ObjectId(service) } },
      {
        $group: {
          _id: '$service',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]).session(session);

    const ratingStats = aggResult[0];

    // Update service with new stats
    const finalUpdate = await Service.findByIdAndUpdate(
      service,
      {
        $set: {
          averageRating: ratingStats?.averageRating || 0,
          totalReviews: ratingStats?.totalReviews || 0
        }
      },
      { session }
    );

    if (!finalUpdate) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update service rating stats');
    }

    await session.commitTransaction();
    return createdRating[0];

  } catch (err: any) {
    await session.abortTransaction();
    throw new ApiError(StatusCodes.BAD_REQUEST, err.message || "Rating operation failed");
  } finally {
    session.endSession();
  }
}





// Update Rating
const updateRatingToDB = async (ratingId: string, updatePayload: Partial<TRating>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Update the rating
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      updatePayload,
      { new: true, session }
    );

    if (!updatedRating) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update rating');
    }

    // Aggregate rating stats using the same session
    const aggResult = await Rating.aggregate([
      { $match: { service: updatedRating.service } },
      {
        $group: {
          _id: '$service',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]).session(session); 

    const ratingData = aggResult[0];

    // Update service with new rating stats
    const updatedService = await Service.findByIdAndUpdate(
      updatedRating.service,
      {
        $set: {
          averageRating: ratingData?.averageRating || 0,
          totalReviews: ratingData?.totalReviews || 0,
        },
      },
      { new: true, session }
    );

    if (!updatedService) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update service with new rating stats');
    }

    await session.commitTransaction();

    return updatedRating;
  } catch (error: any) {
    await session.abortTransaction();
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Failed to update rating');
  } finally {
    session.endSession();
  }
};







// delete Rating
const deleteRating = async (ratingId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the rating to get serviceId before deleting
    const rating = await Rating.findById(ratingId).session(session);
    if (!rating) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Rating not found');
    }

    const serviceId = rating.service;

    // Delete the rating
    const deletedRating = await Rating.findByIdAndDelete(ratingId, { session });
    if (!deletedRating) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to delete rating');
    }

    // Remove ratingId from the service.ratings array
    await Service.findByIdAndUpdate(
      serviceId,
      { $pull: { ratings: ratingId } },
      { session }
    );

    // Recalculate averageRating and totalReviews using session
    const aggResult = await Rating.aggregate([
      { $match: { service: new mongoose.Types.ObjectId(serviceId) } },
      {
        $group: {
          _id: '$service',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]).session(session);

    const ratingStats = aggResult[0];

    // Update service with new stats
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        $set: {
          averageRating: ratingStats?.averageRating || 0,
          totalReviews: ratingStats?.totalReviews || 0,
        },
      },
      { new: true, session }
    );

    await session.commitTransaction();

    return deletedRating;
  } catch (error: any) {
    await session.abortTransaction();
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Failed to delete rating');
  } finally {
    session.endSession();
  }
};


export const RatingService = {
  createRatingToDB,
  updateRatingToDB,
  deleteRating
};
