'use client';

import React, { useState } from 'react';
import { Source } from '@/app/actions';

type Props = {
  initialSources: Source[];
};

export default function LibraryGrid({ initialSources }: Props) {
  const [sources, setSources] = useState(initialSources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSources(
      initialSources.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="border border-stone-300 rounded-lg overflow-hidden mb-8">
        <div className="bg-stone-200 p-4 border-b border-stone-300 flex gap-4">
          <input
            type="text"
            placeholder="Search the library..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 rounded border border-stone-400 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Grid */}
      {sources.length === 0 ? (
        <div className="p-8 text-center text-stone-500 italic border border-dashed border-stone-300 rounded-lg">
          {initialSources.length === 0 ? "Library database is currently empty." : "No results found."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sources.map((source) => (
            <div
              key={source.id}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedSource(source)}
            >
              <div className="h-48 bg-stone-100 flex items-center justify-center border-b border-stone-100 overflow-hidden relative group">
                {source.type.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/uploads/${source.filename}`}
                    alt={source.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-stone-300 font-bold uppercase">
                    {source.filename.split('.').pop()}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-white text-stone-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-amber-50">
                    View Content
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate" title={source.title}>
                  {source.title}
                </h3>
                <p className="text-stone-500 text-sm line-clamp-2">
                  {source.description}
                </p>
                <div className="mt-4 flex justify-between items-center text-xs text-stone-400">
                  <span>{new Date(source.uploadedAt).toLocaleDateString()}</span>
                  <span className="uppercase">{source.type.split('/')[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Viewer Modal */}
      {selectedSource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedSource(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <div>
                     <h3 className="text-xl font-bold text-stone-900">{selectedSource.title}</h3>
                     <p className="text-sm text-stone-500">{selectedSource.filename}</p>
                </div>
              <button
                onClick={() => setSelectedSource(null)}
                className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-full transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 bg-stone-100 relative overflow-auto flex items-center justify-center p-4">
               {selectedSource.type.startsWith('image/') ? (
                 // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={`/uploads/${selectedSource.filename}`} 
                    alt={selectedSource.title} 
                    className="max-w-full max-h-full object-contain shadow-lg"
                  />
               ) : (
                 <iframe 
                    src={`/uploads/${selectedSource.filename}`} 
                    className="w-full h-full bg-white shadow-lg rounded"
                    title={selectedSource.title}
                 />
               )}
            </div>

             <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center text-sm">
                <span className="text-stone-500">{selectedSource.description}</span>
                 <a 
                    href={`/uploads/${selectedSource.filename}`} 
                    download
                    className="text-amber-700 hover:underline font-medium"
                >
                    Download Original File
                </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
