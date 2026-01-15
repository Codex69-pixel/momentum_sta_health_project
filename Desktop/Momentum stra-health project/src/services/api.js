/**
 * API Service Module
 * 
 * Centralized API communication layer for connecting to Node.js backend
 * Handles all HTTP requests to the server and SQL database
 * 
 * Usage:
 * import { apiService } from './services/api';
 * const patients = await apiService.getPatients();
 */

// API Base Configuration
const API_CONFIG = {
  // Update this URL when backend is deployed
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Generic HTTP request handler with error handling
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise} - API response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Get auth token from localStorage if available
  const token = localStorage.getItem('authToken');
  
  const config = {
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Handle HTTP errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Network or timeout errors
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection');
    }
    
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * API Service Object
 * Contains all API methods organized by module
 */
export const apiService = {
  
  // ==================== AUTHENTICATION ====================
  
  /**
   * User login
   * @param {object} credentials - { username, password, role }
   * @returns {Promise<{user, token}>}
   */
  async login(credentials) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  /**
   * User logout
   * @returns {Promise<{success}>}
   */
  async logout() {
    const result = await apiRequest('/auth/logout', { method: 'POST' });
    localStorage.removeItem('authToken');
    return result;
  },

  /**
   * Verify authentication token
   * @returns {Promise<{valid, user}>}
   */
  async verifyToken() {
    return apiRequest('/auth/verify', { method: 'GET' });
  },

  // ==================== PATIENT MANAGEMENT ====================
  
  /**
   * Get all patients
   * @param {object} filters - Optional filters { department, urgency, status }
   * @returns {Promise<Array>}
   */
  async getPatients(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/patients?${queryParams}`, { method: 'GET' });
  },

  /**
   * Get single patient by ID
   * @param {string} patientId - STRA patient ID
   * @returns {Promise<object>}
   */
  async getPatientById(patientId) {
    return apiRequest(`/patients/${patientId}`, { method: 'GET' });
  },

  /**
   * Register new patient (Nurse Triage)
   * @param {object} patientData - Complete patient registration form data
   * @returns {Promise<{patientId, straId}>}
   */
  async registerPatient(patientData) {
    return apiRequest('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData)
    });
  },

  /**
   * Update patient information
   * @param {string} patientId - STRA patient ID
   * @param {object} updates - Fields to update
   * @returns {Promise<object>}
   */
  async updatePatient(patientId, updates) {
    return apiRequest(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  /**
   * Get patient medical history
   * @param {string} patientId - STRA patient ID
   * @returns {Promise<Array>}
   */
  async getPatientHistory(patientId) {
    return apiRequest(`/patients/${patientId}/history`, { method: 'GET' });
  },

  // ==================== QUEUE MANAGEMENT ====================
  
  /**
   * Get queue for all departments
   * @returns {Promise<Array>}
   */
  async getQueues() {
    return apiRequest('/queues', { method: 'GET' });
  },

  /**
   * Get queue for specific department
   * @param {string} department - Department name
   * @returns {Promise<Array>}
   */
  async getDepartmentQueue(department) {
    return apiRequest(`/queues/${encodeURIComponent(department)}`, { method: 'GET' });
  },

  /**
   * Update patient status in queue
   * @param {string} patientId - STRA patient ID
   * @param {string} status - New status (WAITING, IN_PROGRESS, COMPLETED)
   * @returns {Promise<object>}
   */
  async updateQueueStatus(patientId, status) {
    return apiRequest(`/queues/${patientId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  /**
   * Transfer patient to different department
   * @param {string} patientId - STRA patient ID
   * @param {string} department - Target department
   * @returns {Promise<object>}
   */
  async transferPatient(patientId, department) {
    return apiRequest(`/queues/${patientId}/transfer`, {
      method: 'POST',
      body: JSON.stringify({ department })
    });
  },

  // ==================== DOCTOR PORTAL ====================
  
  /**
   * Add clinical notes to patient record
   * @param {string} patientId - STRA patient ID
   * @param {string} notes - Clinical observations
   * @returns {Promise<object>}
   */
  async addClinicalNotes(patientId, notes) {
    return apiRequest(`/patients/${patientId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ notes })
    });
  },

  /**
   * Create medical orders (lab tests, imaging)
   * @param {string} patientId - STRA patient ID
   * @param {object} orders - { labTests: [], imaging: [] }
   * @returns {Promise<object>}
   */
  async createOrders(patientId, orders) {
    return apiRequest(`/patients/${patientId}/orders`, {
      method: 'POST',
      body: JSON.stringify(orders)
    });
  },

  /**
   * Create prescription
   * @param {string} patientId - STRA patient ID
   * @param {object} prescription - Medication details
   * @returns {Promise<object>}
   */
  async createPrescription(patientId, prescription) {
    return apiRequest(`/patients/${patientId}/prescriptions`, {
      method: 'POST',
      body: JSON.stringify(prescription)
    });
  },

  /**
   * Get all prescriptions for a patient
   * @param {string} patientId - STRA patient ID
   * @returns {Promise<Array>}
   */
  async getPrescriptions(patientId) {
    return apiRequest(`/patients/${patientId}/prescriptions`, { method: 'GET' });
  },

  /**
   * Discharge patient
   * @param {string} patientId - STRA patient ID
   * @param {object} dischargeInfo - Discharge summary
   * @returns {Promise<object>}
   */
  async dischargePatient(patientId, dischargeInfo) {
    return apiRequest(`/patients/${patientId}/discharge`, {
      method: 'POST',
      body: JSON.stringify(dischargeInfo)
    });
  },

  // ==================== RESOURCE MANAGEMENT ====================
  
  /**
   * Get all resources (beds, staff, equipment)
   * @returns {Promise<object>}
   */
  async getResources() {
    return apiRequest('/resources', { method: 'GET' });
  },

  /**
   * Get bed availability
   * @returns {Promise<object>}
   */
  async getBedAvailability() {
    return apiRequest('/resources/beds', { method: 'GET' });
  },

  /**
   * Update bed status
   * @param {string} bedId - Bed identifier
   * @param {string} status - New status (AVAILABLE, OCCUPIED, CLEANING)
   * @returns {Promise<object>}
   */
  async updateBedStatus(bedId, status) {
    return apiRequest(`/resources/beds/${bedId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  /**
   * Get staff availability
   * @param {string} role - Optional role filter (doctor, nurse, technician)
   * @returns {Promise<Array>}
   */
  async getStaffAvailability(role = null) {
    const query = role ? `?role=${role}` : '';
    return apiRequest(`/resources/staff${query}`, { method: 'GET' });
  },

  /**
   * Get equipment status
   * @returns {Promise<Array>}
   */
  async getEquipmentStatus() {
    return apiRequest('/resources/equipment', { method: 'GET' });
  },

  /**
   * Update equipment status
   * @param {string} equipmentId - Equipment identifier
   * @param {string} status - New status (AVAILABLE, IN_USE, MAINTENANCE)
   * @returns {Promise<object>}
   */
  async updateEquipmentStatus(equipmentId, status) {
    return apiRequest(`/resources/equipment/${equipmentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  // ==================== INVENTORY MANAGEMENT ====================
  
  /**
   * Get all inventory items
   * @param {object} filters - Optional filters { category, status }
   * @returns {Promise<Array>}
   */
  async getInventory(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/inventory?${queryParams}`, { method: 'GET' });
  },

  /**
   * Get single inventory item
   * @param {string} itemId - Item identifier
   * @returns {Promise<object>}
   */
  async getInventoryItem(itemId) {
    return apiRequest(`/inventory/${itemId}`, { method: 'GET' });
  },

  /**
   * Add new medication to inventory
   * @param {object} itemData - Medication details
   * @returns {Promise<object>}
   */
  async addInventoryItem(itemData) {
    return apiRequest('/inventory', {
      method: 'POST',
      body: JSON.stringify(itemData)
    });
  },

  /**
   * Update inventory stock levels
   * @param {string} itemId - Item identifier
   * @param {number} quantity - New quantity
   * @returns {Promise<object>}
   */
  async updateInventoryStock(itemId, quantity) {
    return apiRequest(`/inventory/${itemId}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity })
    });
  },

  /**
   * Get low stock alerts
   * @returns {Promise<Array>}
   */
  async getLowStockAlerts() {
    return apiRequest('/inventory/alerts', { method: 'GET' });
  },

  /**
   * Generate purchase order
   * @param {Array} items - Array of {itemId, quantity}
   * @returns {Promise<object>}
   */
  async generatePurchaseOrder(items) {
    return apiRequest('/inventory/purchase-orders', {
      method: 'POST',
      body: JSON.stringify({ items })
    });
  },

  // ==================== ANALYTICS ====================
  
  /**
   * Get dashboard analytics
   * @param {object} dateRange - { startDate, endDate }
   * @returns {Promise<object>}
   */
  async getAnalytics(dateRange = {}) {
    const queryParams = new URLSearchParams(dateRange).toString();
    return apiRequest(`/analytics?${queryParams}`, { method: 'GET' });
  },

  /**
   * Get patient volume statistics
   * @returns {Promise<object>}
   */
  async getPatientVolumeStats() {
    return apiRequest('/analytics/patient-volume', { method: 'GET' });
  },

  /**
   * Get wait time statistics
   * @returns {Promise<object>}
   */
  async getWaitTimeStats() {
    return apiRequest('/analytics/wait-times', { method: 'GET' });
  },

  /**
   * Get department performance metrics
   * @returns {Promise<Array>}
   */
  async getDepartmentPerformance() {
    return apiRequest('/analytics/departments', { method: 'GET' });
  },

  /**
   * Get resource utilization metrics
   * @returns {Promise<object>}
   */
  async getResourceUtilization() {
    return apiRequest('/analytics/resources', { method: 'GET' });
  },

  /**
   * Export analytics report
   * @param {string} format - Report format (pdf, csv, excel)
   * @param {object} filters - Report filters
   * @returns {Promise<Blob>}
   */
  async exportReport(format, filters = {}) {
    const queryParams = new URLSearchParams({ format, ...filters }).toString();
    const response = await fetch(`${API_CONFIG.BASE_URL}/analytics/export?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to export report');
    }
    
    return await response.blob();
  },

  // ==================== NOTIFICATIONS ====================
  
  /**
   * Get notifications for current user
   * @returns {Promise<Array>}
   */
  async getNotifications() {
    return apiRequest('/notifications', { method: 'GET' });
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification identifier
   * @returns {Promise<object>}
   */
  async markNotificationRead(notificationId) {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PATCH'
    });
  },

  // ==================== ADMIN FUNCTIONS ====================
  
  /**
   * Get all users (Admin only)
   * @returns {Promise<Array>}
   */
  async getAllUsers() {
    return apiRequest('/admin/users', { method: 'GET' });
  },

  /**
   * Create new user (Admin only)
   * @param {object} userData - User details
   * @returns {Promise<object>}
   */
  async createUser(userData) {
    return apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  /**
   * Update user role/permissions (Admin only)
   * @param {string} userId - User identifier
   * @param {object} updates - Updates to apply
   * @returns {Promise<object>}
   */
  async updateUser(userId, updates) {
    return apiRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  /**
   * Get system logs (Admin only)
   * @param {object} filters - Optional filters
   * @returns {Promise<Array>}
   */
  async getSystemLogs(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/admin/logs?${queryParams}`, { method: 'GET' });
  },

  /**
   * Get system health status (Admin only)
   * @returns {Promise<object>}
   */
  async getSystemHealth() {
    return apiRequest('/admin/health', { method: 'GET' });
  }
};

/**
 * Helper function to save auth token
 * @param {string} token - JWT token from login
 */
export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

/**
 * Helper function to clear auth token
 */
export function clearAuthToken() {
  localStorage.removeItem('authToken');
}

/**
 * Helper function to get current auth token
 * @returns {string|null}
 */
export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export default apiService;
