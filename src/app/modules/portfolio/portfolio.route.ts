import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { PortfolioController } from './portfolio.controller';
import { PortfolioValidation } from './portfolio.validation';

const router = express.Router();

router.post("/",
  auth(USER_ROLES.PROVIDER),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = PortfolioValidation.updatePortfolioZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return PortfolioController.createPortfolio(req, res, next);
  }
)

router.get("/",
  auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER),
    PortfolioController.getAllPortfolio
  )


router
  .route('/:id')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.CUSTOMAR, USER_ROLES.PROVIDER), PortfolioController.getPortfolio)
  .patch(
    auth(USER_ROLES.PROVIDER),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = PortfolioValidation.updatePortfolioZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return PortfolioController.updatePortfolio(req, res, next);
    }
  )
  .delete(
    auth(USER_ROLES.PROVIDER),
    PortfolioController.deletePortfolio
  );




export const PortfolioRoutes = router;
