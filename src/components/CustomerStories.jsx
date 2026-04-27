import { useState } from "react";

const STORIES = [
  {
    img: "/images/image4.avif",
    title: "Transformative Payment Management",
    text: "This platform has completely transformed how we manage our international payments. It's fast, secure, and incredibly easy to use!",
    bg: "bg-yellow-50",
  },
  {
    img: "/images/image5.avif",
    title: "Smarter Business Decisions",
    text: "I love the real-time insights feature. It gives me the data I need to make smarter business decisions on the spot.",
    bg: "bg-green-50",
  },
  {
    img: "/images/image6.avif",
    title: "Top-Notch Security",
    text: "The security measures are top-notch. I feel confident knowing our transactions are protected at all times.",
    bg: "bg-blue-50",
  },
  {
    img: "/images/image1.avif",
    title: "Seamless Integration",
    text: "Integration with our existing systems was seamless. The support team was incredibly helpful throughout the entire process.",
    bg: "bg-pink-50",
  },
  {
    img: "/images/image2.avif",
    title: "Exceptional Customer Support",
    text: "The customer support is exceptional. They're always available and resolve any issues quickly. Highly recommend this platform!",
    bg: "bg-blue-50",
  },
  {
    img: "/images/image3.avif",
    title: "Game-Changing Analytics",
    text: "The analytics dashboard has been a game-changer for our team. We can now track everything in real-time and make data-driven decisions.",
    bg: "bg-orange-50",
  },
];

export default function CustomerStories() {
  const [mobilePage, setMobilePage] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);

  const desktopPerPage = 3;
  const desktopTotalPages = Math.ceil(STORIES.length / desktopPerPage);
  const desktopVisible = STORIES.slice(
    desktopPage * desktopPerPage,
    desktopPage * desktopPerPage + desktopPerPage
  );

  const mobileStory = STORIES[mobilePage];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-blue-600 text-sm font-semibold mb-2">Customers Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Customers success is <br /> our success
            </h2>
          </div>

          {/* Mobile nav */}
          <div className="flex sm:hidden items-center gap-3 mt-2">
            <button
              onClick={() => setMobilePage((p) => Math.max(p - 1, 0))}
              disabled={mobilePage === 0}
              className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40"
            >
              ←
            </button>
            <button
              onClick={() => setMobilePage((p) => Math.min(p + 1, STORIES.length - 1))}
              disabled={mobilePage === STORIES.length - 1}
              className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40"
            >
              →
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3 mt-2">
            <button
              onClick={() => setDesktopPage((p) => Math.max(p - 1, 0))}
              disabled={desktopPage === 0}
              className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40"
            >
              ←
            </button>
            <button
              onClick={() => setDesktopPage((p) => Math.min(p + 1, desktopTotalPages - 1))}
              disabled={desktopPage === desktopTotalPages - 1}
              className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="sm:hidden">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            <img
              src={mobileStory.img}
              alt={mobileStory.title}
              className="w-full h-56 object-cover"
            />
            <div className={"flex flex-col flex-1 p-6 " + mobileStory.bg}>
              <h3 className="font-extrabold text-gray-900 text-lg mb-3">
                {mobileStory.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {mobileStory.text}
              </p>
              <a href="#" className="text-gray-900 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Read Story <span>→</span>
              </a>
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobilePage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === mobilePage ? "bg-blue-600 w-4" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3-card grid */}
        <div className="hidden sm:grid grid-cols-3 gap-6 items-stretch">
          {desktopVisible.map((story, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
              <img
                src={story.img}
                alt={story.title}
                className="w-full h-56 object-cover"
              />
              <div className={"flex flex-col flex-1 p-6 " + story.bg}>
                <h3 className="font-extrabold text-gray-900 text-lg mb-3">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {story.text}
                </p>
                <a href="#" className="text-gray-900 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Read Story <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}