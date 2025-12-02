'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Product = {
  id: string;
  title: string;
  price: number;
  vendor: string;
  color?: string;
  stock?: number;
  isUkranian?: boolean;
};

type CartItem = Product & { quantity: number };

interface ShopContextType {
  cart: CartItem[];
  favorites: Product[];
  isCartOpen: boolean;
  isFavOpen: boolean; // НОВЕ: Стан для панелі улюблених
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  toggleFavorite: (product: Product) => void;
  toggleCart: () => void;
  toggleFav: () => void; // НОВЕ: Функція перемикання улюблених
  showToast: (msg: string, type?: 'success' | 'error') => void;
  toasts: { id: number; msg: string; type: 'success' | 'error' }[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: 'success' | 'error' }[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('nexus_cart');
      const savedFavs = localStorage.getItem('nexus_favs');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    localStorage.setItem('nexus_favs', JSON.stringify(favorites));
  }, [cart, favorites]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    showToast(`Додано: ${product.title}`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        showToast(`Видалено з улюблених`, 'error');
        return prev.filter((item) => item.id !== product.id);
      }
      showToast(`❤️ В улюблених!`);
      return [...prev, product];
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleFav = () => setIsFavOpen(!isFavOpen);

  return (
    <ShopContext.Provider value={{ cart, favorites, isCartOpen, isFavOpen, addToCart, removeFromCart, toggleFavorite, toggleCart, toggleFav, showToast, toasts }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};