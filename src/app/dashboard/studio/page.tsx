'use client';

import { useState } from 'react';
import { ArrowLeft, Wand2, Download, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Логика генерации
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      if (data.url) {
        setGeneratedImage(data.url);
      } else {
        alert('Помилка сервера. Спробуйте ще раз.');
      }
    } catch (error) {
      alert('Помилка з\'єднання');
    } finally {
      setLoading(false);
    }
  };

  // Логика скачивания (Специальный хак для скачивания картинок)
  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob(); // Превращаем картинку в файл
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ua-nexus-design-${Date.now()}.jpg`; // Имя файла
      document.body.appendChild(link);
      link.click(); // Кликаем программно
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Если не вышло скачать, просто открываем в новой вкладке
      window.open(generatedImage, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col">
      
      {/* HEADER */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white transition">
            <ArrowLeft size={20} /> Назад
        </Link>
        <div className="font-black text-xl tracking-widest flex items-center gap-2">
            AI <span className="text-[#00FF94]">STUDIO</span>
        </div>
        <div className="w-20"></div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* ЛЕВАЯ ЧАСТЬ: ВВОД */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                        Створи одяг <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-blue-500">
                            Майбутнього
                        </span>
                    </h1>
                    <p className="text-white/40 text-lg">
                        Опиши свою ідею, і наш штучний інтелект візуалізує її за лічені секунди.
                    </p>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Наприклад: Чорне кіберпанк худі з неоновими вставками..."
                            className="w-full h-40 bg-[#111] border border-white/10 rounded-2xl p-5 text-lg focus:border-[#00FF94] outline-none resize-none transition-all placeholder:text-white/20"
                        />
                        <div className="absolute bottom-4 right-4 text-xs text-white/20">
                            AI MODEL: NEXUS-V2
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || !prompt}
                        className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-all
                        ${loading 
                            ? 'bg-white/5 text-white/50 cursor-not-allowed' 
                            : 'bg-[#00FF94] text-black hover:bg-[#00cc76] hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,148,0.3)]'
                        }`}
                    >
                        {loading ? (
                            <><Loader2 className="animate-spin" /> Генерація...</>
                        ) : (
                            <><Wand2 size={20} /> Генерувати</>
                        )}
                    </button>
                </form>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: РЕЗУЛЬТАТ */}
            <div className="relative aspect-square bg-[#111] rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group">
                
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                {loading ? (
                    <div className="text-center space-y-4 z-10">
                        <div className="relative w-16 h-16 mx-auto">
                            <div className="absolute inset-0 border-t-2 border-[#00FF94] rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-r-2 border-blue-500 rounded-full animate-spin reverse"></div>
                        </div>
                        <div className="text-[#00FF94] font-mono text-xs animate-pulse">
                            ANALYZING PROMPT...
                        </div>
                    </div>
                ) : generatedImage ? (
                    <>
                        <img 
                            src={generatedImage} 
                            alt="Generated" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                            
                            {/* РАБОТАЮЩАЯ КНОПКА СКАЧИВАНИЯ */}
                            <button 
                                onClick={handleDownload}
                                className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition cursor-pointer"
                            >
                                <Download size={18} /> Зберегти
                            </button>

                            <button 
                                onClick={() => setGeneratedImage(null)}
                                className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition"
                            >
                                <RefreshCw size={18} /> Спробувати ще
                            </button>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-mono text-[#00FF94] border border-[#00FF94]/20">
                            GENERATED
                        </div>
                    </>
                ) : (
                    <div className="text-center text-white/20">
                        <Wand2 size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="font-mono text-sm">Зображення з'явиться тут</p>
                    </div>
                )}
            </div>

        </div>
      </main>
    </div>
  );
}