import authRouter from "./auth.ts";
import userRouter from "./user.ts";
import productRouter from "./product.ts";
import configRouter from "./config.ts";
import fileRouter from "./file.ts";

export const routers = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/product",
    router: productRouter,
  },
  {
    path: "/config",
    router: configRouter,
  },
  {
    path: "/file",
    router: fileRouter,
  },
];
