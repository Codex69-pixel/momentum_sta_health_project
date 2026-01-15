import React, { useState } from 'react';
import { FileText, Pill, TestTube, CheckCircle, Clock } from 'lucide-react';

const mockPatients = [
  {
    id: 'STRA-001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    urgency: 'RED',
    waitTime: 5,
    symptoms: ['Chest Pain', 'Shortness of Breath', 'Dizziness'],
    history: 'Hypertension, Type 2 Diabetes'
  },
  {
    id: 'STRA-002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    urgency: 'YELLOW',
    waitTime: 15,
    symptoms: ['Headache', 'Fever'],
    history: 'None'
  }
];

export function DoctorPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'RED': return 'bg-red-500';
      case 'YELLOW': return 'bg-yellow-500';
      case 'GREEN': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2 text-2xl font-bold">Doctor Portal</h1>
        <p className="text-gray-600">Patient queue and medical management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Queue */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-gray-900 font-semibold">Patient Queue</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {mockPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedPatient.id === patient.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900 font-semibold">{patient.name}</p>
                      <p className="text-gray-600 text-sm">{patient.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-white text-xs font-bold ${getUrgencyColor(patient.urgency)}`}>
                      {patient.urgency}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {patient.waitTime} min
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-gray-900 font-semibold">Patient Information</h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 text-sm">Patient ID</label>
                  <p className="text-gray-900 font-semibold">{selectedPatient.id}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Name</label>
                  <p className="text-gray-900 font-semibold">{selectedPatient.name}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Age</label>
                  <p className="text-gray-900 font-semibold">{selectedPatient.age} years</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Gender</label>
                  <p className="text-gray-900 font-semibold">{selectedPatient.gender}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-gray-600 text-sm">Chief Complaints</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPatient.symptoms.map((symptom) => (
                    <span key={symptom} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-gray-600 text-sm">Medical History</label>
                <p className="text-gray-900 mt-2">{selectedPatient.history}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="inline w-4 h-4 mr-1" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeTab === 'orders'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TestTube className="inline w-4 h-4 mr-1" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('prescription')}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeTab === 'prescription'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Pill className="inline w-4 h-4 mr-1" />
                  Prescription
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Clinical Notes</label>
                      <textarea
                        placeholder="Enter clinical observations, diagnosis, and treatment plan..."
                        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-900 mb-3 font-semibold">Laboratory Tests</h3>
                      <div className="space-y-2">
                        {['Complete Blood Count (CBC)', 'Lipid Panel', 'Liver Function Test', 'Kidney Function Test'].map((test) => (
                          <label key={test} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-900">{test}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-900 mb-3 font-semibold">Imaging</h3>
                      <div className="space-y-2">
                        {['Chest X-Ray', 'CT Scan', 'MRI', 'Ultrasound'].map((imaging) => (
                          <label key={imaging} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-900">{imaging}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <TestTube className="inline w-5 h-5 mr-2" />
                      Submit Orders
                    </button>
                  </div>
                )}

                {activeTab === 'prescription' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-900 mb-3 font-semibold">Medication Search</h3>
                      <input
                        type="text"
                        placeholder="Search medication..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Dose</label>
                      <input
                        type="text"
                        placeholder="e.g., 500mg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Frequency</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Once daily</option>
                          <option>Twice daily</option>
                          <option>Three times daily</option>
                          <option>As needed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g., 7 days"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Pill className="inline w-5 h-5 mr-2" />
                      Generate Prescription
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 flex items-center space-x-3">
              <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <CheckCircle className="inline w-5 h-5 mr-2" />
                Mark as Complete
              </button>
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Transfer to Ward
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Discharge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}