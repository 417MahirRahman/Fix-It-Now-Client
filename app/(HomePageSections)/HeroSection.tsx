import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bg-image.png"
            alt="Professional technician fixing kitchen sink"
            className="h-full w-full object-cover"
            fill
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1] text-white">
              Fast Home Repair
              <br />
              Services Nearby
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-white leading-relaxed max-w-xl">
              Our verified experts diagnose and repair plumbing, electrical, and
              appliance issues — book a trusted technician in minutes.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                <Link
                  href="/allTechnicians"
                  className="flex items-center gap-2"
                >
                  Find a Technician
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
