import prisma from "../database/prisma.js";

interface ProductData {
  name: string;
  category: string;
  description: string;
  status: "active" | "coming_soon";
}

export const createProductService = async (data: ProductData) => {
  return await prisma.product.create({
    data,
  });
};

export const getAllProductsService = async () => {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductByIdService = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const updateProductService = async (
  id: string,
  data: Partial<ProductData>,
) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProductService = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};
