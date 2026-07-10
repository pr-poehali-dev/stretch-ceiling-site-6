import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [];

const baufSeries = [
  { name: "BAUF 205", density: "225 г/м²", thickness: "205 мкм" },
  { name: "BAUF 230", density: "250 г/м²", thickness: "230 мкм" },
  { name: "BAUF 270", density: "300 г/м²", thickness: "270 мкм" },
];

const baufFeatures = [
  { icon: "ShieldCheck", title: "Прочность и устойчивость к деформациям", desc: "Повышенная плотность и толщина позволяют создавать сложные формы, снижают риск провисания на больших площадях и повышают устойчивость к нагрузкам, например при затоплении." },
  { icon: "Waves", title: "Эластичность", desc: "В составе плёнки нет мела (известняка), что предотвращает заломы и помогает материалу крепко держаться в крепёжных профилях." },
  { icon: "Flame", title: "Термостойкость", desc: "Плёнка сохраняет характеристики при сильном нагреве и не оплавляется." },
  { icon: "EyeOff", title: "Непрозрачность", desc: "При любом натяжении и освещении полотно остаётся непрозрачным и сохраняет безупречную белизну." },
  { icon: "BadgeCheck", title: "Безопасность", desc: "Сертифицировано по европейским стандартам REACH, RoHS, EN 71-3, имеет высший класс А+ по выбросу летучих соединений и разрешено для детских игрушек." },
  { icon: "Fingerprint", title: "Защита от подделок", desc: "На каждом метре полотна — фирменная маркировка с логотипом Bauf, серией и данными о сертификатах." },
];

const types = [
  { name: "Глянцевая", desc: "Отражает свет как зеркало — визуально удваивает пространство. Популярна в гостиных и ванных комнатах.", color: "#7C3AED" },
  { name: "Матовая", desc: "Бархатистая поверхность без бликов. Универсальный выбор для любого помещения — спальни, кухни, офиса.", color: "#06B6D4" },
  { name: "Сатиновая", desc: "Золотая середина: лёгкий шелковистый блеск без зеркального эффекта. Смотрится дорого и изысканно.", color: "#F59E0B" },
  { name: "Перфорированная", desc: "С отверстиями под акустические системы или вентиляцию. Используется в офисах и кинотеатрах.", color: "#10B981" },
  { name: "Фотопечать", desc: "Любое изображение на полотне — небо, лес, абстракция. Печатается на специальной плёнке высокого разрешения.", color: "#EC4899" },
  { name: "Тканевая (ПВХ-free)", desc: "Экологичная альтернатива ПВХ. Пропускает воздух, не выделяет запаха, подходит для детских комнат.", color: "#F97316" },
];

const pvcPlus = [
  "Полная водонепроницаемость и простой уход — подходит для ванных комнат. Если соседи сверху зальют квартиру, потолок просто провиснет и сохранит полы сухими",
  "Легко чистить пылесосом или влажной губкой с мыльной водой",
];

const pvcMinus = [
  "Хрупкое полотно — легко повредить острым предметом, поэтому важно убрать всё острое перед монтажом",
  "Почти не пропускает воздух, из-за чего в комнате может становиться душно",
  "При высокой влажности возможен парниковый эффект — на потолке появляется конденсат",
  "Максимальная ширина полотна 3 м — в больших комнатах не избежать шва",
  "Не подходит для неотапливаемых помещений: на морозе ниже −5°C пластик крошится, а от близких ламп может пожелтеть",
];

const fabricPlus = [
  "Ткань «дышит» и выдерживает перепады температур от −40°C до +80°C — подходит для лоджий и неотапливаемых помещений",
  "Не горит и не дымит благодаря специальной пропитке",
  "Не боится бактерий и плесени",
  "Ширина рулона 510 см — подходит для больших помещений без швов",
  "Монтируется проще, чем ПВХ: без тепловой пушки и без нагрева помещения",
];

