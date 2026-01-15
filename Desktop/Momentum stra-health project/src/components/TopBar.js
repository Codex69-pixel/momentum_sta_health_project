/**
 * TopBar Component
 * 
 * Simple header with menu button and branding
 * - Mobile-first design
 * - Menu toggle button
 * - Logo and app title
 * 
 * @param {Function} onMenuToggle - Function to toggle sidebar
 */

import React from 'react';
import { Menu } from 'lucide-react';

export function TopBar({ onMenuToggle }) {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-40 border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand - Left side */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' className="w-7 h-7">
                <path d='M30 50 L45 35 L60 50 L75 35' stroke='white' strokeWidth='6' fill='none' strokeLinecap='round' strokeLinejoin='round'/>
                <circle cx='50' cy='65' r='4' fill='white'/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight">STRA.System</span>
              <p className="text-xs text-gray-500 hidden sm:block font-medium">Healthcare Management</p>
            </div>
          </div>

          {/* Menu Toggle Button - Right side */}
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
