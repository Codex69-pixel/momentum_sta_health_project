import React, { useState } from 'react';
import { 
  User, ChevronDown, LogOut, Home, BarChart3, Package, Plus, 
  AlertTriangle, CheckCircle, Clock, TrendingUp, Search, Filter, 
  Download, Pill, MoreVertical, AlertCircle, ShoppingCart, Menu, X
} from 'lucide-react';
import LoadingSpinner from './common/LoadingSpinner';
import Papa from 'papaparse';

export function InventoryManagement({ onNavigate }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
        const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '', category: '', stock: '', reorderLevel: '', supplier: '', cost: '', expiry: ''
  });
            {/* Quick navigation dropdown for modules */}
            {onNavigate && (
              <select
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 8, border: '1px solid #fff', background: '#fff', color: '#0d9488', fontWeight: 600 }}
                onChange={e => onNavigate(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Go to module...</option>
                <option value="nurse">Nurse Triage</option>
                <option value="queue">Queue Management</option>
                <option value="doctor">Doctor Portal</option>
                <option value="resources">Resource Dashboard</option>
                <option value="analytics">Analytics</option>
              </select>
            )}
  const [addErrors, setAddErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const sortedDrugs = [...filteredDrugs].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  const pageSize = 5;
  const pagedDrugs = sortedDrugs.slice((page-1)*pageSize, page*pageSize);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle };
      case 'low': return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle };
      default: return { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle };
    }
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const validateAddForm = () => {
    const errors = {};
    if (!addForm.name) errors.name = 'Name is required';
    if (!addForm.category) errors.category = 'Category is required';
    if (!addForm.stock || isNaN(addForm.stock) || addForm.stock < 0) errors.stock = 'Valid stock required';
    if (!addForm.reorderLevel || isNaN(addForm.reorderLevel) || addForm.reorderLevel < 0) errors.reorderLevel = 'Valid reorder level required';
    if (!addForm.supplier) errors.supplier = 'Supplier is required';
    if (!addForm.cost || isNaN(addForm.cost) || addForm.cost < 0) errors.cost = 'Valid cost required';
    if (!addForm.expiry) errors.expiry = 'Expiry date required';
    return errors;
  };

  const handleAddChange = e => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
    if (addErrors[e.target.name]) setAddErrors({ ...addErrors, [e.target.name]: '' });
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    const errors = validateAddForm();
    if (Object.keys(errors).length) {
      setAddErrors(errors);
      return;
    }
    setLoading(true);
    setTimeout(() => { // Simulate async
      setShowAddModal(false);
      setAddForm({ name: '', category: '', stock: '', reorderLevel: '', supplier: '', cost: '', expiry: '' });
      setAddErrors({});
      setLoading(false);
      // Optionally show a success message
    }, 1200);
  };

  // Export inventory table to CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredDrugs.map(drug => ({
      Name: drug.name,
      Category: drug.category,
      Stock: drug.stock,
      'Reorder Level': drug.reorderLevel,
      Usage: drug.usage,
      Supplier: drug.supplier,
      Cost: drug.cost,
      Expiry: drug.expiry,
      Status: drug.status
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      {/* Fixed TopBar with proper z-index */}
      <header className="w-full shadow-lg fixed top-0 left-0 z-50 border-b border-teal-800" style={{background: '#14B8A6'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-2 sm:px-4 md:px-6">
          {/* Left: Logo/Brand and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-teal-500/30 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
            <span className="text-base sm:text-lg md:text-2xl font-bold text-white tracking-tight">Stra-Health Pharmacy</span>
          </div>

          {/* Center: Navigation Buttons - Desktop */}
          <nav className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <button 
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition text-sm sm:text-base"
              onClick={() => window.location.href = '/pharmacy/home'}
            >
              <Home className="inline w-5 h-5 mr-1" /> Home
            </button>
            <button 
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition text-sm sm:text-base"
              onClick={() => window.location.href = '/pharmacy/analytics'}
            >
              <BarChart3 className="inline w-5 h-5 mr-1" /> Analytics
            </button>
          </nav>

          {/* Right: User Icon & Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-teal-500/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="Open user menu"
            >
              <div className="w-8 h-8 bg-white/20 border border-white/30 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>
            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fadeIn">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-red-50 transition-colors rounded-lg"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-teal-700 border-t border-teal-800 px-2 py-2 sm:px-4 sm:py-3">
            <div className="flex flex-col space-y-2">
              <button 
                className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition text-base"
                onClick={() => {
                  window.location.href = '/pharmacy/home';
                  setMobileMenuOpen(false);
                }}
              >
                <Home className="inline w-5 h-5 mr-2" /> Home
              </button>
              <button 
                className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition text-base"
                onClick={() => {
                  window.location.href = '/pharmacy/analytics';
                  setMobileMenuOpen(false);
                }}
              >
                <BarChart3 className="inline w-5 h-5 mr-2" /> Analytics
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content - Adjusted for fixed TopBar */}
      <div className="w-full pt-80 p-2 sm:p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Spacer for extra top space */}
          <div className="h-4 md:h-8" />
          {/* Header */}
          <div className="mb-8 animate-fadeIn" style={{marginTop: '2.5rem'}}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Pharmacy Inventory</h1>
            <p className="text-gray-600">Real-time medication stock management and alerts</p>
          </div>

          {/* Stats Cards - Enhanced Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <Package className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                <span className="text-xl sm:text-2xl font-bold text-blue-600">{stats.total}</span>
              </div>
              <p className="text-gray-700 font-semibold text-base sm:text-lg">Total Stock Items</p>
              <p className="text-gray-500 text-xs sm:text-sm">All medications</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
                <span className="text-xl sm:text-2xl font-bold text-red-600">{stats.critical}</span>
              </div>
              <p className="text-gray-700 font-semibold text-base sm:text-lg">Critical Stock</p>
              <p className="text-gray-500 text-xs sm:text-sm">Needs immediate action</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
                <span className="text-xl sm:text-2xl font-bold text-amber-600">{stats.reorderNeeded}</span>
              </div>
              <p className="text-gray-700 font-semibold text-base sm:text-lg">Reorder Needed</p>
              <p className="text-gray-500 text-xs sm:text-sm">Below reorder level</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
                <span className="text-base sm:text-lg font-bold text-emerald-600">KES {(stats.totalValue/1000).toFixed(1)}k</span>
              </div>
              <p className="text-gray-700 font-semibold text-base sm:text-lg">Inventory Value</p>
              <p className="text-gray-500 text-xs sm:text-sm">Total stock worth</p>
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
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors" onClick={handleExportCSV}>
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => setShowAddModal(true)}>
                  <Plus className="w-4 h-4" />
                  Add Medication
                </button>
              </div>
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

          {/* Medications Table - Responsive */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Medication {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('category'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Category {sortKey === 'category' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('stock'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Current Stock {sortKey === 'stock' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('reorderLevel'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Reorder Level {sortKey === 'reorderLevel' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('usage'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Usage/Day {sortKey === 'usage' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('supplier'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Supplier {sortKey === 'supplier' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 cursor-pointer" onClick={() => { setSortKey('status'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Status {sortKey === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedDrugs.map((drug, idx) => {
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
                              <p className="text-gray-500">ID: MED-{String(drug.id).padStart(4, '0')}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Expiring Soon (30 days)
              </h3>
              <div className="space-y-3">
                {drugs.filter(d => {
                  const expiryDate = new Date(d.expiry);
                  const today = new Date();
                  const diffTime = expiryDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 30 && diffDays > 0;
                }).slice(0, 4).map(drug => (
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
                    <p className="text-sm text-gray-600">Current: {drug.stock} | Needed: {Math.max(0, drug.reorderLevel - drug.stock)} units</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          {loading ? (
            <LoadingSpinner text="Adding medication..." fullScreen />
          ) : (
            <form className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative" onSubmit={handleAddSubmit}>
              <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setShowAddModal(false)} aria-label="Close">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-4">Add Medication</h2>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input name="name" value={addForm.name} onChange={handleAddChange} className={`w-full border rounded-lg px-3 py-2 ${addErrors.name ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.name && <div className="text-red-600 text-xs mt-1">{addErrors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input name="category" value={addForm.category} onChange={handleAddChange} className={`w-full border rounded-lg px-3 py-2 ${addErrors.category ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.category && <div className="text-red-600 text-xs mt-1">{addErrors.category}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input name="stock" value={addForm.stock} onChange={handleAddChange} type="number" className={`w-full border rounded-lg px-3 py-2 ${addErrors.stock ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.stock && <div className="text-red-600 text-xs mt-1">{addErrors.stock}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Reorder Level</label>
                <input name="reorderLevel" value={addForm.reorderLevel} onChange={handleAddChange} type="number" className={`w-full border rounded-lg px-3 py-2 ${addErrors.reorderLevel ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.reorderLevel && <div className="text-red-600 text-xs mt-1">{addErrors.reorderLevel}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Supplier</label>
                <input name="supplier" value={addForm.supplier} onChange={handleAddChange} className={`w-full border rounded-lg px-3 py-2 ${addErrors.supplier ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.supplier && <div className="text-red-600 text-xs mt-1">{addErrors.supplier}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Cost</label>
                <input name="cost" value={addForm.cost} onChange={handleAddChange} type="number" step="0.01" className={`w-full border rounded-lg px-3 py-2 ${addErrors.cost ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.cost && <div className="text-red-600 text-xs mt-1">{addErrors.cost}</div>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input name="expiry" value={addForm.expiry} onChange={handleAddChange} type="date" className={`w-full border rounded-lg px-3 py-2 ${addErrors.expiry ? 'border-red-500' : 'border-gray-200'}`} />
                {addErrors.expiry && <div className="text-red-600 text-xs mt-1">{addErrors.expiry}</div>}
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Add Medication</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}