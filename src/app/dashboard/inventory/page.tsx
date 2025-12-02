'use client';

import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';

export default function InventoryPage() {
  // Имитация базы данных товаров
  const products = [
    { id: 1, name: 'Cyber-Poshta Unit', price: 23500, stock: 4, status: 'Active' },
    { id: 2, name: 'Nexus Module X', price: 4200, stock: 12, status: 'Active' },
    { id: 3, name: 'Old Gen Console', price: 1500, stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black uppercase">Склад (CRM)</h1>
        <Link 
          href="/dashboard/add-product" 
          className="bg-[#00FF94] text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#00cc76] transition"
        >
          <Plus size={18} /> Додати товар
        </Link>
      </div>

      {/* Фильтры */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input 
                type="text" 
                placeholder="Пошук товару..." 
                className="w-full bg-[#111] border border-white/10 rounded-xl py-2 pl-10 text-white focus:border-[#00FF94] focus:outline-none"
            />
        </div>
      </div>

      {/* Таблица товаров */}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                <tr>
                    <th className="p-4">Назва</th>
                    <th className="p-4">Ціна</th>
                    <th className="p-4">Залишок</th>
                    <th className="p-4">Статус</th>
                    <th className="p-4 text-right">Дії</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition">
                        <td className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center"><Package size={16}/></div>
                            <span className="font-bold">{product.name}</span>
                        </td>
                        <td className="p-4 font-mono">₴{product.price.toLocaleString()}</td>
                        <td className="p-4">{product.stock} шт.</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-[#00FF94]/10 text-[#00FF94]' : 'bg-red-500/10 text-red-500'}`}>
                                {product.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                                <Link 
    href={`/dashboard/inventory/edit/${product.id}`}
    className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white inline-block"
>
    <Edit size={16}/>
</Link>
                                <button className="p-2 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}