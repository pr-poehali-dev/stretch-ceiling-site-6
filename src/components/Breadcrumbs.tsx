import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  dark?: boolean;
}

const SITE_URL = "https://potolkileko40.ru";

const Breadcrumbs = ({ items, dark = true }: BreadcrumbsProps) => {
  const allItems: Crumb[] = [{ label: "Главная", path: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.path ?? ""}`,
    })),
  };

  const textColor = dark ? "rgba(255,255,255,0.55)" : "rgba(26,26,46,0.55)";
  const activeColor = dark ? "#fff" : "#1a1a2e";
  const sepColor = dark ? "rgba(255,255,255,0.3)" : "rgba(26,26,46,0.3)";

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <Icon name="ChevronRight" size={12} style={{ color: sepColor }} />}
              {!isLast && item.path ? (
                <a
                  href={item.path}
                  className="transition-colors hover:underline"
                  style={{ color: textColor, textDecoration: "none" }}
                >
                  {item.label}
                </a>
              ) : (
                <span style={{ color: activeColor, fontWeight: 500 }}>{item.label}</span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumbs;
