import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const correctPassword = process.env.PROTECTED_PAGE_PASSWORD;
    if (!correctPassword) {
      console.error('PROTECTED_PAGE_PASSWORD env var is not set');
      return NextResponse.json(
        { message: 'Access verification is not configured' },
        { status: 503 }
      );
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    if (password.trim() === correctPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Incorrect password.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Verify access error:', (error instanceof Error ? error.message : String(error)));
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
