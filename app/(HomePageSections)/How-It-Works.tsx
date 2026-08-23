import { Search, CalendarCheck, Wrench } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find the right pro",
    description: "Browse by category, location, and rating.",
  },
  {
    icon: CalendarCheck,
    title: "Book a time that works",
    description: "Pick a slot and send your request.",
  },
  {
    icon: Wrench,
    title: "Get it fixed",
    description: "They confirm, do the work, you pay once it's done.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="text-muted-foreground mt-1">
            Three steps, start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center px-6 py-8"
            >
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-px h-24 border-l border-dashed border-border" />
              )}
              <div className="flex size-12 items-center justify-center rounded-full bg-background text-foreground border mb-4">
                <step.icon className="size-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
