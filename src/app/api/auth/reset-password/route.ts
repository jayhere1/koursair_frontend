import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { token, email, new_password, confirm_password } = await request.json();

    if (!token || !email || !new_password || !confirm_password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (new_password !== confirm_password) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    const apiRequestBody = {
      token,
      email,
      new_password,
      confirm_password,
    };

    // Call your external backend
    const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      // FIX: Ensure a real error status is sent to the frontend
      const errorStatus = response.status >= 400 ? response.status : 500;
      return NextResponse.json(
        { message: data.message || 'Failed to update password' },
        { status: errorStatus }
      );
    }

    // Success
    return NextResponse.json({
      message: data.message || 'Password updated successfully',
    });

  } catch (error) {
    console.error('Reset Password API route error:', (error instanceof Error ? error.message : String(error)));
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

