export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-blue-800 text-center">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
          Start Exchanging Currency Today
        </h2>

        {/* Subtext */}
        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Join thousands of Nigerians who trust VitalSwap for fast, secure, and
          affordable currency exchange.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <button className="w-full sm:w-auto px-8 py-3 h-12 bg-yellow-500 text-[13px] text-gray-900 font-bold rounded-2xl hover:bg-yellow-600 transition-colors">
            Start Exchange Now
          </button>
          <button className="w-full sm:w-auto px-8 py-3 h-12 border-2 border-white text-[13px] text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
            View Exchange Rates
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          {["No option required", "Instant verification", "24/7 support"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-white/80 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}