import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const sourcesFilePath = path.join(process.cwd(), 'src', 'data', 'sources.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

type Source = {
  id: string;
  title: string;
  description: string;
  filename: string;
  type: string;
  period: string;
  uploadedAt: string;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const period = formData.get('period') as string;

    if (!file || !title || !period) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedFilename}`;
    const filePath = path.join(uploadsDir, filename);

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, buffer);

    // Save metadata
    const newSource: Source = {
      id: Date.now().toString(),
      title,
      description,
      filename,
      type: file.type,
      period,
      uploadedAt: new Date().toISOString(),
    };

    let sources: Source[] = [];
    if (fs.existsSync(sourcesFilePath)) {
      const fileData = fs.readFileSync(sourcesFilePath, 'utf8');
      try {
        sources = JSON.parse(fileData);
      } catch (e) {
        sources = [];
      }
    }

    sources.push(newSource);
    fs.writeFileSync(sourcesFilePath, JSON.stringify(sources, null, 2));

    return NextResponse.json({ success: true, source: newSource });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
