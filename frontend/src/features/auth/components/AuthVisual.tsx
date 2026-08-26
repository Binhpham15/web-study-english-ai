const words = [
  { en: "consistent", vi: "kiên trì", className: "top-[12%] right-[10%] [animation-delay:0s]" },
  { en: "fluent", vi: "trôi chảy", className: "top-[46%] right-[22%] [animation-delay:2s]" },
  { en: "vocabulary", vi: "từ vựng", className: "top-[68%] right-[6%] [animation-delay:4s]" },
  { en: "progress", vi: "tiến bộ", className: "top-[30%] right-[-2%] [animation-delay:1.2s]" },
];

export function AuthVisual() {
  return (
    <div className="relative hidden flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#1B2140_0%,#12172B_55%,#0A0E1C_100%)] px-16 py-12 lg:flex lg:flex-col lg:justify-center">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(242,166,90,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

      {words.map((w) => (
        <div
          key={w.en}
          className={`absolute animate-[drift_9s_ease-in-out_infinite] whitespace-nowrap rounded-xl border border-[#F2A65A]/25 bg-[#FBF7EF]/[0.06] px-4 py-2.5 text-sm backdrop-blur-sm ${w.className}`}
        >
          <span className="font-semibold text-[#F2A65A]">{w.en}</span>
          <span className="ml-1.5 text-xs text-[#9AA1C2]">{w.vi}</span>
        </div>
      ))}

      <p className="relative z-10 mb-10 text-sm font-medium uppercase tracking-[0.08em] text-[#F2A65A]">
        Lexi English
      </p>
      <h2 className="relative z-10 mb-4 max-w-md font-serif text-4xl font-medium leading-tight text-[#FBF7EF] lg:text-5xl">
        Mỗi ngày một chút, tiếng Anh của bạn sẽ khác.
      </h2>
      <p className="relative z-10 max-w-sm text-[15px] leading-relaxed text-[#B8BDD4]">
        Học từ vựng, luyện phản xạ với AI, và theo dõi tiến độ — tất cả ở một nơi.
      </p>

      <div className="relative z-10 mt-12 w-fit rounded-full border border-[#7FA694]/35 bg-[#7FA694]/15 px-3.5 py-2 text-sm font-medium text-[#7FA694]">
        🔥 Học viên đang giữ streak trung bình 12 ngày
      </div>
    </div>
  );
}