'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Props = {
  siteName: string;
};

export default function NavbarClient({ siteName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-stone-900/90 backdrop-blur-sm border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tighter hover:text-amber-500 transition"
          onClick={() => setIsOpen(false)}
        >
          {siteName}
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/history" className="hover:text-amber-400 transition">History</Link>
          <Link href="/religion" className="hover:text-amber-400 transition">Religion</Link>
          <Link href="/culture" className="hover:text-amber-400 transition">Culture</Link>
          <Link href="/library" className="hover:text-amber-400 transition">Library</Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-stone-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
            {isOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            )}
        </button>
      </div>

       {/* Mobile Menu Overlay */}
       {isOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-6 py-4 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
           <Link href="/history" className="block text-stone-300 hover:text-amber-400 hover:bg-stone-800 p-2 rounded transition font-medium" onClick={() => setIsOpen(false)}>History</Link>
           <Link href="/religion" className="block text-stone-300 hover:text-amber-400 hover:bg-stone-800 p-2 rounded transition font-medium" onClick={() => setIsOpen(false)}>Religion</Link>
           <Link href="/culture" className="block text-stone-300 hover:text-amber-400 hover:bg-stone-800 p-2 rounded transition font-medium" onClick={() => setIsOpen(false)}>Culture</Link>
           <Link href="/library" className="block text-stone-300 hover:text-amber-400 hover:bg-stone-800 p-2 rounded transition font-medium" onClick={() => setIsOpen(false)}>Library</Link>
           <div className="border-t border-stone-800 my-2 pt-2">
            <Link href="/admin" className="block text-stone-500 hover:text-emerald-400 p-2 rounded transition text-sm" onClick={() => setIsOpen(false)}>Admin Portal</Link>
           </div>
        </div>
       )}
    </nav>
  );
}
