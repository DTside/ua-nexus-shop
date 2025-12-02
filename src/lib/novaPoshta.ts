// src/lib/novaPoshta.ts

const API_KEY = process.env.NOVA_POSHTA_KEY || "YOUR_KEY_HERE"; // Пока заглушка
const API_URL = "https://api.novaposhta.ua/v2.0/json/";

export async function searchCities(cityName: string) {
  // Если ключа нет, возвращаем моковые данные (чтобы ты мог тестить без регистрации)
  if (!process.env.NOVA_POSHTA_KEY) {
    return [
      { Description: "Київ", Ref: "8d5a980d-391c-11dd-90d9-001a92567626" },
      { Description: "Львів", Ref: "db5c88f5-391c-11dd-90d9-001a92567626" },
      { Description: "Одеса", Ref: "db5c88d0-391c-11dd-90d9-001a92567626" },
      { Description: "Дніпро", Ref: "db5c88f0-391c-11dd-90d9-001a92567626" },
      { Description: "Харків", Ref: "db5c88e0-391c-11dd-90d9-001a92567626" },
    ].filter(c => c.Description.toLowerCase().includes(cityName.toLowerCase()));
  }

  // Реальный запрос к НП
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: cityName,
        Limit: "50",
      },
    }),
  });

  const data = await response.json();
  if (!data.success) return [];
  
  // Новая почта возвращает сложную структуру, упрощаем:
  return data.data[0].Addresses.map((item: any) => ({
    Description: item.Present,
    Ref: item.DeliveryCity,
  }));
}

export async function getWarehouses(cityRef: string) {
  if (!process.env.NOVA_POSHTA_KEY) {
    return [
      { Description: "Відділення №1: вул. Хрещатик, 1", Ref: "1" },
      { Description: "Поштомат №5050: пр. Перемоги, 20", Ref: "2" },
      { Description: "Відділення №5 (Vantage Point)", Ref: "3" },
    ];
  }

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef,
      },
    }),
  });

  const data = await response.json();
  return data.success ? data.data : [];
}