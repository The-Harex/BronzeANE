'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/app/actions';

type Props = {
  articles: Article[];
};

const PERIODS = [
  { id: 'Early Bronze Age', label: 'Early Bronze Age', date: '3300-2100 BC' },
  { id: 'Middle Bronze Age', label: 'Middle Bronze Age', date: '2100-1550 BC' },
  { id: 'Late Bronze Age', label: 'Late Bronze Age', date: '1550-1200 BC' },
];

export default function ArticleTimeline({ articles }: Props) {
  const [activePeriod, setActivePeriod] = useState<string>(PERIODS[0].id);

  const groupedArticles = PERIODS.reduce((acc, period) => {
    acc[period.id] = articles.filter(a => a.period === period.id);
    return acc;
  }, {} as Record<string, Article[]>);

  const activePeriods = PERIODS.filter(p => groupedArticles[p.id]?.length > 0);

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
  }, [articles]);

  useEffect(() => {
    // Scroll the date button into view when active changes
    const activeButton = document.getElementById(`btn-${activePeriod}`);
    if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activePeriod]);

  if (articles.length === 0) {
      return <p className="text-stone-500 italic text-center py-12">No articles available yet. Check back soon!</p>;
  }

  return (
    <div className="relative">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-16 z-40 bg-amber-50/95 backdrop-blur-md border-b border-amber-200 py-3 mb-10 -mx-4 px-4 md:-mx-8 md:px-8 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto flex overflow-x-auto gap-3 no-scrollbar items-center md:justify-center snap-x py-1">
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
            const periodArticles = groupedArticles[period.id];
            
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

                     <div className="grid md:grid-cols-2 gap-8">
                        {periodArticles.map((article) => (
                           <Link key={article.id} href={`/articles/${article.id}`} className="block group h-full">
                              <div className="p-6 bg-white shadow-md rounded-lg border border-stone-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
                                <div className="flex items-start justify-between mb-3">
                                   <span className="text-xs font-bold uppercase tracking-wider text-amber-600">{article.category}</span>
                                   <span className="text-xs text-stone-400">{new Date(article.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-stone-900 group-hover:text-amber-700 transition leading-tight">{article.title}</h3>
                                <p className="text-stone-600 text-sm line-clamp-3 mb-4 flex-grow font-serif leading-relaxed">{article.summary}</p>
                                <span className="text-amber-700 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Read Article <span className="text-lg leading-none">&rarr;</span>
                                </span>
                              </div>
                            </Link>
                        ))}
                     </div>
                </section>
            );
        })}
      </div>
    </div>
  );
}