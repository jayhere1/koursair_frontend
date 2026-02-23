import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Use the /auth/verify-otp endpoint
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      // FIX: Ensure a real error status is sent to the frontend
      const errorStatus = response.status >= 400 ? response.status : 401;
      return NextResponse.json(
        { message: data.message || 'Invalid OTP or email' },
        { status: errorStatus }
      );
    }

    // Un-commented to match the login route's structure
    //const userData = data.data.user;

    // Return the same structure as your normal login
    return NextResponse.json({
      message: data.message,
      token: data.data.access_token, 
      // refreshToken: data.data.refresh_token,
      // user: {
      //   id: userData.user_id,
      //   name: userData.name,
      //   email: userData.email,
      // },
    });

  } catch  { // FIX: Use unknown instead of any
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
