import { ShieldCheck, Handshake, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Pros",
    description:
      "Every profile, review, and rating is visible before you book.",
  },
  {
    icon: Handshake,
    title: "Fair Pricing",
    description: "The price on the listing is the price you pay.",
  },
  {
    icon: CheckCircle2,
    title: "Accountable",
    description: "Every booking moves through a clear, trackable status.",
  },
];

export function OurMission() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Our mission
        </h2>
        <p className="text-muted-foreground mt-1 max-w-xl mx-auto">
          Make it simple to find someone you can trust with your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {values.map((value) => (
          <Card key={value.title}>
            <CardContent className="p-6 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <value.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
