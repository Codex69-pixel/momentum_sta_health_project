import React, { useState } from 'react';
import {
  Package, Plus, AlertTriangle, CheckCircle, Clock, TrendingUp,
  Search, Filter, Download, Pill, MoreVertical,
  AlertCircle, ShoppingCart, BarChart3
} from 'lucide-react';

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const drugs = [
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 450, reorderLevel: 100, supplier: 'PharmaCorp', cost: 2.50, expiry: '2025-12-31', status: 'optimal', usage: 15 },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', stock: 80, reorderLevel: 150, supplier: 'MediHealth', cost: 5.00, expiry: '2024-08-15', status: 'critical', usage: 8 },
    { id: 3, name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 320, reorderLevel: 150, supplier: 'PharmaCorp', cost: 3.25, expiry: '2025-06-30', status: 'optimal', usage: 12 },
    { id: 4, name: 'Atorvastatin 20mg', category: 'Cardiovascular', stock: 55, reorderLevel: 200, supplier: 'CardioMeds', cost: 8.75, expiry: '2026-01-15', status: 'low', usage: 5 },
    { id: 5, name: 'Metformin 500mg', category: 'Diabetes', stock: 280, reorderLevel: 100, supplier: 'DiabeteCare', cost: 4.00, expiry: '2025-09-20', status: 'optimal', usage: 10 },
    { id: 6, name: 'Lisinopril 10mg', category: 'Hypertension', stock: 120, reorderLevel: 200, supplier: 'CardioMeds', cost: 6.50, expiry: '2025-04-10', status: 'low', usage: 6 },
    { id: 7, name: 'Omeprazole 20mg', category: 'GI Disorders', stock: 95, reorderLevel: 150, supplier: 'GastroMeds', cost: 3.75, expiry: '2024-10-25', status: 'critical', usage: 7 },
    { id: 8, name: 'Ciprofloxacin 500mg', category: 'Antibiotics', stock: 45, reorderLevel: 100, supplier: 'MediHealth', cost: 7.20, expiry: '2025-07-30', status: 'critical', usage: 4 }
  ];

  const categories = ['Pain Relief', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Hypertension', 'GI Disorders'];
  
  const stats = {
    total: drugs.reduce((sum, d) => sum + d.stock, 0),
    critical: drugs.filter(d => d.status === 'critical').length,
    reorderNeeded: drugs.filter(d => d.stock <= d.reorderLevel).length,
    totalValue: drugs.reduce((sum, d) => sum + (d.stock * d.cost), 0)
  };

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drug.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle };
      case 'low': return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle };
      default: return { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle };
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-teal-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pharmacy Inventory</h1>
          <p className="text-gray-600">Real-time medication stock management and alerts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
            </div>
            <p className="text-gray-700 font-semibold">Total Stock Items</p>
            <p className="text-gray-500 text-sm">All medications</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{stats.critical}</span>
            </div>
            <p className="text-gray-700 font-semibold">Critical Stock</p>
            <p className="text-gray-500 text-sm">Needs immediate action</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <ShoppingCart className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold text-amber-600">{stats.reorderNeeded}</span>
            </div>
            <p className="text-gray-700 font-semibold">Reorder Needed</p>
            <p className="text-gray-500 text-sm">Below reorder level</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
              <span className="text-lg font-bold text-emerald-600">KES {(stats.totalValue/1000).toFixed(1)}k</span>
            </div>
            <p className="text-gray-700 font-semibold">Inventory Value</p>
            <p className="text-gray-500 text-sm">Total stock worth</p>
          </div>
        </div>

        {/* Controls & Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medications or suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="btn btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="btn btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="btn btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Medication
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Medications Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Medication</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Current Stock</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Reorder Level</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Usage/Day</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Supplier</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrugs.map((drug, idx) => {
                  const StatusIcon = getStatusBadge(drug.status).icon;
                  return (
                    <tr key={drug.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white">
                            <Pill className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{drug.name}</p>
                            <p className="text-xs text-gray-500">ID: MED-{String(drug.id).padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{drug.category}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-lg font-bold">{drug.stock}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">{drug.reorderLevel}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <TrendingUp className="w-4 h-4 text-orange-600" />
                          {drug.usage} units
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{drug.supplier}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-medium ${getStatusBadge(drug.status).bg} ${getStatusBadge(drug.status).text}`}>
                          <StatusIcon className="w-4 h-4" />
                          {drug.status.charAt(0).toUpperCase() + drug.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expiry Alerts */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Expiring Soon (30 days)
            </h3>
            <div className="space-y-3">
              {drugs.filter(d => d.expiry).slice(0, 4).map(drug => (
                <div key={drug.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-gray-900">{drug.name}</p>
                    <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">{drug.expiry}</span>
                  </div>
                  <p className="text-sm text-gray-600">Stock: {drug.stock} units</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              Pending Reorders
            </h3>
            <div className="space-y-3">
              {drugs.filter(d => d.stock <= d.reorderLevel).map(drug => (
                <div key={drug.id} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-gray-900">{drug.name}</p>
                    <span className="text-xs bg-teal-200 text-teal-800 px-2 py-1 rounded">{drug.supplier}</span>
                  </div>
                  <p className="text-sm text-gray-600">Current: {drug.stock} | Needed: {drug.reorderLevel - drug.stock} units</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
