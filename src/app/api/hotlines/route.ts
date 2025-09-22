import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import { IHotlinesResponse } from '@/interfaces/IHotlines';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const region = request.nextUrl.searchParams.get('region');
    const province = request.nextUrl.searchParams.get('province');
    const city = request.nextUrl.searchParams.get('city');
    const hotlineType = request.nextUrl.searchParams.get('hotlineType');

    const filePath = path.join(process.cwd(), 'public', 'hotlines.json');
    const file = await fs.readFile(filePath, 'utf8');
    const data: IHotlinesResponse = JSON.parse(file);

    // Check if hotline is still active
    let filteredHotlines = data.hotlines.filter(hotline => hotline.isActive);

    // Apply query parameters/filters
    if (region) {
      filteredHotlines = filteredHotlines.filter(hotline => hotline.regionCode === region);
    }
    if (province) {
      filteredHotlines = filteredHotlines.filter(hotline => hotline.province === province);
    }
    if (city) {
      filteredHotlines = filteredHotlines.filter(hotline => hotline.city === city);
    }
    if (hotlineType) {
      filteredHotlines = filteredHotlines.filter(hotline => hotline.hotlineType === hotlineType);
    }

    return NextResponse.json({ hotlines: filteredHotlines });
  } catch {
    return NextResponse.json({ error: 'Failed to load hotlines' }, { status: 500 });
  }
}
