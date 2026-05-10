import { Router } from "express";

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controller.js";

const router = Router();

router.post("/", createJob);

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

export default router;
