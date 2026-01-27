import React, { useState } from 'react';
import NotificationButton from './common/NotificationButton';
import QueueManagement from './QueueManagement';
import { logout } from '../utils/logout';
import {
  FileText, Pill, TestTube, CheckCircle, Clock, User, Users,
  Heart, Activity, AlertCircle, Calendar, Phone, Mail,
  Thermometer, Droplet, Wind, Plus, X, Save,
  Printer, Send, Eye, ChevronRight
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

// Sidebar navigation items
const sidebarItems = [
  { id: 'queue', label: 'Queue Management', color: '#0d9488', border: '1px solid #14b8a6', background: '#f0fdfa' },
  { id: 'doctor', label: 'Patients', color: '#333', border: 'none', background: 'transparent' },
  { id: 'consultations', label: 'Consultations', color: '#333', border: 'none', background: 'transparent' },
  { id: 'appointments', label: 'Appointments', color: '#333', border: 'none', background: 'transparent' },
  { id: 'reports', label: 'Reports', color: '#333', border: 'none', background: 'transparent' },
  { id: 'prescriptions', label: 'Prescriptions', color: '#14b8a6', border: 'none', background: '#e0f7fa' },
  { id: 'logout', label: 'Logout', color: '#e11d48', border: 'none', background: '#fef2f2' }
];

export function DoctorPortal({ onNavigate }) {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);

  // Top bar component
  const TopBar = () => (
    <div className="doctor-dashboard-topbar">
      <span className="doctor-portal-title">
        Stra-Health Doctor Portal
      </span>
      <div className="topbar-actions">
        <button
          className="doctor-portal-action-btn"
          onClick={() => setShowPrescriptions(true)}
          aria-label="View prescriptions"
        >
          <Pill size={18} style={{ marginRight: '8px' }} />
          Prescriptions
        </button>
        <NotificationButton 
          onClick={() => alert('Notifications will appear here. (Backend integration pending)')}
          aria-label="Notifications"
        />
      </div>
    </div>
  );

  // Handle saving clinical notes
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // TODO: Implement actual save logic
      console.log('Saving clinical notes:', clinicalNotes);
      alert('Clinical notes saved successfully!');
    }, 1200);
  };

  // Navigation handler for sidebar
  const handleSidebarNav = (itemId) => {
    switch (itemId) {
      case 'queue':
      case 'doctor':
      case 'consultations':
      case 'appointments':
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

  // Render sidebar navigation items
  const renderSidebarItems = () => (
    <nav className="doctor-dashboard-nav">
      <ul className="sidebar-nav-list">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className="sidebar-nav-item"
            style={{
              color: item.color,
              border: item.border,
              background: item.background
            }}
            onClick={() => handleSidebarNav(item.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleSidebarNav(item.id)}
            aria-label={`Navigate to ${item.label}`}
          >
            <ChevronRight size={16} style={{ marginRight: '12px' }} />
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="doctor-dashboard-layout">
      <TopBar />
      <div className="doctor-dashboard-content-area">
        {/* Sidebar Dashboard */}
        <aside className="doctor-dashboard-sidebar" aria-label="Dashboard navigation">
          {renderSidebarItems()}
        </aside>

        {/* Main Content */}
        <main className="doctor-dashboard-main" role="main">
          {showPrescriptions ? (
            <div className="prescriptions-container">
              <button
                className="doctor-portal-action-btn secondary"
                onClick={() => setShowPrescriptions(false)}
                aria-label="Go back to dashboard"
              >
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '8px' }} />
                Back to Dashboard
              </button>
              <Prescriptions userRole="doctor" />
            </div>
          ) : (
            <div className="dashboard-content">
              <QueueManagement />
              
              {/* Optional: Patient Details Section */}
              <div className="patient-details-section" style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '16px', color: '#0d9488' }}>Selected Patient</h3>
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
              <div className="clinical-notes-section" style={{ marginTop: '24px' }}>
                <h3 style={{ marginBottom: '12px', color: '#0d9488' }}>Clinical Notes</h3>
                <textarea
                  className="clinical-notes-input"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Enter clinical notes here..."
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
                <div className="notes-actions" style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                  <button
                    className="doctor-portal-action-btn"
                    onClick={handleSave}
                    disabled={loading}
                    aria-label="Save clinical notes"
                  >
                    <Save size={16} style={{ marginRight: '8px' }} />
                    {loading ? 'Saving...' : 'Save Notes'}
                  </button>
                  <button
                    className="doctor-portal-action-btn secondary"
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
    </div>
  );
}