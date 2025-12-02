import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="h-screen w-full bg-[#0D0D0D] text-[#E0E0E0] overflow-y-auto custom-scrollbar flex flex-col">
      <nav className="p-6 border-b border-white/5 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-[#00FF94] transition w-fit">
                <ArrowLeft size={20} />
                На головну
            </Link>
        </div>
      </nav>

      <main className="flex-grow py-20 px-6">
        <div className="max-w-7xl mx-auto">
            
            <div className="mb-12 text-center">
                <span className="text-[#00FF94] font-mono text-sm uppercase tracking-widest mb-2 block">News & Stories</span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                    Блог UA-NEXUS
                </h1>
            </div>

            {/* Сетка статей */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Статья 1 */}
                <article className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FF94]/50 transition group cursor-pointer">
                    <div className="h-48 bg-zinc-800 flex items-center justify-center text-white/20 font-black text-4xl group-hover:bg-[#00FF94]/10 transition">
                        DROP 2025
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-3 font-mono">
                            <Calendar size={12} /> 02.12.2025
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FF94] transition">
                            Нова колекція "Cyber Resistance" вже у продажу
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-3">
                            Огляд нової лінійки одягу, натхненної кіберпанком та українськими реаліями. Технологічні тканини та унікальний крій.
                        </p>
                    </div>
                </article>

                {/* Статья 2 */}
                <article className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FF94]/50 transition group cursor-pointer">
                     <div className="h-48 bg-zinc-800 flex items-center justify-center text-white/20 font-black text-4xl group-hover:bg-[#00FF94]/10 transition">
                        TECHWEAR
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-3 font-mono">
                            <Calendar size={12} /> 28.11.2025
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FF94] transition">
                            Що таке Techwear і чому це зручно?
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-3">
                            Розбираємося в особливостях технологічного одягу. Чому Gore-Tex та Cordura — це не тільки для військових.
                        </p>
                    </div>
                </article>

                {/* Статья 3 */}
                <article className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FF94]/50 transition group cursor-pointer">
                     <div className="h-48 bg-zinc-800 flex items-center justify-center text-white/20 font-black text-4xl group-hover:bg-[#00FF94]/10 transition">
                        GUIDE
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-3 font-mono">
                            <Calendar size={12} /> 15.11.2025
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FF94] transition">
                            Як доглядати за речами з принтами?
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-3">
                            Прості правила прання, які допоможуть зберегти шовкографію та яскравість вашого одягу на довгі роки.
                        </p>
                    </div>
                </article>

            </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}