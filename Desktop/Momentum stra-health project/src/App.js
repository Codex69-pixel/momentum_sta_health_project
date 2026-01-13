import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { NurseTriage } from './components/NurseTriage';
import { QueueManagement } from './components/QueueManagement';
import { ResourceDashboard } from './components/ResourceDashboard';
import { DoctorPortal } from './components/DoctorPortal';
import { InventoryManagement } from './components/InventoryManagement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Navigation } from './components/Navigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'nurse') {
      setCurrentScreen('nurse');
    } else if (userData.role === 'doctor') {
      setCurrentScreen('doctor');
    } else if (userData.role === 'pharmacy') {
      setCurrentScreen('inventory');
    } else {
      setCurrentScreen('resources');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  if (currentScreen === 'login' || !user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="pt-16">
        {currentScreen === 'nurse' && <NurseTriage />}
        {currentScreen === 'queue' && <QueueManagement />}
        {currentScreen === 'resources' && <ResourceDashboard />}
        {currentScreen === 'doctor' && <DoctorPortal />}
        {currentScreen === 'inventory' && <InventoryManagement />}
        {currentScreen === 'analytics' && <AnalyticsDashboard />}
      </main>
    </div>
  );
}