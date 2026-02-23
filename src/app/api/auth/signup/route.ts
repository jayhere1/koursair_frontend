import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const body = await request.json();
    //console.log("📩 Received body:", body);

    const { name, email, country_code, mobile_number, password, confirm_password } = body;

    if (!name || !email || !password || !confirm_password || !mobile_number || !country_code) {
      //console.log("❌ Missing fields");
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    //console.log("➡️ Sending to external API:", { name, email, country_code, mobile_number, password, confirm_password });

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        country_code,
        mobile_number, 
        password,
        confirm_password, 
      }),
    });

    //console.log("🌐 External API response status:", response.status);

    let data;
    try {
      data = await response.json();
    } catch  {
      //console.error("⚠️ Could not parse API response:", err);
      return NextResponse.json({ message: "Invalid response from external API" }, { status: 502 });
    }
    if (!response.ok || data.success === false || !data.data) {
      //console.log("⚠️ External API error (HTTP or logic):", data);

      return NextResponse.json(
        { message: data.message || "Signup failed" },
        { status: data.code || response.status }
      );
    }
    
    //console.log("✅ Signup success:", data);

    return NextResponse.json({
      message: data.message,
      token: data.data.access_token,
      id: data.data.user_id,
      name: data.data.name,
      email: data.data.email,
    });

  } catch {
    //console.error('Unhandled API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}