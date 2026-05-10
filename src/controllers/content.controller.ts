import { Request, Response, NextFunction } from "express";
import { ContentService } from "../services/content.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

const contentService = new ContentService();

export const getAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await contentService.getAllContent();
    successResponse(
      res,
      "Content retrieved successfully",
      content,
    );
  } catch (error) {
    next(error);
  }
};

export const getContentByPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page } = req.params as { page: string };
    const content = await contentService.getContentByPage(page);
    successResponse(
      res,
      "Page content retrieved successfully",
      content,
    );
  } catch (error) {
    next(error);
  }
};

export const getContentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const content = await contentService.getContentById(id);
    successResponse(
      res,
      "Content retrieved successfully",
      content,
    );
  } catch (error) {
    next(error);
  }
};

export const createContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await contentService.createContent(req.body);
    successResponse(
      res,
      "Content created successfully",
      content,
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const content = await contentService.updateContent(id, req.body);
    successResponse(
      res,
      "Content updated successfully",
      content,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    await contentService.deleteContent(id);
    successResponse(
      res,
      "Content deleted successfully",
      null,
    );
  } catch (error) {
    next(error);
  }
};