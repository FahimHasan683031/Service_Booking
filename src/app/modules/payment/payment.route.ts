import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';


const router = express.Router();

router.post("/",
  auth(USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER),
  PaymentController.createPayment
)





export const PaymentRoutes = router;
