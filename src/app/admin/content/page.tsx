import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import { deleteArticle } from '@/app/actions';

export default async function ManageContentPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex items-center text-sm text-slate-400">
            <Link href="/admin" className="hover:text-emerald-400 transition hover:underline">Admin Panel</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Manage Content</span>
        </nav>
        <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
            <h1 className="text-3xl font-bold text-emerald-400">Manage Content</h1>
        </header>

        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold">All Articles</h2>
                <Link href="/admin/articles/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition">
                    + Add New Article
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-900 border-b border-slate-700 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center italic">No articles found.</td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article.id} className="hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4 font-medium text-white">{article.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-700 px-2 py-1 rounded text-xs uppercase tracking-wide text-slate-300">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(article.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                                        <Link 
                                            href={`/admin/articles/${article.id}/edit`} 
                                            className="text-blue-400 hover:text-blue-300 font-medium"
                                        >
                                            Edit
                                        </Link>
                                        <form action={deleteArticle.bind(null, article.id)}>
                                            <button type="submit" className="text-red-400 hover:text-red-300 font-medium">
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
