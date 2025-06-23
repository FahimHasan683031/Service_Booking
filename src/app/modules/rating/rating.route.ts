import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { RatingController } from './rating.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createRatingZodSchema } from './rating.validation';

const router = express.Router();

router.post("/",
  auth(USER_ROLES.CUSTOMAR),
  validateRequest(createRatingZodSchema),
  RatingController.createRating
)



router
  .route('/:id')
  .patch(
    auth( USER_ROLES.CUSTOMAR, USER_ROLES.SUPER_ADMIN),
    RatingController.updateRating
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR),
    RatingController.deleteRating
  );




export const RatingRoutes = router;
