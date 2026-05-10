import prisma from "../database/prisma.js";

interface JobData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
}

export const createJobService = async (data: JobData) => {
  return await prisma.job.create({
    data,
  });
};

export const getAllJobsService = async () => {
  return await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getJobByIdService = async (id: string) => {
  return await prisma.job.findUnique({
    where: { id },
  });
};

export const updateJobService = async (id: string, data: Partial<JobData>) => {
  return await prisma.job.update({
    where: { id },
    data,
  });
};

export const deleteJobService = async (id: string) => {
  return await prisma.job.delete({
    where: { id },
  });
};
