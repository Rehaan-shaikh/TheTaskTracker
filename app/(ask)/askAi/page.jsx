import AskForm from "./_componenets/askForm";

export default function AskPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-title animate-gradient bg-clip-text text-transparent">
          Ask Gemini AI 🤖
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Got a question? Get instant answers powered by Google's Gemini.
        </p>
      </div>

      <AskForm />
    </div>
  );
}
