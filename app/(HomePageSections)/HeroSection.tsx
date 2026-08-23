import Link from "next/link";
import {
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center">
    
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-[1.1]">
              Home repairs, handled
              <br />
              by people who{" "}
              <span className="text-primary">actually show up</span>.
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-lg text-muted-foreground text-pretty leading-relaxed max-w-lg">
              Book verified plumbers, electricians, cleaners, and painters — see
              their ratings, reviews, and pricing before you ever pick up the
              phone.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base font-medium"
              >
                <Link
                  href="/allTechnicians"
                  className="flex items-center gap-2"
                >
                  Find a Technician
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base font-medium"
              >
                <Link href="/services">Browse Services</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Verified technicians</span>
              </span>
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span>Real customer ratings</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Satisfaction guaranteed</span>
              </span>
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="relative flex items-center justify-center">
            <div className="w-full aspect-[4/3] bg-muted/50 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-background">
                  <ImageIcon className="size-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Hero Image
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    800 × 600px recommended
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
