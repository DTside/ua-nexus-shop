'use client';

import { use } from 'react'; // <--- 1. Добавляем этот импорт
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// 2. Обновляем типы props: params теперь Promise
export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // 3. "Распаковываем" параметры с помощью хука use()
  const { id } = use(params);

  const handleSave = () => {
    toast.success('Зміни збережено!');
    router.push('/dashboard/inventory'); 
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard/inventory" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={16} /> Назад до складу
      </Link>
      
      <div className="flex justify-between items-center mb-8">
         {/* 4. Используем уже распакованный id */}
         <h1 className="text-3xl font-black uppercase">Редагування <span className="text-[#00FF94]">#{id}</span></h1>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
        <div>
            <label className="block text-xs text-gray-400 mb-1">Назва товару</label>
            <input type="text" defaultValue="Cyber-Poshta Unit" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs text-gray-400 mb-1">Ціна (₴)</label>
                <input type="number" defaultValue={23500} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" />
            </div>
            <div>
                <label className="block text-xs text-gray-400 mb-1">Залишок</label>
                <input type="number" defaultValue={4} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" />
            </div>
        </div>

        <button 
            onClick={handleSave}
            className="w-full bg-[#00FF94] text-black font-bold py-3 rounded-xl hover:bg-[#00cc76] transition flex items-center justify-center gap-2"
        >
            <Save size={18} /> Зберегти
        </button>

      </div>
    </div>
  );
}