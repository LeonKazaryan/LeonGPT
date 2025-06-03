import React, { useState } from "react";
import axios from "axios";

const MainPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/chat", { message });
      setReply(res.data.reply);
    } catch (err) {
      setError("Shit! Something went wrong. Try again?");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          LeonGPT
        </h1>

        <form onSubmit={sendMessage} className="space-y-4">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="w-full h-32 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400 transition duration-200 resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className={`absolute bottom-4 right-4 px-6 py-2 rounded-lg font-medium transition duration-200 
                ${
                  isLoading || !message.trim()
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                }`}
            >
              {isLoading ? "Thinking..." : "Send"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {reply && !error && (
          <div className="mt-8 p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              LeonGPT:
            </h2>
            <p className="text-gray-300 whitespace-pre-wrap">{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
