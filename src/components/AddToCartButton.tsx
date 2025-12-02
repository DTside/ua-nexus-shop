'use client';

import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    // Сбрасываем надпись через 2 секунды
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full font-black uppercase py-5 rounded-xl text-xl transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3
      ${isAdded ? 'bg-white text-black' : 'bg-[#00FF94] text-black hover:bg-[#00cc76]'}`}
    >
      {isAdded ? (
        <span>✓ Додано в кошик</span>
      ) : (
        <>
          <span>Купити — ₴ {product.price.toLocaleString()}</span>
          <Plus strokeWidth={3} />
        </>
      )}
    </button>
  );
}