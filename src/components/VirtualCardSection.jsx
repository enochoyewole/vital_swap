import { useState, useEffect } from "react";

const CARDS = [
  {
    type: "VISA",
    number: "4532 8765 3210 9876",
    holder: "Sarah Johnson",
    expiry: "08/26",
    bg: "linear-gradient(135deg, #3b5bdb, #4c6ef5)",
    stack1: "#a5d8a0",
    stack2: "#f4a9a8",
  },
  {
    type: "MASTER",
    number: "5500 1234 5678 9012",
    holder: "Michael Chen",
    expiry: "11/27",
    bg: "linear-gradient(135deg, #e03131, #c92a2a)",
    stack1: "#b197fc",
    stack2: "#a5d8a0",
  },
  {
    type: "VERVE",
    number: "5061 2345 6789 0123",
    holder: "Amanda Rodriguez",
    expiry: "03/28",
    bg: "linear-gradient(135deg, #2f9e44, #40c057)",
    stack1: "#f4a9a8",
    stack2: "#b197fc",
  },
];

export default function VirtualCardSection() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      shuffle();
    }, 3000);
    return () => clearInterval(timer);
  }, [animating]);

  const shuffle = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift();
        next.push(first);
        return next;
      });
      setAnimating(false);
    }, 500);
  };

  const stackStyles = [
    // back card
    {
      zIndex: 0,
      transform: animating
        ? "rotate(8deg) translate(22px, -14px) scale(0.92)"
        : "rotate(6deg) translate(18px, -10px) scale(0.92)",
      opacity: 0.6,
      transition: "all 0.5s ease",
    },
    // middle card
    {
      zIndex: 1,
      transform: animating
        ? "rotate(4deg) translate(12px, -6px) scale(0.96)"
        : "rotate(3deg) translate(10px, -5px) scale(0.96)",
      opacity: 0.8,
      transition: "all 0.5s ease",
    },
    // front card
    {
      zIndex: 2,
      transform: animating
        ? "rotate(-3deg) translate(-8px, 8px) scale(1.02)"
        : "rotate(0deg) translate(0, 0) scale(1)",
      opacity: 1,
      transition: "all 0.5s ease",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-16">
          VitalSwap Virtual Dollar Card
        </h2>

        {/* Stacked cards */}
        <div
          className="relative flex justify-center items-center mb-16 cursor-pointer"
          style={{ height: "220px" }}
          onClick={shuffle}
        >
          {order.map((cardIndex, stackIndex) => {
            const card = CARDS[cardIndex];
            return (
              <div
                key={cardIndex}
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "180px",
                  borderRadius: "16px",
                  background: stackIndex === 2 ? card.bg : stackIndex === 1 ? CARDS[order[1]].stack1 : CARDS[order[0]].stack2,
                  ...stackStyles[stackIndex],
                  boxShadow: stackIndex === 2 ? "0 20px 40px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {/* Only render card details on front card */}
                {stackIndex === 2 && (
                  <div className="text-white p-5 h-full flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </div>
                      <span className="font-bold text-sm tracking-widest">{card.type}</span>
                    </div>

                    {/* Card number */}
                    <p className="text-base font-mono tracking-widest">{card.number}</p>

                    {/* Bottom row */}
                    <div className="flex justify-between items-end">
                      <div className="text-left">
                        <p className="text-xs text-white/70">Card holder name</p>
                        <p className="text-sm font-bold">{card.holder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/70">Expiry date</p>
                        <p className="text-sm font-bold">{card.expiry}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto mb-10">
          Making cross-border payments can be a hassle. High fees, terrible exchange
          rates, and long delays make it tough to pay for things in dollars. That's why
          VitalSwap created the virtual Dollar card — a simple and affordable solution to
          help you shop globally.
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const frontCard = order[2];
                if (frontCard !== i) shuffle();
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                order[2] === i ? "bg-blue-600 w-6" : "bg-gray-300 w-3"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}