import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Имитация задержки "думания" (2 секунды)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Список крутых фото для имитации генерации
    const mockImages = [
      "https://images.unsplash.com/photo-1620216664536-22442435492d?q=80&w=1024&auto=format&fit=crop", // Neon Hoodie
      "https://images.unsplash.com/photo-1596521577747-063065e13550?q=80&w=1024&auto=format&fit=crop", // Future Mask
      "https://images.unsplash.com/photo-1620641018318-72b22f7a93a8?q=80&w=1024&auto=format&fit=crop", // Cyber Girl
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1024&auto=format&fit=crop", // Retro Computer
      "https://images.unsplash.com/photo-1614728853684-1c6676f240f9?q=80&w=1024&auto=format&fit=crop", // Neon City
    ];

    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];

    return NextResponse.json({ url: randomImage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}