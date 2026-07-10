 
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const catalogItems = [
  {
    slug: "shadow",
    title: "Теневые потолки",
    desc: "Декоративная щель создаёт эффект парения",
    color: "#7C3AED",
    icon: "Layers",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    slug: "floating",
    title: "Парящие потолки",
    desc: "Полотно зависает в воздухе без видимых опор",
    color: "#06B6D4",
    icon: "Wind",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
  },
  {
    slug: "cornices",
    title: "Скрытые карнизы",
    desc: "Шторы «вырастают» прямо из потолка",
    color: "#F59E0B",
    icon: "EyeOff",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  },
  {
    slug: "films",
    title: "Виды плёнок",
    desc: "Глянец, матовый, сатин, фотопечать и другие",
    color: "#10B981",
    icon: "Palette",
    img: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
  },
  {
    slug: "spotlights",
    title: "Светильники (втяжка)",
    desc: "Встраиваемые LED-светильники в полотно",
    color: "#EC4899",
    icon: "Lightbulb",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/f580be16-e088-4afd-97f4-a0a3742df684.jpeg",
  },
  {
    slug: "light-lines",
    title: "Световые линии",
    desc: "Тонкие светящиеся полосы в потолке",
    color: "#7C3AED",
    icon: "Zap",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/9610b5aa-7d30-408d-a329-724e4789855d.jpg",
  },
  {
    slug: "track-lighting",
    title: "Трековое освещение",
    desc: "Светильники на шине с гибкой расстановкой",
    color: "#F59E0B",
    icon: "Move",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/524441c5-7988-4e74-8009-f490fb319f39.jpg",
  },
  {
    slug: "light-ceilings",
    title: "Световые потолки",
    desc: "Полотно светится изнутри мягким светом",
    color: "#06B6D4",
    icon: "Sun",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/3d678a67-fcdf-4602-aa63-b1250169204f.jpg",
  },
  {
    slug: "shadow-vents",
    title: "Теневые вытяжки",
    desc: "Вентиляция, скрытая в теневом зазоре",
    color: "#10B981",
    icon: "Wind",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/9dc7a610-130d-4312-9e13-d13f10327d37.jpg",
  },
  {
    slug: "curtain-niches",
    title: "Ниши для электрокарниза",
    desc: "Скрытый привод и рельса моторизованных штор",
    color: "#F97316",
    icon: "Blinds",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/c141de12-7ce7-433e-96ec-e78bfbad6448.jpg",
  },
  {
    slug: "builtin-cornices",
    title: "Встраиваемые карнизы для штор",
    desc: "Штора «вырастает» прямо из потолка",
    color: "#7C3AED",
    icon: "Blinds",
    img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/6bced623-83d8-4ead-aa55-d90ed81172c4.jpg",
  },
];

const projects: {
  id: number;
  title: string;
  category: string;
  type: string;
  area: string;
  duration: string;
  city: string;
  year: string;
  description: string;
  tags: string[];
  color: string;
  img: string;
}[] = [
  // Сюда добавляй новые фото в формате:
  // {
  //   id: 1,
  //   title: "Название",
  //   category: "Гостиная",
  //   type: "Матовый",
  //   area: "20 м²",
  //   duration: "1 день",
  //   city: "Обнинск",
  //   year: "2025",
  //   description: "Описание работы",
  //   tags: ["Тег1", "Тег2"],
  //   color: "#7C3AED",
  //   img: "URL фото",
  // },
];

