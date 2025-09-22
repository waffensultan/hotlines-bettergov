'use client';

import { useState } from 'react';

import Link from 'next/link';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 md:px-32 py-3">
      <div className="flex items-center justify-between px-4 md:px-0">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-orange-600 to-yellow-300 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
            PH
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Hotlines PH</h1>
            <p className="text-sm text-gray-600">Emergency Services Philippines</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href={'/'}
            className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href={'/about'}
            className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
          >
            About
          </Link>
          <a
            href="https://github.com/waffensultan/hotlines-bettergov"
            target="_blank"
            className="bg-red-600 font-semibold text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            rel="noreferrer"
          >
            Report Issue
          </a>
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
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium py-2">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium py-2">
              About
            </a>
            <a
              href="#"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-center"
            >
              Report Issue
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
