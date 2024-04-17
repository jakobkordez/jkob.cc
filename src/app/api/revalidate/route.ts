import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== process.env.MY_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  revalidatePath('/gallery');
  revalidatePath('/hamradio');
  return new Response('Revalidated');
}
