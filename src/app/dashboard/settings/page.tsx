'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [userData, setUserData] = useState({ fullName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        toast.success('Профіль оновлено!');
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl">
        <h1 className="text-3xl font-black uppercase tracking-wide mb-10">Налаштування профілю</h1>

        <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-[#111] border border-white/10 p-8 rounded-3xl space-y-6">
                <h2 className="text-xl font-bold text-[#00FF94] mb-4">Особисті дані</h2>
                
                <div className="space-y-2">
                    <label className="text-sm text-white/50 ml-1">ПІБ</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input 
                            type="text" 
                            value={userData.fullName}
                            onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-white/50 ml-1">Email</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input 
                            type="email" 
                            value={userData.email}
                            disabled
                            className="w-full bg-black/30 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white/50 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-white/50 ml-1">Телефон</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input 
                            type="tel" 
                            value={userData.phone}
                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="bg-[#00FF94] text-black px-8 py-4 rounded-xl font-bold uppercase hover:bg-[#00cc76] transition-all flex items-center gap-2"
            >
                {loading ? 'Збереження...' : <><Save size={20} /> Зберегти зміни</>}
            </button>
        </form>
    </div>
  );
}