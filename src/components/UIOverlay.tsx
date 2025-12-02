'use client';

import { useShop } from '@/context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function UIOverlay() {
  const { cart, favorites, isCartOpen, isFavOpen, toggleCart, toggleFav, removeFromCart, toggleFavorite, toasts } = useShop();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* TOASTS */}
      <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`pointer-events-auto px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-bold shadow-2xl min-w-[200px] flex items-center gap-2 ${
                toast.type === 'error' ? 'bg-red-500/20 border-red-500 text-white' : 'bg-[#00FF94]/20 border-[#00FF94] text-white'
              }`}
            >
              <span>{toast.type === 'error' ? '✖' : '✔'}</span> {toast.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- CART DRAWER (КОШИК) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleCart} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#111] border-l border-white/10 z-[101] p-6 flex flex-col shadow-2xl h-screen">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-black uppercase flex items-center gap-2 text-white"><ShoppingBag className="text-[#00FF94]" /> Кошик</h2>
                <button onClick={toggleCart}><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {cart.length === 0 ? <p className="text-white/30 text-center mt-20">Пусто...</p> : cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-[#1A1A1A] p-3 rounded-xl border border-white/5 relative">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.title}</h4>
                        <div className="flex justify-between mt-2"><span className="text-[#00FF94]">₴{item.price}</span><span className="text-xs text-white/50">x{item.quantity}</span></div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={16} /></button>
                    </div>
                ))}
              </div>
              {cart.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between mb-4"><span className="text-white/50">Всього:</span><span className="text-2xl font-black">₴{total.toLocaleString()}</span></div>
                    <Link href="/payment/crypto" className="flex items-center justify-center gap-2 w-full bg-[#00FF94] text-black font-black py-4 rounded-xl uppercase hover:bg-[#00cc76]">Оформити <ArrowRight size={18} /></Link>
                  </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- FAVORITES DRAWER (УЛЮБЛЕНІ) --- */}
      <AnimatePresence>
        {isFavOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleFav} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#111] border-l border-white/10 z-[101] p-6 flex flex-col shadow-2xl h-screen">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-black uppercase flex items-center gap-2 text-white"><Heart className="text-red-500" fill="currentColor" /> Улюблені</h2>
                <button onClick={toggleFav}><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {favorites.length === 0 ? <p className="text-white/30 text-center mt-20">Немає лайків...</p> : favorites.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-[#1A1A1A] p-3 rounded-xl border border-white/5 relative">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.title}</h4>
                        <p className="text-[#00FF94]">₴{item.price}</p>
                      </div>
                      <button onClick={() => toggleFavorite(item)} className="text-white/30 hover:text-red-500"><X size={16} /></button>
                    </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}