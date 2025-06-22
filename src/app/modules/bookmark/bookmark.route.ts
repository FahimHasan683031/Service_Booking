import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookmarkController } from './bookmark.controller';


const router = express.Router();

router.post("/add",
  auth( USER_ROLES.CUSTOMAR),
 BookmarkController.addBookmark
)

router.delete(
  "/delete",
auth( USER_ROLES.CUSTOMAR),
BookmarkController.deleteBookmark
)



export const BookmarkRoutes = router;
