import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const file = await fs.readFile(process.cwd() + '/src/data/metadata.json', 'utf8');
    const data = JSON.parse(file);
    return NextResponse.json(data.metadata);
  } catch {
    return NextResponse.json({ error: 'Failed to load metadata' }, { status: 500 });
  }
}
