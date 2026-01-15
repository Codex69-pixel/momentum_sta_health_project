import React from 'react';
import { Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';

const mockQueues = [
  {
    department: 'Emergency',
    patients: [
      { id: 'STRA-001', name: 'John Doe', urgency: 'RED', position: 1, waitTime: 5, status: 'IN_PROGRESS' },
      { id: 'STRA-002', name: 'Jane Smith', urgency: 'YELLOW', position: 2, waitTime: 15, status: 'WAITING' },
      { id: 'STRA-003', name: 'Bob Johnson', urgency: 'GREEN', position: 3, waitTime: 45, status: 'WAITING' }
    ]
  },
  {
    department: 'General Medicine',
    patients: [
      { id: 'STRA-004', name: 'Alice Brown', urgency: 'YELLOW', position: 1, waitTime: 10, status: 'IN_PROGRESS' },
      { id: 'STRA-005', name: 'Charlie Wilson', urgency: 'GREEN', position: 2, waitTime: 30, status: 'WAITING' },
      { id: 'STRA-006', name: 'Diana Miller', urgency: 'GREEN', position: 3, waitTime: 50, status: 'WAITING' }
    ]
  },
  {
    department: 'Pediatrics',
    patients: [
      { id: 'STRA-007', name: 'Emma Davis', urgency: 'YELLOW', position: 1, waitTime: 8, status: 'WAITING' },
      { id: 'STRA-008', name: 'Frank Thomas', urgency: 'GREEN', position: 2, waitTime: 25, status: 'WAITING' }
    ]
  }
];

export function QueueManagement() {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'RED': return 'bg-red-100 text-red-700';
      case 'YELLOW': return 'bg-yellow-100 text-yellow-700';
      case 'GREEN': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalPatients = mockQueues.reduce((sum, dept) => sum + dept.patients.length, 0);
  const criticalPatients = mockQueues.reduce((sum, dept) => 
    sum + dept.patients.filter(p => p.urgency === 'RED').length, 0
  );
  const avgWaitTime = Math.round(
    mockQueues.reduce((sum, dept) => 
      sum + dept.patients.reduce((s, p) => s + p.waitTime, 0), 0
    ) / totalPatients
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2 text-2xl font-bold">Queue Management</h1>
        <p className="text-gray-600">Real-time patient queue across all departments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Patients</p>
              <p className="text-gray-900 text-2xl font-bold">{totalPatients}</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Critical Cases</p>
              <p className="text-gray-900 text-2xl font-bold">{criticalPatients}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Avg Wait Time</p>
              <p className="text-gray-900 text-2xl font-bold">{avgWaitTime} min</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Departments</p>
              <p className="text-gray-900 text-2xl font-bold">{mockQueues.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {mockQueues.map((queue) => (
          <div key={queue.department} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-900 text-lg font-semibold">{queue.department}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {queue.patients.length} patients
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Position</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">STRA-ID</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Patient Name</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Urgency</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Wait Time</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {queue.patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="text-gray-900 font-semibold">{patient.position}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-blue-600 font-medium">{patient.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900">{patient.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(patient.urgency)}`}>
                            {patient.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <Clock className="inline w-4 h-4 mr-1" />
                          {patient.waitTime} min
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={patient.status}
                            onChange={(e) => {
                              // Handle status change
                              console.log(`Changed ${patient.id} status to ${e.target.value}`);
                            }}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="WAITING">Waiting</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}