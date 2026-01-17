'use client';

import React, { useState, useEffect } from 'react';
import { Source } from '@/app/actions';

type Props = {
  initialSources: Source[];
};

const PERIODS = [
  { id: 'Early Bronze Age', label: 'Early Bronze Age', date: '3300-2100 BC' },
  { id: 'Middle Bronze Age', label: 'Middle Bronze Age', date: '2100-1550 BC' },
  { id: 'Late Bronze Age', label: 'Late Bronze Age', date: '1550-1200 BC' },
];

export default function LibraryTimeline({ initialSources }: Props) {
  const [activePeriod, setActivePeriod] = useState<string>(PERIODS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  // Filter sources based on search term
  const filteredSources = initialSources.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered sources by period
  const groupedSources = PERIODS.reduce((acc, period) => {
    acc[period.id] = filteredSources.filter(s => s.period === period.id);
    return acc;
  }, {} as Record<string, Source[]>);

  // Identify which periods have content to display
  const activePeriods = PERIODS.filter(p => groupedSources[p.id]?.length > 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 150; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActivePeriod(id);
    }
  };

  useEffect(() => {
    const observerOptions = {
       root: null,
       rootMargin: '-30% 0px -60% 0px', 
       threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActivePeriod(entry.target.id);
        }
      });
    }, observerOptions);

    PERIODS.forEach(period => {
      const element = document.getElementById(period.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredSources]); // Re-run effect when sources change (due to search)

  useEffect(() => {
    // Scroll the date button into view when active changes
    const activeButton = document.getElementById(`btn-${activePeriod}`);
    if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activePeriod]);


  return (
    <div>
       {/* Search Bar */}
       <div className="border border-stone-300 rounded-lg overflow-hidden mb-8 max-w-xl mx-auto md:mx-0">
        <div className="bg-white p-2 flex gap-4">
          <input
            type="text"
            placeholder="Search documents, maps, artifacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full outline-none text-stone-700 bg-transparent placeholder:text-stone-400"
          />
        </div>
      </div>

       {filteredSources.length === 0 ? (
          <p className="text-stone-500 italic text-center py-12">No items found matching your search. Try different keywords.</p>
      ) : (
        <div className="relative">
            {/* Sticky Navigation Bar */}
            <div className="sticky top-16 z-40 bg-amber-50/95 backdrop-blur-md border-b border-amber-200 py-3 mb-10 -mx-4 px-4 md:-mx-8 md:px-8 shadow-sm transition-all duration-300">
                <div className="max-w-6xl mx-auto flex overflow-x-auto gap-3 no-scrollbar items-center md:justify-center snap-x py-1">
                    {activePeriods.map((period) => {
                        const isActive = activePeriod === period.id;
                        return (
                            <button
                                key={period.id}
                                id={`btn-${period.id}`}
                                onClick={() => scrollToSection(period.id)}
                                className={`
                                    whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all flex flex-col items-center flex-shrink-0 snap-center border
                                    ${isActive 
                                        ? 'bg-amber-700 text-white border-amber-800 shadow-md scale-105' 
                                        : 'bg-white text-stone-600 hover:bg-amber-100 border-stone-200 hover:border-amber-300'}
                                `}
                            >
                                <span>{period.label}</span>
                                <span className={`text-[10px] font-normal ${isActive ? 'text-amber-100' : 'text-stone-400'}`}>{period.date}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-24 pb-24">
                {activePeriods.map((period) => {
                    const periodSources = groupedSources[period.id];
                    
                    return (
                        <section key={period.id} id={period.id} className="scroll-mt-48">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px bg-amber-200 flex-1"></div>
                                <div className="text-center">
                                    <h2 className="text-2xl md:text-3xl font-bold text-stone-800 uppercase tracking-widest font-serif">{period.label}</h2>
                                    <p className="text-stone-500 italic mt-1 text-sm md:text-base">{period.date}</p>
                                </div>
                                <div className="h-px bg-amber-200 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {periodSources.map((source) => (
                                    <div
                                        key={source.id}
                                        className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
                                        onClick={() => setSelectedSource(source)}
                                    >
                                        <div className="h-48 bg-stone-100 flex items-center justify-center border-b border-stone-100 overflow-hidden relative">
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
                                                <span className="bg-white text-stone-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-amber-50 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
                                                    View Content
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-1 truncate text-stone-900 group-hover:text-amber-700 transition" title={source.title}>
                                                {source.title}
                                            </h3>
                                            <p className="text-stone-500 text-sm line-clamp-2 mb-3">
                                                {source.description}
                                            </p>
                                            <div className="flex justify-between items-center text-xs text-stone-400 pt-3 border-t border-stone-100">
                                                <span>{new Date(source.uploadedAt).toLocaleDateString()}</span>
                                                <span className="uppercase font-semibold tracking-wide">{source.type.split('/')[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
      )}

      {/* Viewer Modal */}
      {selectedSource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedSource(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <div>
                     <h3 className="text-xl font-bold text-stone-900">{selectedSource.title}</h3>
                     <p className="text-sm text-stone-500">{selectedSource.filename}</p>
                </div>
              <button
                onClick={() => setSelectedSource(null)}
                className="text-stone-400 hover:text-red-500 transition p-2 rounded-full hover:bg-stone-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 bg-stone-900 overflow-auto flex items-center justify-center relative p-4">
              {selectedSource.type.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/uploads/${selectedSource.filename}`}
                  alt={selectedSource.title}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              ) : (
                <iframe
                  src={`/uploads/${selectedSource.filename}`}
                  className="w-full h-full bg-white rounded shadow-lg"
                  title={selectedSource.title}
                />
              )}
            </div>
            <div className="bg-stone-50 p-4 border-t border-stone-200 text-right">
                <a 
                    href={`/uploads/${selectedSource.filename}`} 
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition text-sm shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Original
                </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}