import { NextRequest, NextResponse } from 'next/server';

// In a real app, you'd store this in a database
// eslint-disable-next-line prefer-const
let subscribers: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'You are already subscribed to our newsletter' },
        { status: 409 }
      );
    }

    // Add to subscribers list
    subscribers.push(email);

    // In a real app, you would:
    // 1. Store in database
    // 2. Send welcome email
    // 3. Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // 4. Log the subscription

    console.log(`New newsletter subscriber: ${email}`);

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        subscriberCount: subscribers.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // In a real app, you'd get this from a database
  return NextResponse.json({
    subscriberCount: subscribers.length,
    message: 'Newsletter subscription endpoint'
  });
}
