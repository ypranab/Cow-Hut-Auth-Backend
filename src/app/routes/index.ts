import express from "express";
import { UserRoutes } from "../modules/users/users.route";
import { CowRoutes } from "../modules/cow/cow.route";
import { OrderRoute } from "../modules/orders/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AuthRoutes } from "../modules/auth/auth.route";
const router = express.Router();

const routes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: OrderRoute,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
