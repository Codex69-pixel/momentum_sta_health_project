import React from 'react';
import { Bed } from 'lucide-react';

const mockResources = {
  beds: {
    total: 150,
    available: 45,
    occupied: 95,
    cleaning: 10,
    utilization: 63
  },
  staff: {
    doctors: { total: 35, available: 28, onDuty: 25 },
    nurses: { total: 80, available: 65, onDuty: 70 },
    technicians: { total: 25, available: 20, onDuty: 22 }
  },
  equipment: [
    { name: 'Ventilators', total: 20, available: 8, inUse: 12, maintenance: 0 },
    { name: 'Patient Monitors', total: 50, available: 15, inUse: 33, maintenance: 2 },
    { name: 'Defibrillators', total: 15, available: 12, inUse: 3, maintenance: 0 },
    { name: 'Infusion Pumps', total: 40, available: 10, inUse: 28, maintenance: 2 }
  ]
};

export function ResourceDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1 text-2xl font-bold">Resource Allocation Dashboard</h1>
        <p className="text-gray-600 text-sm">Real-time monitoring of hospital resources and capacity</p>
      </div>

      <div className="mb-6">
        <h2 className="text-gray-900 mb-3 text-base font-semibold">Bed Capacity</h2>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="text-center">
              <Bed className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-2" />
              <div className="text-gray-900 text-base sm:text-lg font-bold">{mockResources.beds.total}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Total Beds</div>
            </div>
            <div className="text-center">
              <div className="text-green-600 text-base sm:text-lg font-bold">{mockResources.beds.available}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 text-base sm:text-lg font-bold">{mockResources.beds.occupied}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Occupied</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-600 text-base sm:text-lg font-bold">{mockResources.beds.cleaning}</div>
              <div className="text-gray-600 text-xs sm:text-sm">Cleaning</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 text-sm">Overall Utilization</span>
              <span className="text-gray-900 font-semibold text-sm">{mockResources.beds.utilization}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${mockResources.beds.utilization}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-gray-900 mb-3 text-base font-semibold">Staff Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          {Object.entries(mockResources.staff).map(([role, data]) => (
            <div key={role} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-900 mb-4 capitalize font-semibold text-base">{role}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total</span>
                  <span className="text-gray-900 font-bold">{data.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">On Duty</span>
                  <span className="text-green-600 font-bold">{data.onDuty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available</span>
                  <span className="text-blue-600 font-bold">{data.available}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600"
                    style={{ width: `${(data.onDuty / data.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-gray-900 mb-3 text-base font-semibold">Equipment Status</h2>
        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Equipment</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Total</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Available</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">In Use</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Maintenance</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockResources.equipment.map((item) => {
                  const utilization = Math.round((item.inUse / item.total) * 100);
                  return (
                    <tr key={item.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-gray-600">{item.total}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">{item.available}</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">{item.inUse}</td>
                      <td className="px-6 py-4 text-yellow-600 font-semibold">{item.maintenance}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600"
                              style={{ width: `${utilization}%` }}
                            />
                          </div>
                          <span className="text-gray-900 font-semibold text-sm">{utilization}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {mockResources.equipment.map((item) => {
            const utilization = Math.round((item.inUse / item.total) * 100);
            return (
              <div key={item.name} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-900 font-semibold mb-3">{item.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="text-gray-900 font-semibold">{item.total}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Available</span>
                    <span className="text-green-600 font-semibold">{item.available}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">In Use</span>
                    <span className="text-blue-600 font-semibold">{item.inUse}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Maintenance</span>
                    <span className="text-yellow-600 font-semibold">{item.maintenance}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-600">Utilization</span>
                      <span className="text-gray-900 font-semibold">{utilization}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${utilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-4 sm:p-6 text-white">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Capacity Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/10 rounded-lg p-3 sm:p-4">
            <div className="text-blue-100 mb-1 text-sm">Next 4 Hours</div>
            <div className="text-xl sm:text-2xl font-bold">+15% Load</div>
            <div className="text-xs sm:text-sm text-blue-100 mt-1">Expected increase</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 sm:p-4">
            <div className="text-blue-100 mb-1 text-sm">Peak Time</div>
            <div className="text-xl sm:text-2xl font-bold">2:00 PM</div>
            <div className="text-xs sm:text-sm text-blue-100 mt-1">Prepare resources</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 sm:p-4">
            <div className="text-blue-100 mb-1 text-sm">Recommendation</div>
            <div className="text-xl sm:text-2xl font-bold">+5 Staff</div>
            <div className="text-xs sm:text-sm text-blue-100 mt-1">For optimal coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
}