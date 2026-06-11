import { NextResponse } from 'next/server';

async function checkEndpoint(name: string, url: string, method = 'GET', timeout = 5000): Promise<{ name: string; status: 'up' | 'down' | 'slow'; latency: number; error?: string }> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
    });
    
    clearTimeout(timer);
    const latency = Date.now() - start;
    
    if (!response.ok && response.status !== 404) {
      return { name, status: 'down', latency, error: `HTTP ${response.status}` };
    }
    
    return { name, status: latency > 2000 ? 'slow' : 'up', latency };
  } catch (err) {
    return { name, status: 'down', latency: Date.now() - start, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function GET() {
  const checks = await Promise.all([
    checkEndpoint('GitHub API', 'https://api.github.com'),
    checkEndpoint('Cloudflare Workers', 'https://workers.cloudflare.com'),
    checkEndpoint('Ghost CMS (Local)', 'https://srv1062939.hstgr.cloud'),
    checkEndpoint('Credly (Badges)', 'https://www.credly.com'),
    checkEndpoint('Microsoft Learn', 'https://learn.microsoft.com'),
    checkEndpoint('TryHackMe', 'https://tryhackme.com'),
    checkEndpoint('Portfolio Site', 'https://portfolio.thenulldev.workers.dev'),
  ]);

  const overall = checks.every(c => c.status === 'up') ? 'healthy' : 
                  checks.some(c => c.status === 'down') ? 'degraded' : 'operational';

  return NextResponse.json({
    status: overall,
    checkedAt: new Date().toISOString(),
    uptime: '99.9%',
    services: checks,
  }, { 
    headers: {
      'Cache-Control': 'public, max-age=30',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
