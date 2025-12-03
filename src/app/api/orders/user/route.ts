import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    // Получаем ID пользователя из адресной строки (напр. ?userId=123...)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Ищем заказы этого пользователя в базе
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        items: {
          include: {
            product: true // Подтягиваем инфу о товарах внутри заказа
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Сначала новые
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}