import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { MessageController } from './message.controller';

const router = express.Router();


router.get("/:chatId",
  // auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER, USER_ROLES.SUPER_ADMIN),
  MessageController.getALLMessage
)

router
  .route('/:id')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER, USER_ROLES.SUPER_ADMIN), MessageController.getsingleMessage)
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER, USER_ROLES.SUPER_ADMIN),
    MessageController.updateMessage
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    MessageController.deleteMessage
  );




export const MessageRoutes = router;
