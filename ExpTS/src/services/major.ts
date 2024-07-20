import { PrismaClient, Major } from "@prisma/client";
import { CreateMajorDto } from "../types/major";

const prisma = new PrismaClient();

export const createMajor = async (major: CreateMajorDto): Promise<Major> => {
  return prisma.major.create({ data: major });
};

export const getMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany();
};

export const getMajor = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } });
};

export const updateMajor = async (
  id: string,
  data: CreateMajorDto
): Promise<Major> => {
  const updatedMajor = await prisma.major.update({
    where: {
      id: id,
    },
    data: data,
  });
  return updatedMajor;
};
export const deleteMajor = async (id: string): Promise<string> => {
  const deletedMajor = await prisma.major.delete({
    where: {
      id: id,
    },
  });
  return `Curso ${deletedMajor.name.toUpperCase()} apagado com sucesso`;
};
