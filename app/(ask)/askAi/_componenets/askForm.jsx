"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { askAI } from "@/Actions/askAi";

const initialState = { success: false };

export default function AskForm() {
  const [state, formAction, isPending] = useActionState(askAI, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="question" className="text-sm font-medium">
          Ask your question
        </label>
        <Input
          id="question"
          name="question"
          placeholder="e.g. How to be productive at work?"
          className="h-11 text-base"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full text-base">
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Asking...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Ask Gemini
          </span>
        )}
      </Button>

      {state?.success && (
        <div className="mt-4 rounded-lg border bg-background p-4 shadow-sm animate-fade-in">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            ✨ Gemini says:
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {state.answer}
          </p>
        </div>
      )}

      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
    </form>
  );
}
