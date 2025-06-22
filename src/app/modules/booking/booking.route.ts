import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post("/",
  auth(USER_ROLES.CUSTOMAR),
  BookingController.createBooking
)

router.get("/",
  auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER, USER_ROLES.SUPER_ADMIN),
  BookingController.getALLBooking
)

router
  .route('/:id')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER, USER_ROLES.SUPER_ADMIN), BookingController.getsingleBooking)
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER, USER_ROLES.SUPER_ADMIN),
    BookingController.updateBooking
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    BookingController.deleteBooking
  );




export const BookingRoutes = router;
