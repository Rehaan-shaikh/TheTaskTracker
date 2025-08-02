import { getCurrentUser } from "@/Actions/getUser";
import { getTasks } from "@/Actions/tasks";
import TaskList from "./_components/taskList";
import TaskForm from "./_components/taskForm";

export default async function TasksPage() {
  const user = await getCurrentUser();
  const tasks = await getTasks();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Page Title */}
      <h1 className="gradient-title text-4xl md:text-5xl">
        Hello, {user?.name || user?.email || "User"} 👋
      </h1>

      {/* Subheading */}
      <p className="text-muted-foreground text-sm mb-2">
        Track your goals and manage tasks efficiently ✨
      </p>

      {/* Task creation form */}
      <TaskForm />

      {/* Task list */}
      <TaskList tasks={tasks} />
    </div>
  );
}
