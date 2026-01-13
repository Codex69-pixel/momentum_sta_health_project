import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, AlertCircle, Download } from 'lucide-react';

const mockAnalytics = {
  patientVolume: {
    daily: 147,
    weekly: 892,
    monthly: 3654,
    trend: '+12%'
  },
  avgWaitTimes: {
    red: 8,
    yellow: 24,
    green: 58,
    overall: 35
  },
  departmentStats: [
    { dept: 'Emergency', patients: 1245, avgWait: 18, satisfaction: 87 },
    { dept: 'General Medicine', patients: 892, avgWait: 42, satisfaction: 82 },
    { dept: 'Pediatrics', patients: 654, avgWait: 35, satisfaction: 90 },
    { dept: 'Surgery', patients: 432, avgWait: 28, satisfaction: 85 },
    { dept: 'ICU', patients: 231, avgWait: 12, satisfaction: 88 }
  ],
  resourceUtilization: {
    beds: 68,
    staff: 82,
    equipment: 74
  }
};

export function AnalyticsDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2 text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-600">Hospital performance metrics and statistics</p>
      </div>

      {/* Patient Volume */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-4 text-lg font-semibold">Patient Volume</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-2">Today</div>
            <div className="text-gray-900 text-2xl font-bold">{mockAnalytics.patientVolume.daily}</div>
            <div className="text-gray-600 text-sm">patients</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-2">This Week</div>
            <div className="text-gray-900 text-2xl font-bold">{mockAnalytics.patientVolume.weekly}</div>
            <div className="text-gray-600 text-sm">patients</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-2">This Month</div>
            <div className="text-gray-900 text-2xl font-bold">{mockAnalytics.patientVolume.monthly}</div>
            <div className="text-gray-600 text-sm">patients</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-2">Avg per Day</div>
            <div className="text-gray-900 text-2xl font-bold">{Math.round(mockAnalytics.patientVolume.monthly / 30)}</div>
            <div className="text-gray-600 text-sm">patients</div>
          </div>
        </div>
      </div>

      {/* Average Wait Times */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-4 text-lg font-semibold">Average Wait Times by Urgency</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-gray-700">Critical (RED)</span>
                </div>
              </div>
              <div className="text-gray-900 text-2xl font-bold">{mockAnalytics.avgWaitTimes.red} min</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-gray-700">Urgent (YELLOW)</span>
                </div>
              </div>
              <div className="text-gray-900 text-2xl font-bold">{mockAnalytics.avgWaitTimes.yellow} min</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-700">Non-Urgent (GREEN)</span>
                </div>
              </div>
              <div className="text-gray-900 text-2xl font-bold">{mockAnalytics.avgWaitTimes.green} min</div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Overall Average</span>
              </div>
              <div className="text-gray-900 text-2xl font-bold mt-2">{mockAnalytics.avgWaitTimes.overall} min</div>
              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-4 text-lg font-semibold">Department Performance</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Department</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Patients</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Avg Wait</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAnalytics.departmentStats.map((dept, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{dept.dept}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{dept.patients}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{dept.avgWait} min</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      dept.satisfaction >= 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {dept.satisfaction}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resource Utilization */}
      <div>
        <h2 className="text-gray-900 mb-4 text-lg font-semibold">Resource Utilization Overview</h2>
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg shadow p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-6 h-6" />
                <span>Bed Utilization</span>
              </div>
              <div className="text-3xl font-bold mb-2">{mockAnalytics.resourceUtilization.beds}%</div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white"
                  style={{ width: `${mockAnalytics.resourceUtilization.beds}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-6 h-6" />
                <span>Staff Utilization</span>
              </div>
              <div className="text-3xl font-bold mb-2">{mockAnalytics.resourceUtilization.staff}%</div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white"
                  style={{ width: `${mockAnalytics.resourceUtilization.staff}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-6 h-6" />
                <span>Equipment Utilization</span>
              </div>
              <div className="text-3xl font-bold mb-2">{mockAnalytics.resourceUtilization.equipment}%</div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white"
                  style={{ width: `${mockAnalytics.resourceUtilization.equipment}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}