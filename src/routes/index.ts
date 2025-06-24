import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { BannerRoutes } from '../app/modules/banner/banaer.route';
import { CategoryRoutes } from '../app/modules/category/category.route';
import { ServiceRoutes } from '../app/modules/service/servide.route';
import { BookingRoutes } from '../app/modules/booking/booking.route';
import { PortfolioRoutes } from '../app/modules/portfolio/portfolio.route';
import { BookmarkRoutes } from '../app/modules/bookmark/bookmark.route';
import { RatingRoutes } from '../app/modules/rating/rating.route';
import { PaymentRoutes } from '../app/modules/payment/payment.route';
import { ChatRoutes } from '../app/modules/chat/chat.route';
import { MessageRoutes } from '../app/modules/message/message.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
   {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/portfolio',
    route: PortfolioRoutes,
  },
    {
    path: '/bookmark',
    route: BookmarkRoutes,
  },
   {
    path: '/rating',
    route: RatingRoutes,
  },
   {
    path: '/create-payment-intent',
    route: PaymentRoutes,
  },
   {
    path: '/chat',
    route: ChatRoutes,
  },
   {
    path: '/message',
    route: MessageRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