export default function FilmTypes() {
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
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>Виды плёнок</span>
        </div>
      </nav>

      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}>
          <Icon name="Palette" size={14} />
          Материалы
        </div>
        <h1 className="text-5xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #10B981, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ВИДЫ</span>{" "}ПЛЁНОК
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Натяжные потолки — самая популярная альтернатива классической отделке: красивые, идеально ровные и безопасные для здоровья. Правильный выбор полотна влияет на внешний вид, освещение и атмосферу всего помещения.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-3xl overflow-hidden mb-8" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          <img src="https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/eac5f978-9986-4c29-8c9a-fbb82e55bb2a.jpg"
            alt="Плёнка BAUF для натяжных потолков" className="w-full h-auto object-cover" />
        </div>

        <div className="p-8 rounded-3xl mb-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Плёнка BAUF</h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
            Плёнка Bauf для натяжных потолков — это ПВХ-полотно немецкого бренда, которое отличается повышенной прочностью, эластичностью и безопасностью. Выпускается в нескольких сериях с разными характеристиками.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {baufSeries.map(s => (
              <div key={s.name} className="p-4 rounded-2xl text-center" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                <div className="font-bold text-white mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>{s.name}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Плотность: {s.density}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Толщина: {s.thickness}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {baufFeatures.map(f => (
              <div key={f.title} className="flex gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                <Icon name={f.icon as any} size={20} style={{ color: "#F59E0B" }} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {types.map(item => (
          <div key={item.name} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${item.color}30` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
              <div className="font-bold text-white text-lg" style={{ fontFamily: "Oswald, sans-serif" }}>{item.name}</div>
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
        <div className="p-8 rounded-3xl" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Натяжные потолки из ПВХ</h2>
          <div className="space-y-3 text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
            <p>Такие потолки чаще дешевле тканевых и шире представлены в продаже. Главное, на что нужно обратить внимание, — качество сырья: проверяйте сертификаты качества и безопасности. Если сырьё качественное и полотна изготовлены известными производителями, ПВХ-потолки абсолютно безопасны.</p>
            <p>Можно выбрать полотно любого цвета: матовое, глянцевое, сатинированное или зеркальное, а также с фотопечатью.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="font-bold text-white mb-2 flex items-center gap-2"><Icon name="CircleCheck" size={16} style={{ color: "#10B981" }} /> Плюсы</div>
              <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                {pvcPlus.map((t, i) => <li key={i} className="flex gap-2"><span style={{ color: "#10B981" }}>•</span>{t}</li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-2 flex items-center gap-2"><Icon name="CircleX" size={16} style={{ color: "#EC4899" }} /> Минусы</div>
              <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                {pvcMinus.map((t, i) => <li key={i} className="flex gap-2"><span style={{ color: "#EC4899" }}>•</span>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Натяжные потолки из синтетической ткани</h2>
          <div className="space-y-3 text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
            <p>Для такого полотна используют ткань из полиэфира, пропитанную полиуретаном, — можно подобрать имитацию различных текстур: ситца, замши и других. Поверхность бывает только матовая, доступно более 20 оттенков, есть варианты с блёстками и светопроницаемые полотна для затемнения. Тканевые потолки также можно покрасить, расписать или украсить виниловыми наклейками.</p>
          </div>
          <div>
            <div className="font-bold text-white mb-2 flex items-center gap-2"><Icon name="CircleCheck" size={16} style={{ color: "#10B981" }} /> Плюсы</div>
            <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              {fabricPlus.map((t, i) => <li key={i} className="flex gap-2"><span style={{ color: "#10B981" }}>•</span>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-3xl font-black text-white mb-6 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>Примеры</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ height: 240 }}>
                <img src={src} alt={`Вид плёнки ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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
          style={{ background: "linear-gradient(135deg, #10B981, #7C3AED)" }}>
          Заказать бесплатный замер
        </button>
      </div>
    </div>
  );
}