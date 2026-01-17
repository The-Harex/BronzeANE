import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import ArticleTimeline from '@/components/ArticleTimeline';

export default async function ReligionPage() {
  const articles = await getArticlesByCategory('religion');

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 p-4 md:p-8 pt-20 md:pt-24">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-amber-700">Religion & Mythology</h1>
        <p className="text-base md:text-lg leading-relaxed mb-8">
          Discover the pantheons, rituals, and beliefs that shaped the lives of ancient people.
        </p>

        <ArticleTimeline articles={articles} />
      </main>
    </div>
  );
}
