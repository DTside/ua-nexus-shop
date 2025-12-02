import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
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
                <span className="text-[#00FF94] font-mono text-sm uppercase tracking-widest mb-2 block">Guarantee</span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
                    Повернення та Обмін
                </h1>
            </div>

            <div className="bg-[#111] p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center gap-4">
                    <RefreshCw className="text-[#00FF94]" size={32} />
                    <h2 className="text-2xl font-bold text-white">14 днів на роздуми</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                    Відповідно до закону України "Про захист прав споживачів", ви можете повернути або обміняти товар 
                    протягом 14 днів з моменту покупки, якщо він вам не підійшов.
                </p>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-500" />
                    Умови повернення
                </h3>
                <ul className="list-disc pl-5 space-y-3 text-white/60">
                    <li>Товар не був у використанні і не має слідів носіння (плям, зачіпок).</li>
                    <li>Збережено товарний вигляд, ярлики, бірки та оригінальна упаковка.</li>
                    <li>Є чек або інший документ, що підтверджує оплату.</li>
                </ul>
            </div>

            <div className="prose prose-invert text-white/60">
                <h3 className="text-white font-bold text-lg">Як оформити повернення?</h3>
                <p>
                    1. Напишіть нам у Telegram або зателефонуйте.<br/>
                    2. Відправте товар Новою Поштою (доставку оплачує покупець, крім випадків браку).<br/>
                    3. Отримайте кошти на карту протягом 3-5 робочих днів після перевірки товару.
                </p>
            </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}