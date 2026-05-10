import { Router } from "express";
import {
  getAllContent,
  getContentByPage,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";

const router = Router();

// GET /api/content - Get all content
router.get("/", getAllContent);

// GET /api/content/page/:page - Get content by page
router.get("/page/:page", getContentByPage);

// GET /api/content/:id - Get content by id
router.get("/:id", getContentById);

// POST /api/content - Create new content
router.post("/", createContent);

// PUT /api/content/:id - Update content
router.put("/:id", updateContent);

// DELETE /api/content/:id - Delete content
router.delete("/:id", deleteContent);

export default router;