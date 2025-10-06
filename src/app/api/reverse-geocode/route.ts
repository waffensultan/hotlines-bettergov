import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required parameters: latitude and longitude' },
        { status: 400 }
      );
    }

    const nominatimRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'User-Agent': 'HotlinesPH/1.0 https://hotlines-bettergov.vercel.app/',
          'Accept-Language': 'en',
        },
      }
    );

    if (!nominatimRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Nominatim API' },
        { status: nominatimRes.status }
      );
    }

    const nominatimData = await nominatimRes.json();

    const city = nominatimData.address.town;

    return NextResponse.json({
      success: true,
      city,
    });
  } catch (error) {
    console.error('Error in reverse geocode API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
