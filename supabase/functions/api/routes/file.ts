import { Hono } from "npm:hono";
import { createFile, deleteFile } from "../controllers/index.ts";

const router = new Hono();

router.post("/", createFile);
router.delete("/", deleteFile);

export default router;
