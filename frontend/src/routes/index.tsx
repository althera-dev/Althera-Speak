import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Althera Speak</h1>
        {session ? (
          <>
            <p className="text-muted-foreground text-lg">
              Welcome back, <span className="font-semibold">{session.user.name}</span>!
            </p>
            <p className="text-sm text-muted-foreground">
              Signed in as @{session.user.username ?? session.user.email}
            </p>
          </>
        ) : (
          <>
            <p className="text-muted-foreground text-lg">
              Full-stack app powered by React, Elysia &amp; PostgreSQL
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
