// components/task-form.jsx
"use client";

import { useActionState } from "react";
// import { createTask } from "@/actions/tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createTask } from "@/Actions/tasks";

const initialState = { success: false, errors: {} };

export default function TaskForm() {
  const [state, formAction, isPending] = useActionState(createTask, initialState);

  // Show toast on success
  if (state?.success) {
    toast.success("Task created!");
  }

  return (
    <form action={formAction} className="space-y-4">
      <Input name="title" placeholder="Title" />
      {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}

      <Textarea name="description" placeholder="Description (optional)" rows={3} />

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Creating...
          </span>
        ) : (
          "Create Task"
        )}
      </Button>
    </form>
  );
}
