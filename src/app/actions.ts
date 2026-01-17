'use server'

import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'articles.json');
const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

export type Article = {
  id: string;
  title: string;
  category: string;
  period: string;
  summary: string;
  content: string;
  createdAt: string;
};

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const period = formData.get('period') as string;
  const summary = formData.get('summary') as string;
  const content = formData.get('content') as string;

  if (!title || !content || !category || !period) {
    throw new Error('Missing required fields');
  }

  const newArticle: Article = {
    id: Date.now().toString(),
    title,
    category,
    period,
    summary,
    content,
    createdAt: new Date().toISOString(),
  };

  // Read existing data
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  const articles: Article[] = JSON.parse(fileData);

  // Add new article
  articles.push(newArticle);

  // Save back to file
  fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2));

  redirect('/admin');
}

const sourcesFilePath = path.join(process.cwd(), 'src', 'data', 'sources.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export type Source = {
  id: string;
  title: string;
  description: string;
  filename: string;
  type: string;
  keyword?: string; // Optional search keyword
  period: string;
  uploadedAt: string;
};

export async function uploadSource(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const period = formData.get('period') as string;
  const file = formData.get('file') as File;

  if (!title || !file || !period) {
    throw new Error('Missing required fields');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(uploadsDir)){
      fs.mkdirSync(uploadsDir, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer);

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

  redirect('/admin');
}

export async function deleteArticle(id: string) {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    let articles: Article[] = JSON.parse(fileData);
  
    articles = articles.filter((article) => article.id !== id);
  
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2));
    
    // We revalidate or redirect. Since this is called from a form or button, 
    // we might want to just revalidate path or redirect to the list page.
    redirect('/admin/content');
}

export async function updateArticle(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const period = formData.get('period') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
  
    if (!id || !title || !content || !category || !period) {
      throw new Error('Missing required fields');
    }
  
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const articles: Article[] = JSON.parse(fileData);
    
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
        articles[index] = {
            ...articles[index],
            title,
            category,
            period,
            summary,
            content,
            // Keep original createdAt, maybe add updatedAt?
        };
        fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2));
    }
  
    redirect('/admin/content');
  }

export async function deleteSource(id: string) {
    let sources: Source[] = [];
    if (fs.existsSync(sourcesFilePath)) {
        const fileData = fs.readFileSync(sourcesFilePath, 'utf8');
        try {
            sources = JSON.parse(fileData);
        } catch (e) {
            sources = [];
        }
    }

    const sourceToDelete = sources.find(s => s.id === id);
    if (sourceToDelete) {
        // Remove file
        const filePath = path.join(uploadsDir, sourceToDelete.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Remove from list
        sources = sources.filter(s => s.id !== id);
        fs.writeFileSync(sourcesFilePath, JSON.stringify(sources, null, 2));
    }

    redirect('/admin/library');
}

export async function updateSource(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const period = formData.get('period') as string;

    if (!id || !title || !period) {
        throw new Error('Missing required fields');
    }

    let sources: Source[] = [];
    if (fs.existsSync(sourcesFilePath)) {
        const fileData = fs.readFileSync(sourcesFilePath, 'utf8');
        sources = JSON.parse(fileData);
    }

    const index = sources.findIndex(s => s.id === id);
    if (index !== -1) {
        sources[index] = {
            ...sources[index],
            title,
            description,
            period,
        };
        fs.writeFileSync(sourcesFilePath, JSON.stringify(sources, null, 2));
    }

    redirect('/admin/library');
}

export type Settings = {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
};

export async function updateSettings(formData: FormData) {
  const siteName = formData.get('siteName') as string;
  const siteDescription = formData.get('siteDescription') as string;
  const contactEmail = formData.get('contactEmail') as string;

  const settings: Settings = {
    siteName,
    siteDescription,
    contactEmail,
  };

  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));

  redirect('/admin/settings');
}

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (username === 'rfinney87' && password === 'VikingHarex2!') {
    const cookieStore = await cookies();
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('admin_session', 'authenticated', { 
        expires: Date.now() + oneDay,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    });
    redirect('/admin');
  } else {
    redirect('/admin/login?error=true');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
