import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from 'react-hot-toast'; // <--- 1. Імпорт

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UA-NEXUS | Cyber Marketplace",
  description: "Ukrainian Cyberpunk Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <CartProvider>
          {children}
          
          {/* <--- 2. Встав цей блок перед закриваючим тегом </body> */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              // Глобальні стилі для всіх повідомлень
              style: {
                background: '#111',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
              },
              // Стилі для успішних повідомлень (Зелений неон)
              success: {
                style: {
                  border: '1px solid #00FF94',
                  boxShadow: '0 0 15px rgba(0, 255, 148, 0.15)',
                },
                iconTheme: {
                  primary: '#00FF94',
                  secondary: 'black',
                },
              },
              // Стилі для помилок (Червоний)
              error: {
                style: {
                  border: '1px solid #ef4444',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.15)',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'black',
                },
              },
            }}
          />
          {/* Кінець блоку Toaster */}

        </CartProvider>
      </body>
    </html>
  );
}