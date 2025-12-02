'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

// Тип товара
type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  vendor?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, type: 'plus' | 'minus') => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Флаг, чтобы не перезаписывать пустой массив при первом рендере

  // 1. Загружаем корзину из LocalStorage при запуске (только на клиенте)
  useEffect(() => {
    const savedCart = localStorage.getItem('nexus_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Ошибка парсинга корзины", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Сохраняем корзину при любом изменении (только если загрузка завершена)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // === ИСПРАВЛЕННАЯ ФУНКЦИЯ ===
  const addToCart = (product: any) => {
    // Сначала проверяем, есть ли товар, используя текущий стейт cartItems
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Если товар есть — показываем тост И обновляем стейт
      toast.success(`Кількість збільшено: ${product.title}`, { 
          icon: '➕',
          style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Если товара нет — показываем тост И добавляем новый
      toast.success('Додано в кошик', { 
          icon: '🛒', 
          style: { background: '#00FF94', color: '#000', fontWeight: 'bold' } 
      });

      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          vendor: product.vendor,
        },
      ]);
    }
  };
  // ============================

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.error('Товар видалено', { 
        icon: '🗑️',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
  };

  const updateQuantity = (id: number, type: 'plus' | 'minus') => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}