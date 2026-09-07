interface CityCoverageProps {
  serviceName: string;
  serviceGenitive: string;
}

const CITIES = ["Обнинске", "Калуге", "Боровске", "Жукове", "Наро-Фоминске"];

const CityCoverage = ({ serviceName, serviceGenitive }: CityCoverageProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <div
        className="p-8 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <h2
          className="text-2xl font-black text-white mb-4"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          {serviceName} в вашем городе
        </h2>
        <p
          className="text-base leading-relaxed mb-3"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Компания «ПотолкиLeKo» устанавливает {serviceGenitive} в{" "}
          {CITIES.join(", ")} и ближайших населённых пунктах. Работаем с
          выездом на бесплатный замер, монтируем под ключ и даём официальную
          гарантию 15 лет на полотно и работу.
        </p>
        <p
          className="text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Если вы ищете, где заказать {serviceGenitive} в Обнинске или Калуге
          — оставьте заявку, и наш специалист приедет для замера в удобное
          время, бесплатно рассчитает точную стоимость и предложит несколько
          вариантов дизайна под ваш бюджет.
        </p>
      </div>
    </div>
  );
};

export default CityCoverage;
