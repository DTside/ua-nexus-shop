'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // <--- 1. Импорт роутера
import { searchCities, getWarehouses, City, Warehouse } from '@/services/novaPoshta';

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useCart();
  const router = useRouter(); // <--- 2. Инициализация роутера
  
  const [step, setStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: null as City | null,
    warehouse: null as Warehouse | null,
    paymentMethod: 'mono'
  });

  const [cityQuery, setCityQuery] = useState('');
  const [cityResults, setCityResults] = useState<City[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isSearchingCity, setIsSearchingCity] = useState(false);

  // Поиск города
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (cityQuery.length > 1) {
        setIsSearchingCity(true);
        searchCities(cityQuery).then((data) => {
            setCityResults(data);
            setIsSearchingCity(false);
        });
      } else {
        setCityResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [cityQuery]);

  // Загрузка отделений
  useEffect(() => {
    if (formData.city) {
        getWarehouses(formData.city.Ref).then(setWarehouses);
    }
  }, [formData.city]);


  const handleOrder = () => {
    setIsLoading(true);
    // Имитация отправки данных на сервер
    setTimeout(() => {
        setIsLoading(false);
        toast.success('Замовлення успішно оформлено!', {
            duration: 3000,
            icon: '🚀',
            style: { background: '#00FF94', color: '#000', fontWeight: 'bold' }
        });
        
        // <--- 3. ПЕРЕХОД НА СТРАНИЦУ УСПЕХА
        router.push('/success'); 
        
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-2xl mb-4">Кошик порожній</h1>
                <Link href="/" className="text-[#00FF94] underline">Повернутися назад</Link>
            </div>
        </div>
    )
  }

  return (
    <div className="h-screen w-full overflow-y-auto bg-[#050505] text-[#E0E0E0] p-4 md:p-10 font-sans custom-scrollbar">
      
      <header className="max-w-6xl mx-auto mb-10 flex items-center gap-4">
        <Link href="/cart" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-wider">Оформлення <span className="text-[#00FF94]">///</span></h1>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 pb-40"> 
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* 1. КОНТАКТЫ */}
            <section className={`p-6 rounded-2xl border ${step >= 1 ? 'border-[#00FF94] bg-[#00FF94]/5' : 'border-white/10 bg-[#111]'} transition-all`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#00FF94] text-black' : 'bg-gray-800'}`}>1</div>
                    <h2 className="text-xl font-bold uppercase">Ваші контакти</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="Прізвище та Ім'я" 
                        className="bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                        type="tel" 
                        placeholder="+380 (XX) XXX-XX-XX" 
                        className="bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
            </section>

            {/* 2. ЛОГИСТИКА */}
            <section className={`p-6 rounded-2xl border ${formData.name ? 'border-[#00FF94] bg-[#00FF94]/5' : 'border-white/10 bg-[#111] opacity-50'} transition-all`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${formData.name ? 'bg-[#00FF94] text-black' : 'bg-gray-800'}`}>2</div>
                    <h2 className="text-xl font-bold uppercase flex items-center gap-2">
                        Логістика <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded">TEST MODE</span>
                    </h2>
                </div>

                <div className="space-y-4 relative">
                    <div>
                        <label className="text-xs text-gray-400 ml-2 mb-1 block">Місто доставки</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-4 text-gray-500" size={20} />
                            <input 
                                type="text" 
                                placeholder="Введіть (напр. Київ)" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-[#00FF94] focus:outline-none"
                                value={cityQuery}
                                onChange={(e) => {
                                    setCityQuery(e.target.value);
                                    if(e.target.value === '') setFormData({...formData, city: null, warehouse: null});
                                }}
                            />
                             {isSearchingCity && (
                                <div className="absolute right-4 top-4">
                                    <Loader2 className="animate-spin text-[#00FF94]" size={20} />
                                </div>
                            )}

                            {cityResults.length > 0 && !formData.city && (
                                <div className="absolute z-10 w-full bg-[#1A1A1A] border border-gray-700 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-2xl">
                                    {cityResults.map(city => (
                                        <div 
                                            key={city.Ref} 
                                            className="p-3 hover:bg-[#00FF94] hover:text-black cursor-pointer transition"
                                            onClick={() => {
                                                setFormData({...formData, city: city, warehouse: null});
                                                setCityQuery(city.Description);
                                                setCityResults([]);
                                            }}
                                        >
                                            {city.Description}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {formData.city && (
                         <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="text-xs text-gray-400 ml-2 mb-1 block">Відділення</label>
                            <select 
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none appearance-none cursor-pointer"
                                onChange={(e) => {
                                    const wh = warehouses.find(w => w.Ref === e.target.value);
                                    setFormData({...formData, warehouse: wh || null});
                                }}
                            >
                                <option value="">Оберіть відділення...</option>
                                {warehouses.map(wh => (
                                    <option key={wh.Ref} value={wh.Ref}>{wh.Description}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </section>

             {/* 3. ОПЛАТА */}
             <section className={`p-6 rounded-2xl border ${formData.warehouse ? 'border-[#00FF94] bg-[#00FF94]/5' : 'border-white/10 bg-[#111] opacity-50'} transition-all`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold">3</div>
                    <h2 className="text-xl font-bold uppercase">Оплата</h2>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div onClick={() => setFormData({...formData, paymentMethod: 'mono'})} className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition ${formData.paymentMethod === 'mono' ? 'border-[#00FF94] bg-[#00FF94]/10' : 'border-white/10 hover:bg-white/5'}`}>
                        <div className="font-bold">Mono</div>
                        <span className="text-[10px] text-gray-400">Частинами</span>
                    </div>
                    <div onClick={() => setFormData({...formData, paymentMethod: 'card'})} className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition ${formData.paymentMethod === 'card' ? 'border-[#00FF94] bg-[#00FF94]/10' : 'border-white/10 hover:bg-white/5'}`}>
                        <div className="font-bold">Apple Pay</div>
                    </div>
                    <div onClick={() => setFormData({...formData, paymentMethod: 'crypto'})} className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition ${formData.paymentMethod === 'crypto' ? 'border-[#00FF94] bg-[#00FF94]/10' : 'border-white/10 hover:bg-white/5'}`}>
                        <div className="font-bold">Crypto</div>
                    </div>
                </div>
            </section>

        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-1">
            <div className="sticky top-10 bg-[#111] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-4">Ваше замовлення</h3>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-400">{item.title} x{item.quantity}</span>
                            <span>₴{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center text-xl font-bold mb-6">
                    <span>Разом:</span>
                    <span className="text-[#00FF94]">₴ {totalPrice.toLocaleString()}</span>
                </div>

                <button 
                    disabled={!formData.warehouse || isLoading}
                    onClick={handleOrder}
                    className={`w-full py-4 rounded-xl font-black text-black uppercase tracking-wider flex items-center justify-center gap-2 transition ${!formData.warehouse ? 'bg-gray-700 cursor-not-allowed' : 'bg-[#00FF94] hover:bg-[#00CC76] shadow-[0_0_20px_rgba(0,255,148,0.3)]'}`}
                >
                    {isLoading ? 'Обробка...' : 'ПІДТВЕРДИТИ ЗАМОВЛЕННЯ'}
                    {!isLoading && <CheckCircle size={20} />}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}