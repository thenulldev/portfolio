import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('https://status-api.nulldev.workers.dev', {
    status: 302,
    headers: {
      'Cache-Control': 'public, max-age=30',
    }
  });
}
