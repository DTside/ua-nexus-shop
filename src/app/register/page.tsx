'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast'; // Імпорт повідомлень

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Створення акаунту...');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Помилка реєстрації');
      }

      toast.success('Акаунт успішно створено!', { id: toastId });
      
      // Перекидаємо на логін
      setTimeout(() => {
          router.push('/login');
      }, 1000);

    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Фон */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00FF94]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white inline-block mb-2">
            UA<span className="text-[#00FF94]">NEXUS</span>
          </Link>
          <h2 className="text-xl font-bold text-white">Створити акаунт</h2>
          <p className="text-white/40 text-sm mt-2">Приєднуйся до кібер-спільноти</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Ім'я */}
          <div className="relative group">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00FF94] transition" />
            <input 
              type="text" 
              placeholder="Ваше ім'я"
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] focus:outline-none transition-all placeholder:text-white/20"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00FF94] transition" />
            <input 
              type="email" 
              placeholder="Email"
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] focus:outline-none transition-all placeholder:text-white/20"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Телефон */}
          <div className="relative group">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00FF94] transition" />
            <input 
              type="tel" 
              placeholder="Телефон"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] focus:outline-none transition-all placeholder:text-white/20"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Пароль */}
          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00FF94] transition" />
            <input 
              type="password" 
              placeholder="Пароль"
              required
              minLength={6}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] focus:outline-none transition-all placeholder:text-white/20"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00FF94] text-black font-bold uppercase py-4 rounded-xl hover:bg-[#00cc76] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Зареєструватися <ArrowRight size={18} /></>}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-white/40">
          Вже є акаунт?{' '}
          <Link href="/login" className="text-[#00FF94] hover:underline">
            Увійти
          </Link>
        </div>

      </div>
    </div>
  );
}