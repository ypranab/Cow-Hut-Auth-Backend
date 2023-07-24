"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../modules/users/users.route");
const cow_route_1 = require("../modules/cow/cow.route");
const order_route_1 = require("../modules/orders/order.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const routes = [
    {
        path: "/users",
        route: users_route_1.UserRoutes,
    },
    {
        path: "/cows",
        route: cow_route_1.CowRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoute,
    },
    {
        path: "/admins",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
