import React, { useState } from 'react';
import { Lock, User as UserIcon, Eye, EyeOff, ChevronDown } from 'lucide-react';
import medicalIllustration from '../assets/medical-illustration.svg';

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      id: `user-${Date.now()}`,
      name: username || 'Demo User',
      role: selectedRole
    });
  };

  const roleLabels = {
    nurse: 'Nurse',
    doctor: 'Doctor',
    admin: 'Admin',
    pharmacy: 'Pharmacy'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side - Illustration */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-6 lg:p-12 flex items-center justify-center min-h-96 lg:min-h-screen">
          <img 
            src={medicalIllustration} 
            alt="Medical Team Illustration" 
            className="w-full h-auto max-w-md lg:max-w-full object-contain"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
          
          {/* Hospital Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center justify-start lg:justify-start space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center rounded-lg">
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-1 h-4 bg-white absolute"></div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Hong Kong</h1>
            </div>
            <p className="text-sm text-gray-600 ml-11">Emergency & General Hospital</p>
          </div>

          {/* Welcome Header */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome Back {roleLabels[selectedRole]}!
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">Lets get you Logged in</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            
            {/* Username Input */}
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="max.alan@hkgeneral.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="admin">Admin</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Remember Me & Need Help */}
            <div className="flex items-center justify-between text-xs lg:text-sm py-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-gray-700">Remember Me !</span>
              </label>
              <button type="button" className="text-cyan-500 hover:text-cyan-600 font-medium">
                Need Help?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-sm lg:text-base"
            >
              Login
            </button>

            {/* Alternative Login Options */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600">Alternative Login Options</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Login with Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Login with Twitter</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
