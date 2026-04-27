const CARDS = [
  { src: "/images/SimpleFeeCard2.png", label: "Exchange Fee" },
  { src: "/images/SimpleFeeCard3.png", label: "Bank Transfer" },
  { src: "/images/SimpleFeeCard1.png", label: "Account Setup" },
];

export default function FeeStructureSection() {
  return (
    <section className="py-20 px-6 bg-blue-50">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
          Simple Fee Structure
        </h2>
        <p className="text-gray-500 text-base sm:text-lg">
          Clear, competitive rates for all your currency exchange needs
        </p>
        <p className="text-gray-600 text-sm mt-2">Current USD → NGN Rate:</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-blue-100 overflow-hidden shadow-sm bg-white"
          >
            <img
              src={card.src}
              alt={card.label}
              className="w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}