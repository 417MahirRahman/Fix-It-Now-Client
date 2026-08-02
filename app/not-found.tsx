import Link from "next/link";
import { Wrench, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Wrench className="size-7" />
        </div>

        {/* Torn job-ticket motif */}
        <div className="relative mx-auto max-w-xs rounded-xl border border-dashed border-border bg-card px-6 py-8">
          <p className="text-6xl font-bold tracking-tight text-primary">404</p>
          <p className="mt-2 font-semibold">This page never got booked</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist, or the link may
            be broken.
          </p>
        </div>

        <Button asChild size="lg" className="mt-8">
          <Link href="/">
            <Home className="size-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
