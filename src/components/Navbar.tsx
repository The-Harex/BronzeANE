import Link from 'next/link';
import React from 'react';
import { getSettings } from '@/lib/settings';

export default function Navbar() {
  const settings = getSettings();
  
  return (
    <nav className="fixed w-full z-50 bg-stone-900/90 backdrop-blur-sm border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:text-amber-500 transition">
          {settings.siteName}
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/history" className="hover:text-amber-400 transition">History</Link>
          <Link href="/religion" className="hover:text-amber-400 transition">Religion</Link>
          <Link href="/culture" className="hover:text-amber-400 transition">Culture</Link>
          <Link href="/library" className="hover:text-amber-400 transition">Library</Link>
        </div>
        {/* Mobile menu button placeholder */}
        <button className="md:hidden p-2 text-stone-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
      </div>
    </nav>
  );
}
