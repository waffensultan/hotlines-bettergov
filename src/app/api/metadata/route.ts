import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'metadata.json');
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);

    return NextResponse.json(data.metadata);
  } catch {
    return NextResponse.json({ error: 'Failed to load metadata' }, { status: 500 });
  }
}
