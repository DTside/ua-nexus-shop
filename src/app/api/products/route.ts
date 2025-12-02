import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 1. GET: Получить все товары (для главной ленты)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

// 2. POST: Добавить новый товар (для Админки)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),
        vendor: body.vendor,
        image: body.image,
        color: body.color,
        stock: Number(body.stock || 100),
        isUkranian: body.isUkranian || false,
        description: body.description,
        features: body.features,
        sizes: body.sizes
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}