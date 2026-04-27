import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Calculator", href: "#calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>

        <a href="#" className="flex items-center flex-shrink-0">
          <img src="/icons/logo.png" alt="VitalSwap" className="h-9 w-auto object-contain" />
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-lg bg-white hover:border-blue-500 hover:bg-blue-50 transition-colors">
            Sign in
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Get started
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-gray-700 rounded transition-transform duration-300 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 bg-gray-700 rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-gray-700 rounded transition-transform duration-300 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white border-b border-gray-200 shadow-lg px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium text-sm py-3 border-b border-gray-100 last:border-0 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 py-2.5 text-sm font-medium text-gray-800 border border-gray-300 rounded-lg bg-white hover:bg-blue-50 transition-colors">
              Sign in
            </button>
            <button className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Get started
            </button>
          </div>
        </div>
      )}
    </div>
  );
}