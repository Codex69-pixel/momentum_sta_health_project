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
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Top bar content (can be customized)
  const TopBar = () => (
    <div className="doctor-dashboard-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#14b8a6' }}>
        Stra-Health Doctor Portal
      </span>
      <NotificationButton onClick={() => alert('Notifications will appear here. (Backend integration pending)')} />
    </div>
  );

  // Example: Simulate loading on save
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // ...save logic...
    }, 1200);
  };

  // Navigation handler for sidebar
  const handleSidebarNav = (screen) => {
    if (onNavigate) onNavigate(screen);
  };

  return (
    <div className="doctor-dashboard-layout">
      <TopBar />
      <div className="doctor-dashboard-content-area">
        {/* Sidebar Dashboard */}
        <aside className="doctor-dashboard-sidebar">
          <nav style={{ flex: 1, padding: '24px 0', marginTop: '64px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li
                style={{ padding: '12px 32px', cursor: 'pointer', color: '#0d9488', fontWeight: 500, borderRadius: '8px', marginBottom: '8px', border: '1px solid #14b8a6', background: '#f0fdfa' }}
                onClick={() => handleSidebarNav('queue')}
              >
                Queue Management
              </li>
              <li
                style={{ padding: '16px 32px', cursor: 'pointer', color: '#333', fontWeight: 500, borderRadius: '8px', marginBottom: '8px' }}
                onClick={() => handleSidebarNav('doctor')}
              >
                Patients
              </li>
              <li
                style={{ padding: '16px 32px', cursor: 'pointer', color: '#333', fontWeight: 500, borderRadius: '8px', marginBottom: '8px' }}
                onClick={() => handleSidebarNav('consultations')}
              >
                Consultations
              </li>
              <li
                style={{ padding: '16px 32px', cursor: 'pointer', color: '#333', fontWeight: 500, borderRadius: '8px', marginBottom: '8px' }}
                onClick={() => handleSidebarNav('appointments')}
              >
                Appointments
              </li>
              <li
                style={{ padding: '16px 32px', cursor: 'pointer', color: '#333', fontWeight: 500, borderRadius: '8px', marginBottom: '8px' }}
                onClick={() => handleSidebarNav('reports')}
              >
                Reports
              </li>
              <li
                style={{ padding: '16px 32px', cursor: 'pointer', color: '#e11d48', fontWeight: 500, borderRadius: '8px', marginBottom: '8px', background: '#fef2f2' }}
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="doctor-dashboard-main">
          <div className="main-placeholder" style={{ color: '#333', fontWeight: 500, fontSize: '1.2rem' }}>
            <QueueManagement />
          </div>
          {/* Loading Spinner Example */}
          {loading && <LoadingSpinner text="Saving..." fullScreen />}
        </main>
      </div>
    </div>
  );
}
