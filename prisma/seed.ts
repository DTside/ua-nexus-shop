import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Очистка базы
  try {
    await prisma.orderItem.deleteMany({})
    await prisma.order.deleteMany({})
    await prisma.product.deleteMany({})
    console.log('Database cleared.')
  } catch (e) {
    console.log('Database was already empty or error clearing.')
  }

  // 2. Заливаем товары (Без дрона, с рюкзаком)
  await prisma.product.createMany({
    data: [
      {
        title: 'Phantom Oversized Hoodie',
        price: 2400,
        vendor: '@UA-NEXUS',
        image: 'https://images.unsplash.com/photo-1642935553837-5894a54bfbc2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        color: 'from-zinc-900 via-black to-black',
        stock: 50,
        isUkranian: true,
        description: "Культове худі з нової колекції 'Cyber Resistance'. Глибокий капюшон, що приховує обличчя. Тканина стійка до вигорання.",
        features: "Матеріал: Бавовна 100% (450 gsm) | Крій: Oversize | Принт: Шовкографія",
        sizes: "XS,S,M,L,XL"
      },
      {
        title: 'Cyber-Cargo Pants V2',
        price: 3200,
        vendor: '@M-TAC',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        color: 'from-gray-800 via-slate-900 to-black',
        stock: 25,
        isUkranian: true,
        description: "Тактичні штани другого покоління. 8 кишень для гаджетів, посилені коліна та водовідштовхувальне покриття.",
        features: "Матеріал: Ripstop | Фурнітура: YKK | Сезон: Всесезон",
        sizes: "30,32,34,36"
      },
      {
        title: 'Neon Acid Wash Tee',
        price: 1100,
        vendor: '@ETNODIM',
        image: 'https://images.unsplash.com/photo-1670955107412-577b4da66a49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        color: 'from-purple-900 via-slate-900 to-black',
        stock: 100,
        isUkranian: true,
        description: "Футболка з ефектом кислотного прання. Кожен екземпляр має унікальний візерунок.",
        features: "Матеріал: Органічна бавовна | Технологія: Acid Wash",
        sizes: "S,M,L,XL"
      },
      {
        title: 'Reflective Bomber Jacket',
        price: 4500,
        vendor: '@OFF-WHITE-REP',
        image: 'https://images.unsplash.com/photo-1578410532485-e017ec847d23?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        color: 'from-slate-700 via-slate-900 to-black',
        stock: 10,
        isUkranian: false,
        description: "Бомбер з повною рефлективною поверхнею. Вдень сірий, вночі сяє як прожектор.",
        features: "Матеріал: Рефлектив | Утеплювач: Hollowsoft 200",
        sizes: "M,L,XL"
      },
      {
        title: 'Tactical Vest Black',
        price: 2800,
        vendor: '@RIOT-DIVISION',
        image: 'https://images.unsplash.com/photo-1758618851339-11188a81a394?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        color: 'from-black via-zinc-900 to-zinc-800',
        stock: 15,
        isUkranian: true,
        description: "Легкий розгрузочний жилет для носіння поверх худі або футболки. Система MOLLE.",
        features: "Матеріал: Cordura 1000D | Вага: 450г",
        sizes: "ONE SIZE"
      },
      {
        title: 'Matrix Longsleeve',
        price: 1500,
        vendor: '@UA-NEXUS',
        image: 'https://images.unsplash.com/photo-1669791777201-f297000cbd8a?q=80&w=666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        color: 'from-green-900 via-black to-black',
        stock: 40,
        isUkranian: true,
        description: "Лонгслів з текстурою цифрового дощу. Тканина дихає і швидко відводить вологу.",
        features: "Матеріал: Coolmax | Стиль: Cyberpunk",
        sizes: "XS,S,M,L"
      },
      {
        title: 'Black Ops Backpack',
        price: 3600,
        vendor: '@NIKE-ACG',
        // НОВЫЙ ТОВАР: Рюкзак вместо Дрона
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        color: 'from-gray-900 via-black to-black',
        stock: 12,
        isUkranian: false,
        description: "Міський тактичний рюкзак. Водонепроникний, з відділенням для ноутбука 15 дюймів та прихованими кишенями.",
        features: "Об'єм: 25л | Матеріал: Ballistic Nylon | Відділення: Laptop 15.6\"",
        sizes: "25L"
      },
      {
        title: 'Urban Utility Belt',
        price: 800,
        vendor: '@STONE-ISLAND',
        image: 'https://images.unsplash.com/photo-1664286074176-5206ee5dc878?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        color: 'from-orange-900 via-stone-900 to-black',
        stock: 30,
        isUkranian: false,
        description: "Магнітний ремінь з пряжкою Fidlock. Відкривається однією рукою.",
        features: "Пряжка: Fidlock V-Buckle | Стропа: Нейлон",
        sizes: "110см,130см"
      }
    ]
  })
  console.log('Added 8 products (Clothing only).')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })