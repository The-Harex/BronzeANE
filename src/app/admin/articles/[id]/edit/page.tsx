import React from 'react';
import { getArticleById } from '@/lib/articles';
import { updateArticle } from '@/app/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/content" className="text-emerald-400 hover:text-emerald-300 mb-6 inline-block">&larr; Back to Content List</Link>
        <h1 className="text-3xl font-bold mb-8 text-white">Edit Article</h1>
        
        <form action={updateArticle} className="space-y-6 bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
          <input type="hidden" name="id" value={article.id} />
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              defaultValue={article.title}
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
             <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">Category</label>
             <select 
                id="category" 
                name="category"
                defaultValue={article.category}
                className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
             >
                <option value="history">History</option>
                <option value="religion">Religion</option>
                <option value="culture">Culture</option>
             </select>
          </div>

          <div>
             <label htmlFor="period" className="block text-sm font-medium text-slate-300 mb-2">Period</label>
             <select 
                id="period" 
                name="period"
                defaultValue={article.period || "Early Bronze Age"}
                className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
             >
                <option value="Early Bronze Age">Early Bronze Age (3300-2100 BC)</option>
                <option value="Middle Bronze Age">Middle Bronze Age (2100-1550 BC)</option>
                <option value="Late Bronze Age">Late Bronze Age (1550-1200 BC)</option>
             </select>
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-slate-300 mb-2">Summary</label>
            <textarea 
              id="summary" 
              name="summary" 
              rows={3}
              required
              defaultValue={article.summary}
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">Content</label>
            <textarea 
              id="content" 
              name="content" 
              rows={15}
              required
              defaultValue={article.content}
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded transition duration-200"
              >
                Update Article
              </button>
              <Link
                href="/admin/content"
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded text-center transition duration-200"
              >
                Cancel
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
