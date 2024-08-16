import { Hono } from "npm:hono";
import {
  changePassword,
  forgotPassword,
  signIn,
  signOut,
  signUp,
  inviteUser
} from "../controllers/index.ts";

const router = new Hono();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgotpassword", forgotPassword);
router.put("/changepassword", changePassword);
router.post("/signout", signOut);
router.post("/inviteuser", inviteUser);

export default router;
