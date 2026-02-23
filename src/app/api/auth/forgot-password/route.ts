import { NextRequest, NextResponse } from "next/server";

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

    const response = await fetch(`${API_BASE_URL}/auth/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // Check for both response.ok and a data.success flag
    if (!response.ok || !data.success) {
      const errorStatus = response.status >= 400 ? response.status : 400;
      return NextResponse.json(
        { message: data.message || 'Failed to send reset link' },
        { status: errorStatus }
      );
    }

    return NextResponse.json({
      message: data.message || 'Password reset link sent to your email',
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      //console.error('Forgot password API route error:', error.message);
    } else {
      //console.error('Forgot password API route error:', error);
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
