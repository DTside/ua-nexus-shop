'use client'

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Карта відділень</h1>
        <button onClick={() => window.history.back()} className="text-sm text-gray-400 hover:text-white">
          ← Назад
        </button>
      </div>
      
      {/* Встраиваем карту Новой Почты через iframe или показываем заглушку */}
      <div className="w-full h-[80vh] bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Пример встраивания Google Maps или заглушки */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5!2d30.5!3d50.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDI3JzAwLjAiTiAzMMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sua!4v1600000000000!5m2!1sen!2sua" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
          allowFullScreen 
          loading="lazy"
        ></iframe>
        
        <div className="absolute bottom-10 left-10 bg-black/80 p-4 rounded-xl backdrop-blur-md border border-gray-700">
           <h3 className="font-bold text-green-500">Відділення №1</h3>
           <p className="text-sm text-gray-300">Київ, вул. Хрещатик, 1</p>
           <div className="mt-2 text-xs text-gray-500">Завантаження: 12%</div>
        </div>
      </div>
    </div>
  )
}