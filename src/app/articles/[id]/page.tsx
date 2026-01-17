import React from 'react';
import { getArticleById } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 p-8 pt-24">
      <main className="max-w-3xl mx-auto">
        <Link href={`/${article.category}`} className="text-amber-700 hover:text-amber-800 mb-6 inline-block font-medium">
          &larr; Back to {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </Link>
        
        <article className="bg-white p-8 md:p-12 shadow-xl rounded-xl border border-stone-200">
          <header className="mb-8 border-b border-stone-200 pb-8">
             <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase rounded-full tracking-wide">
                  {article.category}
                </span>
                {article.period && (
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase rounded-full tracking-wide border border-stone-200">
                        {article.period}
                    </span>
                )}
                <span className="text-stone-500 text-sm ml-auto">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">{article.title}</h1>
             <p className="text-xl text-stone-600 italic">{article.summary}</p>
          </header>

          <div className="text-lg text-stone-800 leading-8 whitespace-pre-wrap font-serif">
            {article.content}
          </div>
        </article>
      </main>
    </div>
  );
}
