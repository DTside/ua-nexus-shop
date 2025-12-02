'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  // Состояния для хранения данных
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. ЗАГРУЗКА: При открытии страницы читаем из localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('nexus_shop_name');
    const savedEmail = localStorage.getItem('nexus_shop_email');
    const savedKey = localStorage.getItem('nexus_api_key');

    if (savedName) setShopName(savedName);
    else setShopName('ETNODIM'); // Значение по умолчанию

    if (savedEmail) setEmail(savedEmail);
    else setEmail('owner@etnodim.com');

    if (savedKey) setApiKey(savedKey);
    
    setIsLoading(false);
  }, []);

  // 2. СОХРАНЕНИЕ: Записываем в localStorage
  const handleSave = () => {
    localStorage.setItem('nexus_shop_name', shopName);
    localStorage.setItem('nexus_shop_email', email);
    localStorage.setItem('nexus_api_key', apiKey);
    
    toast.success('Налаштування збережено!', {
        style: { background: '#00FF94', color: 'black', fontWeight: 'bold' }
    });
  };

  if (isLoading) return <div className="text-gray-500">Завантаження налаштувань...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black uppercase mb-8">Налаштування</h1>

      <div className="space-y-6">
        
        {/* Секция профиля */}
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold mb-4 text-[#00FF94]">Профіль магазину</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Назва магазину</label>
                    <input 
                        type="text" 
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Email для сповіщень</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" 
                    />
                </div>
            </div>
        </div>

        {/* Секция API */}
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold mb-4 text-[#00FF94]">Інтеграції</h2>
            <div>
                <label className="block text-xs text-gray-400 mb-1">Nova Poshta API Key</label>
                <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Вставте API ключ..."
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF94] focus:outline-none" 
                />
                <p className="text-[10px] text-gray-500 mt-2">Ключ використовується для автоматичного створення ТТН.</p>
            </div>
        </div>

        <button 
            onClick={handleSave}
            className="bg-[#00FF94] text-black font-bold py-3 px-8 rounded-xl hover:bg-[#00cc76] transition shadow-[0_0_15px_rgba(0,255,148,0.3)]"
        >
            Зберегти зміни
        </button>

      </div>
    </div>
  );
}