import prisma from "../database/prisma.js";

export class ContentService {
  async getAllContent() {
    try {
      const content = await prisma.content.findMany({
        orderBy: [
          { page: 'asc' },
          { order: 'asc' }
        ]
      });
      return content;
    } catch (error) {
      throw new Error("Failed to retrieve content");
    }
  }

  async getContentByPage(page: string) {
    try {
      const content = await prisma.content.findMany({
        where: { page },
        orderBy: { order: 'asc' }
      });
      return content;
    } catch (error) {
      throw new Error("Failed to retrieve page content");
    }
  }

  async getContentById(id: string) {
    try {
      const content = await prisma.content.findUnique({
        where: { id }
      });
      
      if (!content) {
        throw new Error("Content not found");
      }
      
      return content;
    } catch (error) {
      throw new Error("Failed to retrieve content");
    }
  }

  async createContent(data: {
    page: string;
    section: string;
    title?: string;
    heading?: string;
    description?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
    isActive?: boolean;
    order?: number;
  }) {
    try {
      const content = await prisma.content.create({
        data
      });
      return content;
    } catch (error) {
      throw new Error("Failed to create content");
    }
  }

  async updateContent(id: string, data: {
    page?: string;
    section?: string;
    title?: string;
    heading?: string;
    description?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
    isActive?: boolean;
    order?: number;
  }) {
    try {
      const content = await prisma.content.update({
        where: { id },
        data
      });
      return content;
    } catch (error) {
      throw new Error("Failed to update content");
    }
  }

  async deleteContent(id: string) {
    try {
      await prisma.content.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      throw new Error("Failed to delete content");
    }
  }
}
