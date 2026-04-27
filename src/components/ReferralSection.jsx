import { useState } from "react";

const REFERRALS = [
  { tag: "ebarim" },
  { tag: "caramel" },
  { tag: "taiwo" },
  { tag: "lideeyah" },
];

export default function ReferralSection() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (tag) => {
    navigator.clipboard.writeText("https://Vitalswap.com/ref/" + tag);
    setCopied(tag);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3">
            SwapTag Referrals
          </h2>
          <div className="w-16 h-1 bg-gray-300 rounded mx-auto mb-6"></div>
          <p className="text-gray-600 text-base">
            Invite friends and earn reward for every successful swap.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {REFERRALS.map((ref) => (
            <div key={ref.tag} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
              <a href={"https://Vitalswap.com/ref/" + ref.tag} className="text-blue-600 text-sm underline break-all">
                Vitalswap.com/ref/{ref.tag}
              </a>
              <button
                onClick={() => handleCopy(ref.tag)}
                className="w-full py-3 rounded-2xl font-bold text-gray-900 text-sm bg-yellow-500 hover:bg-yellow-600 transition-colors"
              >
                {copied === ref.tag ? "Copied!" : "Copy Link and Earn"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}