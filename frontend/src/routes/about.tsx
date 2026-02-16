import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="text-muted-foreground text-lg">
          Althera Speak — built with TanStack Router
        </p>
      </div>
    </div>
  );
}
