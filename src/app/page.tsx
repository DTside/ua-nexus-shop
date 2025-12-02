import { prisma } from '@/lib/db';
import MainFeed from '@/components/MainFeed';
import Link from 'next/link';

export default async function Home() {
  // Получаем товары из базы данных
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' }
  });

  // Если товаров нет — показываем экран-заглушку с кнопкой
  if (products.length === 0) {
    return (
        <div className="h-screen w-full bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-6 text-center">
            <h1 className="text-4xl font-black mb-4 uppercase">Каталог порожній</h1>
            <p className="text-white/50 mb-8 max-w-md">
                Здається, ви ще не додали жодного товару в базу даних.
            </p>
            <Link 
                href="/dashboard/add-product" 
                className="bg-[#00FF94] text-black px-8 py-4 rounded-xl font-bold uppercase hover:bg-[#00cc76] transition-all"
            >
                + Додати перший товар
            </Link>
        </div>
    )
  }

  // Если товары есть — запускаем ленту
  return <MainFeed products={products} />;
}