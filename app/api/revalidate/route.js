import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server';

export function POST() {

  revalidatePath('/', 'page');
  revalidatePath('/consultations', 'page');
  revalidatePath('/fees', 'page');
  revalidatePath('/blog', 'page');
  revalidatePath('/contact', 'page');
  revalidatePath('/faq', 'page');
  revalidatePath('/gallery', 'page');
  revalidatePath('/homeopathy', 'page');
  revalidatePath('/privacy-police', 'page');
  revalidatePath('/terms-and-conditions', 'page');
  revalidatePath('/testimonials', 'page');
  
  console.log("Running Webhook...");

  return NextResponse.json({ message: 'Cache revalidated' });
}
