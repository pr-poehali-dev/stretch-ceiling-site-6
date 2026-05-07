import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const VISITS_URL = "https://functions.poehali.dev/da982158-812d-428b-b33f-8499fdea640f";

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",") + "к";
  return n.toString();
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visit_counted");

    if (!alreadyCounted) {
      fetch(VISITS_URL, { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          setCount(d.count);
          sessionStorage.setItem("visit_counted", "1");
        })
        .catch(() => {});
    } else {
      fetch(VISITS_URL)
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
    }
  }, []);

  if (count === null) return null;

  return (
    <div
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
      style={{
        background: "rgba(124,58,237,0.12)",
        border: "1px solid rgba(124,58,237,0.25)",
        color: "rgba(255,255,255,0.45)",
      }}
    >
      <Icon name="Eye" size={11} />
      <span>{formatCount(count)} посетителей</span>
    </div>
  );
}
