import { Request, Response, NextFunction } from "express";

import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await createProductService(req.body);

    return successResponse(res, "Product created successfully", product, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await getAllProductsService();

    return successResponse(res, "Products fetched successfully", products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await getProductByIdService(req.params.id as string);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await updateProductService(
      req.params.id as string,
      req.body,
    );

    return successResponse(res, "Product updated successfully", product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteProductService(req.params.id as string);

    return successResponse(res, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};
