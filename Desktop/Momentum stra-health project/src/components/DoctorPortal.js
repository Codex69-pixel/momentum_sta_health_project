import React, { useState } from 'react';
import { 
  FileText, Pill, TestTube, CheckCircle, Clock, User, Users,
  Heart, Activity, AlertCircle, Calendar, Phone, Mail,
  Thermometer, Droplet, Wind, Plus, X, Save,
  Printer, Send, Eye, ChevronRight
} from 'lucide-react';

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

export function DoctorPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [clinicalNotes, setClinicalNotes] = useState('');

  const getUrgencyConfig = (urgency) => {
    switch (urgency) {
      case 'RED': 
        return { 
          bg: 'bg-red-50', 
          border: 'border-red-500', 
          text: 'text-red-700',
          badge: 'bg-red-500'
        };
      case 'YELLOW': 
        return { 
          bg: 'bg-yellow-50', 
          border: 'border-yellow-500', 
          text: 'text-yellow-700',
          badge: 'bg-yellow-500'
        };
      case 'GREEN': 
        return { 
          bg: 'bg-green-50', 
          border: 'border-green-500', 
          text: 'text-green-700',
          badge: 'bg-green-500'
        };
      default: 
        return { 
          bg: 'bg-gray-50', 
          border: 'border-gray-500', 
          text: 'text-gray-700',
          badge: 'bg-gray-500'
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(selectedPatient.urgency);

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-teal-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctor Portal</h1>
              <p className="text-gray-600 mt-1">Patient consultation and medical management</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-gray-700">Jan 17, 2026</span>
              </div>
              <button className="p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-md">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Patient Queue - Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-slideIn">
              <div className="p-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <h3 className="font-bold text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Patient Queue
                </h3>
                <p className="text-teal-100 text-sm mt-1">{mockPatients.length} patients waiting</p>
              </div>
              
              <div className="divide-y divide-gray-100 max-h-[calc(100vh-16rem)] overflow-y-auto">
                {mockPatients.map((patient, index) => {
                  const config = getUrgencyConfig(patient.urgency);
                  const isSelected = selectedPatient.id === patient.id;
                  
                  return (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`w-full p-4 text-left transition-all duration-200 hover:bg-gray-50 ${
                        isSelected ? 'bg-teal-50 border-l-4 border-teal-600' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-semibold truncate">{patient.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{patient.id}</p>
                        </div>
                        <span className={`${config.badge} text-white text-xs px-2 py-1 rounded-full font-bold ml-2`}>
                          {patient.urgency}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mt-3">
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          <span>{patient.waitTime} min</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-3.5 h-3.5 mr-1" />
                          <span>{patient.age}y, {patient.gender}</span>
                        </div>
                      </div>
                      
                      {patient.symptoms.length > 0 && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                            {patient.symptoms[0]}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - Patient Details */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Patient Header Card */}
            <div className={`bg-white rounded-2xl shadow-lg border-l-4 ${urgencyConfig.border} overflow-hidden animate-fadeIn`}>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {selectedPatient.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {selectedPatient.id}
                        </span>
                        <span>•</span>
                        <span>{selectedPatient.age} years, {selectedPatient.gender}</span>
                        <span>•</span>
                        <span className="font-semibold text-red-600">Blood: {selectedPatient.bloodType}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="flex items-center text-gray-600">
                          <Phone className="w-3.5 h-3.5 mr-1" />
                          {selectedPatient.phone}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <Mail className="w-3.5 h-3.5 mr-1" />
                          {selectedPatient.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`${urgencyConfig.badge} text-white px-4 py-2 rounded-full font-bold text-sm shadow-md`}>
                      {selectedPatient.urgency} PRIORITY
                    </span>
                    <span className="text-sm text-gray-600">
                      Waiting: {selectedPatient.waitTime} minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Signs Card */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Temperature', value: selectedPatient.vitals.temperature, icon: Thermometer, color: 'text-red-600', bg: 'bg-red-50' },
                { label: 'Heart Rate', value: selectedPatient.vitals.heartRate, icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' },
                { label: 'BP', value: selectedPatient.vitals.bloodPressure, icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50' },
                { label: 'SpO₂', value: selectedPatient.vitals.spo2, icon: Droplet, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                { label: 'Resp. Rate', value: selectedPatient.vitals.respiratoryRate, icon: Wind, color: 'text-teal-600', bg: 'bg-teal-50' }
              ].map((vital, index) => (
                <div key={index} className="stat-card animate-fadeIn" style={{animationDelay: `${index * 50}ms`}}>
                  <div className={`${vital.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                    <vital.icon className={`w-6 h-6 ${vital.color}`} />
                  </div>
                  <p className="text-xs text-gray-600 font-medium mb-1">{vital.label}</p>
                  <p className="text-lg font-bold text-gray-900">{vital.value}</p>
                </div>
              ))}
            </div>

            {/* Main Content Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                {[
                  { id: 'overview', label: 'Overview', icon: FileText },
                  { id: 'orders', label: 'Lab & Imaging', icon: TestTube },
                  { id: 'prescription', label: 'Prescriptions', icon: Pill }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-4 font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-teal-600 bg-white border-b-2 border-teal-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Chief Complaints */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                        Chief Complaints
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.symptoms.map((symptom, idx) => (
                          <span key={idx} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium border border-orange-200">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Medical History */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Medical History</h4>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedPatient.history}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Allergies</h4>
                        <div className="space-y-2">
                          {selectedPatient.allergies.map((allergy, idx) => (
                            <div key={idx} className="flex items-center space-x-2 bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
                              <AlertCircle className="w-4 h-4" />
                              <span className="font-medium">{allergy}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Current Medications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Current Medications</h4>
                      <div className="space-y-2">
                        {selectedPatient.currentMedications.length > 0 ? (
                          selectedPatient.currentMedications.map((med, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-teal-50 p-3 rounded-lg border border-teal-200">
                              <span className="text-teal-900 font-medium">{med}</span>
                              <Pill className="w-4 h-4 text-teal-600" />
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm italic">No current medications</p>
                        )}
                      </div>
                    </div>

                    {/* Clinical Notes */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        Clinical Notes
                      </label>
                      <textarea
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                        placeholder="Enter diagnosis, observations, and treatment plan..."
                        className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all resize-none"
                      />
                      <div className="flex justify-end mt-3 space-x-2">
                        <button className="btn btn-secondary">
                          <X className="w-4 h-4" />
                          Clear
                        </button>
                        <button className="btn btn-primary">
                          <Save className="w-4 h-4" />
                          Save Notes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Laboratory Tests */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <TestTube className="w-5 h-5 mr-2 text-teal-600" />
                        Laboratory Tests
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {['Complete Blood Count (CBC)', 'Lipid Panel', 'Liver Function Test', 'Kidney Function Test', 
                          'Thyroid Panel', 'Blood Glucose', 'Electrolyte Panel', 'Urinalysis'].map((test, idx) => (
                          <label key={idx} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-teal-50 hover:border-teal-300 cursor-pointer transition-all group">
                            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            <span className="text-gray-900 font-medium group-hover:text-blue-900">{test}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Imaging */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-purple-600" />
                        Imaging Studies
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {['Chest X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'ECG', 'Echocardiogram'].map((imaging, idx) => (
                          <label key={idx} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all group">
                            <input type="checkbox" className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500" />
                            <span className="text-gray-900 font-medium group-hover:text-purple-900">{imaging}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button className="btn btn-secondary">
                        Cancel
                      </button>
                      <button className="btn btn-primary">
                        <Send className="w-4 h-4" />
                        Submit Orders
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'prescription' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Pill className="w-5 h-5 mr-2 text-green-600" />
                        New Prescription
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="input-label">Medication Name</label>
                          <input
                            type="text"
                            placeholder="Search medication..."
                            className="input-field"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">Dosage</label>
                            <input
                              type="text"
                              placeholder="e.g., 500mg"
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="input-label">Form</label>
                            <select className="input-field">
                              <option>Tablet</option>
                              <option>Capsule</option>
                              <option>Syrup</option>
                              <option>Injection</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">Frequency</label>
                            <select className="input-field">
                              <option>Once daily</option>
                              <option>Twice daily</option>
                              <option>Three times daily</option>
                              <option>Four times daily</option>
                              <option>As needed</option>
                            </select>
                          </div>
                          <div>
                            <label className="input-label">Duration</label>
                            <input
                              type="text"
                              placeholder="e.g., 7 days"
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="input-label">Special Instructions</label>
                          <textarea
                            placeholder="e.g., Take with food, Avoid alcohol..."
                            className="input-field"
                            rows="2"
                          />
                        </div>

                        <button className="btn btn-success w-full">
                          <Plus className="w-4 h-4" />
                          Add to Prescription
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button className="btn btn-secondary">
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button className="btn btn-primary">
                        <Printer className="w-4 h-4" />
                        Generate & Print
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn btn-success py-4 text-base">
                <CheckCircle className="w-5 h-5" />
                Mark Complete
              </button>
              <button className="btn btn-primary py-4 text-base">
                <ChevronRight className="w-5 h-5" />
                Transfer to Ward
              </button>
              <button className="btn btn-secondary py-4 text-base">
                <Send className="w-5 h-5" />
                Discharge Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
