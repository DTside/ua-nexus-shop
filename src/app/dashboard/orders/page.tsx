'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Clock, CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Берем юзера из памяти браузера
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const user = JSON.parse(storedUser);

    // 2. Загружаем ЕГО заказы
    async function fetchOrders() {
      try {
        const res = await fetch(`/api/orders/user?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [router]);

  // Функция для красивого отображения статуса
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="text-yellow-500 flex items-center gap-1"><Clock size={14}/> Обробка</span>;
      case 'SHIPPED': return <span className="text-blue-500 flex items-center gap-1"><Package size={14}/> В дорозі</span>;
      case 'COMPLETED': return <span className="text-[#00FF94] flex items-center gap-1"><CheckCircle size={14}/> Виконано</span>;
      case 'CANCELLED': return <span className="text-red-500 flex items-center gap-1"><XCircle size={14}/> Скасовано</span>;
      default: return <span className="text-white/50">{status}</span>;
    }
  };

  if (loading) {
    return (
        <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00FF94]" size={40} />
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20"> {/* pb-20 добавит отступ снизу для скролла */}
      
      <h1 className="text-3xl font-black uppercase tracking-wide mb-8">Мої замовлення</h1>

      {orders.length === 0 ? (
        // ЕСЛИ ЗАКАЗОВ НЕТ
        <div className="bg-[#111] border border-white/10 rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={32} className="text-white/30" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Історія порожня</h2>
            <p className="text-white/40 mb-8">Ви ще нічого не замовляли у нас.</p>
            <Link href="/" className="bg-[#00FF94] text-black px-8 py-3 rounded-xl font-bold hover:bg-[#00cc76] transition">
                Перейти до каталогу
            </Link>
        </div>
      ) : (
        // ЕСЛИ ЗАКАЗЫ ЕСТЬ
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order.id} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#00FF94]/30 transition group">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-white/5 pb-4">
                        <div>
                            <div className="text-xs text-white/40 font-mono mb-1">ЗАМОВЛЕННЯ</div>
                            <div className="text-lg font-bold font-mono text-white">#{order.id.slice(0, 8).toUpperCase()}</div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <div className="text-xs text-white/40 font-mono mb-1">
                                {new Date(order.createdAt).toLocaleDateString('uk-UA')}
                            </div>
                            <div className="font-bold text-sm bg-white/5 px-3 py-1 rounded-lg inline-block">
                                {getStatusBadge(order.status)}
                            </div>
                        </div>
                    </div>

                    {/* Список товаров в заказе */}
                    <div className="space-y-3 mb-6">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.product.image ? (
                                        <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20"><Package size={16}/></div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="text-sm font-bold text-white">{item.product.title}</div>
                                    <div className="text-xs text-white/40">
                                        {item.quantity} x ₴{item.price.toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-sm font-mono text-white">
                                    ₴{(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <span className="text-white/40 text-sm">Всього до сплати:</span>
                        <span className="text-xl font-bold text-[#00FF94] font-mono">
                            ₴ {order.totalAmount.toLocaleString()}
                        </span>
                    </div>

                </div>
            ))}
        </div>
      )}
    </div>
  );
}