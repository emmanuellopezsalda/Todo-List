import { prisma } from "./prisma";

export const getAllTasks = async () => {
    return await prisma.task.findMany({
        orderBy: {
            completed: "asc",
        },
    });
};

export const createTask = async (title: string, description?: string) => {
    return await prisma.task.create({
        data: {
            title,
            description,
        },
    });
};

export const toggleTaskCompletion = async (id: string) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new Error("Tarea no encontrada");

    return await prisma.task.update({
        where: { id },
        data: {
            completed: !task.completed,
        },
    });
};

export const deleteTask = async (id: string) => {
    return await prisma.task.delete({ where: { id } });
};
