import React, { useState } from 'react';
import { BarChart3, Users, Clock, TrendingUp, Download, Calendar } from 'lucide-react';

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
    { dept: 'Emergency', patients: 1245, avgWait: 18, satisfaction: 87, trend: '+5%' },
    { dept: 'General Medicine', patients: 892, avgWait: 42, satisfaction: 82, trend: '+2%' },
    { dept: 'Pediatrics', patients: 654, avgWait: 35, satisfaction: 90, trend: '+8%' },
    { dept: 'Surgery', patients: 432, avgWait: 28, satisfaction: 85, trend: '+3%' },
    { dept: 'ICU', patients: 231, avgWait: 12, satisfaction: 88, trend: '+1%' }
  ],
  resourceUtilization: {
    beds: 68,
    staff: 82,
    equipment: 74
  },
  monthlyTrend: [
    { month: 'Jan', patients: 2800, completed: 2100, pending: 700 },
    { month: 'Feb', patients: 3200, completed: 2500, pending: 700 },
    { month: 'Mar', patients: 3654, completed: 2900, pending: 754 }
  ]
};

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('monthly');

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-teal-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-full">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Hospital performance metrics and insights</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
              <Calendar className="w-4 h-4 text-teal-600" />
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="text-sm font-medium text-gray-700 bg-transparent outline-none"
              >
                <option value="daily">Today</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
              </select>
            </div>
            <button className="p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-md">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Volume Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-teal-600" />
            Patient Volume
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Today', value: mockAnalytics.patientVolume.daily, icon: '📊' },
              { label: 'This Week', value: mockAnalytics.patientVolume.weekly, icon: '📈' },
              { label: 'This Month', value: mockAnalytics.patientVolume.monthly, icon: '📉' },
              { label: 'Growth', value: mockAnalytics.patientVolume.trend, icon: '⬆️' }
            ].map((stat, idx) => (
              <div key={idx} className="stat-card animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
                <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-xs text-green-600 font-semibold mt-2">patients</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wait Times Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-orange-600" />
            Average Wait Times by Urgency
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Critical (RED)', value: mockAnalytics.avgWaitTimes.red, unit: 'min', color: 'text-red-600', bg: 'bg-red-50', bar: 'bg-red-500' },
                { label: 'Urgent (YELLOW)', value: mockAnalytics.avgWaitTimes.yellow, unit: 'min', color: 'text-yellow-600', bg: 'bg-yellow-50', bar: 'bg-yellow-500' },
                { label: 'Non-Urgent (GREEN)', value: mockAnalytics.avgWaitTimes.green, unit: 'min', color: 'text-green-600', bg: 'bg-green-50', bar: 'bg-green-500' },
                { label: 'Overall Average', value: mockAnalytics.avgWaitTimes.overall, unit: 'min', color: 'text-teal-600', bg: 'bg-teal-50', bar: 'bg-teal-500' }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${item.bg} border border-gray-200`}>
                  <p className="text-xs text-gray-600 font-medium mb-2">{item.label}</p>
                  <p className={`text-3xl font-bold ${item.color} mb-2`}>{item.value}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.bar}`}
                      style={{width: `${(item.value / 60) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
            Department Performance
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patients</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Avg Wait</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Satisfaction</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockAnalytics.departmentStats.map((dept, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-teal-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{dept.dept}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{dept.patients}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-700">{dept.avgWait} min</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-400 to-green-600"
                              style={{width: `${dept.satisfaction}%`}}
                            ></div>
                          </div>
                          <span className="font-semibold text-gray-900">{dept.satisfaction}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          dept.trend.startsWith('+') 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {dept.trend.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                          <span>{dept.trend}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resource Utilization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Bed Occupancy', value: mockAnalytics.resourceUtilization.beds, icon: '🛏️', color: 'from-teal-500 to-teal-600' },
              { label: 'Staff Utilization', value: mockAnalytics.resourceUtilization.staff, icon: '👥', color: 'from-purple-500 to-purple-600' },
              { label: 'Equipment Usage', value: mockAnalytics.resourceUtilization.equipment, icon: '⚙️', color: 'from-green-500 to-green-600' }
            ].map((resource, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.label}</h3>
                  <span className="text-3xl">{resource.icon}</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">{resource.value}%</div>
                  <p className="text-sm text-gray-600 mt-1">utilization rate</p>
                </div>
                
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${resource.color}`}
                    style={{width: `${resource.value}%`}}
                  ></div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  {resource.value > 80 && (
                    <p className="text-sm text-amber-600 font-semibold">⚠️ High utilization - consider expansion</p>
                  )}
                  {resource.value <= 80 && (
                    <p className="text-sm text-green-600 font-semibold">✅ Optimal utilization levels</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Trend</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockAnalytics.monthlyTrend.map((month, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-4">{month.month}</p>
                  <div className="flex items-end justify-center space-x-2 h-40 mb-4">
                    {[
                      { value: month.patients, color: 'bg-teal-500', label: 'Total' },
                      { value: month.completed, color: 'bg-green-500', label: 'Completed' },
                      { value: month.pending, color: 'bg-orange-500', label: 'Pending' }
                    ].map((bar, barIdx) => (
                      <div key={barIdx} className="flex flex-col items-center">
                        <div 
                          className={`w-8 rounded-t-lg ${bar.color} transition-all hover:opacity-80`}
                          style={{height: `${(bar.value / Math.max(month.patients, month.completed) * 100)}%`}}
                          title={`${bar.label}: ${bar.value}`}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-3 text-xs">
                    <span className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-1"></span>Total</span>
                    <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Completed</span>
                    <span className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
