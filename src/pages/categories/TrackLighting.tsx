import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/524441c5-7988-4e74-8009-f490fb319f39.jpg",
];

const types = [
  { name: "Магнитный трек", desc: "Светильники крепятся и перемещаются по шине на магнитах — легко менять расположение без инструмента.", color: "#F59E0B" },
  { name: "Шинный трек 220В", desc: "Классическая система на однофазной шине. Надёжна и проста в обслуживании.", color: "#7C3AED" },
  { name: "Трёхфазный трек", desc: "Позволяет управлять группами светильников отдельно — для сложных сценариев освещения.", color: "#06B6D4" },
  { name: "Встроенный трек", desc: "Утоплен в потолок заподлицо — минималистичный вид без выступающего короба.", color: "#10B981" },
];

const features = [
  { icon: "Move", title: "Гибкая расстановка", text: "Светильники двигаются по треку и меняют угол наклона под любую задачу" },
  { icon: "Layers", title: "Зонирование света", text: "Можно подсветить картину, рабочую зону и общий свет одной системой" },
  { icon: "Plug", title: "Простое расширение", text: "Новый светильник просто защёлкивается на шину без монтажа проводки" },
];

export default function TrackLighting() {
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
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Трековое освещение</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(245,158,11,0.15)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.3)" }}>
          <Icon name="Lightbulb" size={14} />
          Освещение
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #F59E0B, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ТРЕКОВОЕ</span>{" "}ОСВЕЩЕНИЕ
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Светильники крепятся на шину-трек и свободно перемещаются вдоль неё. Удобно менять направление света и добавлять новые точки без переделки потолка.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(item => (
          <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #F59E0B, #7C3AED)" }}>
              <Icon name={item.icon} size={18} className="text-white" />
            </div>
            <div className="font-bold text-white mb-1">{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>Виды треков</h2>
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
                <img src={src} alt={`Трековый светильник ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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
          style={{ background: "linear-gradient(135deg, #F59E0B, #7C3AED)" }}>
          Заказать бесплатный замер
        </button>
      </div>
    </div>
  );
}
