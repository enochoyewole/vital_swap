import { useState, useRef, useEffect, useCallback } from "react";

const STORIES = [
  { img: "/images/image4.avif", title: "Transformative Payment Management", text: "This platform has completely transformed how we manage our international payments.", bg: "bg-yellow-50" },
  { img: "/images/image5.avif", title: "Smarter Business Decisions", text: "I love the real-time insights feature. It gives me the data I need to make smarter business decisions.", bg: "bg-green-50" },
  { img: "/images/image6.avif", title: "Top-Notch Security", text: "The security measures are top-notch. I feel confident knowing our transactions are protected.", bg: "bg-blue-50" },
  { img: "/images/image1.avif", title: "Seamless Integration", text: "Integration with our existing systems was seamless. The support team was incredibly helpful.", bg: "bg-pink-50" },
  { img: "/images/image2.avif", title: "Exceptional Customer Support", text: "The customer support is exceptional. They're always available and resolve any issues quickly.", bg: "bg-blue-50" },
  { img: "/images/image3.avif", title: "Game-Changing Analytics", text: "The analytics dashboard has been a game-changer for our team.", bg: "bg-orange-50" },
];

export default function CustomerStories() {
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const trackRef = useRef(null);

  const perPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(STORIES.length / perPage);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setPage(0);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = useCallback((idx) => {
    setPage(Math.max(0, Math.min(idx, totalPages - 1)));
    setDragOffset(0);
    setIsDragging(false);
  }, [totalPages]);

  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, totalPages]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(false);
  };

  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      setIsDragging(true);
    }
    if (isDragging) {
      setDragOffset(dx);
    }
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (isDragging && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    } else {
      goTo(page);
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const trackWidth = trackRef.current?.offsetWidth || 0;
  const translateX = -(page * 100) + (isDragging ? (dragOffset / trackWidth) * 100 : 0);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-blue-600 text-sm font-semibold mb-2">Customer Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Customers success is <br /> our success
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button onClick={prev} disabled={page === 0} className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40">←</button>
            <button onClick={next} disabled={page >= totalPages - 1} className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40">→</button>
          </div>
        </div>

        <div className="overflow-hidden relative" ref={trackRef}>
          <button onClick={prev} disabled={page === 0} className="absolute left-0 top-0 w-[15%] h-full z-10 bg-transparent border-none disabled:pointer-events-none" aria-label="Previous" />
          <button onClick={next} disabled={page >= totalPages - 1} className="absolute right-0 top-0 w-[15%] h-full z-10 bg-transparent border-none disabled:pointer-events-none" aria-label="Next" />

          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-400 ease-in-out"}`}
            style={{ transform: `translateX(${translateX}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {Array.from({ length: totalPages }).map((_, pageIdx) => (
              <div key={pageIdx} className={`flex-shrink-0 w-full grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                {STORIES.slice(pageIdx * perPage, pageIdx * perPage + perPage).map((story, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
                    <img src={story.img} alt={story.title} className="w-full h-56 object-cover" />
                    <div className={`flex flex-col flex-1 p-6 ${story.bg}`}>
                      <h3 className="font-extrabold text-gray-900 text-lg mb-3">{story.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{story.text}</p>
                      <a href="#" className="text-gray-900 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Read Story <span>→</span></a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === page ? "bg-blue-600 w-5" : "bg-gray-300 w-2"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}