import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const GHOST_URL = process.env.GHOST_URL || 'https://srv1062939.hstgr.cloud';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY || '';

// Generate JWT token for Ghost Admin API
function generateGhostToken(): string {
  if (!GHOST_ADMIN_API_KEY) {
    throw new Error('Ghost Admin API key not configured');
  }

  // Admin API Key format: id:secret
  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
  
  if (!id || !secret) {
    throw new Error('Invalid Ghost Admin API key format');
  }

  // Generate JWT token
  const token = jwt.sign({}, secret, {
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: `/${id}/`,
  });

  return token;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Generate auth token
    let token: string;
    try {
      token = generateGhostToken();
    } catch (err) {
      console.error('Failed to generate Ghost token:', err);
      return NextResponse.json(
        { error: 'Newsletter subscription is not configured properly' },
        { status: 500 }
      );
    }

    // Create member via Ghost Admin API
    const apiUrl = `${GHOST_URL}/ghost/api/admin/members/`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Ghost ${token}`,
      },
      body: JSON.stringify({
        members: [
          {
            email: email.toLowerCase().trim(),
            newsletters: [], // Subscribe to all default newsletters
          }
        ]
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! Please check your email to confirm your subscription.',
      });
    }

    // Handle Ghost API errors
    if (data.errors && data.errors.length > 0) {
      const errorMessage = data.errors[0].message || 'Failed to subscribe';
      
      // Check if member already exists
      if (errorMessage.includes('already exists') || errorMessage.includes('Member already exists')) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed!',
        });
      }
      
      throw new Error(errorMessage);
    }

    throw new Error('Failed to subscribe');

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to subscribe. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
