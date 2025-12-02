'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Sparkles, Box } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Огляд', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Мої замовлення', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Склад (CRM)', href: '/dashboard/inventory', icon: Box },
    { name: 'AI Studio', href: '/dashboard/studio', icon: Sparkles },
    { name: 'Налаштування', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR (Левое меню) */}
      <aside className="w-64 border-r border-white/5 bg-[#0D0D0D] flex flex-col justify-between p-6 hidden md:flex">
        <div>
          <div className="text-2xl font-black tracking-tighter mb-10">
            UA<span className="text-[#00FF94]">NEXUS</span> <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded ml-2">PRO</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-[#00FF94] text-black font-bold shadow-[0_0_15px_rgba(0,255,148,0.3)]' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-black' : 'group-hover:text-[#00FF94]'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Старый код был: <button className="...">Вийти</button> */}
        
        {/* Новый код: Ссылка на главную страницу */}
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 transition mt-auto"
        >
          <LogOut size={20} />
          Вийти на головну
        </Link>
      </aside>

      {/* MAIN CONTENT (Правая часть) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
         {/* Фоновый шум */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>
         
         <div className="relative z-10 max-w-6xl mx-auto">
            {children}
         </div>
      </main>

    </div>
  );
}