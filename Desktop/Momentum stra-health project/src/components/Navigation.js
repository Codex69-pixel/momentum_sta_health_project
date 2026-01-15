/**
 * Navigation Component
 * 
 * Main navigation bar with role-based menu access
 * - Displays only menu items accessible to the current user's role
 * - Responsive design with mobile menu
 * - Shows user information and logout option
 * 
 * @param {string} currentScreen - Currently active screen
 * @param {Function} onNavigate - Navigation handler function
 * @param {object} user - Current user object with name and role
 * @param {Function} onLogout - Logout handler function
 */

import React, { useState } from 'react';
import { Activity, Stethoscope, Users, LayoutDashboard, Package, BarChart3, LogOut, Menu, X, Bell } from 'lucide-react';

export function Navigation({ currentScreen, onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define menu items with their access control
  // Admin has access to all modules, other roles have specific access
  const menuItems = [
    { 
      id: 'nurse', 
      label: 'Nurse Triage', 
      icon: Stethoscope, 
      roles: ['nurse', 'admin'],
      description: 'Patient registration and triage' 
    },
    { 
      id: 'queue', 
      label: 'Queue Management', 
      icon: Users, 
      roles: ['doctor', 'nurse', 'admin'],
      description: 'View patient queues' 
    },
    { 
      id: 'doctor', 
      label: 'Doctor Portal', 
      icon: Activity, 
      roles: ['doctor', 'admin'],
      description: 'Patient care and prescriptions' 
    },
    { 
      id: 'resources', 
      label: 'Resources', 
      icon: LayoutDashboard, 
      roles: ['admin'],
      description: 'Hospital resource management' 
    },
    { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: Package, 
      roles: ['pharmacy', 'admin'],
      description: 'Medication inventory' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      roles: ['admin'],
      description: 'Performance metrics' 
    }
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">STRA.System</span>
              <p className="text-xs text-gray-500 hidden sm:block">Healthcare Management</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  title={item.description}
                  className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  <span className="text-sm">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-600 rounded-t-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Info & Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Notifications - Placeholder for future implementation */}
            <button 
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {/* Notification badge - example */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* User info */}
            <div className="text-right px-3 border-l border-gray-200">
              <p className="text-gray-900 font-semibold text-sm">{user?.name}</p>
              <p className="text-gray-500 text-xs capitalize flex items-center justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                {user?.role}
              </p>
            </div>
            
            {/* Logout button */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-red-200 hover:border-red-300 font-medium"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-slideDown">
            <div className="space-y-1 mb-4">
              {visibleMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <span className="block">{item.label}</span>
                      <span className="text-xs opacity-75">{item.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Mobile user info and logout */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="px-4">
                <p className="text-gray-900 font-semibold">{user?.name}</p>
                <p className="text-gray-600 text-sm capitalize flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  {user?.role}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-red-200 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}