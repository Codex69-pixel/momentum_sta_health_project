import React, { useState } from 'react';
import {
  Users, Bed, Cpu, CheckCircle, AlertTriangle,
  Download, Settings, AlertCircle
} from 'lucide-react';

export function ResourceDashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [view, setView] = useState('overview');

  const resources = {
    beds: {
      total: 120,
      occupied: 87,
      available: 33,
      trend: '+5%',
      units: [
        { name: 'ICU', total: 12, occupied: 11, status: 'critical' },
        { name: 'General Ward', total: 60, occupied: 42, status: 'optimal' },
        { name: 'Maternity', total: 20, occupied: 15, status: 'optimal' },
        { name: 'Pediatrics', total: 15, occupied: 10, status: 'optimal' },
        { name: 'Surgery', total: 13, occupied: 9, status: 'optimal' }
      ]
    },
    staff: {
      total: 156,
      available: 142,
      onLeave: 8,
      sick: 6,
      trend: '-2%',
      byRole: [
        { role: 'Doctors', total: 34, available: 31, onDuty: 12 },
        { role: 'Nurses', total: 78, available: 72, onDuty: 58 },
        { role: 'Technicians', total: 28, available: 27, onDuty: 10 },
        { role: 'Support Staff', total: 16, available: 12, onDuty: 8 }
      ]
    },
    equipment: {
      total: 245,
      operational: 238,
      maintenance: 5,
      broken: 2,
      trend: '+1%',
      byType: [
        { name: 'Ventilators', total: 15, operational: 14, maintenance: 1 },
        { name: 'ECG Machines', total: 18, operational: 18, maintenance: 0 },
        { name: 'IV Pumps', total: 45, operational: 43, maintenance: 2 },
        { name: 'Monitors', total: 92, operational: 90, maintenance: 2 },
        { name: 'Wheelchairs', total: 35, operational: 34, maintenance: 1 },
        { name: 'Oxygen Tanks', total: 40, operational: 39, maintenance: 1 }
      ]
    }
  };

  const scheduleAlerts = [
    { id: 1, type: 'shift', title: 'Evening Shift - 3 Vacancies', dept: 'Emergency', time: 'Today 6 PM', severity: 'high' },
    { id: 2, type: 'equipment', title: 'Ventilator #5 Maintenance Due', dept: 'ICU', time: 'Tomorrow', severity: 'medium' },
    { id: 3, type: 'staff', title: 'Dr. Kariuki - Sick Leave', dept: 'Cardiology', time: 'Today', severity: 'low' },
    { id: 4, type: 'bed', title: 'ICU Bed Occupancy at 92%', dept: 'ICU', time: 'Current', severity: 'high' }
  ];

  const schedules = [
    { date: '2024-01-15', shift: 'Morning', staff: 45, dept: 'All', occupancy: '72%' },
    { date: '2024-01-15', shift: 'Afternoon', staff: 42, dept: 'All', occupancy: '78%' },
    { date: '2024-01-15', shift: 'Night', staff: 38, dept: 'All', occupancy: '68%' },
    { date: '2024-01-16', shift: 'Morning', staff: 45, dept: 'All', occupancy: '70%' },
  ];

  const departments = [
    { name: 'Emergency', occupancy: 85, staff: 28, critical: 3 },
    { name: 'ICU', occupancy: 92, staff: 18, critical: 8 },
    { name: 'General Ward', occupancy: 70, staff: 35, critical: 0 },
    { name: 'Cardiology', occupancy: 75, staff: 12, critical: 2 },
    { name: 'Pediatrics', occupancy: 67, staff: 15, critical: 0 }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-teal-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Hospital Resources</h1>
              <p className="text-gray-600">Real-time staff, bed, and equipment management</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="btn btn-secondary flex items-center gap-2">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8 flex gap-2">
          {['today', 'week', 'month'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Beds */}
          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <Bed className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-bold text-green-600">{resources.beds.trend}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hospital Beds</h3>
            <p className="text-3xl font-bold text-blue-600 mb-3">{resources.beds.occupied}/{resources.beds.total}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-2.5 rounded-full transition-all"
                style={{width: `${(resources.beds.occupied/resources.beds.total)*100}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{resources.beds.available} beds available</p>
          </div>

          {/* Staff */}
          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
              <span className="text-sm font-bold text-red-600">{resources.staff.trend}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Staff Available</h3>
            <p className="text-3xl font-bold text-emerald-600 mb-3">{resources.staff.available}/{resources.staff.total}</p>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-600"><span className="font-bold text-orange-600">{resources.staff.onLeave}</span> on leave</span>
              <span className="text-gray-600"><span className="font-bold text-red-600">{resources.staff.sick}</span> sick</span>
            </div>
          </div>

          {/* Equipment */}
          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-bold text-green-600">{resources.equipment.trend}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Equipment Status</h3>
            <p className="text-3xl font-bold text-purple-600 mb-3">{resources.equipment.operational}/{resources.equipment.total}</p>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-600"><span className="font-bold text-orange-600">{resources.equipment.maintenance}</span> maintenance</span>
              <span className="text-gray-600"><span className="font-bold text-red-600">{resources.equipment.broken}</span> broken</span>
            </div>
          </div>
        </div>

        {/* Alerts & Warnings */}
        {scheduleAlerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {scheduleAlerts.map(alert => {
              const severityColors = {
                high: 'from-red-50 border-red-200 bg-red-50',
                medium: 'from-yellow-50 border-yellow-200 bg-yellow-50',
                low: 'from-teal-50 border-teal-200 bg-teal-50'
              };
              const iconColors = {
                high: 'text-red-600',
                medium: 'text-yellow-600',
                low: 'text-blue-600'
              };
              const Icon = alert.severity === 'high' ? AlertTriangle : AlertCircle;
              
              return (
                <div key={alert.id} className={`border-2 ${severityColors[alert.severity]} rounded-xl p-4`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-1 ${iconColors[alert.severity]}`} />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{alert.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <span className="font-medium">{alert.dept}</span>
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b-2 border-gray-200">
          <div className="flex gap-4">
            {['overview', 'beds', 'staff', 'equipment'].map(tab => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-4 py-3 font-bold border-b-4 transition-all capitalize ${
                  view === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {view === 'overview' && (
          <div className="space-y-6">
            {/* Department Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Department Status</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map(dept => (
                  <div key={dept.name} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-gray-900">{dept.name}</h3>
                      {dept.critical > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg">
                          {dept.critical} Critical
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Bed Occupancy</span>
                          <span className="font-bold text-gray-900">{dept.occupancy}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              dept.occupancy > 85 ? 'bg-red-500' : dept.occupancy > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{width: `${dept.occupancy}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Staff On Duty</span>
                        <span className="font-bold text-gray-900">{dept.staff}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Shift</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Staff Assigned</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Occupancy Rate</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((schedule, idx) => (
                        <tr key={idx} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-lg text-sm font-medium">{schedule.shift}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-medium">{schedule.date}</td>
                          <td className="px-6 py-4 text-center font-bold text-gray-900">{schedule.staff}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-gray-900 font-bold">{schedule.occupancy}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-bold">
                              <CheckCircle className="w-4 h-4" />
                              Adequate
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Beds Tab */}
        {view === 'beds' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bed Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.beds.units.map(unit => (
                <div key={unit.name} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{unit.name}</h3>
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      unit.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {unit.status === 'critical' ? 'Critical' : 'Optimal'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-3">{unit.occupied}/{unit.total}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        unit.status === 'critical' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{width: `${(unit.occupied/unit.total)*100}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{unit.total - unit.occupied} beds available</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {view === 'staff' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Staff Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.staff.byRole.map(role => (
                <div key={role.role} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">{role.role}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Total Available</span>
                        <span className="font-bold">{role.available}/{role.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all"
                          style={{width: `${(role.available/role.total)*100}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">On Duty Now</span>
                      <span className="font-bold text-blue-600">{role.onDuty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Equipment Tab */}
        {view === 'equipment' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Equipment Status</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {resources.equipment.byType.map(equip => (
                <div key={equip.name} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{equip.name}</h3>
                    <span className="text-lg font-bold text-purple-600">{equip.operational}/{equip.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                    <div 
                      className={`h-2.5 rounded-full transition-all ${
                        equip.maintenance > 0 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{width: `${(equip.operational/equip.total)*100}%`}}
                    ></div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    {equip.maintenance > 0 && (
                      <span className="text-gray-600"><span className="font-bold text-orange-600">{equip.maintenance}</span> maintenance</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
