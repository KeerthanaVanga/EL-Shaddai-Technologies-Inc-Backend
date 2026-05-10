import { Request, Response, NextFunction } from "express";

import {
  createContactService,
  deleteContactService,
  getAllContactsService,
  getContactByIdService,
  markContactAsReadService,
  updateContactService,
} from "../services/contact.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contact = await createContactService(req.body);

    return successResponse(
      res,
      "Contact form submitted successfully",
      contact,
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contacts = await getAllContactsService();

    return successResponse(res, "Contacts fetched successfully", contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contact = await getContactByIdService(req.params.id as string);

    if (!contact) {
      return errorResponse(res, "Contact not found", 404);
    }

    return successResponse(res, "Contact fetched successfully", contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contact = await updateContactService(
      req.params.id as string,
      req.body,
    );

    return successResponse(res, "Contact updated successfully", contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteContactService(req.params.id as string);

    return successResponse(res, "Contact deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const markContactAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contact = await markContactAsReadService(req.params.id as string);

    return successResponse(res, "Contact marked as read", contact);
  } catch (error) {
    next(error);
  }
};
