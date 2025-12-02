import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function OfferPage() {
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
                <FileText className="text-[#00FF94]" size={40} />
                <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
                    Публічна оферта
                </h1>
            </div>

            <div className="prose prose-invert prose-sm text-white/60 space-y-6">
                <p>
                    Цей Договір є публічним договором (офертою) між ФОП UA-NEXUS (далі — «Продавець») 
                    та будь-якою фізичною особою (далі — «Покупець»), що виявила бажання придбати товар на сайті.
                </p>

                <h3 className="text-white text-lg font-bold">1. Загальні положення</h3>
                <p>
                    1.1. Цей договір є публічною офертою відповідно до ст. 633 Цивільного кодексу України.<br/>
                    1.2. Оформлення замовлення на сайті означає повну згоду Покупця з умовами цього Договору.
                </p>

                <h3 className="text-white text-lg font-bold">2. Предмет договору</h3>
                <p>
                    2.1. Продавець зобов’язується передати у власність Покупця товар, а Покупець зобов’язується оплатити і прийняти товар 
                    на умовах даного Договору.
                </p>

                <h3 className="text-white text-lg font-bold">3. Ціна товару</h3>
                <p>
                    3.1. Ціни на товари вказані на сайті в національній валюті України (гривня).<br/>
                    3.2. Продавець має право змінювати ціну товару в односторонньому порядку до моменту оплати замовлення.
                </p>
            </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}