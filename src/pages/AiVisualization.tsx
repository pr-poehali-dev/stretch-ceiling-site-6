import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const PHONES = ["+79290326345", "+79950573757"];

const AI_VIS_URL = "https://functions.poehali.dev/992cc656-f16a-4292-bdb2-fd468f7969a0";
const MAX_GENERATIONS = 5;
const MAX_SELECTED_STYLES = 3;

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
  { id: "track", name: "Трековое освещение", desc: "Светильники на гибкой шине с регулировкой", color: "#F59E0B", icon: "Move" },
  { id: "lines", name: "Световые линии", desc: "Тонкие светящиеся полосы в потолке", color: "#7C3AED", icon: "Zap" },
  { id: "cornices", name: "Скрытые карнизы", desc: "Штора «вырастает» прямо из потолка", color: "#06B6D4", icon: "Blinds" },
];

const readyExamples = [
  { style: "Трековое освещение", desc: "Светильники на магнитной шине с гибкой расстановкой", color: "#F59E0B", icon: "Move", img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/524441c5-7988-4e74-8009-f490fb319f39.jpg" },
  { style: "Световые линии", desc: "Тонкие светящиеся полосы, встроенные в потолок", color: "#7C3AED", icon: "Zap", img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/files/9610b5aa-7d30-408d-a329-724e4789855d.jpg" },
  { style: "Скрытые карнизы", desc: "Штора выходит прямо из потолка без видимых креплений", color: "#06B6D4", icon: "Blinds", img: "https://cdn.poehali.dev/projects/707775f1-2704-4286-b889-aa5532b2e0df/bucket/d88715af-6354-42db-9728-b2bfacb46302.jpeg" },
];

export default function AiVisualization() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [customDescription, setCustomDescription] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [results, setResults] = useState<{ key: string; label: string; color: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  const totalSelected = selectedStyles.length + (useCustom && customDescription.trim() ? 1 : 0);

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length + (useCustom && customDescription.trim() ? 1 : 0) >= MAX_SELECTED_STYLES) return prev;
      return [...prev, id];
    });
  };

  const toggleCustom = () => {
    setUseCustom((prev) => {
      if (!prev && selectedStyles.length >= MAX_SELECTED_STYLES) return prev;
      return !prev;
    });
  };

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
      setResults([]);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    const customText = customDescription.trim();
    const jobs: { key: string; label: string; color: string; style?: string; customDescription?: string }[] = selectedStyles.map((id) => {
      const s = styles.find((st) => st.id === id)!;
      return { key: id, label: s.name, color: s.color, style: id };
    });
    if (useCustom && customText) {
      jobs.push({ key: "custom", label: "По вашему описанию", color: "#EC4899", customDescription: customText });
    }

    if (!photo || jobs.length === 0) return;
    if (remaining !== null && remaining <= 0) {
      setError("Лимит бесплатных генераций исчерпан. Закажите бесплатный замер — дизайнер подберёт потолок лично.");
      return;
    }
    setLoading(true);
    setError(null);
    setResults([]);
    setProgress({ done: 0, total: jobs.length });

    const clientId = getClientId();
    const newResults: { key: string; label: string; color: string; url: string }[] = [];

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      try {
        const res = await fetch(AI_VIS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: photo,
            style: job.style || "",
            custom_description: job.customDescription || "",
            client_id: clientId,
            count_usage: i === 0,
          }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          newResults.push({ key: job.key, label: job.label, color: job.color, url: data.url });
          setResults([...newResults]);
          if (typeof data.remaining === "number") setRemaining(data.remaining);
        } else if (res.status === 403) {
          setRemaining(0);
          setError("Лимит бесплатных генераций исчерпан. Закажите бесплатный замер — дизайнер подберёт потолок лично.");
          break;
        } else {
          setError("Не получилось сгенерировать один из вариантов. Остальные показаны ниже.");
        }
      } catch {
        setError("Ошибка соединения. Попробуйте ещё раз.");
        break;
      }
      setProgress({ done: i + 1, total: jobs.length });
    }

    setLoading(false);
    setProgress(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#1a1438", color: "#fff" }}>
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
                backdropFilter: "blur(16px) saturate(160%)",
                WebkitBackdropFilter: "blur(16px) saturate(160%)",
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
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Шаг 2 · Выберите до {MAX_SELECTED_STYLES} вариантов
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd" }}>
                {totalSelected}/{MAX_SELECTED_STYLES}
              </span>
            </div>

            <div
              className="w-full text-left p-3 rounded-2xl transition-all relative mb-3"
              style={{
                background: useCustom ? "rgba(236,72,153,0.15)" : "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px) saturate(150%)",
                WebkitBackdropFilter: "blur(12px) saturate(150%)",
                border: `1px solid ${useCustom ? "#EC4899" : "rgba(255,255,255,0.12)"}`,
              }}
            >
              <button
                type="button"
                onClick={toggleCustom}
                disabled={!useCustom && selectedStyles.length >= MAX_SELECTED_STYLES}
                className="w-full text-left disabled:opacity-35 disabled:cursor-not-allowed"
              >
                {useCustom && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#EC4899" }}>
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#EC4899" }}>
                    <Icon name="PenLine" size={15} className="text-white" />
                  </div>
                  <div className="font-bold text-white text-sm">Свой вариант — опишите словами</div>
                </div>
              </button>
              {useCustom && (
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  maxLength={500}
                  placeholder="Например: тёмно-синий глянцевый потолок с золотыми вставками и точечными светильниками по кругу"
                  className="w-full mt-2 p-3 rounded-xl text-sm resize-none"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    minHeight: 80,
                  }}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {styles.map((s) => {
                const isSelected = selectedStyles.includes(s.id);
                const isDisabled = !isSelected && totalSelected >= MAX_SELECTED_STYLES;
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleStyle(s.id)}
                    disabled={isDisabled}
                    className="text-left p-3 rounded-2xl transition-all relative disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{
                      background: isSelected ? `${s.color}25` : "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(12px) saturate(150%)",
                      WebkitBackdropFilter: "blur(12px) saturate(150%)",
                      border: `1px solid ${isSelected ? s.color : "rgba(255,255,255,0.12)"}`,
                    }}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: s.color }}>
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                    )}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: s.color }}>
                      <Icon name={s.icon} size={15} className="text-white" />
                    </div>
                    <div className="font-bold text-white text-sm mb-0.5">{s.name}</div>
                    <div className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleGenerate}
            disabled={!photo || totalSelected === 0 || loading || remaining === 0}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin" />
                Генерируем {progress ? `${progress.done}/${progress.total}` : "..."}
              </>
            ) : (
              <>
                <Icon name="Wand2" size={20} />
                {totalSelected > 1 ? `Сгенерировать ${totalSelected} варианта` : "Показать, как будет выглядеть"}
              </>
            )}
          </button>
          {loading && (
            <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              Каждый вариант занимает 20–40 секунд
            </p>
          )}
          {error && (
            <p className="text-sm mt-3" style={{ color: "#fca5a5" }}>{error}</p>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-black text-white mb-5 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>Результат</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Было</div>
                <div className="rounded-2xl overflow-hidden">
                  <img src={photo!} alt="До" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="hidden sm:block" />
            </div>
            <div className={`grid grid-cols-1 ${results.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"} gap-4`}>
              {results.map((r) => (
                <div key={r.key}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: r.color }}>
                    {r.label}
                  </div>
                  <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r.color}66` }}>
                    <img src={r.url} alt={r.label} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center" style={{ fontFamily: "Oswald, sans-serif" }}>
          Готовые примеры стилей
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
          Так эти решения выглядят в реальных интерьерах наших клиентов
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {readyExamples.map((ex) => (
            <div key={ex.style} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${ex.color}40` }}>
              <div className="relative" style={{ height: 200 }}>
                <img src={ex.img} alt={ex.style} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ex.color}dd 0%, transparent 55%)` }} />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: ex.color }}>
                  <Icon name={ex.icon} size={15} className="text-white" />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-black text-white text-base" style={{ fontFamily: "Oswald, sans-serif" }}>{ex.style}</div>
                </div>
              </div>
              <div className="p-4" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px) saturate(150%)", WebkitBackdropFilter: "blur(16px) saturate(150%)" }}>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pb-20 text-center">
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
          Понравился результат? Закажите бесплатный замер — и мы воплотим его в реальности.
        </p>
        <button onClick={() => setPhoneDialogOpen(true)}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover-lift"
          style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
          Заказать бесплатный замер
        </button>
      </div>

      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent style={{ background: "rgba(46,34,96,0.85)", backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
              Позвоните нам
            </DialogTitle>
            <DialogDescription style={{ color: "rgba(255,255,255,0.65)" }}>
              Свяжитесь с нами по любому из номеров — договоримся о бесплатном замере
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            {PHONES.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-lg transition-all hover-lift"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", color: "#fff", textDecoration: "none" }}
              >
                <Icon name="Phone" size={20} style={{ color: "#a78bfa" }} />
                {phone}
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}