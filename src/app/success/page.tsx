'use client';

import Link from 'next/link';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-white text-center">
      
      {/* Анимация галочки (можно добавить потом сложнее) */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-[#00FF94] blur-2xl opacity-20 rounded-full animate-pulse"></div>
        <CheckCircle className="relative text-[#00FF94] w-32 h-32" strokeWidth={1.5} />
      </div>

      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
        Замовлення <br /> <span className="text-[#00FF94]">Прийнято!</span>
      </h1>

      <p className="text-gray-400 text-lg max-w-md mb-10">
        Дякуємо за покупку. Менеджер зв'яжеться з вами протягом 5 хвилин для підтвердження.
        <br />
        <span className="text-xs text-gray-600 mt-2 block">ID замовлення: #NX-{Math.floor(Math.random() * 100000)}</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link href="/" className="flex-1 bg-[#00FF94] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00cc76] transition">
           <Home size={20} />
           На головну
        </Link>
        <Link href="/dashboard" className="flex-1 bg-[#111] border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition">
           <ShoppingBag size={20} />
           Мої замовлення
        </Link>
      </div>

    </div>
  );
}