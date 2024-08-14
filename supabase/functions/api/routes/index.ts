import productRouter from "./product.ts";
import userRouter from "./user.ts";
import configRouter from "./config.ts";

export const routers = [
  {
    path: "/product",
    router: productRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/config",
    router: configRouter,
  },
];
