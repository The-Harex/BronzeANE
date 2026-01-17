import React from 'react';
import Link from 'next/link';
import { getSources } from '@/lib/sources';
import { deleteSource } from '@/app/actions';

export default async function ManageLibraryPage() {
  const sources = await getSources();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex items-center text-sm text-slate-400">
            <Link href="/admin" className="hover:text-emerald-400 transition hover:underline">Admin Panel</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Library Assets</span>
        </nav>
        <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
            <h1 className="text-3xl font-bold text-emerald-400">Library Assets</h1>
        </header>

        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold">All Files</h2>
                <Link href="/admin/sources/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition">
                    + Upload New Source
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-900 border-b border-slate-700 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">Preview</th>
                            <th className="px-6 py-4">Title / Filename</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {sources.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center italic">No files found.</td>
                            </tr>
                        ) : (
                            sources.map((source) => (
                                <tr key={source.id} className="hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4">
                                         {source.type.startsWith('image/') ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={`/uploads/${source.filename}`} alt="preview" className="h-12 w-12 object-cover rounded bg-white" />
                                        ) : (
                                            <div className="h-12 w-12 bg-slate-600 rounded flex items-center justify-center font-bold text-xs uppercase text-white">
                                                {source.filename.split('.').pop()}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{source.title}</div>
                                        <div className="text-xs text-slate-500 font-mono truncate max-w-[200px]">{source.filename}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-700 px-2 py-1 rounded text-xs uppercase tracking-wide text-slate-300">
                                            {source.type.split('/')[1]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-3 items-center h-full">
                                        <Link 
                                            href={`/admin/sources/${source.id}/edit`} 
                                            className="text-blue-400 hover:text-blue-300 font-medium"
                                        >
                                            Edit
                                        </Link>
                                        <form action={deleteSource.bind(null, source.id)}>
                                            <button type="submit" className="text-red-400 hover:text-red-300 font-medium ml-2">
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
