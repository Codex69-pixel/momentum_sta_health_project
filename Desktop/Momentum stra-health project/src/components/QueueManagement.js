import React, { useState } from 'react';
import './QueueManagement.css';
import { 
  Clock, Users, AlertCircle, CheckCircle,
  Filter, Search, MoreVertical, Phone, MapPin,
  AlertTriangle, Activity, Eye, ChevronRight
} from 'lucide-react';

const mockQueues = [
  {
    department: 'Emergency',
    patients: [
      { id: 'STRA-001', name: 'John Doe', urgency: 'RED', position: 1, waitTime: 5, status: 'IN_PROGRESS', age: 45, chief: 'Chest Pain' },
      { id: 'STRA-002', name: 'Jane Smith', urgency: 'YELLOW', position: 2, waitTime: 15, status: 'WAITING', age: 32, chief: 'Headache' },
      { id: 'STRA-003', name: 'Bob Johnson', urgency: 'GREEN', position: 3, waitTime: 45, status: 'WAITING', age: 28, chief: 'Bruising' }
    ]
  },
  {
    department: 'General Medicine',
    patients: [
      { id: 'STRA-004', name: 'Alice Brown', urgency: 'YELLOW', position: 1, waitTime: 10, status: 'IN_PROGRESS', age: 55, chief: 'Fever' },
      { id: 'STRA-005', name: 'Charlie Wilson', urgency: 'GREEN', position: 2, waitTime: 30, status: 'WAITING', age: 42, chief: 'Cough' },
      { id: 'STRA-006', name: 'Diana Miller', urgency: 'GREEN', position: 3, waitTime: 50, status: 'WAITING', age: 38, chief: 'Follow-up' }
    ]
  },
  {
    department: 'Pediatrics',
    patients: [
      { id: 'STRA-007', name: 'Emma Davis', urgency: 'YELLOW', position: 1, waitTime: 8, status: 'WAITING', age: 5, chief: 'Fever' },
      { id: 'STRA-008', name: 'Frank Thomas', urgency: 'GREEN', position: 2, waitTime: 25, status: 'WAITING', age: 8, chief: 'Vaccination' }
    ]
  }
];

export function QueueManagement() {
  const [selectedDept, setSelectedDept] = useState('Emergency');
  const [searchQuery, setSearchQuery] = useState('');

  const getUrgencyConfig = (urgency) => {
    switch (urgency) {
      case 'RED':
        return { bg: 'bg-red-50', border: 'border-red-500', badge: 'bg-red-500 text-white', icon: AlertTriangle };
      case 'YELLOW':
        return { bg: 'bg-yellow-50', border: 'border-yellow-500', badge: 'bg-yellow-500 text-white', icon: AlertCircle };
      case 'GREEN':
        return { bg: 'bg-green-50', border: 'border-green-500', badge: 'bg-green-500 text-white', icon: CheckCircle };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-500', badge: 'bg-gray-500 text-white', icon: Activity };
    }
  };

  const currentQueue = mockQueues.find(q => q.department === selectedDept);
  
  const totalPatients = mockQueues.reduce((sum, dept) => sum + dept.patients.length, 0);
  const criticalPatients = mockQueues.reduce((sum, dept) =>
    sum + dept.patients.filter(p => p.urgency === 'RED').length, 0
  );
  const avgWaitTime = Math.round(
    mockQueues.reduce((sum, dept) =>
      sum + dept.patients.reduce((s, p) => s + p.waitTime, 0), 0
    ) / totalPatients
  );
  const inProgressCount = mockQueues.reduce((sum, dept) =>
    sum + dept.patients.filter(p => p.status === 'IN_PROGRESS').length, 0
  );

  const filteredPatients = currentQueue?.patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-teal-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Queue Management</h1>
          <p className="text-gray-600">Real-time patient flow and department monitoring</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Patients', value: totalPatients, icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
            { label: 'Critical (RED)', value: criticalPatients, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'In Progress', value: inProgressCount, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Avg Wait Time', value: `${avgWaitTime} min`, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Departments', value: mockQueues.length, icon: MapPin, color: 'text-green-600', bg: 'bg-green-50' }
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="stat-card animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
                <div className={`${metric.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <p className="text-xs text-gray-600 font-medium mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Department Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-20">
              <div className="p-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <h3 className="font-bold text-lg">Departments</h3>
                <p className="text-teal-100 text-sm mt-1">{mockQueues.length} departments</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {mockQueues.map((queue, idx) => {
                  const deptPatients = queue.patients.length;
                  const deptCritical = queue.patients.filter(p => p.urgency === 'RED').length;
                  const isActive = selectedDept === queue.department;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDept(queue.department)}
                      className={`w-full p-4 text-left transition-all duration-200 hover:bg-gray-50 ${
                        isActive ? 'bg-teal-50 border-l-4 border-teal-600' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{queue.department}</p>
                        {isActive && <ChevronRight className="w-4 h-4 text-teal-600" />}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-600">
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {deptPatients}
                        </span>
                        {deptCritical > 0 && (
                          <span className="flex items-center text-red-600 font-semibold">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {deptCritical}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Queue Display */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field input-with-icon w-full"
                />
              </div>
              <button className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>

            {/* Queue Cards */}
            <div className="space-y-4">
              {filteredPatients && filteredPatients.length > 0 ? (
                filteredPatients.map((patient, idx) => {
                  const config = getUrgencyConfig(patient.urgency);
                  const Icon = config.icon;
                  
                  return (
                    <div
                      key={patient.id}
                      className={`bg-white rounded-2xl border-l-4 ${config.border} shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden animate-fadeIn`}
                      style={{animationDelay: `${idx * 50}ms`}}
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          
                          {/* Position & Status */}
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl font-bold text-2xl shadow-md">
                              {patient.position}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                              <p className="text-sm text-gray-600">{patient.id}</p>
                              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-600">
                                <span>{patient.age} years</span>
                                <span>•</span>
                                <span>{patient.chief}</span>
                              </div>
                            </div>
                          </div>

                          {/* Urgency Badge */}
                          <div className={`${config.badge} px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-md`}>
                            <Icon className="w-4 h-4" />
                            <span>{patient.urgency}</span>
                          </div>
                        </div>

                        {/* Status and Wait Time */}
                        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="font-semibold text-gray-900">Wait Time: {patient.waitTime} min</span>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            patient.status === 'IN_PROGRESS'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {patient.status === 'IN_PROGRESS' ? '🟢 Being Served' : '⏳ Waiting'}
                          </div>

                          {/* Action Buttons */}
                          <div className="ml-auto flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600 border border-blue-200" title="Call Patient">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No patients found</p>
                </div>
              )}
            </div>

            {/* Queue Statistics */}
            {currentQueue && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Queue Statistics - {selectedDept}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Waiting', value: currentQueue.patients.length, color: 'text-blue-600' },
                    { label: 'Critical Cases', value: currentQueue.patients.filter(p => p.urgency === 'RED').length, color: 'text-red-600' },
                    { label: 'Being Served', value: currentQueue.patients.filter(p => p.status === 'IN_PROGRESS').length, color: 'text-green-600' },
                    { label: 'Avg Wait (min)', value: Math.round(currentQueue.patients.reduce((sum, p) => sum + p.waitTime, 0) / currentQueue.patients.length), color: 'text-orange-600' }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-1">{stat.label}</p>
                      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
