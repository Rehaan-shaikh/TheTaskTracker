"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";

export default function Header() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getInitials = (name) => {
    return name?.[0]?.toUpperCase() || "";
  };

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between border-b bg-background shadow-sm">
      {/* Left - Logo */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
        <User className="w-6 h-6 text-primary" />
        <span className="text-primary">TaskTrackr</span>
      </Link>

      {/* Right - Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user ? (
          <>
            {/* Tasks Button */}
            <Button
              variant="ghost"
              onClick={() => router.push("/tasks")}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition"
            >
              <ListChecks className="w-4 h-4" />
              Tasks
            </Button>

            {/* Ask AI Button */}
            <Button
              variant="ghost"
              onClick={() => router.push("/askAi")}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition"
            >
              🤖 Ask AI
            </Button>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10 border-2 border-primary shadow ring-1 ring-primary/30 hover:ring-primary transition">
                  <AvatarFallback className="text-black font-semibold text-lg bg-primary">
                    {getInitials(user.name || user.email)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mt-1" align="end">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </header>
  );
}
