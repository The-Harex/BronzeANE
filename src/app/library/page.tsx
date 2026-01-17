import React from 'react';
import { getSources } from '@/lib/sources';
import LibraryTimeline from '@/components/LibraryTimeline';

export default async function LibraryPage() {
  const sources = await getSources();

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 p-4 md:p-8 pt-20 md:pt-24">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-amber-700">Digital Library</h1>
        <p className="text-base md:text-lg leading-relaxed mb-8">
          A collection of primary sources, translations, and contemporary academic papers.
        </p>
        
        <LibraryTimeline initialSources={sources} />
      </main>
    </div>
  );
}
