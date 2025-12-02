import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Truck, CreditCard } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="h-screen w-full bg-[#0D0D0D] text-[#E0E0E0] overflow-y-auto custom-scrollbar flex flex-col">
      <nav className="p-6 border-b border-white/5 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
            <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-[#00FF94] transition w-fit">
                <ArrowLeft size={20} />
                На головну
            </Link>
        </div>
      </nav>

      <main className="flex-grow py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
            
            <div>
                <span className="text-[#00FF94] font-mono text-sm uppercase tracking-widest mb-2 block">Logistics</span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
                    Доставка та Оплата
                </h1>
            </div>

            <div className="grid gap-8">
                
                {/* Блок доставки */}
                <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-[#00FF94]/10 rounded-full text-[#00FF94]">
                            <Truck size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Доставка</h2>
                    </div>
                    <ul className="space-y-4 text-white/70">
                        <li className="flex gap-3">
                            <span className="text-[#00FF94]">•</span>
                            <span>Відправка Новою Поштою по всій Україні.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#00FF94]">•</span>
                            <span>Термін доставки: 1-3 дні з моменту підтвердження замовлення.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#00FF94]">•</span>
                            <span>Безкоштовна доставка для замовлень від 5000 ₴.</span>
                        </li>
                    </ul>
                </div>

                {/* Блок оплаты */}
                <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                            <CreditCard size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Оплата</h2>
                    </div>
                    <ul className="space-y-4 text-white/70">
                        <li className="flex gap-3">
                            <span className="text-blue-400">•</span>
                            <span>Оплата карткою на сайті (Visa / Mastercard / Apple Pay).</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-400">•</span>
                            <span>Післяплата (накладений платіж) при отриманні на Новій Пошті.</span>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}