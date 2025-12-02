import Link from 'next/link';
import { Instagram, Send, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#080808] text-white py-16 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Логотип и описание */}
        <div className="lg:col-span-2 space-y-6">
            <div className="text-2xl font-black tracking-tighter select-none">
                UA<span className="text-[#00FF94]">NEXUS</span>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                Твій надійний провідник у світ кібер-моди та тактичного спорядження.
                Майбутнє вже тут.
            </p>
        </div>

        {/* Колонка: ІНФОРМАЦІЯ */}
        <div>
          <h3 className="font-bold text-white uppercase tracking-wider mb-6 text-sm flex items-center gap-2">
            Інформація
          </h3>
          <ul className="space-y-4 text-sm text-white/50 font-medium">
            <li>
              <Link href="/about" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Про нас
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Доставка та оплата
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Повернення товару
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Блог
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка: КЛІЄНТАМ */}
        <div>
          <h3 className="font-bold text-white uppercase tracking-wider mb-6 text-sm flex items-center gap-2">
            Клієнтам
          </h3>
          <ul className="space-y-4 text-sm text-white/50 font-medium">
            <li>
              <Link href="/privacy" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Політика конфіденційності
              </Link>
            </li>
            <li>
              <Link href="/offer" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Публічна оферта
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#00FF94] hover:pl-2 transition-all duration-300 block">
                Угода користувача
              </Link>
            </li>
          </ul>

          {/* Соцсети (пока неактивны) */}
          <div className="flex gap-4 mt-8">
             <div className="p-3 bg-white/5 rounded-full border border-white/5 opacity-50 cursor-not-allowed group">
                <Instagram size={18} className="group-hover:text-white transition" />
             </div>
             <div className="p-3 bg-white/5 rounded-full border border-white/5 opacity-50 cursor-not-allowed group">
                <Send size={18} className="group-hover:text-white transition" />
             </div>
             <div className="p-3 bg-white/5 rounded-full border border-white/5 opacity-50 cursor-not-allowed group">
                <Twitter size={18} className="group-hover:text-white transition" />
             </div>
          </div>
        </div>

      </div>
      
      {/* Нижняя полоска */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-xs font-mono">
        <p>© 2025 UA-NEXUS. All rights reserved.</p>
        <p>Made in Ukraine 🇺🇦</p>
      </div>
    </footer>
  );
}