"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Timer, ClipboardList, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "Task Tracking",
      description: "Keep a record of all your tasks in one place.",
      icon: <ClipboardList className="h-8 w-8 text-primary mb-4" />,
    },
    {
      title: "Deadlines & Reminders",
      description: "Never miss an important deadline again.",
      icon: <Timer className="h-8 w-8 text-primary mb-4" />,
    },
    {
      title: "Progress Monitoring",
      description: "Visualize your progress over time.",
      icon: <TrendingUp className="h-8 w-8 text-primary mb-4" />,
    },
    {
      title: "Goal Completion",
      description: "Celebrate every task you complete.",
      icon: <CheckCircle2 className="h-8 w-8 text-primary mb-4" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-15 bg-transparent text-center">
        <h1 className="gradient-title text-4xl md:text-5xl mb-4">
          Simplify Your Workflow with TaskTrackr
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Track tasks, manage goals, and boost your productivity all in one
          place.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/tasks">
            <Button className="h-11 px-6 text-base">Start Tracking</Button>
          </Link>
          <Link href="/askAi">
            <Button variant="outline" className="h-11 px-6 text-base">
              🤖 Ask AI
            </Button>
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <section className="w-full pb-10 flex justify-center">
        <div className="w-full max-w-5xl aspect-video relative rounded-lg border shadow-lg overflow-hidden">
          <Image
            src="/unnamed.png" // ensure this image is inside public/
            alt="Hero Image"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-muted/25">
        <div className="container px-4 mx-auto">
          <h2 className="section-title text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="border-2 hover:border-primary transition-all"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8 px-4">
          <div>
            <h3 className="text-4xl font-bold text-foreground">1K+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-foreground">10K+</h3>
            <p className="text-muted-foreground">Tasks Completed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-foreground">99%</h3>
            <p className="text-muted-foreground">User Satisfaction</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-foreground">24/7</h3>
            <p className="text-muted-foreground">Access Anywhere</p>
          </div>
        </div>
      </section>
    </div>
  );
}
