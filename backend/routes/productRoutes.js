import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProduct);
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
