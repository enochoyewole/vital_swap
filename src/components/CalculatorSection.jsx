import { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", label: "US Dollar ($)", symbol: "$" },
  { code: "NGN", label: "Nigerian Naira (₦)", symbol: "₦" },
  { code: "EUR", label: "Euro (€)", symbol: "€" },
  { code: "GBP", label: "British Pound (£)", symbol: "£" },
  { code: "AED", label: "UAE Dirham (د.إ)", symbol: "د.إ" },
];

const API_KEY = "876b9244511fda1012e15be9";

function CalculatorSection() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [vitalDiscount, setVitalDiscount] = useState(false);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const FEE_RATE = 0.002;

  useEffect(() => {
    fetchRates(from);
  }, [from]);

  async function fetchRates(baseCurrency) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (data.result === "error") throw new Error(data["error-type"]);

      const filtered = {};
      CURRENCIES.forEach((c) => {
        if (data.conversion_rates[c.code] !== undefined) {
          filtered[c.code] = data.conversion_rates[c.code];
        }
      });
      setRates(filtered);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Could not fetch live rates. Please check your API key.");
      setRates(null);
    } finally {
      setLoading(false);
    }
  }

  const rate = rates?.[to] ?? null;
  const parsedAmount = parseFloat(amount);
  const converted = amount && rate ? parsedAmount * rate : 0;
  const fee = amount && !isNaN(parsedAmount)
    ? parsedAmount * FEE_RATE * (vitalDiscount ? 0.5 : 1)
    : 0;
  const youGet = amount && rate
  ? (parsedAmount - fee) * rate
  : 0;

  const fromCurrency = CURRENCIES.find((c) => c.code === from);
  const toCurrency = CURRENCIES.find((c) => c.code === to);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="py-20 px-6 bg-blue-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3">
          Exchange Calculator
        </h2>
        <p className="text-gray-500 text-base sm:text-lg">
          Calculate your exchange amount and fees in real time
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left side */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Amount input */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Amount to Exchange
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            {/* Currency selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-800">
                  Currency Selection
                </label>
                <div className="flex items-center gap-2">
                  {loading && (
                    <span className="text-xs text-blue-500 animate-pulse">Fetching rates…</span>
                  )}
                  {lastUpdated && !loading && (
                    <span className="text-xs text-gray-400">Updated {lastUpdated}</span>
                  )}
                  {!loading && (
                    <button
                      onClick={() => fetchRates(from)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      ↻ Refresh
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 mb-2">{error}</p>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white cursor-pointer"
                >
                  {CURRENCIES.filter((c) => c.code !== to).map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>

                <button
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0 text-lg"
                >
                  ⇌
                </button>

                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white cursor-pointer"
                >
                  {CURRENCIES.filter((c) => c.code !== from).map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* VITAL token checkbox */}
            <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 transition">
              <input
                type="checkbox"
                checked={vitalDiscount}
                onChange={(e) => setVitalDiscount(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-blue-600 text-sm font-medium">
                I hold VITAL tokens (50% fee discount)
              </span>
            </label>
          </div>

          {/* Right side — summary */}
          <div className="md:w-72 bg-blue-50 rounded-2xl p-6 flex flex-col gap-4 border border-blue-100">
            <h3 className="text-lg font-extrabold text-blue-900 border-b border-blue-200 pb-3">
              Exchange Summary
            </h3>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-blue-100 rounded animate-pulse" />
                ))}
              </div>
            ) : !amount || isNaN(parsedAmount) ? (
              <p className="text-gray-400 text-sm">Enter amount to calculate exchange.</p>
            ) : !rates ? (
              <p className="text-red-400 text-sm">Rates unavailable. Please refresh.</p>
            ) : (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>You send</span>
                  <span className="font-semibold text-gray-800">
                    {fromCurrency.symbol}{parsedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Exchange rate</span>
                  <span className="font-semibold text-gray-800">
                    1 {from} = {rate?.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Fee (0.2%{vitalDiscount ? " − 50%" : ""})</span>
                  <span className="font-semibold text-gray-800">
                    {fromCurrency.symbol}{fee.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-blue-900 font-extrabold border-t border-blue-200 pt-3 text-base">
                  <span>You get</span>
                  <span>
                    {toCurrency.symbol}{youGet.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}

            <p className="text-gray-400 text-xs italic mt-auto">
              *Live rates via ExchangeRate-API. Amounts may vary slightly.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CalculatorSection;