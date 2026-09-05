import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const AI_VIS_URL = "https://functions.poehali.dev/992cc656-f16a-4292-bdb2-fd468f7969a0";
const MAX_GENERATIONS = 5;

function getClientId(): string {
  const key = "ai_vis_client_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

const styles = [
  { id: "glossy", name: "Глянцевый белый", desc: "Зеркальный блеск, визуально расширяет пространство", color: "#7C3AED", icon: "Sparkles" },
  { id: "matte", name: "Матовый белый", desc: "Классика — ровная бархатистая поверхность", color: "#06B6D4", icon: "Square" },
  { id: "satin", name: "Сатиновый", desc: "Мягкий шёлковый отблеск без бликов", color: "#EC4899", icon: "Gem" },
  { id: "shadow", name: "Теневой", desc: "Тонкий тёмный зазор по периметру, эффект парения", color: "#7C3AED", icon: "Layers" },
  { id: "floating", name: "Парящий с подсветкой", desc: "Светящийся контур создаёт эффект левитации", color: "#06B6D4", icon: "Wind" },
  { id: "starry", name: "Звёздное небо", desc: "Тёмный потолок с мерцающими точками света", color: "#4338CA", icon: "Star" },
  { id: "glow", name: "Световой (светится весь)", desc: "Вся поверхность мягко светится изнутри", color: "#F59E0B", icon: "Sun" },
  { id: "multilevel", name: "Многоуровневый", desc: "Геометрические фигуры и встроенный свет", color: "#10B981", icon: "Layers3" },
  { id: "print", name: "Фотопечать (небо)", desc: "Художественное изображение на полотне", color: "#0EA5E9", icon: "Image" },
  { id: "colored", name: "Цветной глянец", desc: "Яркий акцентный цвет в тон интерьеру", color: "#F97316", icon: "Palette" },
];

export default function AiVisualization() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const clientId = getClientId();
    fetch(`${AI_VIS_URL}?client_id=${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      })
      .catch(() => {});
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!photo || !selectedStyle) return;
    if (remaining !== null && remaining <= 0) {
      setError("Лимит бесплатных генераций исчерпан. Закажите бесплатный замер — дизайнер подберёт потолок лично.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(AI_VIS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: photo, style: selectedStyle, client_id: getClientId() }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setResult(data.url);
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      } else if (res.status === 403) {
        setRemaining(0);
        setError("Лимит бесплатных генераций исчерпан. Закажите бесплатный замер — дизайнер подберёт потолок лично.");
      } else {
        setError("Не получилось сгенерировать визуализацию. Попробуйте другое фото или стиль.");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#2e2260", color: "#fff" }}>
      <nav className="fixed top-0 left-0 right-0 z-40 glass" style={{ borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover-lift"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
            <Icon name="ArrowLeft" size={15} />
            Назад
          </button>
          <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif", fontSize: 18 }}>AI-визуализация потолка</span>
          {remaining !== null && (
            <span className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: remaining > 0 ? "rgba(124,58,237,0.2)" : "rgba(239,68,68,0.2)",
                color: remaining > 0 ? "#c4b5fd" : "#fca5a5",
                border: `1px solid ${remaining > 0 ? "rgba(124,58,237,0.4)" : "rgba(239,68,68,0.4)"}`,
              }}>
              Осталось генераций: {remaining} из {MAX_GENERATIONS}
            </span>
          )}
        </div>
      </nav>

      <div className="pt-28 pb-10 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}>
          <Icon name="Sparkles" size={14} />
          Технология AI
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI-ВИЗУАЛИЗАЦИЯ</span>{" "}ПОТОЛКА
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          Загрузите фото своей комнаты, выберите стиль потолка — искусственный интеллект покажет, как он будет смотреться у вас дома.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              Шаг 1 · Загрузите фото комнаты
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
              }}
              className="rounded-3xl overflow-hidden cursor-pointer transition-all hover-lift flex items-center justify-center"
              style={{
                minHeight: 320,
                background: "rgba(255,255,255,0.05)",
                border: photo ? "1px solid rgba(124,58,237,0.4)" : "2px dashed rgba(255,255,255,0.25)",
              }}
            >
              {photo ? (
                <img src={photo} alt="Ваша комната" className="w-full h-full object-cover" style={{ maxHeight: 400 }} />
              ) : (
                <div className="text-center px-6 py-16">
                  <Icon name="ImagePlus" size={44} className="mx-auto mb-4" style={{ color: "rgba(255,255,255,0.4)" }} />
                  <p className="font-semibold text-white mb-1">Перетащите фото сюда</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>или нажмите, чтобы выбрать файл</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {photo && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 text-sm font-medium flex items-center gap-2"
                style={{ color: "#a78bfa" }}
              >
                <Icon name="RefreshCw" size={14} />
                Заменить фото
              </button>
            )}
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              Шаг 2 · Выберите стиль потолка
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className="text-left p-3 rounded-2xl transition-all"
                  style={{
                    background: selectedStyle === s.id ? `${s.color}25` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${selectedStyle === s.id ? s.color : "rgba(255,255,255,0.12)"}`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: s.color }}>
                    <Icon name={s.icon} size={15} className="text-white" />
                  </div>
                  <div className="font-bold text-white text-sm mb-0.5">{s.name}</div>
                  <div className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleGenerate}
            disabled={!photo || !selectedStyle || loading || remaining === 0}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin" />
                Генерируем визуализацию...
              </>
            ) : (
              <>
                <Icon name="Wand2" size={20} />
                Показать, как будет выглядеть
              </>
            )}
          </button>
          {loading && (
            <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              Обычно это занимает 20–40 секунд
            </p>
          )}
          {error && (
            <p className="text-sm mt-3" style={{ color: "#fca5a5" }}>{error}</p>
          )}
        </div>

        {result && (
          <div className="mt-12">
            <h2 className="text-2xl font-black text-white mb-5 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>Результат</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Было</div>
                <div className="rounded-2xl overflow-hidden">
                  <img src={photo!} alt="До" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: "#a78bfa" }}>Стало</div>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.4)" }}>
                  <img src={result} alt="После" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto px-4 pb-20 text-center">
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
          Понравился результат? Закажите бесплатный замер — и мы воплотим его в реальности.
        </p>
        <button onClick={() => navigate("/#contacts")}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift"
          style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
          Заказать бесплатный замер
        </button>
      </div>
    </div>
  );
}