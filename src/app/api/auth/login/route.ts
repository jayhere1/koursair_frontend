import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // This block is where the error was
    if (!response.ok || !data.success) {
      const errorStatus = response.status >= 400 ? response.status : 401;

      return NextResponse.json(
        { message: data.message || 'Invalid credentials' },
        { status: errorStatus } 
      );
    }

    const userData = data.data.user;

    return NextResponse.json({
      message: data.message,
      token: data.data.access_token,
      refreshToken: data.data.refresh_token,
      user: {
        id: userData.user_id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error('Login API route error:', (error instanceof Error ? error.message : String(error)));
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
