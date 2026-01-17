import React, { useState } from 'react';
import { Activity, Lock, User as UserIcon, Eye, EyeOff, Heart, Stethoscope, Pill, Shield, ChevronRight, Check } from 'lucide-react';

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('nurse');
  const [focusedInput, setFocusedInput] = useState(null);
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

  const roleConfig = {
    nurse: { 
      icon: Stethoscope, 
      label: 'Nurse',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-500'
    },
    doctor: { 
      icon: Heart, 
      label: 'Doctor',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-500'
    },
    admin: { 
      icon: Shield, 
      label: 'Admin',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500'
    },
    pharmacy: { 
      icon: Pill, 
      label: 'Pharmacy',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{animationDelay: '4s'}}></div>
        
        {/* Decorative medical icons */}
        <div className="absolute top-20 left-20 opacity-5">
          <Heart className="w-32 h-32 text-teal-400" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5">
          <Activity className="w-32 h-32 text-teal-300" />
        </div>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-6xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="hidden md:flex flex-col justify-center space-y-8 p-8 text-white">
          {/* Logo & Brand */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mb-6 backdrop-blur-xl">
              <Activity className="w-8 h-8 text-teal-300" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
              Hong Kong
            </h1>
            <p className="text-lg text-teal-100 font-medium">Emergency & General Hospital</p>
          </div>

          {/* Features List */}
          <div className="space-y-6 animate-slideIn">
            <div className="flex items-start space-x-4">
              <Heart className="w-6 h-6 text-teal-300 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Smart Patient Care</h3>
                <p className="text-teal-100 text-sm">Intelligent triage & resource allocation</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Stethoscope className="w-6 h-6 text-teal-300 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Real-time Management</h3>
                <p className="text-teal-100 text-sm">Live queue monitoring & alerts</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 text-teal-300 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure & Compliant</h3>
                <p className="text-teal-100 text-sm">HIPAA compliant & encrypted</p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center space-x-6 text-sm text-teal-200 pt-8 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-teal-300" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-teal-300" />
              <span>Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto md:mx-0 animate-fadeIn" style={{animationDelay: '200ms'}}>
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl mb-3 shadow-lg">
                <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">STRA-Health</h2>
            </div>

            {/* Form Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username Input */}
              <div className="input-group">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <div className="relative">
                  <div className="input-icon">
                    <UserIcon className={`w-5 h-5 transition-colors duration-200 ${
                      focusedInput === 'username' ? 'text-teal-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="doctor@hkgeneral.com"
                    className="input-field input-with-icon focus:border-teal-500 focus:ring-teal-500"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="relative">
                  <div className="input-icon">
                    <Lock className={`w-5 h-5 transition-colors duration-200 ${
                      focusedInput === 'password' ? 'text-teal-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="••••••••"
                    className="input-field input-with-icon focus:border-teal-500 focus:ring-teal-500"
                    style={{paddingRight: '2.75rem'}}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button type="button" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Role Selection */}
              <div>
                <label className="input-label mb-3">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(roleConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    const isSelected = selectedRole === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedRole(key)}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? `${config.borderColor} ${config.bgColor} shadow-md scale-105`
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center shadow-sm`}>
                            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                          </div>
                          <span className={`text-sm font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {config.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <span>Sign In</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Don't have an account? <button className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">Contact Admin</button></p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center text-xs text-teal-200">
            <p>&copy; 2026 STRA-Health Medical System</p>
            <p className="mt-1">Secure • Trusted • Compliant</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}
