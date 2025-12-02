'use client';

import Link from 'next/link'; // <--- ВОТ ЭТО БЫЛО ПРОПУЩЕНО
import { TrendingUp, DollarSign, Clock } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-black uppercase">Центр керування</h1>
        <p className="text-gray-500">ID Продавця: ETNODIM-01 // Статус: Активний</p>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Загальний дохід" value="₴48 600" icon={<DollarSign />} trend="+12%" />
        <StatCard title="Замовлення" value="9" icon={<Box />} trend="+2" />
        <StatCard title="Середній чек" value="₴5 400" icon={<TrendingUp />} trend="+5%" />
        <StatCard title="Час обробки" value="0.4s" icon={<Clock />} color="text-[#00FF94]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* БЛОК 1: Склад товаров */}
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
          <h3 className="font-bold mb-4 uppercase text-gray-400 text-sm tracking-wider">Склад товарів</h3>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">14 позицій</div>
              <div className="text-sm text-gray-500">Управління каталогом та цінами</div>
            </div>
            {/* Кнопка-ссылка */}
            <Link 
                href="/dashboard/add-product" 
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              + Додати
            </Link>
          </div>
        </div>

        {/* БЛОК 2: AI Studio */}
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF94] blur-[80px] opacity-20 group-hover:opacity-30 transition"></div>
          
          <h3 className="font-bold mb-4 uppercase text-[#00FF94] text-sm tracking-wider">AI Content Maker</h3>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="text-2xl font-bold">Генерація фото</div>
              <div className="text-sm text-gray-500">Автоматична генерація контенту</div>
            </div>
            {/* Кнопка-ссылка на студию (пока заглушка или можно вести на add-product) */}
           <Link href="/dashboard/studio">
    <button className="bg-[#00FF94] text-black ...">
        ✨ Студія
    </button>
</Link>
          </div>
        </div>

      </div>

      {/* ЛЕНТА ЗАКАЗОВ (Превью) */}
      <div className="mt-8">
        <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF94]"></span>
            Стрічка замовлень
        </h3>
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
            {/* Строка 1 */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">📦</div>
                    <div>
                        <div className="font-bold text-sm">#df591db7</div>
                        <div className="text-xs text-gray-500">Cyber-Poshta Unit</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[#00FF94] text-sm font-bold bg-[#00FF94]/10 px-2 py-1 rounded">ОПЛАЧЕНО</div>
                    <div className="text-[10px] text-gray-500 mt-1">Метод: Apple Pay</div>
                </div>
            </div>
            {/* Строка 2 */}
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">👟</div>
                    <div>
                        <div className="font-bold text-sm">#a1b2c3d4</div>
                        <div className="text-xs text-gray-500">Nike Air Mag UA</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-1 rounded">ОЧІКУЄ</div>
                    <div className="text-[10px] text-gray-500 mt-1">Метод: Mono Parts</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Компонент карточки статистики
function StatCard({ title, value, icon, trend, color }: any) {
    return (
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-32 hover:border-white/10 transition">
            <div className="flex justify-between items-start">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</span>
                <div className={`p-2 rounded-lg bg-white/5 ${color || 'text-white'}`}>{icon}</div>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-black font-mono">{value}</span>
                {trend && <span className="text-xs text-[#00FF94] mb-1">{trend}</span>}
            </div>
        </div>
    )
}

// Иконка коробки
function Box() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    )
}