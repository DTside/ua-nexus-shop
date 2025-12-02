import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext' // <--- Импорт контекста

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UA-NEXUS',
  description: 'Cyber-Logistics Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        {/* Оборачиваем все в CartProvider, чтобы корзина работала везде */}
        <CartProvider>
          {/* Toaster нужен для показа уведомлений */}
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                border: '1px solid #444',
              },
            }}
          />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}