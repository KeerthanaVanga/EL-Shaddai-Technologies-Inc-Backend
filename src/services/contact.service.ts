import prisma from "../database/prisma.js";

interface ContactData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  read?: boolean;
}

export const createContactService = async (data: ContactData) => {
  return await prisma.contactSubmission.create({
    data,
  });
};

export const getAllContactsService = async () => {
  return await prisma.contactSubmission.findMany({
    orderBy: {
      submittedAt: "desc",
    },
  });
};

export const getContactByIdService = async (id: string) => {
  return await prisma.contactSubmission.findUnique({
    where: { id },
  });
};

export const updateContactService = async (
  id: string,
  data: Partial<ContactData>,
) => {
  return await prisma.contactSubmission.update({
    where: { id },
    data,
  });
};

export const deleteContactService = async (id: string) => {
  return await prisma.contactSubmission.delete({
    where: { id },
  });
};

export const markContactAsReadService = async (id: string) => {
  return await prisma.contactSubmission.update({
    where: { id },
    data: {
      read: true,
    },
  });
};
