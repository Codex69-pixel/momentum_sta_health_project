import React, { useState } from 'react';
import NotificationButton from './common/NotificationButton';
import QueueManagement from './QueueManagement';
import { logout } from '../utils/logout';
import {
  FileText, Pill, TestTube, CheckCircle, Clock, User, Users,
  Heart, Activity, AlertCircle, Calendar, Phone, Mail,
  Thermometer, Droplet, Wind, Plus, X, Save,
  Printer, Send, Eye, ChevronRight, ChevronDown,
  Home, BarChart3, Package, LogOut, Search,
  Settings, Clipboard, Stethoscope, Bell, Menu, X as XIcon
} from 'lucide-react';
import './DoctorPortal.css';
import LoadingSpinner from './common/LoadingSpinner';
import Prescriptions from './prescription';

// Define patient type for better type safety
const PatientStatus = {
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN'
};

const mockPatients = [
  {
    id: 'STRA-001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    urgency: 'RED',
    waitTime: 5,
    symptoms: ['Chest Pain', 'Shortness of Breath', 'Dizziness'],
    history: 'Hypertension, Type 2 Diabetes',
    bloodType: 'O+',
    phone: '+254 712 345 678',
    email: 'john.doe@email.com',
    admissionDate: '2026-01-17',
    vitals: {
      temperature: '38.5°C',
      heartRate: '95 bpm',
      bloodPressure: '145/95',
      spo2: '97%',
      respiratoryRate: '20/min'
    },
    allergies: ['Penicillin', 'Aspirin'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg']
  },
  {
    id: 'STRA-002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    urgency: 'YELLOW',
    waitTime: 15,
    symptoms: ['Headache', 'Fever', 'Fatigue'],
    history: 'Asthma',
    bloodType: 'A+',
    phone: '+254 723 456 789',
    email: 'jane.smith@email.com',
    admissionDate: '2026-01-17',
    vitals: {
      temperature: '37.8°C',
      heartRate: '82 bpm',
      bloodPressure: '120/80',
      spo2: '98%',
      respiratoryRate: '16/min'
    },
    allergies: ['None'],
    currentMedications: ['Ventolin Inhaler']
  },
  {
    id: 'STRA-003',
    name: 'Michael Johnson',
    age: 28,
    gender: 'Male',
    urgency: 'GREEN',
    waitTime: 30,
    symptoms: ['Minor Cut', 'Bruising'],
    history: 'None',
    bloodType: 'B+',
    phone: '+254 734 567 890',
    email: 'michael.j@email.com',
    admissionDate: '2026-01-17',
    vitals: {
      temperature: '36.6°C',
      heartRate: '72 bpm',
      bloodPressure: '118/75',
      spo2: '99%',
      respiratoryRate: '14/min'
    },
    allergies: ['None'],
    currentMedications: []
  }
];

export function DoctorPortal({ onNavigate }) {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Navigation handler
  const handleNavigation = (itemId) => {
    setShowUserMenu(false);
    switch (itemId) {
      case 'queue':
      case 'doctor':
      case 'reports':
        if (onNavigate) onNavigate(itemId);
        break;
      case 'prescriptions':
        setShowPrescriptions(true);
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  };

  // TopBar Component
  const TopBar = () => (
    <header className="doctor-portal-topbar">
      <div className="doctor-portal-topbar-content">
        {/* Logo/Brand */}
        <div className="doctor-brand-section">
          <div className="doctor-brand-logo">
            <Stethoscope size={28} />
          </div>
          <div>
            <h1 className="doctor-brand-title">Stra-Health Doctor Portal</h1>
            <p className="doctor-brand-subtitle">Patient Management System</p>
          </div>
        </div>

        {/* Right Side Actions - Notification and User Menu */}
        <div className="doctor-right-actions">
          <NotificationButton 
            onClick={() => alert('Notifications will appear here. (Backend integration pending)')}
            aria-label="View notifications"
            className="doctor-notification-btn"
          />
          
          {/* User Menu */}
          <div className="doctor-user-menu-container">
            <button
              className="doctor-user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              <div className="doctor-user-avatar">
                <User size={20} />
              </div>
              <ChevronDown className={`doctor-chevron ${showUserMenu ? 'rotated' : ''}`} size={16} />
            </button>

            {showUserMenu && (
              <>
                <div 
                  className="doctor-dropdown-backdrop" 
                  onClick={() => setShowUserMenu(false)}
                  aria-hidden="true"
                />
                <div className="doctor-user-dropdown">
                  <div className="doctor-user-info">
                    <div className="doctor-user-avatar large">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="doctor-user-name">Dr. Sarah Johnson</p>
                      <p className="doctor-user-role">Senior Physician</p>
                    </div>
                  </div>
                  
                  <div className="doctor-dropdown-divider" />
                  
                  <button
                    onClick={() => handleNavigation('queue')}
                    className="doctor-dropdown-item"
                    aria-label="Queue Management"
                  >
                    <Users size={18} />
                    <span>Queue Management</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('doctor')}
                    className="doctor-dropdown-item"
                    aria-label="Patient Dashboard"
                  >
                    <Activity size={18} />
                    <span>Patient Dashboard</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowPrescriptions(true);
                      setShowUserMenu(false);
                    }}
                    className="doctor-dropdown-item"
                    aria-label="Prescriptions"
                  >
                    <FileText size={18} />
                    <span>Prescriptions</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('reports')}
                    className="doctor-dropdown-item"
                    aria-label="Reports"
                  >
                    <Clipboard size={18} />
                    <span>Reports</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      // Navigate to home if needed
                      window.location.href = '/';
                    }}
                    className="doctor-dropdown-item"
                    aria-label="Home"
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </button>
                  
                  <div className="doctor-dropdown-divider" />
                  
                  <button
                    onClick={() => handleNavigation('logout')}
                    className="doctor-dropdown-item logout"
                    aria-label="Logout"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  // Handle saving clinical notes
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Saving clinical notes:', clinicalNotes);
      alert('Clinical notes saved successfully!');
    }, 1200);
  };

  return (
    <div className="doctor-portal-layout">
      <TopBar />
      
      {/* Main Content */}
      <main className="doctor-portal-main" role="main">
        {showPrescriptions ? (
          <div className="prescriptions-container">
            <button
              className="doctor-action-btn secondary"
              onClick={() => setShowPrescriptions(false)}
              aria-label="Go back to dashboard"
            >
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '8px' }} />
              Back to Dashboard
            </button>
            <Prescriptions userRole="doctor" />
          </div>
        ) : (
          <div className="doctor-dashboard-content">
            <QueueManagement />
            
            {/* Optional: Patient Details Section */}
            <div className="patient-details-section">
              <h3>Selected Patient</h3>
              <div className="patient-info-grid">
                <div className="patient-info-item">
                  <User size={16} />
                  <span>{selectedPatient.name}</span>
                </div>
                <div className="patient-info-item">
                  <Activity size={16} />
                  <span>Vitals: {selectedPatient.vitals.heartRate}, {selectedPatient.vitals.bloodPressure}</span>
                </div>
                <div className="patient-info-item">
                  <AlertCircle size={16} />
                  <span>Symptoms: {selectedPatient.symptoms.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Clinical Notes Section */}
            <div className="clinical-notes-section">
              <h3>Clinical Notes</h3>
              <textarea
                className="clinical-notes-input"
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Enter clinical notes here..."
                rows={4}
              />
              <div className="notes-actions">
                <button
                  className="doctor-action-btn"
                  onClick={handleSave}
                  disabled={loading}
                  aria-label="Save clinical notes"
                >
                  <Save size={16} style={{ marginRight: '8px' }} />
                  {loading ? 'Saving...' : 'Save Notes'}
                </button>
                <button
                  className="doctor-action-btn secondary"
                  onClick={() => setClinicalNotes('')}
                  aria-label="Clear notes"
                >
                  <X size={16} style={{ marginRight: '8px' }} />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
        
        {loading && <LoadingSpinner text="Saving..." fullScreen />}
      </main>
    </div>
  );
}