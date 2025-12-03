'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, LogIn } from 'lucide-react';
import toast from 'react-hot-toast'; // Імпорт повідомлень

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Запускаємо тост завантаження (можна зберегти його ID, щоб потім оновити)
    const toastId = toast.loading('Перевірка даних...');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Помилка входу');
      }

      // Зберігаємо юзера
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Успішне повідомлення
      toast.success(`Вітаємо, ${data.user.fullName || 'Користувач'}!`, { id: toastId });
      
      // Перенаправлення на Головну
      router.push('/'); 

    } catch (err: any) {
      // Повідомлення про помилку
      toast.error(err.message || 'Щось пішло не так', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Фон */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00FF94]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white inline-block mb-2">
            UA<span className="text-[#00FF94]">NEXUS</span>
          </Link>
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <LogIn size={20} className="text-[#00FF94]" /> Вхід в систему
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
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

          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00FF94] transition" />
            <input 
              type="password" 
              placeholder="Пароль"
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#00FF94] focus:outline-none transition-all placeholder:text-white/20"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00FF94] text-black font-bold uppercase py-4 rounded-xl hover:bg-[#00cc76] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,148,0.2)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Увійти <ArrowRight size={18} /></>}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-white/40">
          Немає акаунту?{' '}
          <Link href="/register" className="text-[#00FF94] hover:underline">
            Зареєструватися
          </Link>
        </div>

      </div>
    </div>
  );
}