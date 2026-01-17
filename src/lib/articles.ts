import fs from 'fs';
import path from 'path';
import { Article } from '@/app/actions';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'articles.json');

export async function getArticles(): Promise<Article[]> {
  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.category === category);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.id === id);
}
