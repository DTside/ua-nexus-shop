import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="h-screen w-full bg-[#0D0D0D] text-[#E0E0E0] overflow-y-auto custom-scrollbar flex flex-col">
      {/* Навигация назад */}
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
            
            {/* Заголовок */}
            <div>
                <span className="text-[#00FF94] font-mono text-sm uppercase tracking-widest mb-2 block">Who we are</span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                    Про UA-NEXUS
                </h1>
                <p className="text-xl text-white/60 leading-relaxed">
                    Ми — перший український бренд, що поєднує вуличну моду з естетикою кіберпанку та тактичною функціональністю.
                </p>
            </div>

            {/* Контент */}
            <div className="prose prose-invert prose-lg max-w-none text-white/80">
                <p>
                    UA-NEXUS був створений у 2024 році як відповідь на виклики сучасності. 
                    Ми віримо, що одяг майбутнього має бути не лише стильним, але й технологічним, зручним та готовим до будь-яких умов.
                </p>
                <h3 className="text-white font-bold text-2xl mt-8 mb-4">Наша місія</h3>
                <p>
                    Створити екосистему речей, які дають відчуття впевненості у бетонних джунглях. 
                    Ми використовуємо тканини M-TAC, фурнітуру YKK та експериментальні матеріали для досягнення максимальної якості.
                </p>
                <h3 className="text-white font-bold text-2xl mt-8 mb-4">Виробництво</h3>
                <p>
                    Всі наші речі відшиваються в Україні. Ми підтримуємо локальне виробництво та контролюємо якість кожного шва. 
                    Купуючи у нас, ви підтримуєте українську економіку.
                </p>
            </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}