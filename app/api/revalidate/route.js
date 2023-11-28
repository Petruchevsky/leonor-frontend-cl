import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server';

export function POST() {

  console.log("Running Webhook...")
  revalidateTag('mi-etiqueta-de-cache');

  return NextResponse.json({ message: 'Cache revalidated' });
}
