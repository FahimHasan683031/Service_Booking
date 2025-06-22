import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post("/",
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = CategoryValidation.updateCategoryZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return CategoryController.createCategory(req, res, next);
  }
)

router.get("/",
  auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER),
    CategoryController.getAllCategory
  )


router
  .route('/:id')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER), CategoryController.getCategory)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = CategoryValidation.updateCategoryZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return CategoryController.updateCategory(req, res, next);
    }
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CategoryController.deleteCategory
  );




export const CategoryRoutes = router;
