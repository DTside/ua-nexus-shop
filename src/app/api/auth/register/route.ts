import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName, phone } = body;

    // 1. Проверяем, есть ли такой юзер
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Користувач з таким email вже існує' },
        { status: 400 }
      );
    }

    // 2. Шифруем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Создаем юзера
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        role: 'USER' // По умолчанию все обычные юзеры
      }
    });

    // Удаляем пароль из ответа (безопасность)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { user: userWithoutPassword, message: 'Успішна реєстрація!' },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return NextResponse.json(
      { error: 'Помилка сервера' },
      { status: 500 }
    );
  }
}