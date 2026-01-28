import React, { useState, useEffect, useMemo } from 'react';
import NotificationButton from './common/NotificationButton';
import { 
  User, ChevronDown, LogOut, Home, BarChart3, Package, Plus, 
  AlertTriangle, CheckCircle, Clock, TrendingUp, Search, Filter, 
  Download, Pill, MoreVertical, AlertCircle, ShoppingCart, Menu, X,
  Calendar, DollarSign, Box, Thermometer, FileText, ClipboardCheck
} from 'lucide-react';
import LoadingSpinner from './common/LoadingSpinner';
import Papa from 'papaparse';
import './InventoryManagement.css';
import Prescriptions from './prescription';

// Mock data
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

const STATUS_CONFIG = {
  critical: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle, label: 'Critical' },
  low: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle, label: 'Low' },
  optimal: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Optimal' }
};

const initialFormState = {
  name: '', 
  category: '', 
  stock: '', 
  reorderLevel: '', 
  supplier: '', 
  cost: '', 
  expiry: ''
};

export function InventoryManagement({ onNavigate }) {
  // State Management
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [addForm, setAddForm] = useState(initialFormState);
  const [addErrors, setAddErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [inventory, setInventory] = useState(drugs);
  const pageSize = 5;

  // Mock prescriptions data (shared with Prescriptions component)
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientId: "P001",
      patientName: "John Doe",
      patientAge: 45,
      medication: "Paracetamol 500mg",
      dosage: "200mg",
      frequency: "Every 6 hours",
      duration: "7 days",
      instructions: "Take with food",
      prescribedBy: "Dr. Sarah Johnson",
      datePrescribed: "2024-01-15",
      expiryDate: "2024-02-15",
      status: 'COMPLETED',
      refills: 2,
      allergies: ["None"],
      quantity: 30
    },
    {
      id: 2,
      patientId: "P002",
      patientName: "Jane Smith",
      patientAge: 32,
      medication: "Amoxicillin 250mg",
      dosage: "500mg",
      frequency: "Every 8 hours",
      duration: "5 days",
      instructions: "Take as needed for fever",
      prescribedBy: "Dr. Michael Chen",
      datePrescribed: "2024-01-14",
      expiryDate: "2024-02-14",
      status: 'ACTIVE',
      refills: 1,
      allergies: ["Aspirin"],
      quantity: 20
    }
  ]);

  // Calculate medication usage from prescriptions
  const medicationUsage = useMemo(() => {
    const usageMap = {};
    
    prescriptions.forEach(prescription => {
      if (prescription.status === 'COMPLETED' || prescription.status === 'ACTIVE') {
        const medName = prescription.medication;
        if (!usageMap[medName]) {
          usageMap[medName] = {
            totalQuantity: 0,
            prescriptionCount: 0,
            lastPrescribed: prescription.datePrescribed
          };
        }
        usageMap[medName].totalQuantity += prescription.quantity || 0;
        usageMap[medName].prescriptionCount += 1;
      }
    });
    
    return usageMap;
  }, [prescriptions]);

  // Calculate statistics with prescription impact
  const stats = useMemo(() => ({
    total: inventory.reduce((sum, d) => sum + d.stock, 0),
    critical: inventory.filter(d => d.status === 'critical').length,
    reorderNeeded: inventory.filter(d => d.stock <= d.reorderLevel).length,
    totalValue: inventory.reduce((sum, d) => sum + (d.stock * d.cost), 0),
    expiringSoon: inventory.filter(d => {
      const expiryDate = new Date(d.expiry);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }).length,
    activePrescriptions: prescriptions.filter(p => p.status === 'ACTIVE').length
  }), [inventory, prescriptions]);

  // Handle prescription fulfillment (when medication is dispensed)
  const handlePrescriptionFulfilled = (fulfillmentData) => {
    const { medication, quantity, prescriptionId } = fulfillmentData;
    
    // Update inventory stock
    setInventory(prev => prev.map(item => {
      if (item.name === medication) {
        const newStock = item.stock - quantity;
        const newStatus = newStock <= item.reorderLevel * 1.5 ? 'critical' : 
                         newStock <= item.reorderLevel * 2 ? 'low' : 'optimal';
        
        return {
          ...item,
          stock: newStock,
          status: newStatus,
          usage: Math.max(item.usage, Math.floor((item.usage + quantity) / 2)) // Update usage average
        };
      }
      return item;
    }));

    // Update prescription status
    setPrescriptions(prev => 
      prev.map(p => p.id === prescriptionId ? { ...p, status: 'COMPLETED' } : p)
    );

    // Show notification
    alert(`✓ Inventory updated: ${quantity} units of ${medication} dispensed.`);
  };

  // Filter and sort drugs with prescription data
  const filteredDrugs = useMemo(() => {
    return inventory.map(drug => {
      const usage = medicationUsage[drug.name];
      return {
        ...drug,
        prescriptionCount: usage ? usage.prescriptionCount : 0,
        totalPrescribed: usage ? usage.totalQuantity : 0
      };
    }).filter(drug => {
      const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drug.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drug.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [inventory, searchQuery, selectedCategory, medicationUsage]);

  const sortedDrugs = useMemo(() => {
    return [...filteredDrugs].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      
      // Handle string comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      // Handle number comparison
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filteredDrugs, sortKey, sortOrder]);

  const pagedDrugs = useMemo(() => {
    return sortedDrugs.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedDrugs, page, pageSize]);

  const totalPages = Math.ceil(filteredDrugs.length / pageSize);

  // Event Handlers
  const handleLogout = () => {
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const validateAddForm = () => {
    const errors = {};
    if (!addForm.name.trim()) errors.name = 'Name is required';
    if (!addForm.category) errors.category = 'Category is required';
    if (!addForm.stock || isNaN(addForm.stock) || addForm.stock < 0) errors.stock = 'Valid stock required';
    if (!addForm.reorderLevel || isNaN(addForm.reorderLevel) || addForm.reorderLevel < 0) errors.reorderLevel = 'Valid reorder level required';
    if (!addForm.supplier.trim()) errors.supplier = 'Supplier is required';
    if (!addForm.cost || isNaN(addForm.cost) || addForm.cost < 0) errors.cost = 'Valid cost required';
    if (!addForm.expiry) errors.expiry = 'Expiry date required';
    return errors;
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
    if (addErrors[name]) {
      setAddErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = validateAddForm();
    
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newDrug = {
        id: inventory.length + 1,
        ...addForm,
        stock: parseInt(addForm.stock),
        reorderLevel: parseInt(addForm.reorderLevel),
        cost: parseFloat(addForm.cost),
        status: addForm.stock <= addForm.reorderLevel * 1.5 ? 'critical' : addForm.stock <= addForm.reorderLevel * 2 ? 'low' : 'optimal',
        usage: Math.floor(Math.random() * 15) + 1 // Mock usage data
      };

      setInventory(prev => [...prev, newDrug]);
      setShowAddModal(false);
      setAddForm(initialFormState);
      setAddErrors({});
      setLoading(false);
    }, 1200);
  };

  const handleExportCSV = () => {
    const csvData = filteredDrugs.map(drug => ({
      'Medication ID': `MED-${String(drug.id).padStart(4, '0')}`,
      Name: drug.name,
      Category: drug.category,
      Stock: drug.stock,
      'Prescription Count': drug.prescriptionCount || 0,
      'Total Prescribed': drug.totalPrescribed || 0,
      'Reorder Level': drug.reorderLevel,
      'Usage/Day': drug.usage,
      Supplier: drug.supplier,
      'Unit Cost': `KES ${drug.cost.toFixed(2)}`,
      Expiry: drug.expiry,
      Status: drug.status.charAt(0).toUpperCase() + drug.status.slice(1)
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventory-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getStatusConfig = (status) => STATUS_CONFIG[status] || STATUS_CONFIG.optimal;

  // TopBar Component
  const TopBar = () => (
    <header className="inventory-topbar">
      <div className="topbar-content">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo/Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <Pill size={28} />
          </div>
          <div>
            <h1 className="brand-title">Stra-Health Pharmacy</h1>
            <p className="brand-subtitle">Inventory Management System</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {onNavigate && (
            <select
              className="module-select"
              onChange={e => onNavigate(e.target.value)}
              defaultValue=""
              aria-label="Navigate to module"
            >
              <option value="" disabled>Go to module...</option>
              <option value="nurse">Nurse Triage</option>
              <option value="queue">Queue Management</option>
              <option value="doctor">Doctor Portal</option>
              <option value="resources">Resource Dashboard</option>
              <option value="analytics">Analytics</option>
            </select>
          )}
          
          <button 
            className="nav-btn"
            onClick={() => window.location.href = '/pharmacy/home'}
            aria-label="Go to home"
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          
          <button 
            className="nav-btn"
            onClick={() => window.location.href = '/pharmacy/analytics'}
            aria-label="View analytics"
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </button>

          <NotificationButton 
            onClick={() => alert('Notifications will appear here. (Backend integration pending)')}
            aria-label="View notifications"
          />
        </nav>

        {/* User Menu */}
        <div className="user-menu-container">
          <button
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <div className="user-avatar">
              <User size={20} />
            </div>
            <ChevronDown className={`chevron ${showUserMenu ? 'rotated' : ''}`} size={16} />
          </button>

          {showUserMenu && (
            <>
              <div 
                className="dropdown-backdrop" 
                onClick={() => setShowUserMenu(false)}
                aria-hidden="true"
              />
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar large">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="user-name">Pharmacy Admin</p>
                    <p className="user-role">Inventory Manager</p>
                  </div>
                </div>
                
                <div className="dropdown-divider" />
                
                <button
                  onClick={() => {
                    setShowPrescriptions(true);
                    setShowUserMenu(false);
                  }}
                  className="dropdown-item"
                  aria-label="View prescriptions"
                >
                  <FileText size={18} />
                  <span>View Prescriptions</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowAddModal(true);
                    setShowUserMenu(false);
                  }}
                  className="dropdown-item"
                  aria-label="Add medication"
                >
                  <Plus size={18} />
                  <span>Add Medication</span>
                </button>
                
                <div className="dropdown-divider" />
                
                <button
                  onClick={handleLogout}
                  className="dropdown-item logout"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-content">
            <button 
              className="mobile-nav-item"
              onClick={() => {
                window.location.href = '/pharmacy/home';
                setMobileMenuOpen(false);
              }}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            
            <button 
              className="mobile-nav-item"
              onClick={() => {
                setShowPrescriptions(true);
                setMobileMenuOpen(false);
              }}
            >
              <FileText size={20} />
              <span>Prescriptions</span>
            </button>
            
            <button 
              className="mobile-nav-item"
              onClick={() => {
                window.location.href = '/pharmacy/analytics';
                setMobileMenuOpen(false);
              }}
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </button>

            <div className="mobile-module-select">
              {onNavigate && (
                <select
                  className="module-select"
                  onChange={e => {
                    onNavigate(e.target.value);
                    setMobileMenuOpen(false);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Other Modules</option>
                  <option value="nurse">Nurse Triage</option>
                  <option value="queue">Queue Management</option>
                  <option value="doctor">Doctor Portal</option>
                  <option value="resources">Resource Dashboard</option>
                  <option value="analytics">Analytics</option>
                </select>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );

  // Prescriptions View Component
  const PrescriptionsView = () => (
    <div className="prescriptions-view">
      <div className="prescriptions-header">
        <button
          className="back-button"
          onClick={() => setShowPrescriptions(false)}
        >
          <ChevronDown size={20} className="back-arrow" />
          Back to Inventory
        </button>
        <div className="prescriptions-title">
          <h2>
            <FileText size={24} />
            Prescription Management
          </h2>
          <p>Manage and fulfill patient prescriptions</p>
        </div>
      </div>
      
      <Prescriptions 
        userRole="pharmacist" 
        inventory={inventory}
        onPrescriptionFulfilled={handlePrescriptionFulfilled}
        initialPrescriptions={prescriptions}
      />
    </div>
  );

  // Main Inventory View
  const InventoryView = () => (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="header-main">
          <h1>Pharmacy Inventory</h1>
          <p>Real-time medication stock management and alerts</p>
        </div>
        <div className="header-actions">
          <button 
            className="prescriptions-toggle-btn"
            onClick={() => setShowPrescriptions(true)}
          >
            <FileText size={18} />
            <span>Prescriptions ({stats.activePrescriptions})</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.total.toLocaleString()}</h3>
            <p>Total Stock Items</p>
            <span className="stat-trend">All medications</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.critical}</h3>
            <p>Critical Stock</p>
            <span className="stat-trend">Needs immediate action</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon danger">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.reorderNeeded}</h3>
            <p>Reorder Needed</p>
            <span className="stat-trend">Below reorder level</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.activePrescriptions}</h3>
            <p>Active Prescriptions</p>
            <span className="stat-trend">Pending fulfillment</span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search medications, suppliers, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search inventory"
          />
        </div>

        <div className="controls-group">
          <div className="category-filters">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="action-buttons">
            <button className="action-btn secondary" onClick={handleExportCSV}>
              <Download size={18} />
              <span>Export CSV</span>
            </button>
            <button className="action-btn primary" onClick={() => setShowAddModal(true)}>
              <Plus size={18} />
              <span>Add Medication</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-container">
        <div className="table-header">
          <h3>Medication Inventory</h3>
          <div className="table-info">
            <span>Showing {pagedDrugs.length} of {filteredDrugs.length} items</span>
            <span className="prescription-impact">
              • {Object.keys(medicationUsage).length} medications have prescription history
            </span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  Medication
                  {sortKey === 'name' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('category')} className="sortable">
                  Category
                  {sortKey === 'category' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('stock')} className="sortable">
                  Current Stock
                  {sortKey === 'stock' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('prescriptionCount')} className="sortable">
                  Prescriptions
                  {sortKey === 'prescriptionCount' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('reorderLevel')} className="sortable">
                  Reorder Level
                  {sortKey === 'reorderLevel' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('usage')} className="sortable">
                  Usage/Day
                  {sortKey === 'usage' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status
                  {sortKey === 'status' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedDrugs.map((drug) => {
                const statusConfig = getStatusConfig(drug.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={drug.id}>
                    <td>
                      <div className="medication-info">
                        <div className="medication-icon">
                          <Pill size={20} />
                        </div>
                        <div>
                          <div className="medication-name">{drug.name}</div>
                          <div className="medication-id">ID: MED-{String(drug.id).padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{drug.category}</span>
                    </td>
                    <td>
                      <div className={`stock-badge ${drug.stock <= drug.reorderLevel ? 'warning' : ''}`}>
                        {drug.stock.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="prescription-info">
                        {drug.prescriptionCount > 0 ? (
                          <>
                            <FileText size={14} className="prescription-icon" />
                            <span className="prescription-count">{drug.prescriptionCount}</span>
                            <span className="prescription-quantity">({drug.totalPrescribed} units)</span>
                          </>
                        ) : (
                          <span className="no-prescriptions">None</span>
                        )}
                      </div>
                    </td>
                    <td>{drug.reorderLevel.toLocaleString()}</td>
                    <td>
                      <div className="usage-display">
                        <TrendingUp size={16} />
                        <span>{drug.usage}/day</span>
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon size={16} />
                        <span>{statusConfig.label}</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons-cell">
                        {drug.prescriptionCount > 0 && (
                          <button
                            className="action-menu-btn prescription-action"
                            onClick={() => setShowPrescriptions(true)}
                            title="View prescriptions"
                          >
                            <FileText size={16} />
                          </button>
                        )}
                        <button className="action-menu-btn" aria-label="More options">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="pagination-btn"
              aria-label="Previous page"
            >
              ←
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`pagination-btn ${page === pageNum ? 'active' : ''}`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={page === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="pagination-btn"
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Alerts Section */}
      <div className="alerts-grid">
        <div className="alert-card">
          <div className="alert-header">
            <Clock size={20} />
            <h4>Expiring Soon (≤30 days)</h4>
            <span className="alert-count">{stats.expiringSoon}</span>
          </div>
          
          <div className="alert-list">
            {inventory
              .filter(drug => {
                const expiryDate = new Date(drug.expiry);
                const today = new Date();
                const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                return diffDays <= 30 && diffDays > 0;
              })
              .slice(0, 4)
              .map(drug => (
                <div key={drug.id} className="alert-item">
                  <div className="alert-item-header">
                    <span className="alert-medication">{drug.name}</span>
                    <span className="alert-date">{drug.expiry}</span>
                  </div>
                  <div className="alert-item-details">
                    <span>Stock: {drug.stock} units</span>
                    <span className="alert-tag">Expiring</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="alert-card">
          <div className="alert-header">
            <ShoppingCart size={20} />
            <h4>Pending Reorders</h4>
            <span className="alert-count">{stats.reorderNeeded}</span>
          </div>
          
          <div className="alert-list">
            {inventory
              .filter(drug => drug.stock <= drug.reorderLevel)
              .slice(0, 4)
              .map(drug => (
                <div key={drug.id} className="alert-item">
                  <div className="alert-item-header">
                    <span className="alert-medication">{drug.name}</span>
                    <span className="alert-supplier">{drug.supplier}</span>
                  </div>
                  <div className="alert-item-details">
                    <span>Current: {drug.stock} units</span>
                    <span className="alert-tag warning">
                      Need: {Math.max(0, drug.reorderLevel - drug.stock)} units
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="inventory-management">
      <TopBar />
      
      {/* Main Content */}
      <main className="inventory-content">
        {showPrescriptions ? <PrescriptionsView /> : <InventoryView />}
      </main>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => !loading && setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Medication</h2>
              <button 
                type="button" 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
                disabled={loading}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {loading ? (
              <div className="modal-loading">
                <LoadingSpinner text="Adding medication..." />
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="add-medication-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      <Pill size={16} />
                      Medication Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter medication name"
                      value={addForm.name}
                      onChange={handleAddChange}
                      className={addErrors.name ? 'error' : ''}
                    />
                    {addErrors.name && <div className="error-message">{addErrors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">
                      <Box size={16} />
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={addForm.category}
                      onChange={handleAddChange}
                      className={addErrors.category ? 'error' : ''}
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {addErrors.category && <div className="error-message">{addErrors.category}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock">
                      <Package size={16} />
                      Current Stock *
                    </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      placeholder="Enter stock quantity"
                      value={addForm.stock}
                      onChange={handleAddChange}
                      className={addErrors.stock ? 'error' : ''}
                    />
                    {addErrors.stock && <div className="error-message">{addErrors.stock}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="reorderLevel">
                      <AlertTriangle size={16} />
                      Reorder Level *
                    </label>
                    <input
                      id="reorderLevel"
                      name="reorderLevel"
                      type="number"
                      min="0"
                      placeholder="Enter reorder threshold"
                      value={addForm.reorderLevel}
                      onChange={handleAddChange}
                      className={addErrors.reorderLevel ? 'error' : ''}
                    />
                    {addErrors.reorderLevel && <div className="error-message">{addErrors.reorderLevel}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="supplier">
                      <Box size={16} />
                      Supplier *
                    </label>
                    <input
                      id="supplier"
                      name="supplier"
                      type="text"
                      placeholder="Enter supplier name"
                      value={addForm.supplier}
                      onChange={handleAddChange}
                      className={addErrors.supplier ? 'error' : ''}
                    />
                    {addErrors.supplier && <div className="error-message">{addErrors.supplier}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cost">
                      <DollarSign size={16} />
                      Unit Cost *
                    </label>
                    <div className="cost-input">
                      <span className="currency">KES</span>
                      <input
                        id="cost"
                        name="cost"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={addForm.cost}
                        onChange={handleAddChange}
                        className={addErrors.cost ? 'error' : ''}
                      />
                    </div>
                    {addErrors.cost && <div className="error-message">{addErrors.cost}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="expiry">
                      <Calendar size={16} />
                      Expiry Date *
                    </label>
                    <input
                      id="expiry"
                      name="expiry"
                      type="date"
                      value={addForm.expiry}
                      onChange={handleAddChange}
                      className={addErrors.expiry ? 'error' : ''}
                    />
                    {addErrors.expiry && <div className="error-message">{addErrors.expiry}</div>}
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Medication
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}