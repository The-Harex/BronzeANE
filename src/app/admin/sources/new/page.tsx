import React from 'react';
import { uploadSource } from '@/app/actions';
import Link from 'next/link';

export default function NewSourcePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 mb-6 inline-block">&larr; Back to Dashboard</Link>
        <h1 className="text-3xl font-bold mb-8 text-white">Upload New Source</h1>
        
        <form action={uploadSource} className="space-y-6 bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. Map of Uruk"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows={3}
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Details about the source..."
            />
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
            <label htmlFor="file" className="block text-sm font-medium text-slate-300 mb-2">File (Image or PDF)</label>
            <input 
              type="file" 
              id="file" 
              name="file" 
              required
              accept="image/*,.pdf"
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700"
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded transition duration-200"
            >
              Upload Source
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
