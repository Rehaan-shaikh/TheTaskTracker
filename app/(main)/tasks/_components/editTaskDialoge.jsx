// components/EditTaskDialog.jsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateTask } from "@/Actions/tasks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditTaskDialog({ task, open, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
      });

      if (res.success) {
        toast.success("Task updated!");
        onClose();
      } else {
        toast.error("Failed to update task");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogTitle>Edit Task</DialogTitle> {/* ✅ Required for a11y */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Edit Task</h2>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Description"
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
