import React from 'react';
import { Package, AlertTriangle, TrendingDown, Search, Plus } from 'lucide-react';

const mockInventory = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Analgesics',
    currentStock: 500,
    minThreshold: 200,
    unitCost: 0.50,
    supplier: 'PharmaCorp Kenya',
    lastRestock: '2025-12-01',
    status: 'normal'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    currentStock: 150,
    minThreshold: 300,
    unitCost: 1.20,
    supplier: 'MediSupply Ltd',
    lastRestock: '2025-11-28',
    status: 'low'
  },
  {
    id: 3,
    name: 'Insulin Glargine',
    category: 'Diabetes',
    currentStock: 45,
    minThreshold: 50,
    unitCost: 25.00,
    supplier: 'DiabetesCare Inc',
    lastRestock: '2025-12-05',
    status: 'critical'
  },
  {
    id: 4,
    name: 'Ibuprofen 400mg',
    category: 'NSAIDs',
    currentStock: 800,
    minThreshold: 250,
    unitCost: 0.75,
    supplier: 'PharmaCorp Kenya',
    lastRestock: '2025-11-25',
    status: 'normal'
  },
  {
    id: 5,
    name: 'Metformin 500mg',
    category: 'Diabetes',
    currentStock: 180,
    minThreshold: 200,
    unitCost: 0.60,
    supplier: 'DiabetesCare Inc',
    lastRestock: '2025-12-03',
    status: 'low'
  }
];

export function InventoryManagement() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'low': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'normal': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const criticalCount = mockInventory.filter(i => i.status === 'critical').length;
  const lowCount = mockInventory.filter(i => i.status === 'low').length;
  const totalValue = mockInventory.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2 text-2xl font-bold">Inventory Management</h1>
        <p className="text-gray-600">Pharmaceutical inventory and stock management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Critical Stock</p>
              <p className="text-gray-900 text-2xl font-bold">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Low Stock</p>
              <p className="text-gray-900 text-2xl font-bold">{lowCount}</p>
            </div>
            <TrendingDown className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Value</p>
              <p className="text-gray-900 text-2xl font-bold">KSh {totalValue.toLocaleString()}</p>
            </div>
            <Package className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </div>

      {(criticalCount > 0 || lowCount > 0) && (
        <div className="mb-6">
          {criticalCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <div className="text-red-900 font-semibold">Critical Stock Alert</div>
                  <div className="text-red-700 text-sm">
                    {criticalCount} medication{criticalCount > 1 ? 's' : ''} running out. Immediate reorder required.
                  </div>
                </div>
              </div>
            </div>
          )}

          {lowCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <TrendingDown className="w-6 h-6 text-yellow-600" />
                <div>
                  <div className="text-yellow-900 font-semibold">Low Stock Warning</div>
                  <div className="text-yellow-700 text-sm">
                    {lowCount} medication{lowCount > 1 ? 's' : ''} approaching minimum threshold. Plan reorder soon.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add Medication</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Medication</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Min</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Cost</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900 font-medium">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{item.currentStock}</td>
                  <td className="px-6 py-4 text-gray-600">{item.minThreshold}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                      {item.status === 'critical' ? 'Critical' : item.status === 'low' ? 'Low' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">KSh {item.unitCost.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900 text-sm">{item.supplier}</div>
                      <div className="text-gray-600 text-xs">Last: {item.lastRestock}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-2 font-semibold">Reorder Recommendations</h3>
            <p className="text-purple-100">
              {criticalCount + lowCount} items need attention. Total estimated reorder cost: KSh{' '}
              {mockInventory
                .filter(i => i.status === 'critical' || i.status === 'low')
                .reduce((sum, item) => sum + (500 * item.unitCost), 0)
                .toLocaleString()}
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
            Generate Purchase Orders
          </button>
        </div>
      </div>
    </div>
  );
}