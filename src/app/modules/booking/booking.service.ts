import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Service } from '../service/service.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';


const createBookingToDB = async (payload: Partial<IBooking>) => {
  const {  customer, service, date, time } = payload;

  // create session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // is service exist
    if (!await Service.findById(service)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Service doesn't exist!");
    }
    // is customer exist
    if (!await User.findById(customer)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Customer doesn't exist!");
    }
  


    // check this slot is already booked
    const bookedSlot = await Booking.findOne({
      service,
      date,
      time
    });

    if (bookedSlot) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "This slot is alreasy booked");
    }


    // create Booking
    const createBooking = await Booking.create([payload], { session });
    if (!createBooking) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Booking');
    }


    // push slot info on the service bookedSlots array
    const slotInfo = {
      date,
      itme: time
    }

    const updatedService = await Service.findByIdAndUpdate(
      service,
      { $addToSet: { bookedSlots: slotInfo } },
      { new: true, session }
    );


    if (!updatedService) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update booking');
    }
    // Commit transaction
    await session.commitTransaction();

    

    return createBooking;

  } catch (err: any) {
    await session.abortTransaction();
    throw new ApiError(StatusCodes.BAD_REQUEST, err.message || "Operation Faid");
  } finally {
    session.endSession();
  }
};


// get all booking
const getAllBookings = async (query: Record<string, unknown>): Promise<IBooking[]> => {
  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const bookings = await bookingQuery.modelQuery;
  return bookings
}

// get single Booking
const getSingleBookingFromDB = async (id: string
): Promise<Partial<IBooking>> => {
  const isExistBooking = await Booking.findById(id).populate([
    {
      path: 'customer',
      select: 'name email role image',
    },
    {
      path: 'service',
      select: 'name price image details provider',
      populate: {
        path: 'provider',
        select: 'name email role image',
      }
    },
  ]);
  if (!isExistBooking) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Booking doesn't exist!");
  }

  return isExistBooking;
};


// update Booking
const updateProfileToDB = async (
  id: string,
  payload: Partial<IBooking>
): Promise<Partial<IBooking | null>> => {
  const isExistBooking = await Booking.findById(id);
  if (!isExistBooking) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Booking doesn't exist!");
  }

   const updateDoc = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // remove this booked slot from srvice
  const { service, date, time } = isExistBooking
  if (payload.status === "cancelled") {
    await Service.findByIdAndUpdate(service, {
      $pull: {
        bookedSlots: {
          date: new Date(date),
          time: time,
        },
      },
    });
  }

 

  return updateDoc;

};


// delete Booking
const deleteBooking = async (
  id: string,
) => {
  const isExistBooking = await Booking.findById(id);
  if (!isExistBooking) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Booking doesn't exist!");
  }


  const deleteBooking = await Booking.deleteOne({ _id: id });
  return deleteBooking;
};

export const BookingService = {
  createBookingToDB,
  getSingleBookingFromDB,
  updateProfileToDB,
  getAllBookings,
  deleteBooking
};
