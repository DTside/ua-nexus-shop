'use client';

import toast from 'react-hot-toast'; // <--- ВОТ ЭТА СТРОКА БЫЛА ПРОПУЩЕНА

export default function OrdersPage() {
  const orders = [
    { id: '#NX-9921', date: '01.12.2025', items: 'Cyber-Poshta Unit', total: '23 500', status: 'В дорозі', color: 'text-blue-400' },
    { id: '#NX-8812', date: '28.11.2025', items: 'Etnodim Embroidery', total: '4 200', status: 'Виконано', color: 'text-[#00FF94]' },
    { id: '#NX-1102', date: '15.11.2025', items: 'PowerBank 20000', total: '1 800', status: 'Скасовано', color: 'text-red-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black uppercase mb-8">Мої замовлення</h1>

      <div className="space-y-4">
        {orders.map((order) => (
            <div key={order.id} className="bg-[#111] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-xl">📦</div>
                    <div>
                        <div className="font-bold text-lg">{order.id}</div>
                        <div className="text-gray-500 text-sm">{order.items}</div>
                    </div>
                </div>

                <div className="flex items-center gap-8 text-sm">
                    <div className="text-gray-400">
                        <div className="text-xs uppercase">Дата</div>
                        <div>{order.date}</div>
                    </div>
                    <div>
                        <div className="text-xs uppercase text-gray-400">Сума</div>
                        <div className="font-mono font-bold">₴ {order.total}</div>
                    </div>
                    <div className={`font-bold px-3 py-1 rounded-full bg-white/5 ${order.color}`}>
                        {order.status}
                    </div>
                </div>

                <button 
                    onClick={() => toast('Детальна інформація скоро з\'явиться', { icon: 'ℹ️', style: { borderRadius: '10px', background: '#333', color: '#fff' } })}
                    className="text-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                >
                    Деталі
                </button>

            </div>
        ))}
      </div>
    </div>
  );
}