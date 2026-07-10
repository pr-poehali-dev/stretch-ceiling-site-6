import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/4d011137-1898-4999-96a4-3609827a4e41.jpeg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/8890047f-6b01-430a-bffc-5780dc9fe61f.jpeg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/289e3307-d439-43a4-94df-42642d0dba67.jpeg",
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/72ed29c8-2711-4124-b69a-ec0ce99c1d51.jpeg",
];

const types = [
  { name: "Точечные LED", desc: "Самый популярный вариант. Небольшие светильники врезаются в полотно, создают равномерное освещение.", color: "#F59E0B" },
  { name: "Встраиваемые GU10", desc: "Стандартный цоколь — легко менять лампочки. Подходят для любых помещений.", color: "#7C3AED" },
  { name: "Встраиваемые MR16", desc: "Узкий направленный луч — идеальны для акцентного освещения картин, ниш, предметов декора.", color: "#06B6D4" },
  { name: "Панели LED", desc: "Тонкие плоские светильники большой площади. Дают мягкий равномерный свет без теней.", color: "#10B981" },
];

const features = [
  { icon: "Zap", title: "Экономия до 70%", text: "LED-светильники потребляют в разы меньше, чем обычные лампочки накаливания" },
  { icon: "Thermometer", title: "Не греют плёнку", text: "Все встраиваемые светильники для натяжных потолков имеют термозащитные кольца" },
  { icon: "Settings", title: "Диммирование", text: "Яркость регулируется выключателем — от приглушённого до полного освещения" },
];

const howSteps = [
  { icon: "Box", title: "Монтаж корпуса", desc: "Корпус светильника монтируется под полотно." },
  { icon: "ShieldCheck", title: "Термокольцо", desc: "Для защиты натяжного полотна (особенно ПВХ-плёнки) от перегрева и разрыва по краю отверстия используют термокольцо — его приклеивают снаружи, перед тем как сделать отверстие." },
  { icon: "Lightbulb", title: "Лампа GX53", desc: "В цоколь вставляется лампа. Чаще всего используют светодиодные лампы с цоколем GX53 — они почти не нагреваются, что критически важно для безопасности натяжного потолка." },
  { icon: "Home", title: "Применение", desc: "Такие светильники отлично подходят для создания равномерного освещения в разных помещениях — в гостиной, спальне, прихожей." },
];

export default function Spotlights() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen" style={{ background: "#2e2260", color: "#fff" }}>
      <nav className="fixed top-0 left-0 right-0 z-40 glass" style={{ borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/portfolio")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover-lift"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
            <Icon name="ArrowLeft" size={15} />
            Назад
          </button>
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Светильники (втяжка)</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(245,158,11,0.15)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.3)" }}>
          <Icon name="Lightbulb" size={14} />
          Освещение
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>СВЕТИЛЬНИКИ</span>{" "}ВТЯЖКА
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Светильник-втяжка встраивается так, что полотно как бы «втягивается» в корпус, и снаружи видна только аккуратная декоративная часть — часто без видимой рамки по периметру. Это создаёт ровную, гладкую поверхность и интересный визуальный эффект изгиба полотна вокруг корпуса.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(item => (
          <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)" }}>
              <Icon name={item.icon} size={18} className="text-white" />
            </div>
            <div className="font-bold text-white mb-1">{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>Виды встраиваемых светильников</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map(item => (
            <div key={item.name} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${item.color}30` }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <div className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{item.name}</div>
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>Как это устроено</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {howSteps.map((item, i) => (
            <div key={item.title} className="p-6 rounded-2xl flex gap-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)" }}>
                <Icon name={item.icon} size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>{i + 1}. {item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.desc}</div>
              </div>
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
                <img src={src} alt={`Светильник ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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
          style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)" }}>
          Заказать бесплатный замер
        </button>
      </div>
    </div>
  );
}