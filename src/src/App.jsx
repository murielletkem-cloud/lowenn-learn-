import React, { useState } from 'react';
import { BookOpen, Sparkles, Image as ImageIcon, Send, Cpu, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour Emlu ! Je suis prêt. Posez-moi une question sur vos révisions scientifiques ou demandez-moi une illustration.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Réponse simulée pour : "${userMessage}".` }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Luwenn Learn
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col justify-between">
        <div className="space-y-4 mb-4 overflow-y-auto flex-1 pr-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-[85%] ${
                msg.role === 'user'
                  ? 'ml-auto bg-indigo-600 text-white'
                  : 'mr-auto bg-slate-900 border border-slate-800 text-slate-200'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-slate-900 border border-slate-800 p-4 rounded-xl text-slate-400 text-sm animate-pulse">
              Réflexion en cours...
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question scientifique..."
            className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-slate-100 placeholder-slate-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-lg transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </main>
    </div>
  );
}
