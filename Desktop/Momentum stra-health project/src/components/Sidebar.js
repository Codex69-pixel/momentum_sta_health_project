/**
 * Sidebar Component
 * 
 * Slide-out sidebar menu for navigation
 * - Mobile-responsive design
 * - Shows user information at the top
 * - Role-based menu items
 * - Smooth slide-in/out animation
 * 
 * @param {boolean} isOpen - Whether sidebar is open
 * @param {Function} onClose - Function to close sidebar
 * @param {string} currentScreen - Currently active screen
 * @param {Function} onNavigate - Navigation handler function
 * @param {object} user - Current user object with name and role
 * @param {Function} onLogout - Logout handler function
 */

import React from 'react';
import { 
  X, 
  Stethoscope, 
  Users, 
  Activity, 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  LogOut,
  User
} from 'lucide-react';

export function Sidebar({ isOpen, onClose, currentScreen, onNavigate, user, onLogout }) {
  // Define menu items with their access control
  const menuItems = [
    { 
      id: 'nurse', 
      label: 'Nurse Triage', 
      icon: Stethoscope, 
      roles: ['nurse', 'admin'],
    },
    { 
      id: 'queue', 
      label: 'Queue Management', 
      icon: Users, 
      roles: ['doctor', 'nurse', 'admin'],
    },
    { 
      id: 'doctor', 
      label: 'Doctor Portal', 
      icon: Activity, 
      roles: ['doctor', 'admin'],
    },
    { 
      id: 'resources', 
      label: 'Resources', 
      icon: LayoutDashboard, 
      roles: ['admin'],
    },
    { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: Package, 
      roles: ['pharmacy', 'admin'],
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      roles: ['admin'],
    }
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  const handleNavigate = (screenId) => {
    onNavigate(screenId);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
          style={{
            top: '4rem'
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className="fixed top-16 left-0 bg-white shadow-2xl z-40 overflow-y-auto transition-all duration-300"
        style={{
          width: '256px',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          height: 'calc(100vh - 4rem)',
          top: '4rem'
        }}
      >
        {/* Header Section with User Info */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sticky top-0">
          {/* Close button for mobile */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-1 hover:bg-blue-700 rounded-lg transition"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 bg-blue-700 bg-opacity-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-blue-100 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {visibleMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm flex-1 text-left">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
