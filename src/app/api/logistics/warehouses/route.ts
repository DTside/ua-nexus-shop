import { NextResponse } from 'next/server';
import { getWarehouses } from '@/lib/novaPoshta';

export async function POST(req: Request) {
  const { cityRef } = await req.json();
  const warehouses = await getWarehouses(cityRef);
  return NextResponse.json(warehouses);
}