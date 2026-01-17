import React from 'react';
import { getSourceById } from '@/lib/sources';
import { updateSource } from '@/app/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSourcePage({ params }: Props) {
  const { id } = await params;
  const source = await getSourceById(id);

  if (!source) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/library" className="text-emerald-400 hover:text-emerald-300 mb-6 inline-block">&larr; Back to Library Assets</Link>
        <h1 className="text-3xl font-bold mb-8 text-white">Edit Source Details</h1>
        
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 mb-8">
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-700">
                 {source.type.startsWith('image/') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/uploads/${source.filename}`} alt="preview" className="h-32 w-32 object-cover rounded bg-white" />
                 ) : (
                    <div className="h-32 w-32 bg-slate-600 rounded flex items-center justify-center font-bold text-2xl uppercase text-white">
                        {source.filename.split('.').pop()}
                    </div>
                )}
                <div>
                     <p className="text-slate-400 text-sm mb-1">Filename</p>
                     <p className="font-mono bg-slate-900 px-3 py-1 rounded text-slate-300 mb-4">{source.filename}</p>
                     <a href={`/uploads/${source.filename}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Download / View File</a>
                </div>
            </div>

            <form action={updateSource} className="space-y-6">
            <input type="hidden" name="id" value={source.id} />
            
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input 
                type="text" 
                id="title" 
                name="title" 
                required
                defaultValue={source.title}
                className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea 
                id="description" 
                name="description" 
                rows={3}
                defaultValue={source.description}
                className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            <div>
                 <label htmlFor="period" className="block text-sm font-medium text-slate-300 mb-2">Period</label>
                 <select 
                    id="period" 
                    name="period"
                    defaultValue={source.period || "Early Bronze Age"}
                    className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                 >
                    <option value="Early Bronze Age">Early Bronze Age (3300-2100 BC)</option>
                    <option value="Middle Bronze Age">Middle Bronze Age (2100-1550 BC)</option>
                    <option value="Late Bronze Age">Late Bronze Age (1550-1200 BC)</option>
                 </select>
              </div>

            <div className="flex gap-4">
                <button 
                    type="submit" 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded transition duration-200"
                >
                    Update Details
                </button>
                <Link
                    href="/admin/library"
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded text-center transition duration-200"
                >
                    Cancel
                </Link>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}
