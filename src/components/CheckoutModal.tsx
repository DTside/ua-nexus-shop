'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, MapPin, Box } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [step, setStep] = useState(1); // 1 = Логистика, 2 = Оплата
  const [isDonating, setIsDonating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // НОВОЕ: Метод оплаты
  const [paymentMethod, setPaymentMethod] = useState('MONO');

  // Логистика
  const [cityQuery, setCityQuery] = useState('');
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);

  // Поиск городов
  useEffect(() => {
    if (cityQuery.length > 2) {
      fetch('/api/logistics/cities', {
        method: 'POST',
        body: JSON.stringify({ query: cityQuery })
      })
      .then(res => res.json())
      .then(data => setCities(data));
    }
  }, [cityQuery]);

  // Загрузка отделений
  useEffect(() => {
    if (selectedCity) {
      fetch('/api/logistics/warehouses', {
        method: 'POST',
        body: JSON.stringify({ cityRef: selectedCity.Ref })
      })
      .then(res => res.json())
      .then(data => setWarehouses(data));
    }
  }, [selectedCity]);

  // ОБНОВЛЕННАЯ ФУНКЦИЯ ОПЛАТЫ
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id.toString(),
          price: product.price,
          isDonating: isDonating,
          donationAmount: 50,
          // Логистика
          deliveryCity: selectedCity?.Description,
          deliveryCityRef: selectedCity?.Ref,
          deliveryOffice: selectedWarehouse?.Description,
          deliveryOfficeRef: selectedWarehouse?.Ref,
          // Оплата
          paymentMethod: paymentMethod, // <--- ОТПРАВЛЯЕМ МЕТОД
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`✅ Замовлення #${data.orderId.slice(0, 8)} успішно оплачено!`);
        onClose();
        setStep(1); // Сброс
      } else {
        alert(`❌ Помилка сервера: ${data.error || "Невідома помилка"}`);
      }

    } catch (error) {
      alert("❌ Помилка з'єднання");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-[#1A1A1A] border-t border-[#00FF94]/30 rounded-t-[2rem] p-6 pb-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black uppercase tracking-wider">
                {step === 1 ? 'Логістика (НП)' : 'Оплата'}
              </h3>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <X size={20} />
              </button>
            </div>

            {/* ШАГ 1: ЛОГИСТИКА */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-white/50 mb-1 block">МІСТО</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-[#00FF94]" size={18} />
                    <input 
                      type="text" 
                      value={selectedCity ? selectedCity.Description : cityQuery}
                      onChange={(e) => {
                         setCityQuery(e.target.value);
                         setSelectedCity(null);
                      }}
                      placeholder="Введіть назву (напр. Київ)"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-[#00FF94] focus:outline-none"
                    />
                    {cityQuery.length > 2 && !selectedCity && cities.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#2A2A2A] rounded-xl border border-white/10 z-50 max-h-40 overflow-y-auto">
                        {cities.map((city: any) => (
                          <div 
                            key={city.Ref} 
                            onClick={() => { setSelectedCity(city); setCityQuery(''); }}
                            className="p-3 hover:bg-white/10 cursor-pointer text-sm border-b border-white/5 last:border-0"
                          >
                            {city.Description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedCity && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="text-xs font-mono text-white/50 mb-1 block">ВІДДІЛЕННЯ / ПОШТОМАТ</label>
                      <div className="relative">
                        <Box className="absolute left-3 top-3 text-[#00FF94]" size={18} />
                        <select 
                          onChange={(e) => {
                            const wh = warehouses.find(w => w.Ref === e.target.value);
                            setSelectedWarehouse(wh);
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:border-[#00FF94] focus:outline-none"
                        >
                          <option value="">Оберіть відділення...</option>
                          {warehouses.map((wh: any) => (
                            <option key={wh.Ref} value={wh.Ref}>{wh.Description}</option>
                          ))}
                        </select>
                      </div>
                   </motion.div>
                )}

                <button 
                  disabled={!selectedCity || !selectedWarehouse}
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-white text-black font-black py-4 rounded-xl uppercase text-lg hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Далі
                </button>
              </div>
            )}

            {/* ШАГ 2: ВЫБОР ОПЛАТЫ */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                
                {/* Саммари */}
                <div className="mb-6 p-4 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-xl">
                    <div className="flex items-start gap-3">
                        <MapPin className="text-[#00FF94] mt-1" size={16} />
                        <div>
                            <p className="font-bold text-sm text-[#00FF94]">Доставка: {selectedCity?.Description}</p>
                            <p className="text-xs text-white/70">{selectedWarehouse?.Description}</p>
                        </div>
                    </div>
                </div>

                {/* Выбор метода */}
                <div className="mb-6">
                  <label className="text-xs font-mono text-white/50 mb-2 block">ОБЕРІТЬ МЕТОД ОПЛАТИ</label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Monobank */}
                    <button
                      onClick={() => setPaymentMethod('MONO')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'MONO' ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white font-bold text-[10px]">M</div>
                      <span className="text-[10px] font-bold">Mono</span>
                    </button>

                    {/* Apple Pay */}
                    <button
                      onClick={() => setPaymentMethod('APPLE')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'APPLE' ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-lg"></div>
                      <span className="text-[10px] font-bold">Pay</span>
                    </button>

                    {/* Crypto */}
                    <button
                      onClick={() => setPaymentMethod('CRYPTO')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'CRYPTO' ? 'bg-[#009393] text-white border-[#009393]' : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="font-mono text-xs">₮</div>
                      <span className="text-[10px] font-bold">USDT</span>
                    </button>
                  </div>
                </div>

                {/* Донат */}
                <div
                  onClick={() => setIsDonating(!isDonating)}
                  className={`mb-6 p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    isDonating ? 'border-[#00FF94] bg-[#00FF94]/10' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isDonating ? 'bg-[#00FF94] border-[#00FF94]' : 'border-white/30'}`}>
                      {isDonating && <Check size={16} className="text-black" />}
                    </div>
                    <div>
                      <span className="block font-bold uppercase text-sm">Округлити для ЗСУ</span>
                      <span className="text-xs text-white/60">(+₴50 донат)</span>
                    </div>
                  </div>
                </div>

                {/* Кнопка оплаты */}
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-[#00FF94] text-black font-black py-4 rounded-xl uppercase text-lg hover:bg-[#00cc76] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Zap className="animate-spin" /> : <Zap fill="currentColor" />}
                  {paymentMethod === 'MONO' && "Оплатити Mono"}
                  {paymentMethod === 'APPLE' && "Apple Pay"}
                  {paymentMethod === 'CRYPTO' && "Pay USDT"}
                </button>

                <button onClick={() => setStep(1)} className="w-full mt-3 text-xs text-white/40 hover:text-white">
                    Назад до вибору доставки
                </button>
              </motion.div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}