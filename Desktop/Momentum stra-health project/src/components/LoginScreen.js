import React, { useState } from 'react';
import { Activity, Lock, User as UserIcon } from 'lucide-react';

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('nurse');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      id: `user-${Date.now()}`,
      name: username || 'Demo User',
      role: selectedRole
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2 text-2xl font-bold">STRA-System</h1>
          <p className="text-gray-600">Smart Triage & Resource Allocation</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-gray-900 mb-6 text-xl font-semibold">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Login As</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'nurse', label: 'Nurse' },
                  { value: 'doctor', label: 'Doctor' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'pharmacy', label: 'Pharmacy' }
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`py-2 px-4 rounded-lg border-2 transition-all ${
                      selectedRole === role.value
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Demo Mode:</strong> Click any role and sign in to view wireframes
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          &copy; 2025 STRA-System. Healthcare Innovation Platform
        </p>
      </div>
    </div>
  );
}