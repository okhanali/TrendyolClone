import { db } from '@/lib/db';
import { OrderStatusType } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status') as OrderStatusType | null;

  const data = await db.getOrders(statusParam);

  return NextResponse.json(data);
}
