import { Hono } from "jsr:@hono/hono";
import { routers } from "./routes/index.ts";

const api = new Hono();
const functionName = "api";
const app = api.basePath(`/${functionName}`);

routers.forEach(({ path, router }) => {
  app.route(path, router);
});

Deno.serve(app.fetch);
