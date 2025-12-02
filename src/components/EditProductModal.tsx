'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';

export default function EditProductModal({ product, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    image: product.image || '',
    vendor: product.vendor,
    stock: product.stock
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        const updated = await res.json();
        onSave(updated); // Обновляем товар на странице
        onClose();
      }
    } catch (error) {
      alert('Ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Редагувати товар</h3>
            <button onClick={onClose} className="text-white/50 hover:text-white"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs text-[#00FF94] uppercase font-bold block mb-1">Назва</label>
                <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] outline-none"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-[#00FF94] uppercase font-bold block mb-1">Ціна (₴)</label>
                    <input 
                        type="number" 
                        value={formData.price} 
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-[#00FF94] uppercase font-bold block mb-1">Залишок (шт)</label>
                    <input 
                        type="number" 
                        value={formData.stock} 
                        onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-[#00FF94] uppercase font-bold block mb-1">Фото (URL)</label>
                <input 
                    type="text" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-xs focus:border-[#00FF94] outline-none"
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00FF94] text-black font-bold uppercase py-4 rounded-xl hover:bg-[#00cc76] transition flex justify-center items-center gap-2 mt-4"
            >
                {loading ? 'Збереження...' : <><Save size={18} /> Зберегти зміни</>}
            </button>
        </form>
      </div>
    </div>
  );
}