'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package, Box, Wand2, Home } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Перевіряємо, хто зайшов
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen bg-[#090909]" />;

  const isAdmin = user?.role === 'ADMIN';

  // Посилання для меню
  const navItems = isAdmin 
    ? [ // Меню АДМІНА
        { name: 'Огляд', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Замовлення', href: '/dashboard/orders', icon: ShoppingBag },
        { name: 'Склад (CRM)', href: '/dashboard/inventory', icon: Box },
        { name: 'AI Studio', href: '/dashboard/studio', icon: Wand2 },
        { name: 'Налаштування', href: '/dashboard/settings', icon: Settings },
      ]
    : [ // Меню ПОКУПЦЯ
        { name: 'Мій кабінет', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Мої замовлення', href: '/dashboard/orders', icon: Package },
        { name: 'Налаштування', href: '/dashboard/settings', icon: Settings },
      ];

  return (
    <div className="min-h-screen bg-[#090909] text-white flex">
      {/* --- БОКОВЕ МЕНЮ (Спільне) --- */}
      <aside className="w-64 border-r border-white/5 p-6 hidden md:flex flex-col justify-between fixed h-full bg-[#090909] z-50">
        <div>
            <div className="text-2xl font-black tracking-tighter mb-10 flex items-center gap-2">
                UA<span className="text-[#00FF94]">NEXUS</span> 
                {isAdmin && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50 align-top">PRO</span>}
            </div>
            
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                            ${isActive 
                                ? 'bg-[#00FF94] text-black font-bold shadow-[0_0_15px_rgba(0,255,148,0.2)]' 
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Icon size={20} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
        </div>
        
        <div className="space-y-2">
            <Link href="/" className="flex items-center gap-3 p-3 text-white/30 hover:text-white transition rounded-xl hover:bg-white/5">
                <Home size={18} /> На головну
            </Link>
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-red-500/50 hover:text-red-500 transition rounded-xl hover:bg-red-500/10"
            >
                <LogOut size={18} /> Вийти
            </button>
        </div>
      </aside>

      {/* --- ОСНОВНИЙ КОНТЕНТ --- */}
      <main className="flex-grow md:ml-64 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}