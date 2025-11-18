import { Flower2 } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="flex items-center justify-center gap-3 py-6">
        <div className="rounded-full bg-gradient-to-br from-primary to-accent p-2">
          <Flower2 className="h-6 w-6 text-primary-foreground" data-testid="icon-lotus" />
        </div>
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-semibold tracking-tight text-transparent" data-testid="text-sakhi-title">
          Sakhi
        </h1>
      </div>
      <p className="pb-4 text-center text-sm text-muted-foreground" data-testid="text-tagline">
        Your wellness companion
      </p>
    </header>
  );
}