const categories = ["Все", "Гостиная", "Спальня", "Кухня", "Детская", "Офис", "Зал"];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`section-reveal ${inView ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`section-reveal ${inView ? "visible" : ""}`}>
      <div
        onClick={onClick}
        className="group rounded-2xl overflow-hidden cursor-pointer hover-lift transition-all duration-300"
        style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.08)" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = project.color + "80")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "220px" }}>
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

        </div>
      </div>
    </div>
  );
}

function Modal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl animate-fade-in"
        style={{ background: "#2e2260", border: "1px solid rgba(124,58,237,0.4)" }}
        onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover-lift"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
          <Icon name="X" size={18} />
        </button>

        {/* Image */}
        <div className="relative" style={{ height: "320px" }}>
          <img src={project.img} alt={project.title} loading="lazy" className="w-full h-full object-cover rounded-t-3xl" />
          <div className="absolute inset-0 rounded-t-3xl"
            style={{ background: "linear-gradient(to top, rgba(46,34,96,1) 0%, transparent 60%)" }} />
          <div className="absolute bottom-5 left-6">
            <div className="flex gap-2 mb-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: project.color + "cc", color: "#fff" }}>
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{project.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            {project.description}
          </p>



          <button
            className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift"
            style={{ background: `linear-gradient(135deg, ${project.color}, #06B6D4)` }}>
            Заказать такой же потолок
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [search, setSearch] = useState("");

  const filtered = projects.filter(p => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: "#2e2260", color: "#fff" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass" style={{ borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="relative flex items-center justify-center" style={{ width: 40, height: 40 }}>
              <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }} />
              <span className="relative font-black text-white" style={{ fontSize: 15, fontFamily: "Oswald, sans-serif", letterSpacing: "-0.5px" }}>Le</span>
              <span className="relative font-black" style={{ fontSize: 15, fontFamily: "Oswald, sans-serif", color: "#F59E0B", letterSpacing: "-0.5px" }}>Ko</span>
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, letterSpacing: "0.04em" }}>
                <span className="text-white">Потолки</span><span className="gradient-text">LeKo</span>
              </span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em", textTransform: "uppercase" }}>натяжные потолки</span>
            </div>
          </button>
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover-lift"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
            <Icon name="ArrowLeft" size={15} />
            На главную
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-28 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #7C3AED 0%, transparent 70%)", filter: "blur(60px)" }} />
        <SectionReveal>
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "#7C3AED" }}>Наши работы</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
            <span className="gradient-text">ПРИМЕРЫ</span> РАБОТ
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
            Реальные объекты нашей компании — от уютных квартир до офисных пространств
          </p>
        </SectionReveal>
      </div>

      {/* CATALOG CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-14">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>
            Наши услуги
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
            {catalogItems.map(item => (
              <div
                key={item.slug}
                onClick={() => navigate(`/portfolio/${item.slug}`)}
                className="flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden hover-lift transition-all duration-300 group"
                style={{ width: 220, scrollSnapAlign: "start", border: `1px solid ${item.color}30` }}
              >
                <div className="relative" style={{ height: 150 }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${item.color}dd 0%, transparent 60%)` }} />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="font-black text-white text-base leading-tight" style={{ fontFamily: "Oswald, sans-serif" }}>{item.title}</div>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: item.color }}>
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                </div>
                <div className="px-3 py-2.5" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <SectionReveal>
          {/* Search */}
          <div className="relative mb-5 max-w-md mx-auto">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(255,255,255,0.35)" }} />
            <input
              type="text"
              placeholder="Поиск по типу или помещению..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder:text-white/30 outline-none transition-all text-sm"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? "linear-gradient(135deg, #7C3AED, #06B6D4)" : "rgba(255,255,255,0.12)",
                  color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.85)",
                  border: "1px solid " + (activeCategory === cat ? "transparent" : "rgba(255,255,255,0.18)"),
                }}>
                {cat}
                {cat === "Все" && <span className="ml-1.5 text-xs opacity-70">({projects.length})</span>}
              </button>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-lg font-semibold text-white mb-1">Ничего не найдено</div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Попробуйте изменить фильтры</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        )}

        {/* CTA */}
        <SectionReveal>
          <div className="mt-16 text-center p-10 rounded-3xl"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.25)" }}>
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "Oswald, sans-serif" }}>
              Хотите такой же потолок?
            </h3>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
              Бесплатный замер и консультация дизайнера — в удобное для вас время
            </p>
            <button onClick={() => navigate("/#contacts")}
              className="px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift"
              style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              Заказать бесплатный замер
            </button>
          </div>
        </SectionReveal>
      </div>

      {/* MODAL */}
      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}