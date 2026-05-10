import { Request, Response, NextFunction } from "express";

import {
  createJobService,
  deleteJobService,
  getAllJobsService,
  getJobByIdService,
  updateJobService,
} from "../services/job.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const job = await createJobService(req.body);

    return successResponse(res, "Job created successfully", job, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobs = await getAllJobsService();

    return successResponse(res, "Jobs fetched successfully", jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const job = await getJobByIdService(req.params.id as string);

    if (!job) {
      return errorResponse(res, "Job not found", 404);
    }

    return successResponse(res, "Job fetched successfully", job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const job = await updateJobService(req.params.id as string, req.body);

    return successResponse(res, "Job updated successfully", job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteJobService(req.params.id as string);

    return successResponse(res, "Job deleted successfully");
  } catch (error) {
    next(error);
  }
};
