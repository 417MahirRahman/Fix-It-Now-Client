import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const faqs = [
  {
    question: "How do I book a technician?",
    answer:
      "Browse technicians or services, pick one that fits, and send a booking request with your preferred date and time. The technician accepts before any payment is taken.",
  },
  {
    question: "When do I pay?",
    answer:
      "Only after the technician accepts your booking. Payment is processed securely through Stripe.",
  },
  {
    question: "Can I cancel a booking?",
    answer: "Yes, you can cancel any time before the job moves to in-progress.",
  },
  {
    question: "How do I become a technician on FixItNow?",
    answer:
      "Register with a technician account, complete your profile with your bio and experience, then list your services and set your availability.",
  },
  {
    question: "How are ratings calculated?",
    answer:
      "Each service's rating is the average of all customer reviews left after a completed booking.",
  },
];

export function FAQ() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
    
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Elegant Header */}
        <div className="text-center mb-20">
          <h2 className="gap-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap justify-center">
            Questions &
            <span className="block text-primary">
              Answers
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything you need to know about FixItNow, answered with clarity.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="group relative border border-border/60 rounded-2xl bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 data-[state=open]:border-primary/50 data-[state=open]:shadow-xl data-[state=open]:shadow-primary/10"
            >
              {/* Subtle gradient accent on open */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-data-[state=open]:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <AccordionTrigger className="relative py-6 px-6 text-left hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  {/* Number badge */}
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary text-sm font-bold border border-primary/10 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span className="flex-1 text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>

                </div>
              </AccordionTrigger>

              <AccordionContent className="relative px-6 pb-6 pt-2">
                <div className="pl-14 pr-4">
                  <div className="h-px w-12 bg-primary/20 mb-4" />
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
