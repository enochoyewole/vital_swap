export default function TrustSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          WE VALUE YOUR{" "}
          <span className="text-blue-600">TRUST AND IDENTITY</span>
        </h2>

        {/* Paragraphs */}
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Your trust is the foundation of everything we do. That's why we've built VitalSwap
          with Bank-Level security and strict compliance standards. Every transaction is
          encrypted End-to-End making it virtually impossible for external interference.
        </p>

        <p className="text-gray-600 text-base leading-relaxed mb-12">
          We follow global standards and regulations to keep your money safe. Fraud
          monitoring runs 24/7 protecting your funds when you are not looking. We also make
          security easy for you with clear controls and instant alerts.
        </p>

        {/* Logos */}
        <div className="flex justify-center gap-6">
          {["logo1", "logo2", "logo3"].map((logo) => (
            <div
              key={logo}
              className="w-28 h-20 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <img
                src={"/icons/" + logo + ".png"}
                alt={logo}
                className="w-13 h-13 object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}