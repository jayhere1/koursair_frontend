import { NextResponse } from 'next/server';

// 1. Change back to GET
export async function GET() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // 2. Get the client's IP address from the request
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  const clientIp = data.ip;
  
  try {
    // 3. Construct the URL with the IP as a query parameter
    const apiUrl = `${API_BASE_URL}/auth/country-code?ip=${clientIp}`;
    
    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
    });

    if (!apiResponse.ok) {
      console.error(`External API failed: ${apiResponse.status}`);
      throw new Error('External API failed');
    }
    
    const data = await apiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Country code API route error:', (error instanceof Error ? error.message : String(error)));
    // On error, return default country code with status 200 (not 500)
    return NextResponse.json({ country_code: 'IN', calling_code: '+91' }, { status: 200 });
  }
}

export const runtime = 'edge';