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
    <section className="border-t">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
