'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, User, Plus, Eye, Shirt, Trash2, Pencil, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';
import EditProductModal from '@/components/EditProductModal';

export default function MainFeed({ products: initialProducts }: { products: any[] }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(initialProducts);
  
  // Состояния для админки
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ПРОВЕРКА ПРИ ЗАГРУЗКЕ
  useEffect(() => {
    // 1. Проверяем админа в URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
        setShowAdminButton(true);
    }

    // 2. Проверяем, вошел ли юзер (для иконки профиля)
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Если user есть, будет true, иначе false
  }, []);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Видалити цей товар назавжди?')) return;
    try {
        const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(products.filter(p => p.id !== id));
        } else {
            alert('Помилка видалення');
        }
    } catch (e) {
        alert('Помилка сервера');
    }
  };

  const handleSave = (updatedProduct: any) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  return (
    <main className="h-screen w-full bg-[#0D0D0D] text-[#E0E0E0] overflow-y-auto custom-scrollbar scroll-smooth">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/5">
        <div className="text-xl font-black tracking-tighter text-white drop-shadow-md select-none cursor-pointer">
          UA<span className="text-[#00FF94]">NEXUS</span>
        </div>

        {/* КНОПКА АДМИНА (СКРЫТАЯ) */}
        {showAdminButton && (
            <button 
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all flex items-center gap-2
                ${isAdminMode ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-white/10 text-white/30 hover:text-white'}`}
            >
                <ShieldAlert size={14} />
                {isAdminMode ? 'ADMIN MODE' : 'USER MODE'}
            </button>
        )}

        <div className="flex gap-4">
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition group">
                 <ShoppingBag size={20} className="group-hover:text-[#00FF94] transition-colors" />
            </Link>
            
            {/* === УМНАЯ ИКОНКА ПРОФИЛЯ === */}
            {/* Если вошел -> Dashboard, Если нет -> Register */}
            <Link 
                href={isLoggedIn ? "/dashboard" : "/register"} 
                className="p-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition group"
            >
                <User size={20} className={`transition-colors ${isLoggedIn ? 'text-[#00FF94]' : 'group-hover:text-white text-white/70'}`} />
            </Link>
        </div>
      </header>

      {/* === HERO BANNER === */}
      <div className="relative w-full py-28 md:py-40 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5 bg-[#0D0D0D]">
        
        {/* ФОНОВЫЕ СЛОИ */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-[#0D0D0D] to-[#0D0D0D] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF94] opacity-[0.08] blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 h-3/4 w-px bg-gradient-to-b from-transparent via-[#00FF94]/20 to-transparent hidden md:block"></div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-3/4 w-px bg-gradient-to-b from-transparent via-[#00FF94]/20 to-transparent hidden md:block"></div>

        {/* ДЕКОР */}
        <div className="absolute top-10 left-10 text-white/20 hidden md:block">+</div>
        <div className="absolute top-10 right-10 text-white/20 hidden md:block">+</div>
        <div className="absolute bottom-10 left-10 text-white/20 hidden md:block">+</div>
        <div className="absolute bottom-10 right-10 text-white/20 hidden md:block">+</div>

        {/* КОНТЕНТ */}
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-[#00FF94] uppercase border border-[#00FF94]/20 rounded-full bg-[#00FF94]/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,148,0.1)]">
                <Shirt size={12} fill="currentColor" />
                New Season Drop
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
                <span className="neon-white">Wear The</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-emerald-400 to-cyan-500 neon-gradient block md:inline mt-2 md:mt-0">
                    Future
                </span>
            </h1>
            
            <p className="text-white/50 text-base md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light">
                Преміальний стрітвір, лімітовані колекції та український кібер-стиль.
                Створи свій унікальний образ вже сьогодні.
            </p>
            
            <button 
                onClick={scrollToCatalog}
                className="bg-[#00FF94] text-black font-bold uppercase py-4 px-10 rounded-full hover:bg-[#00cc76] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,255,148,0.4)] tracking-widest text-sm"
            >
                Дивитись колекцію
            </button>
        </div>
      </div>

      {/* СЕТКА ТОВАРОВ */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                <span className="w-1.5 h-8 bg-[#00FF94] rounded-sm block shadow-[0_0_10px_#00FF94]"></span>
                Каталог одягу
            </h2>
            <span className="text-white/40 text-sm font-mono border border-white/10 px-3 py-1 rounded-full">{products.length} ITEMS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-32">
            {products.map((product) => (
                <div key={product.id} className="relative group">
                    <ProductCard product={product} onAdd={() => addToCart(product)} />
                    
                    {/* КНОПКИ АДМИНА */}
                    {isAdminMode && (
                        <div className="absolute top-2 right-2 z-30 flex gap-2">
                            <button 
                                onClick={() => setEditingProduct(product)}
                                className="p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                            >
                                <Pencil size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      <Footer />

      {editingProduct && (
        <EditProductModal 
            product={editingProduct} 
            onClose={() => setEditingProduct(null)} 
            onSave={handleSave} 
        />
      )}

    </main>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: () => void }) {
  return (
    <div className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00FF94]/50 hover:shadow-[0_0_30px_rgba(0,255,148,0.15)] transition-all duration-500 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4] w-full bg-[#1a1a1a]">
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"/>
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${product.color || 'from-[#1a1a1a] to-[#0D0D0D]'} flex items-center justify-center`}><Shirt size={48} className="text-white/20" /></div>
          )}
          
          {product.stock > 0 && (
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[#00FF94] text-[10px] font-bold px-2 py-1 rounded border border-[#00FF94]/20 uppercase tracking-wider z-10">
                In Stock
            </span>
          )}

          <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 z-20">
            <span className="bg-white text-black px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl hover:scale-105">
                <Eye size={14} /> Детальніше
            </span>
          </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="block flex-grow">
            <h3 className="font-bold text-sm text-white/90 mb-1 leading-snug group-hover:text-[#00FF94] transition-colors line-clamp-2 uppercase tracking-wide">
                {product.title}
            </h3>
            <p className="text-xs text-white/40 font-mono mb-4 truncate uppercase tracking-wider border-b border-white/5 pb-2">
                {product.vendor}
            </p>
        </Link>
        <div className="flex items-center justify-between mt-auto">
            <span className="font-mono text-lg text-[#00FF94] font-bold drop-shadow-[0_0_5px_rgba(0,255,148,0.3)]">
                ₴ {product.price.toLocaleString()}
            </span>
            <button 
                onClick={(e) => { e.preventDefault(); onAdd(); }} 
                className="bg-[#222] p-2.5 rounded-xl text-white hover:bg-[#00FF94] hover:text-black transition-all hover:scale-110 active:scale-95 border border-white/5 hover:border-transparent"
            >
                <Plus size={18} strokeWidth={3} />
            </button>
        </div>
      </div>
    </div>
  );
}