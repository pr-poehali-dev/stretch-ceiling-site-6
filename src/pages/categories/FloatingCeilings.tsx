import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/9960612c-20f0-4516-bf2b-a757da7a11c7.jpg",
];

const features = [
  { icon: "Wind", title: "Эффект невесомости", text: "Полотно словно зависает в воздухе — без видимых крепежей и профилей" },
  { icon: "Layers", title: "Многоуровневость", text: "Можно сочетать несколько уровней для создания сложных объёмных форм" },
  { icon: "Palette", title: "Любой цвет и фактура", text: "Глянец, матовый сатин или фотопечать — на любой вкус" },
];

const advantages = [
  { icon: "Maximize2", title: "Визуальное расширение пространства", text: "Несмотря на то, что потолок физически опускается, светящийся контур зрительно приподнимает его и расширяет границы комнаты." },
  { icon: "Lightbulb", title: "Полноценный сценарий освещения", text: "Светодиодная лента по периметру может служить отличным вечерним (приглушённым) светом, заменяя бра или торшеры." },
  { icon: "Wand2", title: "Маскировка дефектов стен", text: "Мягкий рассеянный свет вдоль стен способен слегка сгладить мелкие неровности отделки (однако сильная кривизна стен недопустима)." },
  { icon: "Timer", title: "Скорость чистового монтажа", text: "Установка одноуровневого парящего потолка профессионалами занимает всего 1-2 дня без строительной пыли и грязи." },
  { icon: "Sparkles", title: "Эффектный дизайн", text: "Это 100% способ сделать интерьер современным и запоминающимся." },
];

export default function FloatingCeilings() {
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
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Парящие потолки</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(6,182,212,0.15)", color: "#67e8f9", border: "1px solid rgba(6,182,212,0.3)" }}>
          <Icon name="Wind" size={14} />
          Виды натяжных потолков
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ПАРЯЩИЕ</span>{" "}ПОТОЛКИ
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Эффект «левитации» достигается не магией, а грамотной инженерией. В основе парящего натяжного потолка лежит использование специального алюминиевого профиля (багета).
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(item => (
          <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)" }}>
              <Icon name={item.icon} size={18} className="text-white" />
            </div>
            <div className="font-bold text-white mb-1">{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="p-8 rounded-3xl" style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Что такое парящий потолок и в чём его секрет?</h2>
          <div className="space-y-3 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            <p>В отличие от стандартного профиля, который плотно прижимает полотно к стене и маскируется плинтусом (вставкой), парящий профиль устроен иначе. Он оставляет между стеной и потолком технологический зазор шириной от 1,5 до 3 сантиметров. В этот паз под определённым углом закладывается светодиодная лента, которая затем закрывается полупрозрачной светорассеивающей заглушкой (экраном).</p>
            <p>Результат: свет падает на стену, создавая мягкий ореол, скрывающий физический стык. Граница стирается, и потолок визуально отрывается от стен.</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>Преимущества парящего потолка</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map(item => (
              <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)" }}>
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
                <img src={src} alt={`Парящий потолок ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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
          style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)" }}>
          Заказать бесплатный замер
        </button>
      </div>
    </div>
  );
}