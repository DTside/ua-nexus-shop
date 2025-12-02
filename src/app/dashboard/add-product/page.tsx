'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddProductPage() {
  // Состояние для характеристик
  const [specs, setSpecs] = useState([{ id: 1, key: '', value: '' }]);

  // Добавить строку характеристики
  const addSpec = () => {
    setSpecs([...specs, { id: Date.now(), key: '', value: '' }]);
  };

  // Удалить строку характеристики
  const removeSpec = (id: number) => {
    setSpecs(specs.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={16} /> Назад до панелі
      </Link>
      
      <h1 className="text-3xl font-black uppercase mb-8">Новий товар</h1>

      <div className="space-y-6">
        
        {/* Основное инфо */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center text-gray-500 hover:border-[#00FF94] hover:text-[#00FF94] transition cursor-pointer">
                <Upload size={32} className="mb-2" />
                <span className="text-sm">Завантажити фото</span>
            </div>

            <div>
                <label className="block text-xs text-gray-400 mb-1">Назва товару</label>
                <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Ціна (₴)</label>
                    <input type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Склад</label>
                    <input type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" />
                </div>
            </div>

            {/* Новое поле: ОПИСАНИЕ */}
            <div>
                <label className="block text-xs text-gray-400 mb-1">Опис товару</label>
                <textarea 
                    rows={4}
                    placeholder="Детальний опис товару..."
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none resize-none" 
                />
            </div>
        </div>

        {/* Новая секция: ХАРАКТЕРИСТИКИ */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Характеристики</h3>
                <button onClick={addSpec} className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition flex items-center gap-1">
                    <Plus size={14} /> Додати поле
                </button>
            </div>
            
            <div className="space-y-3">
                {specs.map((spec) => (
                    <div key={spec.id} className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Назва (напр. Вага)" 
                            className="flex-1 bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none text-sm"
                        />
                        <input 
                            type="text" 
                            placeholder="Значення (напр. 1 кг)" 
                            className="flex-1 bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none text-sm"
                        />
                        <button onClick={() => removeSpec(spec.id)} className="p-3 text-gray-500 hover:text-red-500">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <button 
            onClick={() => toast.success('Товар створено!')}
            className="w-full bg-[#00FF94] text-black font-bold py-3 rounded-xl hover:bg-[#00cc76] transition shadow-lg mb-10"
        >
            Опублікувати товар
        </button>

      </div>
    </div>
  );
}