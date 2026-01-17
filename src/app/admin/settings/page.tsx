import React from 'react';
import Link from 'next/link';
import { getSettings } from '@/lib/settings';
import { updateSettings } from '@/app/actions';

export default function SettingsPage() {
  const settings = getSettings();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-6 flex items-center text-sm text-slate-400">
            <Link href="/admin" className="hover:text-emerald-400 transition hover:underline">Admin Panel</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Settings</span>
        </nav>
         <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
            <h1 className="text-3xl font-bold text-emerald-400">Site Settings</h1>
        </header>
        
        <form action={updateSettings} className="space-y-6 bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-slate-300 mb-2">Site Name</label>
            <input 
              type="text" 
              id="siteName" 
              name="siteName" 
              required
              defaultValue={settings.siteName}
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
             <label htmlFor="siteDescription" className="block text-sm font-medium text-slate-300 mb-2">Site Description</label>
             <textarea 
                id="siteDescription" 
                name="siteDescription"
                rows={2}
                required
                defaultValue={settings.siteDescription}
                className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
             />
             <p className="text-xs text-slate-500 mt-1">Used for SEO meta tags and homepage hero text.</p>
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
            <input 
              type="email" 
              id="contactEmail" 
              name="contactEmail" 
              required
              defaultValue={settings.contactEmail}
              className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-700 flex gap-4">
             <button 
                type="submit" 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded transition duration-200"
            >
                Save Settings
            </button>
            <Link
                href="/admin"
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded text-center transition duration-200"
            >
                Return to Admin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
