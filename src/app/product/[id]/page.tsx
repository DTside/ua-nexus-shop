import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Shirt } from 'lucide-react';
import ProductDetails from '@/components/ProductDetails';

// 1. ВАЖНО: Должно быть 'export default'
// 2. ВАЖНО: Типизация params как Promise (для Next.js 15/16)
export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: { id: String(id) },
  });

  if (!product) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0D0D0D] text-white">
        <h1 className="text-4xl font-bold mb-4">Товар не знайдено</h1>
        <Link href="/" className="text-[#00FF94] hover:underline">В каталог</Link>
      </div>
    );
  }

  // Безопасный парсинг данных
  const sizes = product.sizes ? product.sizes.split(',') : ['ONE SIZE'];
  const specs = product.features ? product.features.split('|') : [];

  return (
    <div className="h-screen w-full bg-[#0D0D0D] text-[#E0E0E0] overflow-y-auto custom-scrollbar">
      <nav className="sticky top-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-md p-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Назад
            </Link>
            <div className="font-bold text-xl tracking-tighter">UA<span className="text-[#00FF94]">NEXUS</span></div>
            <Link href="/cart">
                <ShoppingBag className="text-white hover:text-[#00FF94] transition" />
            </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* ФОТО ТОВАРА */}
        <div className="sticky top-32 h-fit">
            <div className={`relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#111] flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                {product.image ? (
                    <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Shirt size={150} strokeWidth={0.5} className="text-white/20" />
                )}
                
                {product.isUkranian && (
                    <div className="absolute top-6 left-6 bg-[#0057B7] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-white/10 z-20 uppercase tracking-wider">
                        🇺🇦 Made in Ukraine
                    </div>
                )}
            </div>
        </div>

        {/* ИНФО */}
        <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-3">
                <span className="text-[#00FF94] font-mono text-sm uppercase tracking-widest border border-[#00FF94]/30 px-2 py-1 rounded bg-[#00FF94]/5">
                    {product.vendor}
                </span>
                {product.stock < 15 && (
                    <span className="text-red-500 text-xs font-bold uppercase animate-pulse">
                        Закінчується ({product.stock} шт)
                    </span>
                )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] mb-6 tracking-tight">
                {product.title}
            </h1>

            <div className="text-4xl font-mono font-bold text-white mb-8 pb-8 border-b border-white/10 flex items-center justify-between">
                <span>₴ {product.price.toLocaleString()}</span>
            </div>

            <ProductDetails 
                description={product.description || ''} 
                specs={specs} 
                sizes={sizes} 
                product={product} 
            />

            <div className="grid grid-cols-2 gap-4 mt-12 pt-12 border-t border-white/10">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                    <Truck className="text-[#00FF94] mb-3" size={28} />
                    <div className="text-xs text-white/40 uppercase font-bold mb-1">Доставка</div>
                    <div className="font-bold text-sm">Нова Пошта (1-2 дні)</div>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                    <ShieldCheck className="text-[#00FF94] mb-3" size={28} />
                    <div className="text-xs text-white/40 uppercase font-bold mb-1">Гарантія</div>
                    <div className="font-bold text-sm">Повернення 14 днів</div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}