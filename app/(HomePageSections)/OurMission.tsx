import {
  ShieldCheck,
  Handshake,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Pros",
    description:
      "Every profile, review, and rating is visible before you book. No guessing, no surprises — just qualified professionals ready to help.",
    accent: "bg-emerald-500",
  },
  {
    icon: Handshake,
    title: "Fair Pricing",
    description:
      "The price on the listing is the price you pay. Transparent quotes, no hidden fees, no last-minute surprises.",
    accent: "bg-blue-500",
  },
  {
    icon: CheckCircle2,
    title: "Accountable",
    description:
      "Every booking moves through a clear, trackable status — from request to completion, you're always in the loop.",
    accent: "bg-amber-500",
  },
];

export function OurMission() {
  const FeaturedIcon = values[0].icon;
  const SecondIcon = values[1].icon;
  const ThirdIcon = values[2].icon;

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />

              <span className="text-md font-semibold uppercase tracking-wider text-primary">
                Our Promise
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Built on trust,
              <br />
              <span className="text-muted-foreground">
                delivered with care.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-lg text-muted-foreground lg:pb-2 lg:text-right">
            Three principles that guide every interaction on FixItNow — because
            your home deserves nothing less.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 sm:p-10 md:col-span-2 lg:row-span-2">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-white/5 blur-2xl" />

            <div className="relative flex min-h-[320px] h-full flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                  <ShieldCheck className="size-4" />
                  Featured Value
                </div>

                <h3 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {values[0].title}
                </h3>

                <p className="max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                  {values[0].description}
                </p>
              </div>

            </div>

            {/* Large icon watermark */}
            <FeaturedIcon className="absolute -bottom-8 -right-8 size-48 text-white/5" />
          </div>

          {/* Second Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-muted/50">
            <div className="mb-6 flex items-start justify-between">
              <div
                className={`inline-flex size-12 items-center justify-center rounded-2xl ${values[1].accent} text-white shadow-lg`}
              >
                <SecondIcon className="size-6" />
              </div>

              <span className="text-5xl font-bold text-muted-foreground/20">
                02
              </span>
            </div>

            <h3 className="mb-3 text-2xl font-bold tracking-tight">
              {values[1].title}
            </h3>

            <p className="leading-relaxed text-muted-foreground">
              {values[1].description}
            </p>
          </div>

          {/* Third Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-muted/50">
            <div className="mb-6 flex items-start justify-between">
              <div
                className={`inline-flex size-12 items-center justify-center rounded-2xl ${values[2].accent} text-white shadow-lg`}
              >
                <ThirdIcon className="size-6" />
              </div>

              <span className="text-5xl font-bold text-muted-foreground/20">
                03
              </span>
            </div>

            <h3 className="mb-3 text-2xl font-bold tracking-tight">
              {values[2].title}
            </h3>

            <p className="leading-relaxed text-muted-foreground">
              {values[2].description}
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 border-t border-border pt-10">
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight sm:text-4xl">
              500+
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Verified technicians
            </div>
          </div>

          <div className="border-x border-border text-center">
            <div className="text-3xl font-bold tracking-tight sm:text-4xl">
              4.9★
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Average rating
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight sm:text-4xl">
              2k+
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Happy customers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
