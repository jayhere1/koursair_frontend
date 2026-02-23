import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Use the /auth/request-otp endpoint
    const response = await fetch(`${API_BASE_URL}/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      // FIX: Ensure a real error status is sent to the frontend
      const errorStatus = response.status >= 400 ? response.status : 400;
      return NextResponse.json(
        { message: data.message || 'Failed to send OTP' },
        { status: errorStatus }
      );
    }

    // This route just returns a success message, no token
    return NextResponse.json({
      message: data.message || 'OTP sent successfully',
    });

  } catch{ // FIX: Use unknown instead of any
    //console.error('Request OTP API route error:', errorMessage);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
