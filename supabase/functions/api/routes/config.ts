import { Hono } from "npm:hono";
import {
  createConfig,
  deleteConfig,
  getConfigs,
  updateConfig,
} from "../controllers/index.ts";

const router = new Hono();

router.post("/", createConfig);
router.get("/", getConfigs);
router.put("/", updateConfig);
router.delete("/", deleteConfig);

export default router;
