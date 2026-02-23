import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      countryCode,
      selectedDate,
      travellerCount,
      message
    } = body;

    if (!name || !email || !phone || !selectedDate) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiRequestBody = {
      name: name,
      email: email,
      country_code: countryCode,
      phone_number: phone,
      date: selectedDate,
      travelers: travellerCount,
      message: message
    };

    // Call your external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/enquiries/tahiti/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();

    // ERROR CHECKING LOGIC
    // We check if HTTP status is bad OR if the 'success' flag is false
    if (!response.ok || data.success === false) { 
      
      // CRITICAL FIX: Determine the status code
      // If response.ok is true (200), but success is false, we MUST manually set it to 400.
      // Otherwise, the frontend will think it's a success.
      const statusToSend = response.ok ? 400 : response.status;

      return NextResponse.json(
        { message: data.message || 'Failed to send enquiry to external API' },
        { status: statusToSend }
      );
    }

    // Return Success
    return NextResponse.json({
      message: 'Enquiry sent successfully!',
    });

  } catch (error) {
    console.error('Enquiry API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}