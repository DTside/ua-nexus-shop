import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendTelegramNotification } from '@/lib/telegram'; // <--- Импорт функции бота

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Распаковываем все данные из запроса
    const { 
        productId, price, donationAmount, isDonating, 
        deliveryCity, deliveryCityRef, deliveryOffice, deliveryOfficeRef,
        paymentMethod 
    } = body;
    
    const productIdStr = String(productId);

    // 2. Сначала создаем/проверяем ТОВАР (чтобы избежать ошибки Foreign Key)
    await prisma.product.upsert({
      where: { id: productIdStr },
      update: {}, 
      create: {
        id: productIdStr,
        title: "Auto-Created Product", // В реальности берется из базы, тут заглушка для MVP
        price: price,
        vendor: "Unknown Vendor"
      }
    });

    // 3. Создаем/проверяем ЮЗЕРА (Симуляция входа через Дія)
    const user = await prisma.user.upsert({
      where: { diiaId: "1234567890" },
      update: {},
      create: {
        diiaId: "1234567890",
        fullName: "Тарас Шевченко",
        phone: "+380630000000",
        trustRating: 5.0,
      },
    });

    // 4. Создаем ЗАКАЗ в базе данных
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: price + (isDonating ? donationAmount : 0),
        donationAmount: isDonating ? donationAmount : 0,
        
        // Статусы
        status: "PAID", // Сразу ставим статус "Оплачено"
        paymentMethod: paymentMethod || "UNKNOWN", // Сохраняем метод (Mono, Apple, Crypto)
        
        // Логистика Новой Почты
        deliveryCity: deliveryCity,
        deliveryCityRef: deliveryCityRef,
        deliveryOffice: deliveryOffice,
        deliveryOfficeRef: deliveryOfficeRef,
        
        // Товары в заказе
        items: {
          create: {
            productId: productIdStr,
            price: price,
            quantity: 1
          }
        }
      }
    });

    // 5. ОТПРАВЛЯЕМ УВЕДОМЛЕНИЕ В TELEGRAM
    // Бот отправит сообщение владельцу магазина
    await sendTelegramNotification(
        order.id, 
        order.totalAmount, 
        order.paymentMethod || "UNKNOWN",
        order.deliveryCity || "Самовивіз"
    );

    console.log(`✅ Заказ ${order.id} успешно создан и оплачен.`);

    // 6. Возвращаем успешный ответ на фронтенд
    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      message: "ТТН створено автоматично" 
    });

  } catch (error) {
    console.error("🔥 Ошибка API Checkout:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}