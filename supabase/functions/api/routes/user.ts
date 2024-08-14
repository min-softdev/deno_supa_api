import { Hono } from "jsr:@hono/hono";
import { createUser, getUsers, updateUser } from "../controllers/index.ts";
import { deleteUser } from "../controllers/user.ts";

const router = new Hono();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
