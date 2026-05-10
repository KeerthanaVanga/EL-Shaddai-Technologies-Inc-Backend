import type { Request, Response, NextFunction } from "express";
import {
  createAdminService,
  loginAdminService,
} from "../services/auth.service.js";
import { generateToken } from "../utils/token.js";
import { clearAuthCookies, sendAuthCookies } from "../utils/cookies.js";
import prisma from "../database/prisma.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";


export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    const admin = await createAdminService(username, email, password);

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const admin = await loginAdminService(email, password);

    const token = generateToken(admin.id);

    sendAuthCookies(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

export const checkAdminLoggedIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      isLoggedIn: true,
      message: "Admin logged in",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    clearAuthCookies(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
