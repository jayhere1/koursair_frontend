import { NextRequest, NextResponse } from 'next/server';

const CORRECT_PASSWORD = process.env.PROTECTED_PAGE_PASSWORD || "WEMBA 50s";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    if (password.trim() === CORRECT_PASSWORD) {
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
