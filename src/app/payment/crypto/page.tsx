'use client';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CryptoPage() {
  const [copied, setCopied] = useState(false);
  const wallet = "TV2...TRC20...WALLET...ADDRESS";

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-6 font-mono text-center">
      <Link href="/" className="absolute top-6 left-6 text-white/50 hover:text-white flex items-center gap-2">
        <ArrowLeft size={20} /> Назад
      </Link>
      
      <h1 className="text-2xl font-bold mb-2">Оплата USDT (TRC20)</h1>
      <p className="text-white/50 text-sm mb-8">Відскануйте QR або скопіюйте адресу</p>

      <div className="w-64 h-64 bg-white p-4 rounded-2xl mb-8 flex items-center justify-center">
         <div className="w-full h-full bg-black/10 border-4 border-black/20 rounded flex items-center justify-center text-black/20 font-bold">QR CODE</div>
      </div>

      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 flex items-center gap-3 w-full max-w-md mb-8">
        <code className="text-[#00FF94] flex-1 truncate">{wallet}</code>
        <button onClick={handleCopy} className="text-white/50 hover:text-white">
            {copied ? <Check size={20} className="text-[#00FF94]" /> : <Copy size={20} />}
        </button>
      </div>

      <button className="w-full max-w-md bg-[#00FF94] text-black py-4 rounded-xl font-bold uppercase hover:bg-[#00cc76]">
          Я оплатив
      </button>
    </main>
  );
}