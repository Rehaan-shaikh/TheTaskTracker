import { Target } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 pt-10">
      <h1 className="gradient-title text-3xl text-center mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-primary" />
        Stay on Track, One Task at a Time
      </h1>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
