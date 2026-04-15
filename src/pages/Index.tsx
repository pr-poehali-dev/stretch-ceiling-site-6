/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/a02a971b-162d-411f-a319-6cf1ec4dffeb.jpg";

const services = [
  { icon: "Layers", title: "ПВХ полотна", desc: "Матовые, сатиновые и глянцевые — классика на все случаи жизни", color: "#7C3AED" },
  { icon: "Wind", title: "Тканевые потолки", desc: "Экологичный материал без запаха, дышащая структура", color: "#06B6D4" },
  { icon: "Lightbulb", title: "Потолки с подсветкой", desc: "Встроенная LED-подсветка любой конфигурации и яркости", color: "#F59E0B" },
  { icon: "Blinds", title: "Скрытые карнизы для штор", desc: "Элегантное решение — штора выезжает прямо из потолка", color: "#10B981" },
  { icon: "Minus", title: "Световые линии", desc: "Тонкие светящиеся полосы — трендовый дизайн 2024–2025", color: "#EC4899" },
  { icon: "Sun", title: "Световые потолки", desc: "Равномерное мягкое свечение по всей площади потолка", color: "#F97316" },
  { icon: "SeparatorHorizontal", title: "Теневое примыкание", desc: "Тёмный зазор между стеной и потолком — эффект парения", color: "#A78BFA" },
  { icon: "Crosshair", title: "Трековое освещение", desc: "Регулируемые споты на рельсе — акцентный и функциональный свет", color: "#34D399" },
  { icon: "Droplets", title: "Слив воды", desc: "Специальный клапан для безопасного отвода воды при затоплении", color: "#38BDF8" },
  { icon: "Wrench", title: "Ремонт натяжных потолков", desc: "Устраняем порезы, провисания и следы от затоплений", color: "#FB923C" },
];

const portfolio = [
  {
    room: "Гостиная",
    style: "Современный минимализм",
    area: "28 м²",
    color: "#7C3AED",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/0030f253-ddcf-4294-81d6-718f50e85b12.jpg",
  },
  {
    room: "Спальня",
    style: "Звёздное небо",
    area: "18 м²",
    color: "#06B6D4",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/3e379fc3-63f7-4a8e-ad11-2fc7e39d0390.jpg",
  },
  {
    room: "Кухня",
    style: "Белый глянец",
    area: "14 м²",
    color: "#F59E0B",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/a97d908f-bf0e-4934-8964-2ac12b153761.jpg",
  },
  {
    room: "Детская",
    style: "Мягкие тона",
    area: "12 м²",
    color: "#EC4899",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/aced47a1-913b-4549-83ca-0f26f70bda34.jpg",
  },
  {
    room: "Ванная",
    style: "Влагостойкий",
    area: "8 м²",
    color: "#10B981",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/b597b316-ff60-4076-ac91-c89673616cc8.jpg",
  },
  {
    room: "Офис",
    style: "Деловой стиль",
    area: "55 м²",
    color: "#F97316",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/98520ffa-b665-4daf-9fff-b69461c55dc9.jpg",
  },
];

const reviews = [
  {
    name: "Анастасия К.",
    rating: 5,
    text: "Сделали потолок в гостиной и спальне. Всё аккуратно, быстро, без пыли. Мастер объяснил все нюансы. Очень довольна результатом!",
    city: "Москва",
    avatar: "А",
  },
  {
    name: "Дмитрий В.",
    rating: 5,
    text: "Заказал многоуровневый потолок с подсветкой. Получилось шикарно! Соседи просят контакты. Работают профессионально, цены честные.",
    city: "СПб",
    avatar: "Д",
  },
  {
    name: "Марина С.",
    rating: 5,
    text: "Обратилась по рекомендации. Замер сделали бесплатно, предложили несколько вариантов дизайна. Результат превзошёл ожидания!",
    city: "Казань",
    avatar: "М",
  },
  {
    name: "Алексей П.",
    rating: 5,
    text: "Второй раз заказываю у них. Качество стабильно высокое. Звёздное небо в детской — ребёнок в восторге!",
    city: "Екатеринбург",
    avatar: "А",
  },
];

const stats = [
  { value: "2400+", label: "Выполненных объектов" },
  { value: "8", label: "Лет на рынке" },
  { value: "1 день", label: "Монтаж в среднем" },
  { value: "15 лет", label: "Гарантия на потолок" },
];

