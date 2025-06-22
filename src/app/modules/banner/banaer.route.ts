import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { BannerController } from './banaer.controller';
import { BannerValidation } from './banaer.validation';

const router = express.Router();

router.post("/",
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
   if (req.body.data) {
        req.body = BannerValidation.updateBannerZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
    return BannerController.createBanner(req, res, next);
  }
)

router
  .route('/:id')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER), BannerController.getBanner)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = BannerValidation.updateBannerZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return BannerController.updateBanner(req, res, next);
    }
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    BannerController.deleteBanner
  );




export const BannerRoutes = router;
