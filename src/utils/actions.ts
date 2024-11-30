'use server';
import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createTask = async (formData:any) => {
  const content = formData.get('content');
  await prisma.task.create({
    data: {
      content,
    },
  });
  revalidatePath('/tasks');
};
 

export const deleteTask = async (formData:any) => {
  const id = formData.get('id');
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath('/tasks');
};

export const getTask = async (id:any) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};
export const editTask = async (formData:any) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      content,
      completed: completed === 'on' ? true : false,
    },
  });
  redirect('/tasks');
};
