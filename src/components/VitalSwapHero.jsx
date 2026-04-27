
const FLAGS = [
  { src: "/flags/aus-icon.png", label: "Austria" },
  { src: "/flags/qat-icon.png", label: "Qatar" },
  { src: "/flags/ng-icon.png", label: "Nigeria" },
  { src: "/flags/usa-icon.png", label: "USA" },
];

export default function VitalSwapHero() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-3xl w-full animate-[fadeUp_0.7s_ease_both]">

        <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          Simple transparent pricing for
          <br />
          <span className="text-blue-600">Every Swap</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-12">
          At <strong className="text-gray-800 font-semibold">VitalSwap</strong>, we believe in complete
          transparency. Know exactly what you will pay before you swap, with competitive rates and no surprises.
        </p>

        <div className="flex justify-center flex-wrap gap-3 sm:gap-4">
          {FLAGS.map((f) => (
            <div
              key={f.label}
              title={f.label}
              className="w-12 h-12 sm:w-20 sm:h-14 bg-blue-50 rounded-2xl shadow-md flex items-center justify-center text-3xl sm:text-4xl cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <img src={f.src} alt={f.label} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}