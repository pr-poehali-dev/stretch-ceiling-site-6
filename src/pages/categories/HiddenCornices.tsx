import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/d88715af-6354-42db-9728-b2bfacb46302.jpeg",
];

const features = [
  { icon: "EyeOff", title: "Карниз невидим", text: "Штора как будто выходит прямо из потолка — никаких видимых кронштейнов" },
  { icon: "Ruler", title: "Любая длина", text: "Скрытый карниз делается под размер любого окна или всей стены целиком" },
  { icon: "Layers", title: "Интеграция в потолок", text: "Карниз монтируется в нишу натяжного потолка ещё до натяжки полотна" },
];

const advantages = [
  { icon: "Gem", title: "Безупречная эстетика и минимализм", text: "Все технические детали механизма (пластиковые шины, крючки, кольца, зажимы) и драпировочная лента надёжно спрятаны внутри конструкции. Взору предстаёт только идеально ровное покрытие потолка и струящийся вниз текстиль." },
  { icon: "PiggyBank", title: "Экономия времени, нервов и средств на выбор карниза", text: "Использование ниши избавляет вас от мучительной необходимости выбирать декоративный карниз с наконечниками, идеально подходящий к стилю интерьера. Для скрытой ниши подойдёт самый простой, надёжный и недорогой потолочный профиль." },
  { icon: "Maximize2", title: "Визуальное увеличение высоты потолка", text: "Особенно актуально для квартир со стандартной высотой 2.5–2.7 метра. Скрытое крепление не «режет» стену горизонтальной линией карниза, а глянцевое полотно создаёт эффект бесконечно длинных штор." },
  { icon: "LayoutGrid", title: "Универсальность для любого дизайна", text: "Ниша — это нейтральный конструктивный элемент, который можно использовать в абсолютно любом стиле интерьера: от строгой неоклассики и лофта до скандинавского минимализма и хай-тека." },
  { icon: "Lightbulb", title: "Идеальная база для декоративной подсветки", text: "Ниша — самое подходящее место для установки скрытой светодиодной (LED) ленты. Используются слаботочные светодиоды, которые не нагреваются, поэтому их можно размещать вплотную к любому текстилю." },
];

export default function HiddenCornices() {
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
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Скрытые карнизы</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(245,158,11,0.15)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.3)" }}>
          <Icon name="EyeOff" size={14} />
          Дополнения к потолку
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>СКРЫТЫЕ</span>{" "}КАРНИЗЫ
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Натяжной потолок уверенно остаётся наиболее популярным, практичным и эстетичным вариантом отделки современных интерьеров. Однако эстетика современного ремонта кроется в деталях — и одной из таких важнейших деталей является оформление оконной зоны.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(item => (
          <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)" }}>
              <Icon name={item.icon} size={18} className="text-white" />
            </div>
            <div className="font-bold text-white mb-1">{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="p-8 rounded-3xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Как монтируется?</h2>
          <div className="space-y-3 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            <p>До натяжки полотна по периметру окна или вдоль стены монтируется деревянная или алюминиевая закладная с карнизной шиной. Это решение идеально подходит, если нужно эстетично скрыть потолочное крепление штор, крючки и драпировочную ленту.</p>
            <p>После натяжки полотна шина оказывается скрыта в нише — видна только щель, из которой выходит штора. Выглядит дорого и лаконично.</p>
            <p>Скрытый карниз совместим с любыми типами штор: от тюля до плотных блэкаут-штор на роликовом механизме.</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Oswald, sans-serif" }}>Преимущества скрытой ниши под шторы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map(item => (
              <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)" }}>
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <div className="font-bold text-white mb-1">{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-3xl font-black text-white mb-6 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>Наши работы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ height: 240 }}>
                <img src={src} alt={`Скрытый карниз ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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