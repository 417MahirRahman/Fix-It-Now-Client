import { Search, CalendarCheck, Wrench, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find the right pro",
    description:
      "Browse by category, location, and rating to find your perfect match.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: CalendarCheck,
    title: "Book a time that works",
    description:
      "Pick a convenient slot and send your request with just a few clicks.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wrench,
    title: "Get it fixed",
    description:
      "They confirm, do the work, and you pay only once it's done right.",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y bg-gradient-to-b from-background to-muted/20">
      {/* Decorative background elements */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="gap-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap justify-center">
            How It
            <span className="block text-primary">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From finding the right technician to getting the job done — here is
            how we make it effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="group relative">
                  {/* Card */}
                  <div className="relative rounded-2xl border border-border/50 bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl">
                    {/* Icon */}
                    <div
                      className={`relative mb-6 inline-flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="relative z-10 size-9 text-white" />

                      {/* Glow */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-50`}
                      />
                    </div>

                    {/* Step number */}
                    <div className="absolute right-6 top-6 text-6xl font-bold text-muted-foreground/10 transition-colors group-hover:text-primary/10">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="relative space-y-3">
                      <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                        {step.title}
                      </h3>

                      <p className="leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {i < steps.length - 1 && (
                      <div className="absolute -right-6 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary/20 bg-background text-primary shadow-lg lg:flex">
                        <ArrowRight className="size-5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
