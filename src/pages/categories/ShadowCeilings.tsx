import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [
  "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/415f424b-0a34-4bd5-bbfd-8cbbf9eaa7b7.jpg",
];

const features = [
  { icon: "Sparkles", title: "Эффект парения", text: "Потолок визуально отрывается от стен, создавая ощущение невесомости" },
  { icon: "Maximize2", title: "Визуально выше", text: "Теневой зазор увеличивает воспринимаемую высоту помещения" },
  { icon: "Ruler", title: "Идеальная геометрия", text: "Ровная чёткая линия по всему периметру без перепадов и зазоров — без пластиковых заглушек" },
];

const advantages = [
  { icon: "Gem", title: "Безупречная эстетика и минимализм", text: "Идеальная геометрия без дешёвых пластиковых заглушек, которые со временем желтеют или выпадают. Потолок выглядит дорого и лаконично." },
  { icon: "ShieldCheck", title: "Защита от трещин усадки", text: "Если вы делаете ремонт в новостройке, дом будет давать усадку. Теневой зазор компенсирует микроподвижки стен — на потолке не появятся складки, а декоративный стык не лопнет (как это бывает с гипсокартоном)." },
  { icon: "Paintbrush", title: "Лёгкая смена отделки стен", text: "Важнейший практический плюс! Вы можете переклеивать обои, перекрашивать стены или наносить декоративную штукатурку без демонтажа натяжного потолка. Обои просто заводятся шпателем в теневой зазор." },
  { icon: "LayoutGrid", title: "Универсальность для любого покрытия", text: "Теневой стык идеально смотрится с рельефной плиткой, 3D-панелями, кирпичной кладкой или керамогранитом в ванной. Классическую резиновую заглушку на такие стены ровно прикрепить невозможно." },
  { icon: "Timer", title: "Долговечность", text: "Фирменные теневые профили изготавливаются из прочного экструдированного алюминия (реже из жёсткого пластика), они не деформируются и надёжно держат полотно десятилетиями." },
];

export default function ShadowCeilings() {
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
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Теневые потолки</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}>
          <Icon name="Layers" size={14} />
          Виды натяжных потолков
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ТЕНЕВЫЕ</span>{" "}ПОТОЛКИ
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Теневой потолок — это технология монтажа, при которой между натяжным полотном и стеной оставляется ровный технологический зазор (обычно 6-7 мм). В этот зазор не вставляется маскировочная лента, багет или потолочный плинтус.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(item => (
          <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              <Icon name={item.icon} size={18} className="text-white" />
            </div>
            <div className="font-bold text-white mb-1">{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="p-8 rounded-3xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Как это работает?</h2>
          <div className="space-y-3 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            <p>Основа конструкции — специальный крепежный профиль (самый известный пример — система EuroKraab). Его конструкция спроектирована таким образом, что место крепления полотна уходит вглубь, к стене. Сам профиль изнутри окрашен в глубокий черный цвет.</p>
            <p>Благодаря этому, когда вы смотрите на потолок снизу, вы видите лишь ровную, контрастную черную линию тени по всему периметру комнаты.</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl mt-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Теневой и парящий потолок: в чём разница?</h2>
          <div className="space-y-3 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            <p>Многие путают эти два понятия.</p>
            <p><span className="font-bold text-white">Теневой потолок</span> — это просто тёмный, эстетичный зазор без встроенного света.</p>
            <p><span className="font-bold text-white">Парящий потолок</span> — это конструкция с более широким зазором, куда монтируется светодиодная лента. От стены исходит свечение, которое и создаёт эффект «парения».</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Oswald, sans-serif" }}>Преимущества теневого профиля</h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
            Теневой профиль не просто так стал стандартом в современных дизайн-проектах. У него есть ряд неоспоримых преимуществ перед классическими системами:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map(item => (
              <div key={item.title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
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
                <img src={src} alt={`Теневой потолок ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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