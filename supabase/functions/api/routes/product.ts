import { Hono } from "npm:hono";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/index.ts";

const router = new Hono();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;
