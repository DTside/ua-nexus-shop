'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation'; // <--- 1. Импортируем роутер

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter(); // <--- 2. Инициализируем роутер

  // Функция перехода к оформлению
  const handleCheckout = () => {
    router.push('/checkout'); // <--- 3. Перенаправляем на страницу оформления
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-wider">Мій кошик <span className="text-[#00FF94]">.</span></h1>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center border border-dashed border-gray-800 rounded-2xl p-10">
            <div className="text-6xl mb-4 text-gray-700">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Кошик порожній</h2>
            <p className="text-gray-500 mb-6">Ви ще нічого не додали.</p>
            <Link href="/" className="bg-[#00FF94] text-black font-bold py-3 px-8 rounded-xl hover:bg-[#00cc76] transition">
                Перейти до покупок
            </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Items List */}
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-white/10 transition">
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-2xl">
                                📦
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-[#00FF94] font-mono">₴ {item.price.toLocaleString()}</p>
                                {item.vendor && <p className="text-xs text-gray-500">@{item.vendor}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex items-center bg-black rounded-lg border border-white/10">
                                <button onClick={() => updateQuantity(item.id, 'minus')} className="p-3 hover:text-[#00FF94] transition"><Minus size={16} /></button>
                                <span className="w-8 text-center font-mono font-bold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 'plus')} className="p-3 hover:text-[#00FF94] transition"><Plus size={16} /></button>
                            </div>

                            <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition p-2">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="bg-[#111] border border-[#00FF94]/30 rounded-2xl p-6 mt-8 shadow-[0_0_30px_rgba(0,255,148,0.05)]">
                <div className="flex justify-between items-center mb-6 text-xl">
                    <span className="text-gray-400">Разом до сплати:</span>
                    <span className="text-3xl font-black text-[#00FF94] font-mono">₴ {totalPrice.toLocaleString()}</span>
                </div>
                
                {/* Исправленная кнопка */}
                <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#00FF94] text-black font-black text-xl py-4 rounded-xl hover:bg-[#00cc76] transition shadow-lg active:scale-[0.99]"
                >
                    ОФОРМИТИ ЗАМОВЛЕННЯ
                </button>
            </div>
        </div>
      )}
    </div>
  );
}