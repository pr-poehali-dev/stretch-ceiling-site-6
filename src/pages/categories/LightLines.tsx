import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/9610b5aa-7d30-408d-a329-724e4789855d.jpg",
];

const types = [
  { name: "Прямая линия", desc: "Тонкая световая полоса вдоль стены или по периметру потолка. Визуально вытягивает пространство.", color: "#7C3AED" },
  { name: "Контурная фигура", desc: "Линии складываются в геометрические фигуры — квадраты, круги, зигзаги. Акцент в зонировании.", color: "#06B6D4" },
  { name: "Парящая линия", desc: "Свет скрыт в теневом зазоре — сама лента не видна, виден только мягкий свет.", color: "#F59E0B" },
  { name: "RGB-лента", desc: "Меняет цвет и яркость через пульт или приложение. Подходит для динамичных интерьеров.", color: "#EC4899" },
];

const features = [
  { icon: "Ruler", title: "Любая длина и форма", text: "Гибкий алюминиевый профиль повторяет контур любой сложности" },
  { icon: "Zap", title: "Экономичность", text: "LED-лента потребляет минимум энергии при ярком равномерном свете" },
  { icon: "Settings", title: "Управление", text: "Диммер, пульт или приложение — регулировка яркости и цвета" },
];

export default function LightLines() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen" style={{ background: "#1a1438", color: "#fff" }}>
      <nav className="fixed top-0 left-0 right-0 z-40 glass" style={{ borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/portfolio")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover-lift"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
            <Icon name="ArrowLeft" size={15} />
            Назад
          </button>
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Световые линии</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}>
          <Icon name="Zap" size={14} />
          Освещение
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>СВЕТОВЫЕ</span>{" "}ЛИНИИ
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Тонкие светящиеся полосы, встроенные в потолок или стык со стеной. Создают современный акцент и мягкое равномерное освещение без видимых светильников.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(item => (
          <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              <Icon name={item.icon} size={18} className="text-white" />
            </div>
            <div className="font-bold text-white mb-1">{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>Виды световых линий</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map(item => (
            <div key={item.name} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: `1px solid ${item.color}30` }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <div className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{item.name}</div>
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-3xl font-black text-white mb-6 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>Наши работы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ height: 240 }}>
                <img src={src} alt={`Световая линия ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center pb-24 px-4">
          <div className="inline-block p-8 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon name="ImagePlus" size={40} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.3)" }} />
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Фотографии скоро появятся</p>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 pb-20 text-center">
        <button onClick={() => navigate("/#contacts")}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift"
          style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
          Заказать бесплатный замер
        </button>
      </div>
    </div>
  );
}
