export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-8 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Top — brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-extrabold text-lg mb-2">VitalSwap</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simple, transparent currency exchange for everyone.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-base mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              {["Features", "Pricing", "Result card"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-base mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {["About", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-base mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6" />

        {/* Bottom */}
        <p className="text-gray-500 text-sm">
          © 2025 VitalSwap. All rights reserved.
        </p>

      </div>
    </footer>
  );
}