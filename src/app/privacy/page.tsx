import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPage() {
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
        <div className="max-w-3xl mx-auto space-y-8">
            
            <div className="flex items-center gap-4 mb-8">
                <Lock className="text-[#00FF94]" size={40} />
                <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
                    Політика конфіденційності
                </h1>
            </div>

            <div className="prose prose-invert prose-sm text-white/60 space-y-6">
                <p>
                    Ми в UA-NEXUS серйозно ставимося до захисту ваших персональних даних. 
                    Ця Політика описує, як ми збираємо, використовуємо та захищаємо вашу інформацію.
                </p>

                <h3 className="text-white text-lg font-bold">1. Збір даних</h3>
                <p>
                    Ми збираємо лише ті дані, які необхідні для виконання замовлення: ім'я, номер телефону, 
                    адресу доставки та інформацію про замовлення. Ми не зберігаємо дані ваших банківських карток.
                </p>

                <h3 className="text-white text-lg font-bold">2. Використання інформації</h3>
                <p>
                    Ваші дані використовуються виключно для: обробки замовлень, зв'язку з вами щодо статусу доставки 
                    та покращення роботи нашого сервісу.
                </p>

                <h3 className="text-white text-lg font-bold">3. Захист даних</h3>
                <p>
                    Ми використовуємо сучасні методи шифрування (SSL) для захисту передачі даних. 
                    Доступ до ваших даних мають лише уповноважені співробітники.
                </p>
            </div>
            
            <div className="mt-12 p-4 bg-[#111] border border-white/10 rounded-xl text-xs text-white/30 text-center">
                Останнє оновлення: 01.12.2025
            </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}