'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Settings, LogOut, TrendingUp, Users, ShoppingBag, ArrowRight, Home, Clock } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Перевіряємо, чи увійшов юзер
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return null; 

  // === ВАРІАНТ 1: ДАШБОРД АДМІНА ===
  if (user.role === 'ADMIN') {
    return <AdminDashboard user={user} />;
  }

  // === ВАРІАНТ 2: КАБІНЕТ ПОКУПЦЯ (Звичайний юзер) ===
  return <UserDashboard user={user} />;
}

// --- КОМПОНЕНТ ДЛЯ ПОКУПЦЯ ---
function UserDashboard({ user }: { user: any }) {
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="max-w-5xl mx-auto">
        
        {/* Шапка */}
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wide mb-2">Мій Кабінет</h1>
            <p className="text-white/50">Вітаємо, <span className="text-[#00FF94]">{user.fullName}</span>!</p>
          </div>
          {/* Кнопки виходу тут прибрали, бо вони є в бічному меню layout */}
        </header>

        {/* Сітка меню */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Картка 1: Мої замовлення */}
            <Link href="/dashboard/orders" className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-[#00FF94]/50 transition group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-[#00FF94]/10 rounded-2xl text-[#00FF94]">
                        <Package size={32} />
                    </div>
                    <ArrowRight className="text-white/20 group-hover:text-[#00FF94] transition" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Мої Замовлення</h2>
                <p className="text-white/40 text-sm">Історія покупок та статус доставки</p>
            </Link>

            {/* Картка 2: Налаштування */}
            <Link href="/dashboard/settings" className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-[#00FF94]/50 transition group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-500">
                        <Settings size={32} />
                    </div>
                    <ArrowRight className="text-white/20 group-hover:text-purple-500 transition" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Налаштування</h2>
                <p className="text-white/40 text-sm">Зміна паролю та особистих даних</p>
            </Link>
        </div>

        {/* Статус активного замовлення (інформативно) */}
        <div>
            <h3 className="text-xl font-bold mb-6">Статус</h3>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF94]/5 rounded-full blur-[80px] pointer-events-none"></div>
                <ShoppingBag size={48} className="mx-auto text-white/10 mb-4 relative z-10" />
                <p className="text-white/30 relative z-10">Активних замовлень зараз немає.</p>
                <Link href="/" className="inline-block mt-4 text-[#00FF94] hover:underline relative z-10">Перейти до каталогу</Link>
            </div>
        </div>

    </div>
  );
}

// --- КОМПОНЕНТ ДЛЯ АДМІНА (Виправлений: без дублювання меню) ---
function AdminDashboard({ user }: { user: any }) {
  // Ми прибрали <aside> (бічну панель) і обгортку <div class="flex">, 
  // тому що вони вже є в файлі layout.tsx
  return (
    <div>
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-wide mb-1">Центр Керування</h1>
                <p className="text-white/40 font-mono text-sm">ID Продавця: {user.id.slice(0,8)} // Статус: Активний</p>
            </div>
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF94] to-blue-600 shadow-[0_0_15px_rgba(0,255,148,0.3)]"></div>
            </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Загальний дохід" value="₴48 600" sub="+12%" />
            <StatCard label="Замовлення" value="9" sub="+2" icon={<Package size={18}/>} />
            <StatCard label="Середній чек" value="₴5 400" sub="+5%" icon={<TrendingUp size={18}/>} />
            <StatCard label="Час обробки" value="0.4s" icon={<Clock size={18}/>} />
        </div>

        {/* AI STUDIO PROMO & ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-[#111] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">Склад товарів</h3>
                    <div className="text-4xl font-black mb-1">14 позицій</div>
                    <p className="text-white/40 text-sm mb-6">Управління каталогом та цінами</p>
                    {/* Кнопка веде на склад (створимо сторінку пізніше або просто заглушка) */}
                    <Link href="/dashboard/inventory">
                        <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition">+ Управління складом</button>
                    </Link>
                </div>
             </div>

             <div className="bg-gradient-to-br from-[#111] to-[#001a0f] border border-[#00FF94]/20 p-8 rounded-3xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-[#00FF94] text-xs font-bold uppercase tracking-wider mb-2">AI Content Maker</h3>
                    <div className="text-4xl font-black mb-1 text-white">Генерація фото</div>
                    <p className="text-white/40 text-sm mb-6">Автоматична генерація контенту</p>
                    <Link href="/dashboard/studio">
                        <button className="bg-[#00FF94] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#00cc76] transition shadow-[0_0_20px_rgba(0,255,148,0.3)]">
                            ✨ Студія
                        </button>
                    </Link>
                </div>
             </div>
        </div>
    </div>
  );
}

// Компонент картки статистики (щоб не дублювати код)
function StatCard({ label, value, sub, icon }: any) {
    return (
        <div className="bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-[#00FF94]/30 transition group">
            <div className="flex justify-between items-start mb-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{label}</span>
                <div className="p-2 bg-white/5 rounded-lg text-white group-hover:text-[#00FF94] transition">{icon || '$'}</div>
            </div>
            <div className="text-3xl font-black font-mono">{value} {sub && <span className="text-xs text-[#00FF94] align-top">{sub}</span>}</div>
        </div>
    )
}