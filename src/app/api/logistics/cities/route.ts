import { NextResponse } from 'next/server';
import { searchCities } from '@/lib/novaPoshta';

export async function POST(req: Request) {
  const { query } = await req.json();
  const cities = await searchCities(query);
  return NextResponse.json(cities);
}