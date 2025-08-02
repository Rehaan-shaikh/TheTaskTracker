// app/actions/tasks.js
"use server";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "./getUser";
import { revalidatePath } from "next/cache";

export async function createTask(_, formData) {
  const title = formData.get("title")?.trim();
  const description = formData.get("description")?.trim();
  const status = formData.get("status") || "pending";

  const errors = {};
  if (!title) errors.title = "Title is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Unauthorized" };

  try {
    const task = await db.task.create({
      data: {
        title,
        description,
        status,
        userId: user.id,
      },
    });
    revalidatePath("/tasks");

    return { success: true, task };
  } catch (error) {
    console.error("Create task error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

// GET TASKS
export async function getTasks() {
  const user = await getCurrentUser();
  if (!user) return [];

  const tasks = await db.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return tasks;
}


// UPDATE TASK
export async function updateTask(taskId, updates) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const task = await db.task.findUnique({ where: { id: taskId } });

  if (!task || task.userId !== user.id) {
    return { success: false, error: "Task not found or access denied" };
  }

  const updatedTask = await db.task.update({
    where: { id: taskId },
    data: {
      title: updates.title?.trim(),
      description: updates.description?.trim(),
      status: updates.status,
    },
  });
  revalidatePath("/tasks");

  return { success: true, task: updatedTask };
}


// DELETE TASK
export async function deleteTask(taskId) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const task = await db.task.findUnique({ where: { id: taskId } });

  if (!task || task.userId !== user.id) {
    return { success: false, error: "Task not found or access denied" };
  }

  await db.task.delete({ where: { id: taskId } });
  revalidatePath("/tasks");

  return { success: true };
}
