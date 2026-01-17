import Link from 'next/link';
import { logout } from '@/app/actions';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-700 pb-4">
            <h1 className="text-3xl font-bold text-emerald-400">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm">Restricted Access</span>
                <form action={logout}>
                    <button type="submit" className="text-red-400 hover:text-red-300 text-sm font-medium border border-red-900/50 hover:bg-red-900/20 px-3 py-1 rounded transition">
                        Sign Out
                    </button>
                </form>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <nav className="space-y-2 col-span-1">
                <Link href="/admin" className="block w-full text-left p-3 rounded bg-slate-800 hover:bg-slate-700 transition">Overview</Link>
                <Link href="/admin/content" className="block w-full text-left p-3 rounded hover:bg-slate-700 transition">Manage Content</Link>
                <Link href="/admin/library" className="block w-full text-left p-3 rounded hover:bg-slate-700 transition">Library Assets</Link>
                <Link href="/admin/settings" className="block w-full text-left p-3 rounded hover:bg-slate-700 transition">Settings</Link>
            </nav>

            <main className="col-span-1 md:col-span-3 bg-slate-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Content Management System</h2>
                <p className="text-slate-400 mb-8">Select an area to edit or add new resources to the database.</p>
                
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/articles/new" className="p-4 border border-slate-600 rounded hover:bg-slate-700 cursor-pointer block text-left transition">
                        <h3 className="font-bold text-emerald-300">Add Article</h3>
                        <p className="text-sm text-slate-400">Create a new blog post or educational article.</p>
                    </Link>
                     <Link href="/admin/sources/new" className="p-4 border border-slate-600 rounded hover:bg-slate-700 cursor-pointer block text-left transition">
                        <h3 className="font-bold text-emerald-300">Upload Source</h3>
                        <p className="text-sm text-slate-400">Add a PDF or image to the library.</p>
                    </Link>
                </div>
            </main>
        </div>
      </div>
    </div>
  );
}
