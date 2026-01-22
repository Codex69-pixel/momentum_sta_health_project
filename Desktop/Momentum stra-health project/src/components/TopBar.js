/**
 * TopBar Component
 * 
 * Professional header with modern design
 * - Search functionality
 * - Notifications menu
 * - User profile dropdown
 * - Quick actions
 * 
 * @param {Function} onMenuToggle - Function to toggle sidebar
 * @param {Object} user - Current user object
 */

import React, { useState } from 'react';
import { Menu, Search, Bell, Settings, User, LogOut, HelpCircle, ChevronDown, Activity } from 'lucide-react';

export function TopBar({ onMenuToggle, user, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock notifications
  const notifications = [
    { id: 1, type: 'alert', message: 'Critical patient in Emergency', time: '2 min ago', unread: true },
    { id: 2, type: 'info', message: 'Lab results ready for review', time: '15 min ago', unread: true },
    { id: 3, type: 'success', message: 'Inventory restocked successfully', time: '1 hour ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) onLogout();
  };

  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg fixed w-full top-0 z-40 border-b border-teal-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center space-x-4">
            {/* Menu Toggle Button */}
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-teal-500/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 border border-white/30 rounded-xl flex items-center justify-center shadow-md">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">STRA-Health</span>
                <p className="text-xs text-teal-100 font-medium">Medical System</p>
              </div>
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search patients, records, inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:outline-none focus:border-white focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all text-sm text-white placeholder-white/60"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Search Button (Mobile) */}
            <button className="md:hidden p-2 hover:bg-teal-500/30 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>

           

            {/* Settings */}
            <button className="hidden sm:block p-2 hover:bg-teal-500/30 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-teal-500/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <div className="w-8 h-8 bg-white/20 border border-white/30 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-semibold text-white">{user?.name || 'User'}</span>
                  <span className="text-xs text-teal-100 capitalize">{user?.role || 'Role'}</span>
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-white/60" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 animate-fadeIn">
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                          <p className="text-xs text-teal-600 capitalize font-medium">{user?.role || 'Role'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors">
                        <HelpCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Help & Support</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-red-50 transition-colors rounded-lg"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
