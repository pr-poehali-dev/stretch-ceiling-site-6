import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const images: string[] = [];

const types = [
  { name: "Глянцевая", desc: "Отражает свет как зеркало — визуально удваивает пространство. Популярна в гостиных и ванных комнатах.", color: "#7C3AED" },
  { name: "Матовая", desc: "Бархатистая поверхность без бликов. Универсальный выбор для любого помещения — спальни, кухни, офиса.", color: "#06B6D4" },
  { name: "Сатиновая", desc: "Золотая середина: лёгкий шелковистый блеск без зеркального эффекта. Смотрится дорого и изысканно.", color: "#F59E0B" },
  { name: "Перфорированная", desc: "С отверстиями под акустические системы или вентиляцию. Используется в офисах и кинотеатрах.", color: "#10B981" },
  { name: "Фотопечать", desc: "Любое изображение на полотне — небо, лес, абстракция. Печатается на специальной плёнке высокого разрешения.", color: "#EC4899" },
  { name: "Тканевая (ПВХ-free)", desc: "Экологичная альтернатива ПВХ. Пропускает воздух, не выделяет запаха, подходит для детских комнат.", color: "#F97316" },
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
          Натяжные потолки бывают разных фактур и составов. Правильный выбор плёнки влияет на внешний вид, освещение и атмосферу всего помещения.
        </p>
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
