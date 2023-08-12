import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteById,
  getUserById
} from "../controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/add", addBlog);
router.patch("/update/:id", updateBlog);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.get("/user/:id", getUserById)
export default router;
