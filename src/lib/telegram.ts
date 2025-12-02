// src/lib/telegram.ts

const BOT_TOKEN = '8380744768:AAEFTMpzMFlqAxESBeDJ_2KVBH0OF4gn8HY'; // <--- ЗАМІНИ ЦЕ
const CHAT_ID = '8487400980'; // <--- ЗАМІНИ ЦЕ (без лапок, якщо це число, або в лапках як рядок)

export async function sendTelegramNotification(orderId: string, total: number, method: string, city: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log("⚠️ Telegram токен не налаштовано");
    return;
  }

  const message = `
🚨 <b>НОВЕ ЗАМОВЛЕННЯ NEXUS</b> 🚨

🆔 <b>ID:</b> <code>#${orderId.slice(0, 8)}</code>
💰 <b>Сума:</b> ${total} грн
💳 <b>Оплата:</b> ${method}
🚛 <b>Доставка:</b> ${city}

<i>Перевірте CRM для деталей.</i>
  `;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    console.log("✅ Повідомлення в Telegram відправлено");
  } catch (error) {
    console.error("❌ Помилка Telegram:", error);
  }
}