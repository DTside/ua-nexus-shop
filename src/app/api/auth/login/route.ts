import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Шукаємо юзера
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: 'Користувача не знайдено' }, { status: 400 });
    }

    // 2. Перевіряємо пароль (порівнюємо введений з хешем у базі)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Невірний пароль' }, { status: 400 });
    }

    // 3. Успіх (повертаємо дані без пароля)
    const { password: _, ...userInfo } = user;

    return NextResponse.json(
      { user: userInfo, message: 'Вхід успішний!' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}