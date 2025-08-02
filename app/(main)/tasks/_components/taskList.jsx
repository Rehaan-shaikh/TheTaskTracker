"use client";

import { Trash2, Pencil } from "lucide-react";
import { updateTask, deleteTask } from "@/Actions/tasks";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import EditTaskDialog from "./editTaskDialoge";

export default function TaskList({ tasks }) {
  const [isPending, startTransition] = useTransition();
  const [editingTask, setEditingTask] = useState(null);

  const handleStatusChange = (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    startTransition(async () => {
      const res = await updateTask(task.id, { status: newStatus });
      if (res.success) {
        toast.success(`Marked as ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteTask(id);
      if (res.success) {
        toast.success("Task deleted");
      } else {
        toast.error(res.error || "Failed to delete task");
      }
    });
  };

return (
  <>
    <ul className="space-y-4">
      {tasks.map((task) => {
        const createdAt = new Date(task.createdAt).toLocaleString();

        return (
          <li
            key={task.id}
            className="p-5 rounded-xl border bg-background shadow-sm flex justify-between items-start gap-4 
                       transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="flex-1 flex gap-4 items-start">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => handleStatusChange(task)}
                className="mt-1 accent-primary w-5 h-5"
              />

              <div className="flex flex-col gap-1">
                <h3
                  className={`text-lg font-semibold ${
                    task.status === "completed"
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>

                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}

                <div className="flex flex-wrap text-xs text-muted-foreground mt-1 gap-4">
                  <p>Status: {task.status}</p>
                  <p>Added: {createdAt}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-md border hover:bg-blue-100 text-blue-600 transition-colors"
                onClick={() => setEditingTask(task)}
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-md border hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50"
                onClick={() => handleDelete(task.id)}
                disabled={isPending}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>

    {editingTask && (
      <EditTaskDialog
        task={editingTask}
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
      />
    )}
  </>
);
}
