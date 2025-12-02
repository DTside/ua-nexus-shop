'use client';

import { useState } from 'react';
import { Ruler, Info, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetails({ description, specs, sizes, product }: any) {
  // Проверка на undefined
  const safeSizes = sizes && sizes.length > 0 ? sizes : ['ONE SIZE'];
  const [selectedSize, setSelectedSize] = useState(safeSizes[0]);
  
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false); // Состояние для модалки

  const handleAdd = () => {
    addToCart({ ...product, selectedSize });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-8 relative">
        
        {/* === ОПИСАНИЕ === */}
        <div className="prose prose-invert">
            <p className="text-lg text-white/80 leading-relaxed font-light">
                {description || "Опис відсутній."}
            </p>
        </div>

        {/* === ХАРАКТЕРИСТИКИ === */}
        {specs && specs.length > 0 && (
            <div className="bg-[#111] rounded-xl p-5 border border-white/5 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase mb-4">
                    <Info size={16} className="text-[#00FF94]" /> 
                    Характеристики
                </h3>
                {specs.map((spec: string, idx: number) => (
                    <div key={idx} className="flex items-start text-sm text-white/60">
                        <span className="w-2 h-2 rounded-full bg-white/20 mt-1.5 mr-3 flex-shrink-0"></span>
                        {spec.trim()}
                    </div>
                ))}
            </div>
        )}

        {/* === ВЫБОР РАЗМЕРА === */}
        <div>
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold uppercase text-white/50">Оберіть розмір</span>
                
                {/* КНОПКА ОТКРЫТИЯ ТАБЛИЦЫ */}
                <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-[#00FF94] flex items-center gap-1 hover:underline hover:text-[#00cc76] transition-colors"
                >
                    <Ruler size={14} /> Таблиця розмірів
                </button>
            </div>

            <div className="flex flex-wrap gap-3">
                {safeSizes.map((size: string) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border
                        ${selectedSize === size 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105' 
                            : 'bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>

        {/* === КНОПКА КУПИТЬ === */}
        <button 
            onClick={handleAdd}
            className={`w-full font-black uppercase py-5 rounded-xl text-xl transition-all shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 mt-8
            ${isAdded ? 'bg-white text-black border-white' : 'bg-[#00FF94] text-black border-[#00FF94]'}`}
        >
            {isAdded ? (
                <span>✓ Додано</span>
            ) : (
                <>
                    <span>Купити</span>
                    <Plus strokeWidth={3} />
                </>
            )}
        </button>

        {/* === МОДАЛЬНОЕ ОКНО (ТАБЛИЦА РАЗМЕРОВ) === */}
        {showSizeGuide && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Затемнение фона */}
                <div 
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowSizeGuide(false)}
                ></div>

                {/* Само окно */}
                <div className="relative bg-[#141414] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto custom-scrollbar shadow-2xl animate-in fade-in zoom-in duration-200">
                    
                    {/* Шапка окна */}
                    <div className="sticky top-0 bg-[#141414]/95 backdrop-blur border-b border-white/5 p-4 flex items-center justify-between z-10">
                        <h3 className="font-bold text-lg text-white flex items-center gap-2">
                            <Ruler size={18} className="text-[#00FF94]" /> 
                            Розмірна сітка
                        </h3>
                        <button 
                            onClick={() => setShowSizeGuide(false)}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Контент таблицы */}
                    <div className="p-6 space-y-8">
                        
                        {/* Верх (Худи, Футболки) */}
                        <div>
                            <h4 className="text-[#00FF94] font-mono text-xs uppercase tracking-widest mb-3">
                                Верхній одяг (Худі, Футболки)
                            </h4>
                            <table className="w-full text-sm text-left text-white/70">
                                <thead className="text-xs text-white/30 uppercase bg-white/5">
                                    <tr>
                                        <th className="px-4 py-2 rounded-l-lg">Розмір</th>
                                        <th className="px-4 py-2">Зріст (см)</th>
                                        <th className="px-4 py-2 rounded-r-lg">Вага (кг)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr><td className="px-4 py-3 font-bold text-white">XS</td><td>160 - 168</td><td>50 - 60</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">S</td><td>168 - 175</td><td>60 - 70</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">M</td><td>175 - 180</td><td>70 - 80</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">L</td><td>180 - 185</td><td>80 - 90</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">XL</td><td>185 - 190</td><td>90 - 100</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">XXL</td><td>190+</td><td>100+</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Низ (Штаны) */}
                        <div>
                            <h4 className="text-[#00FF94] font-mono text-xs uppercase tracking-widest mb-3">
                                Штани (Cargo / Tactical)
                            </h4>
                            <table className="w-full text-sm text-left text-white/70">
                                <thead className="text-xs text-white/30 uppercase bg-white/5">
                                    <tr>
                                        <th className="px-4 py-2 rounded-l-lg">Розмір</th>
                                        <th className="px-4 py-2">Пояс (см)</th>
                                        <th className="px-4 py-2 rounded-r-lg">Довжина (см)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr><td className="px-4 py-3 font-bold text-white">30 (S)</td><td>76 - 80</td><td>102</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">32 (M)</td><td>80 - 84</td><td>104</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">34 (L)</td><td>84 - 88</td><td>106</td></tr>
                                    <tr><td className="px-4 py-3 font-bold text-white">36 (XL)</td><td>88 - 92</td><td>108</td></tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    
                    {/* Подсказка внизу */}
                    <div className="p-4 bg-[#0A0A0A] border-t border-white/5 text-xs text-center text-white/40">
                        * Якщо ви сумніваєтесь, обирайте більший розмір для ефекту Oversize.
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}