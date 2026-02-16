import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Althera Speak</h1>
        <p className="text-muted-foreground text-lg">
          Full-stack app powered by React, Elysia &amp; PostgreSQL
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  );
}

export default App;
