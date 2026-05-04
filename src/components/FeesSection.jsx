const FEES = [
  {
    label: "Platform Operations",
    desc: "Maintaining servers, infrastructure and uptime",
    percent: 50,
    color: "#4dabf7",
  },
  {
    label: "Customer Support",
    desc: "24/7 dedicated support team for all users",
    percent: 25,
    color: "#ff922b",
  },
  {
    label: "Development & Security",
    desc: "Continuous improvements and security updates",
    percent: 25,
    color: "#cc5de8",
  },
];

function DonutChart({ data, size = 220 }) {
  const strokeWidth = 55;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  let cumulative = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {data.map((item, i) => {
          const dash = (item.percent / 100) * circumference;
          const gap = circumference - dash;
          const offset = (cumulative / 100) * circumference;
          cumulative += item.percent;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              style={{ transition: "all 0.5s ease" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-white rounded-full flex items-center justify-center"
          style={{ width: "80px", height: "80px" }}
        >
          <span className="text-xl font-extrabold text-slate-800">100%</span>
        </div>
      </div>
    </div>
  );
}

export default function FeesSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3">
            Where Your Fees Go
          </h2>
          <p className="text-gray-500 text-base">
            Complete transparency on how we use your fees
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-40">

          {/* Labels + percentages inline */}
          <div className="flex flex-col gap-6 flex-1">
            {FEES.map((fee) => (
              <div key={fee.label} className="flex items-start gap-5">
                <div
                  className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: fee.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-gray-900 flex-1">{fee.label}</p>
                    <span className="font-bold text-gray-900 text-base w-12 text-right">
                      {fee.percent}%
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{fee.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Donut only */}
          <div className="flex justify-center">
            <DonutChart data={FEES} size={220} />
          </div>

        </div>
      </div>
    </section>
  );
}