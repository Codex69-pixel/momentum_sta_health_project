import React, { useState } from 'react';
import { Activity, Lock, User as UserIcon } from 'lucide-react';

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('nurse');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      id: `user-${Date.now()}`,
      name: username || 'Demo User',
      role: selectedRole
    });
  };

  const roleIcons = {
    nurse: '👨‍⚕️',
    doctor: '👨‍⚕️',
    admin: '💼',
    pharmacy: '💊'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="border w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 bg-white/60 backdrop-blur-md rounded-2xl p-6 border-[5px] border-black shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' className="w-16 h-16 drop-shadow-lg">
              <rect width='100' height='100' rx='20' fill='%232563eb'/>
              <path d='M30 50 L45 35 L60 50 L75 35' stroke='white' strokeWidth='6' fill='none' strokeLinecap='round' strokeLinejoin='round'/>
              <circle cx='50' cy='65' r='4' fill='white'/>
            </svg>
          </div>
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-3xl mb-6 shadow-2xl shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            <Activity className="w-12 h-12 text-white relative z-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-gray-900 mb-2 text-4xl font-bold tracking-tight">
            STRA<span className="text-blue-600">.</span>System
          </h1>
          <p className="text-gray-500 text-base font-medium">Smart Triage & Resource Allocation</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-gray-500/10 p-8 border-[5px] border-black hover:border-black hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-300 hover:scale-[1.01]">
          <div className="mb-8 pb-6 border-b-[5px] border-black">
            <h2 className="text-gray-900 text-2xl font-bold mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm">Sign in to continue to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">            {/* Credentials Section */}
            <div className="space-y-5 p-5 bg-gray-50/50 rounded-xl border-[5px] border-black">            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2.5">
                Username
              </label>
              <div className="relative">
                <UserIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedInput === 'username' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3.5 border-[5px] border-black rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2.5">
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedInput === 'password' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3.5 border-[5px] border-black rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>
            </div>
            </div>

            {/* Role Selection */}
            <div className="p-5 bg-blue-50/30 rounded-xl border-[5px] border-black">
              <label className="block text-gray-700 text-sm font-semibold mb-3">Select Role</label>
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
                    className={`py-3.5 px-4 rounded-xl border-[5px] transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2 ${
                      selectedRole === role.value
                        ? 'border-black bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-md shadow-blue-200/50 scale-105'
                        : 'border-black bg-white text-gray-700 hover:border-black hover:bg-gray-50 hover:scale-102'
                    }`}
                  >
                    <span className="text-lg">{roleIcons[role.value]}</span>
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-6 border-t-[5px] border-black">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
            </div>
          </form>

          {/* Additional Options */}
          <div className="mt-6 pt-6 flex items-center justify-between text-sm border-t-[5px] border-black">
            <button className="text-gray-500 hover:text-blue-600 transition-colors font-medium" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </button>
            <button className="text-blue-600 hover:text-blue-700 transition-colors font-semibold" onClick={(e) => e.preventDefault()}>
              Need help?
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-medium">
            &copy; 2026 STRA-System. Healthcare Innovation Platform
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Secure • Compliant • Trusted
          </p>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .hoverscale102:hover {
            transform: scale(1.02);
          }
          .border {
            border-radius: 2rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 60px rgba(59, 130, 246, 0.1);
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            transform: translateY(0px);
          }
          .border:hover {
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2), 0 0 80px rgba(59, 130, 246, 0.15);
            transform: translateY(-5px);
          }
        `}</style>
      </div>
    </div>
  );
}