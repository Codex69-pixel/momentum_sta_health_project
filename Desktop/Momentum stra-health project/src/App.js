import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { NurseTriage } from './components/NurseTriage';
import { QueueManagement } from './components/QueueManagement';
import { ResourceDashboard } from './components/ResourceDashboard';
import { DoctorPortal } from './components/DoctorPortal';
import { InventoryManagement } from './components/InventoryManagement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <TopBar 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        user={user}
        onLogout={handleLogout}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-auto w-full bg-gray-50">
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