import React from 'react';
import { createArticle } from '@/app/actions';
import Link from 'next/link';

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 mb-6 inline-block">&larr; Back to Dashboard</Link>
        <h1 className="text-3xl font-bold mb-8 text-white">Add New Article</h1>
        
        <form action={createArticle} className="space-y-6 bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. The Battle of Kadesh"
            />
          </div>

          <div>
             <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">Category</label>
             <select 
                id="category" 
                name="category"
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
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="A brief overview..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">Content</label>
            <textarea 
              id="content" 
              name="content" 
              rows={10}
              required
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono"
              placeholder="Write your article content here (Markdown supported)..."
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded transition duration-200"
            >
              Publish Article
            </button>
            <Link
              href="/admin"
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
