import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // 1. Get the token from the request header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json(
        { message: 'No authorization token provided' },
        { status: 401 }
      );
    }

    // 2. Call your backend's /users/details endpoint
    const response = await fetch(`${API_BASE_URL}/users/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader, // Forward the token
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      // FIX: Ensure a real error status is sent to the frontend
      const errorStatus = response.status >= 400 ? response.status : 401;
      return NextResponse.json(
        { message: data.message || 'Failed to fetch user details' },
        { status: errorStatus }
      );
    }

    // 3. Re-map the backend data to match your 'User' interface
    const backendUser = data.data;
    const user = {
      id: backendUser.id,
      name: backendUser.name,
      email: backendUser.email,
      phone: backendUser.mobile_number, // Map mobile_number to phone
    };

    // 4. Return the clean user object
    return NextResponse.json({ user });

  } catch { // FIX: Added error typing and logging
    //console.error('Fetch Details API route error:', error.message);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
