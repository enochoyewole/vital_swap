import { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGE = {
  role: "assistant",
  text: "Hello! I'm your currency exchange assistant. I can help you with exchange rates, currency conversions, and answer questions about foreign exchange. Try asking me something like 'Convert 100 USD to EUR' or 'What's the exchange rate for GBP?'",
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a helpful currency exchange assistant for VitalSwap, a currency exchange platform. Help users with exchange rates, currency conversions, and questions about foreign exchange. Be concise and friendly. When doing conversions, use realistic current market rates and show the calculation clearly.",
          messages: history,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I could not get a response.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section className="bg-gray-50" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div className="bg-blue-700 px-6 py-4">
        <h2 className="text-white font-bold text-lg">Currency Exchange Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-6 overflow-y-auto flex flex-col gap-4" style={{ minHeight: "500px", maxHeight: "600px" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "assistant"
                ? "self-start max-w-xl bg-white border border-gray-200 rounded-2xl px-5 py-4 text-gray-800 text-sm leading-relaxed shadow-sm"
                : "self-end max-w-xl bg-blue-700 rounded-2xl px-5 py-4 text-white text-sm leading-relaxed shadow-sm"
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="self-start bg-white border border-gray-200 rounded-2xl px-5 py-4 text-gray-400 text-sm shadow-sm">
            Typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about currency exchange rates..."
          className="flex-1 px-5 py-3 rounded-full border border-blue-400 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-blue-700 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>

    </section>
  );
}