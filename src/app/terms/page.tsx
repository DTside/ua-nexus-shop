import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function TermsPage() {
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
                <Shield className="text-[#00FF94]" size={40} />
                <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
                    Угода користувача
                </h1>
            </div>

            <div className="prose prose-invert prose-sm text-white/60 space-y-6">
                <p>
                    Ця Угода користувача регулює відносини між Адміністрацією сайту UA-NEXUS та користувачами сайту.
                </p>

                <h3 className="text-white text-lg font-bold">1. Права та обов'язки сторін</h3>
                <p>
                    1.1. Користувач зобов'язується не використовувати сайт для розповсюдження незаконної інформації.<br/>
                    1.2. Адміністрація має право в будь-який момент змінювати дизайн сайту, контент та умови цієї Угоди.
                </p>

                <h3 className="text-white text-lg font-bold">2. Відповідальність</h3>
                <p>
                    2.1. Адміністрація не несе відповідальності за можливі технічні збої в роботі сайту.<br/>
                    2.2. Користувач несе відповідальність за достовірність інформації, наданої при оформленні замовлення.
                </p>
                
                 <div className="mt-12 p-4 bg-[#111] border border-white/10 rounded-xl text-xs text-white/30">
                    Використовуючи цей сайт, ви погоджуєтесь з використанням файлів cookie.
                </div>
            </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}