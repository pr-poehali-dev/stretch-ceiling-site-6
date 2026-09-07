import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";

interface Review {
  name: string;
  rating: number;
  text: string;
  city: string;
  avatar: string;
}

interface ReviewsProps {
  reviews: Review[];
  id?: string;
}

const Reviews = ({ reviews, id = "reviews" }: ReviewsProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Монтаж натяжных потолков ПотолкиLeKo",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: String(reviews.length * 23),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.text,
    })),
  };

  return (
    <section id={id} className="py-24" style={{ background: "#f6f3fa" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#EC4899" }}
          >
            Нам доверяют
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black"
            style={{ fontFamily: "Oswald, sans-serif", color: "#1a1a2e" }}
          >
            ОТЗЫВЫ <span className="gradient-text">КЛИЕНТОВ</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={20} style={{ color: "#F59E0B" }} fill="#F59E0B" />
            ))}
            <span className="ml-2 font-bold" style={{ color: "#1a1a2e" }}>
              5.0 · 94 отзыва
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl hover-lift transition-all"
              style={{
                background: "rgba(124,58,237,0.05)",
                border: "1px solid rgba(124,58,237,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>
                    {r.name}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(26,26,46,0.45)" }}>
                    {r.city}
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, si) => (
                  <Icon key={si} name="Star" size={13} style={{ color: "#F59E0B" }} fill="#F59E0B" />
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,46,0.6)" }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
