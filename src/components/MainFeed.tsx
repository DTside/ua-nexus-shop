'use client';

import { useState } from 'react';
import { ShoppingBag, User, Plus, Eye, Shirt, Trash2, Pencil, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';
import EditProductModal from '@/components/EditProductModal';

export default function MainFeed({ products: initialProducts }: { products: any[] }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(initialProducts);
  const [isAdminMode, setIsAdminMode] = useState(false); // Режим админа
  const [editingProduct, setEditingProduct] = useState<any>(null); // Какой товар редактируем

  // Скролл к каталогу
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Логика удаления
  const handleDelete = async (id: string) => {
    if (!confirm('Видалити цей товар назавжди?')) return;
    
    try {
        const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(products.filter(p => p.id !== id)); // Удаляем со страницы без перезагрузки
        } else {
            alert('Помилка видалення');
        }
    } catch (e) {
        alert('Помилка сервера');
    }
  };

  // Логика сохранения после редактирования
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

        {/* ADMIN TOGGLE (Временная кнопка для тебя) */}
        <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all flex items-center gap-2
            ${isAdminMode ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-white/10 text-white/30 hover:text-white'}`}
        >
            <ShieldAlert size={14} />
            {isAdminMode ? 'ADMIN ON' : 'ADMIN OFF'}
        </button>

        <div className="flex gap-4">
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition group">
                 <ShoppingBag size={20} className="group-hover:text-[#00FF94] transition-colors" />
            </Link>
            <Link href="/dashboard" className="p-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition group">
                <User size={20} className="group-hover:text-white transition-colors text-white/70" />
            </Link>
        </div>
      </header>

      {/* HERO BANNER */}
      <div className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-[#0D0D0D] to-[#0D0D0D] z-0" />
        <div className="absolute top-[-50%] right-[20%] w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>
        
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-[#00FF94] uppercase border border-[#00FF94]/20 rounded-full bg-[#00FF94]/5 backdrop-blur-sm">
                <Shirt size={12} fill="currentColor" />
                New Season Drop
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-[0_0_25px_rgba(0,255,148,0.15)] leading-tight">
                Wear The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-cyan-400">Future</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Преміальний стрітвір, лімітовані колекції та український кібер-стиль.
            </p>
            <button onClick={scrollToCatalog} className="bg-[#00FF94] text-black font-bold uppercase py-3 px-8 rounded-xl hover:bg-[#00cc76] hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)]">
                Дивитись колекцію
            </button>
        </div>
      </div>

      {/* СЕТКА ТОВАРОВ */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-[#00FF94] rounded-sm block"></span>
                Каталог одягу
            </h2>
            <span className="text-white/40 text-sm font-mono">{products.length} Items</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-32">
            {products.map((product) => (
                <div key={product.id} className="relative group">
                    {/* КАРТОЧКА */}
                    <ProductCard product={product} onAdd={() => addToCart(product)} />
                    
                    {/* КНОПКИ АДМИНА (Появляются только если включен ADMIN MODE) */}
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

      {/* МОДАЛКА РЕДАКТИРОВАНИЯ */}
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

// КАРТОЧКА
function ProductCard({ product, onAdd }: { product: any, onAdd: () => void }) {
  return (
    <div className="group relative bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00FF94]/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden h-64 w-full bg-[#1a1a1a]">
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"/>
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${product.color || 'from-[#1a1a1a] to-[#0D0D0D]'} flex items-center justify-center`}><Shirt size={48} className="text-white/20" /></div>
          )}
          {product.stock > 0 && <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[#00FF94] text-[10px] font-bold px-2 py-1 rounded border border-[#00FF94]/20 uppercase tracking-wider z-10">In Stock</span>}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="block flex-grow">
            <h3 className="font-bold text-sm text-white/90 mb-1 leading-snug group-hover:text-[#00FF94] transition-colors line-clamp-2">{product.title}</h3>
            <p className="text-xs text-white/40 font-mono mb-3 truncate uppercase tracking-wider">{product.vendor}</p>
        </Link>
        <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-3">
            <span className="font-mono text-lg text-white font-bold">₴ {product.price.toLocaleString()}</span>
            <button onClick={(e) => { e.preventDefault(); onAdd(); }} className="bg-[#222] p-2.5 rounded-xl text-white hover:bg-[#00FF94] hover:text-black transition-all hover:scale-110 active:scale-95"><Plus size={18} strokeWidth={3} /></button>
        </div>
      </div>
    </div>
  );
}