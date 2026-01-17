import fs from 'fs';
import path from 'path';
import { Source } from '@/app/actions';

const sourcesFilePath = path.join(process.cwd(), 'src', 'data', 'sources.json');

export async function getSources(): Promise<Source[]> {
  try {
    if (!fs.existsSync(sourcesFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(sourcesFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading sources:', error);
    return [];
  }
}

export async function getSourceById(id: string): Promise<Source | undefined> {
  const sources = await getSources();
  return sources.find((source) => source.id === id);
}