const ROOMS = [
  { id: "living", label: "Гостиная", default: { w: 5.5, h: 4.2 } },
  { id: "bedroom", label: "Спальня", default: { w: 4.0, h: 3.5 } },
  { id: "kitchen", label: "Кухня", default: { w: 3.5, h: 3.0 } },
  { id: "bath", label: "Ванная", default: { w: 2.5, h: 2.0 } },
  { id: "custom", label: "Своя", default: { w: 4, h: 3 } },
];

const TYPES = [
  { id: "mat", label: "Матовый", price: 280 },
  { id: "gloss", label: "Глянцевый", price: 350 },
  { id: "satin", label: "Сатиновый", price: 320 },
  { id: "stars", label: "Звёздное небо", price: 1200 },
  { id: "multi", label: "Многоуровневый", price: 650 },
  { id: "led", label: "LED подсветка", price: 480 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`section-reveal ${inView ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

const galleryItems = [
  {
    title: "Теневое примыкание",
    style: "Парящий эффект",
    color: "#7C3AED",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/c2d71982-909a-4be8-9f69-9b4890cad08e.jpg",
  },
  {
    title: "Скрытые карнизы",
    style: "Скрытая гардина",
    color: "#06B6D4",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/a124141f-cbd7-4fe8-9aab-a16c825ef96f.jpg",
  },
  {
    title: "Парящий потолок",
    style: "Лёгкость пространства",
    color: "#F59E0B",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/3856537a-b293-449e-a5e4-a6a59600a9a2.jpg",
  },
  {
    title: "Световой потолок",
    style: "Мягкий свет",
    color: "#10B981",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/f633a894-5402-496f-8ba6-a8facdb5defb.jpg",
  },
  {
    title: "Световые линии",
    style: "Хай-тек",
    color: "#EC4899",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/f6d08b1d-9296-4d39-8ded-4804dc169e2a.jpg",
  },
  {
    title: "Трековое освещение",
    style: "Акцентный свет",
    color: "#F97316",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/1fe33f53-9f2e-496f-ad3a-5c9552b87b7e.jpg",
  },
];

const HERO_SLIDES = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/a02a971b-162d-411f-a319-6cf1ec4dffeb.jpg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/0030f253-ddcf-4294-81d6-718f50e85b12.jpg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/3e379fc3-63f7-4a8e-ad11-2fc7e39d0390.jpg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/a97d908f-bf0e-4934-8964-2ac12b153761.jpg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/aced47a1-913b-4549-83ca-0f26f70bda34.jpg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/b597b316-ff60-4076-ac91-c89673616cc8.jpg",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [calcRoom, setCalcRoom] = useState(ROOMS[0]);
  const navigate = useNavigate();
  const [calcWidth, setCalcWidth] = useState(5.5);
  const [calcHeight, setCalcHeight] = useState(4.2);
  const [calcType, setCalcType] = useState(TYPES[0]);
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [formSent, setFormSent] = useState(false);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "Портфолио" },
    { id: "gallery", label: "Галерея" },
    { id: "calculator", label: "Калькулятор" },
    { id: "reviews", label: "Отзывы" },
    { id: "about", label: "О нас" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      navItems.forEach((n) => {
        const section = document.getElementById(n.id);
        if (
          section &&
          scrollY >= section.offsetTop &&
          scrollY < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(n.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const calculate = () => {
    const area = calcWidth * calcHeight;
    const total = Math.ceil(area * calcType.price);
    setCalcResult(total);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#1c1535", color: "#fff" }}
    >
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 glass"
        style={{ borderBottom: "1px solid rgba(124,58,237,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            {/* Логотип LeKo */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: 40, height: 40 }}
            >
              <div
                className="absolute inset-0 rounded-xl animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                }}
              />
              <span
                className="relative font-black text-white"
                style={{
                  fontSize: 15,
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "-0.5px",
                }}
              >
                Le
              </span>
              <span
                className="relative font-black"
                style={{
                  fontSize: 15,
                  fontFamily: "Oswald, sans-serif",
                  color: "#F59E0B",
                  letterSpacing: "-0.5px",
                }}
              >
                Ko
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-black"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 17,
                  letterSpacing: "0.04em",
                }}
              >
                <span className="text-white">Потолки</span>
                <span className="gradient-text">LeKo</span>
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                натяжные потолки
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 rounded-lg text-sm transition-all duration-200 font-medium"
                style={{
                  color:
                    activeSection === item.id
                      ? "#fff"
                      : "rgba(255,255,255,0.6)",
                  background:
                    activeSection === item.id
                      ? "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.2))"
                      : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+79001234567"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover-lift"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                color: "#fff",
              }}
            >
              +7 (929) 032-63-45
            </a>
            <button
              className="lg:hidden p-2 rounded-lg glass"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="lg:hidden px-4 pb-4 flex flex-col gap-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-all"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  background:
                    activeSection === item.id
                      ? "rgba(124,58,237,0.2)"
                      : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          {HERO_SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Натяжные потолки"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === heroSlide ? 0.6 : 0, zIndex: i === heroSlide ? 1 : 0 }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(28,21,53,0.82) 0%, rgba(124,58,237,0.15) 50%, rgba(28,21,53,0.78) 100%)",
              zIndex: 2,
            }}
          />
        </div>

        {/* Логотип LeKo поверх видео */}
        <div
          className="absolute top-1/2 right-12 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3 select-none pointer-events-none"
          style={{ opacity: 0.13 }}
        >
          <div
            className="rounded-3xl flex items-center justify-center"
            style={{
              width: 180,
              height: 180,
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            }}
          >
            <span
              className="font-black text-white"
              style={{ fontSize: 72, fontFamily: "Oswald, sans-serif", letterSpacing: "-2px" }}
            >
              Le
            </span>
            <span
              className="font-black"
              style={{ fontSize: 72, fontFamily: "Oswald, sans-serif", color: "#F59E0B", letterSpacing: "-2px" }}
            >
              Ko
            </span>
          </div>
          <span
            className="text-white font-bold tracking-widest uppercase"
            style={{ fontFamily: "Oswald, sans-serif", fontSize: 18, letterSpacing: "0.2em" }}
          >
            НАТЯЖНЫЕ ПОТОЛКИ
          </span>
        </div>

        {/* Точки слайдера */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === heroSlide ? 28 : 8,
                height: 8,
                background: i === heroSlide ? "linear-gradient(135deg, #7C3AED, #06B6D4)" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-72 h-72 rounded-full opacity-15 animate-float delay-300"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-36">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 animate-fade-in-up"
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.4)",
                color: "#A78BFA",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              Монтаж от 1 дня · Гарантия 15 лет
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none mb-6 animate-fade-in-up delay-100"
              style={{
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              НАТЯЖНЫЕ
              <br />
              <span className="gradient-text">ПОТОЛКИ</span>
              <br />
              <span className="text-white">ПОД КЛЮЧ</span>
            </h1>
            <p
              className="text-lg sm:text-xl mb-10 animate-fade-in-up delay-200"
              style={{
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                maxWidth: "500px",
              }}
            >
              Профессиональная установка натяжных потолков любой сложности.
              Замер бесплатно. Работаем по всему городу.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover-lift animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  color: "#fff",
                }}
              >
                Бесплатный замер
              </button>
              <button
                onClick={() => scrollTo("calculator")}
                className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover-lift"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            background: "rgba(124,58,237,0.12)",
            borderTop: "1px solid rgba(124,58,237,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-black gradient-text"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24" style={{ background: "#231b42" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#F59E0B" }}
              >
                Наши преимущества
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                ПОЧЕМУ ВЫБИРАЮТ <span className="gradient-text">НАС</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "FileText",
                title: "Работаем по договору",
                desc: "Фиксируем все условия, цену и сроки. Никаких устных договорённостей.",
                color: "#7C3AED",
              },
              {
                icon: "ShieldCheck",
                title: "Гарантия 15 лет",
                desc: "Официальная гарантия на полотно и монтаж. Подтверждено документально.",
                color: "#06B6D4",
              },
              {
                icon: "Award",
                title: "Опыт более 8 лет",
                desc: "Более 2000 успешных объектов. Умеем работать с любыми задачами.",
                color: "#F59E0B",
              },
              {
                icon: "Layers",
                title: "Любая сложность",
                desc: "Многоуровневые, криволинейные, с подсветкой — беремся за всё.",
                color: "#10B981",
              },
              {
                icon: "Sparkles",
                title: "Чистый монтаж",
                desc: "Работаем аккуратно: без пыли, строительного мусора и лишних хлопот.",
                color: "#EC4899",
              },
              {
                icon: "Receipt",
                title: "Прозрачная смета",
                desc: "Никаких скрытых доплат. Цена в смете — цена при оплате.",
                color: "#F97316",
              },
              {
                icon: "Ruler",
                title: "Замер и расчёт бесплатно",
                desc: "Приедем, измерим, рассчитаем точную стоимость — совершенно бесплатно.",
                color: "#A78BFA",
              },
              {
                icon: "Clock",
                title: "Монтаж за 1 день",
                desc: "Устанавливаем потолок быстро — большинство объектов за один день.",
                color: "#34D399",
              },
            ].map((item, i) => (
              <SectionReveal key={i}>
                <div
                  className="group p-6 rounded-2xl h-full transition-all duration-300 hover-lift"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = item.color + "50")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: item.color + "20" }}
                  >
                    <Icon
                      name={item.icon as any}
                      size={22}
                      style={{ color: item.color }}
                    />
                  </div>
                  <h3
                    className="font-bold text-white text-base mb-2 leading-snug"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-24"
        style={{ background: "#1c1535" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#7C3AED" }}
              >
                Что мы делаем
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="gradient-text">НАШИ</span> УСЛУГИ
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <SectionReveal key={i}>
                <div
                  className="group p-6 rounded-2xl hover-lift cursor-pointer h-full transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = s.color + "50")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: s.color + "20" }}
                  >
                    <Icon
                      name={s.icon as any}
                      size={24}
                      style={{ color: s.color }}
                    />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2 text-white"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}
                  >
                    {s.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        id="portfolio"
        className="py-24"
        style={{ background: "#231b42" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#06B6D4" }}
              >
                Наши работы
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="gradient-text">ПОРТФОЛИО</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolio.map((p, i) => (
              <SectionReveal key={i}>
                <div
                  className="group rounded-2xl overflow-hidden hover-lift cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = p.color + "55")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <div className="h-52 relative overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.room}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)",
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          color: "#fff",
                          backdropFilter: "blur(6px)",
                          border: `1px solid ${p.color}60`,
                        }}
                      >
                        {p.area}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div
                        className="text-white font-black text-xl"
                        style={{
                          fontFamily: "Oswald, sans-serif",
                          textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                        }}
                      >
                        {p.room}
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {p.style}
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-4 flex items-center justify-between"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Посмотреть детали
                    </span>
                    <Icon
                      name="ArrowRight"
                      size={16}
                      style={{ color: p.color }}
                    />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* CTA */}
          <SectionReveal>
            <div className="mt-10 text-center">
              <button
                onClick={() => navigate("/portfolio")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover-lift"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  color: "#A78BFA",
                }}
              >
                Смотреть все работы
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24" style={{ background: "#1c1535" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#F59E0B" }}
              >
                Вдохновение
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="gradient-text">ГАЛЕРЕЯ</span> ДИЗАЙНОВ
              </h2>
            </div>
          </SectionReveal>
          <div className="flex gap-3 mb-6 flex-wrap justify-center">
            {galleryItems.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveGallery(i)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background:
                    activeGallery === i
                      ? "linear-gradient(135deg, #7C3AED, #06B6D4)"
                      : "rgba(255,255,255,0.06)",
                  color: activeGallery === i ? "#fff" : "rgba(255,255,255,0.6)",
                  border:
                    "1px solid " +
                    (activeGallery === i
                      ? "transparent"
                      : "rgba(255,255,255,0.08)"),
                }}
              >
                {g.title}
              </button>
            ))}
          </div>
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map((g, i) => (
                <div
                  key={i}
                  onClick={() => setActiveGallery(i)}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover-lift relative group"
                  style={{
                    height: i === 0 || i === 5 ? "280px" : "200px",
                    border:
                      activeGallery === i
                        ? `2px solid ${g.color}`
                        : "2px solid transparent",
                  }}
                >
                  <img
                    src={g.img}
                    alt={g.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        activeGallery === i
                          ? "rgba(0,0,0,0.45)"
                          : "rgba(0,0,0,0.3)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="font-bold text-white text-base leading-tight mb-0.5"
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {g.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      {g.style}
                    </div>
                  </div>
                  {activeGallery === i && (
                    <div
                      className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: g.color }}
                    >
                      <Icon name="Check" size={13} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CALCULATOR */}
      <section
        id="calculator"
        className="py-24"
        style={{ background: "#231b42" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#10B981" }}
              >
                Онлайн-расчёт
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="gradient-text">КАЛЬКУЛЯТОР</span>
              </h2>
              <p
                className="mt-4 text-base"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Узнайте примерную стоимость за 30 секунд
              </p>
            </div>
          </SectionReveal>
          <SectionReveal>
            <div
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <div className="mb-8">
                <label
                  className="text-sm font-semibold uppercase tracking-wider mb-3 block"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Тип помещения
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROOMS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCalcRoom(r);
                        setCalcWidth(r.default.w);
                        setCalcHeight(r.default.h);
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background:
                          calcRoom.id === r.id
                            ? "linear-gradient(135deg, #7C3AED, #06B6D4)"
                            : "rgba(255,255,255,0.06)",
                        color: "#fff",
                        border:
                          "1px solid " +
                          (calcRoom.id === r.id
                            ? "transparent"
                            : "rgba(255,255,255,0.08)"),
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label
                    className="text-sm font-semibold uppercase tracking-wider mb-2 block"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Длина: <span className="text-white">{calcWidth} м</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(+e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#7C3AED" }}
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-semibold uppercase tracking-wider mb-2 block"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Ширина: <span className="text-white">{calcHeight} м</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(+e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#7C3AED" }}
                  />
                </div>
              </div>
              <div className="mb-8">
                <label
                  className="text-sm font-semibold uppercase tracking-wider mb-3 block"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Вид потолка
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCalcType(t)}
                      className="p-3 rounded-xl text-left transition-all"
                      style={{
                        background:
                          calcType.id === t.id
                            ? "rgba(124,58,237,0.2)"
                            : "rgba(255,255,255,0.04)",
                        border:
                          "1px solid " +
                          (calcType.id === t.id
                            ? "#7C3AED"
                            : "rgba(255,255,255,0.08)"),
                      }}
                    >
                      <div className="font-semibold text-sm text-white">
                        {t.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        от {t.price} ₽/м²
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div
                  className="flex-1 p-4 rounded-2xl text-center w-full"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <div
                    className="text-2xl font-black gradient-text"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {(calcWidth * calcHeight).toFixed(1)} м²
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Площадь потолка
                  </div>
                </div>
                <button
                  onClick={calculate}
                  className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover-lift w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                    color: "#fff",
                  }}
                >
                  Рассчитать
                </button>
                {calcResult && (
                  <div
                    className="flex-1 p-4 rounded-2xl text-center animate-fade-in w-full"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}
                  >
                    <div
                      className="text-2xl font-black"
                      style={{
                        color: "#06B6D4",
                        fontFamily: "Oswald, sans-serif",
                      }}
                    >
                      ~{calcResult.toLocaleString("ru-RU")} ₽
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Примерная стоимость
                    </div>
                  </div>
                )}
              </div>
              <p
                className="text-center text-xs mt-4"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                * Финальная стоимость уточняется при бесплатном замере
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ background: "#1c1535" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#EC4899" }}
              >
                Клиенты о нас
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="gradient-text">ОТЗЫВЫ</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r, i) => (
              <SectionReveal key={i}>
                <div
                  className="p-5 rounded-2xl h-full hover-lift"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-base"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                      }}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">
                        {r.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {r.city}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(r.rating)].map((_, j) => (
                      <span key={j} style={{ color: "#F59E0B" }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {r.text}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24" style={{ background: "#231b42" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <span
                  className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                  style={{ color: "#7C3AED" }}
                >
                  Кто мы
                </span>
                <h2
                  className="text-4xl sm:text-5xl font-black mb-6"
                  style={{ fontFamily: "Oswald, sans-serif", lineHeight: 1.1 }}
                >
                  О <span className="gradient-text">КОМПАНИИ</span>
                </h2>
                <p
                  className="text-base leading-relaxed mb-5"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Мы — команда профессионалов с 8-летним опытом установки
                  натяжных потолков. За это время мы выполнили более 2400
                  объектов, от небольших ванных комнат до просторных офисных
                  помещений.
                </p>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Работаем только с сертифицированными материалами европейских
                  производителей. Даём гарантию 15 лет на всю продукцию и
                  монтаж.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: "Shield",
                      label: "Гарантия 15 лет",
                      color: "#7C3AED",
                    },
                    {
                      icon: "Clock",
                      label: "Монтаж от 1 дня",
                      color: "#06B6D4",
                    },
                    {
                      icon: "Truck",
                      label: "Бесплатный замер",
                      color: "#F59E0B",
                    },
                    { icon: "Award", label: "Сертификаты", color: "#10B981" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon
                        name={item.icon as any}
                        size={20}
                        style={{ color: item.color }}
                      />
                      <span className="text-sm font-medium text-white">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl text-center hover-lift"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.04))"
                          : "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.04))",
                      border:
                        "1px solid " +
                        (i % 2 === 0
                          ? "rgba(124,58,237,0.2)"
                          : "rgba(6,182,212,0.2)"),
                    }}
                  >
                    <div
                      className="text-3xl sm:text-4xl font-black gradient-text mb-1"
                      style={{ fontFamily: "Oswald, sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs sm:text-sm"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section
        id="contacts"
        className="py-24"
        style={{ background: "#1c1535" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: "#F97316" }}
              >
                Свяжитесь с нами
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="gradient-text">КОНТАКТЫ</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <SectionReveal>
              <div
                className="rounded-3xl p-6 sm:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                <h3
                  className="text-2xl font-bold mb-6 text-white"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  Заявка на замер
                </h3>
                {formSent ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="text-5xl mb-4">🎉</div>
                    <div className="text-xl font-bold text-white mb-2">
                      Заявка отправлена!
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.5)" }}>
                      Мы перезвоним вам в течение 30 минут
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label
                        className="text-sm font-medium mb-1.5 block"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        placeholder="Иван Петров"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium mb-1.5 block"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Телефон
                      </label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium mb-1.5 block"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Комментарий
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Расскажите о вашем проекте..."
                        value={formData.comment}
                        onChange={(e) =>
                          setFormData({ ...formData, comment: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/30 outline-none resize-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (formData.name && formData.phone) setFormSent(true);
                      }}
                      className="w-full py-4 rounded-2xl font-bold text-lg transition-all hover-lift mt-2"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                        color: "#fff",
                      }}
                    >
                      Заказать бесплатный замер
                    </button>
                    <p
                      className="text-xs text-center"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Нажимая кнопку, вы соглашаетесь с политикой
                      конфиденциальности
                    </p>
                  </div>
                )}
              </div>
            </SectionReveal>
            <SectionReveal>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: "Phone",
                    label: "Телефон",
                    value: "+7 (900) 123-45-67",
                    sub: "Ежедневно с 8:00 до 21:00",
                    color: "#7C3AED",
                  },
                  {
                    icon: "MessageCircle",
                    label: "WhatsApp / Telegram",
                    value: "+7 (900) 123-45-67",
                    sub: "Ответим в течение 5 минут",
                    color: "#06B6D4",
                  },
                  {
                    icon: "MapPin",
                    label: "Адрес офиса",
                    value: "ул. Строителей, 15, офис 301",
                    sub: "г. Москва",
                    color: "#F59E0B",
                  },
                  {
                    icon: "Mail",
                    label: "Email",
                    value: "info@potolokpro.ru",
                    sub: "Для деловых запросов",
                    color: "#10B981",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-2xl hover-lift transition-all"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: c.color + "20" }}
                    >
                      <Icon
                        name={c.icon as any}
                        size={20}
                        style={{ color: c.color }}
                      />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-0.5"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {c.label}
                      </div>
                      <div className="font-semibold text-white">{c.value}</div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {c.sub}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 mt-2">
                  {[
                    { icon: "Send", label: "Telegram", color: "#06B6D4" },
                    { icon: "MessageSquare", label: "VK", color: "#5B8DD9" },
                    { icon: "Instagram", label: "Instagram", color: "#EC4899" },
                  ].map((s, i) => (
                    <button
                      key={i}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all hover-lift"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: s.color,
                      }}
                    >
                      <Icon name={s.icon as any} size={16} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 text-center"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "#160f2e",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              }}
            >
              <Icon name="Layers" size={14} className="text-white" />
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              <span className="gradient-text">ПОТОЛОК</span>
              <span className="text-white">ПРО</span>
            </span>
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2025 ПотолокПРО. Все права защищены.
          </div>
          <div
            className="flex gap-4 text-xs"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <button className="hover:text-white transition-colors">
              Политика конфиденциальности
            </button>
            <button className="hover:text-white transition-colors">
              Оферта
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}