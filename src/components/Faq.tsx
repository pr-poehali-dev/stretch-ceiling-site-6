import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  id?: string;
}

const Faq = ({ items, title = "Частые вопросы", id = "faq" }: FaqProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id={id} className="py-24" style={{ background: "#e7e0f5" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#06B6D4" }}
          >
            Остались вопросы
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black"
            style={{ fontFamily: "Oswald, sans-serif", color: "#1a1a2e" }}
          >
            {title}
          </h2>
        </div>
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl px-5 border-none"
              style={{
                background: "rgba(124,58,237,0.05)",
                border: "1px solid rgba(124,58,237,0.12)",
              }}
            >
              <AccordionTrigger
                className="text-left font-bold hover:no-underline"
                style={{ color: "#1a1a2e", fontFamily: "Oswald, sans-serif" }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent style={{ color: "rgba(26,26,46,0.65)" }}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
