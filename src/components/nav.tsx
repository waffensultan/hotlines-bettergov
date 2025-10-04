'use client';

import { useState } from 'react';

import Link from 'next/link';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 lg:px-32 px-4 py-3">
      <div className="flex items-center justify-between px-4 md:px-0">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-900 via-red-500 to-yellow-300 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
            PH
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Hotlines PH</h1>
            <p className="text-sm text-gray-600">Emergency Services Philippines</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href={'/'}
            className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 tracking-tight"
          >
            Home
          </Link>
          <Link
            href={'/about'}
            className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 tracking-tight"
          >
            About
          </Link>
          <span className="border border-blue-500 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-md">
            #BetterGovMovement
          </span>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-red-600 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link
              href={'/'}
              className="text-gray-700 hover:text-red-600 font-medium py-2 tracking-tight"
            >
              Home
            </Link>
            <Link
              href={'/about'}
              className="text-gray-700 hover:text-red-600 font-medium py-2 tracking-tight"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
