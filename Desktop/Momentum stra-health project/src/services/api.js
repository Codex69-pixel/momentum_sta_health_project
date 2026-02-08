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
// Axios-based API configuration
import axios from 'axios';

const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Create axios instance
const apiClient = axios.create(API_CONFIG);

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response || error.message);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network error - check connection');
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);



/**
 * API Service Object
 * Contains all API methods organized by module
 */
const apiService = {
    // ==================== AUTHENTICATION ====================
    async login({ email, password }) {
      const response = await apiClient.post('/api/v1/auth/login', { email, password });
      if (response.token) this.setAuthToken(response.token);
      return response;
    },
    async register(userData) {
      return apiClient.post('/api/v1/auth/register', userData);
    },
    async logout() {
      const response = await apiClient.post('/api/v1/auth/logout');
      this.clearAuthToken();
      return response;
    },
    async getProfile() {
      return apiClient.get('/api/v1/auth/profile');
    },
    async updateProfile(profileData) {
      return apiClient.put('/api/v1/auth/profile', profileData);
    },
    async refreshToken(refreshToken) {
      return apiClient.post('/api/v1/auth/refresh-token', { refreshToken });
    },
    async forgotPassword(email) {
      return apiClient.post('/api/v1/auth/forgot-password', { email });
    },
    async resetPassword(resetToken, newPassword) {
      return apiClient.post('/api/v1/auth/reset-password', { resetToken, newPassword });
    },
    async changePassword(currentPassword, newPassword) {
      return apiClient.post('/api/v1/auth/change-password', { currentPassword, newPassword });
    },

    // ==================== PATIENT MANAGEMENT ====================
    async registerPatient(patientData) {
      return apiClient.post('/api/v1/triage/patients', patientData);
    },
    async getPatientById(patientId) {
      return apiClient.get(`/api/v1/triage/patients/${patientId}`);
    },
    async performTriage(triageData) {
      return apiClient.post('/api/v1/triage/triage', triageData);
    },
    async getTriageStatistics() {
      return apiClient.get('/api/v1/triage/statistics');
    },
    async getPatientHistory(patientId) {
      return apiClient.get(`/api/v1/triage/patient/${patientId}/history`);
    },

    // ==================== QUEUE MANAGEMENT ====================
    async getDepartmentQueue(departmentId) {
      return apiClient.get(`/api/v1/triage/queue/${departmentId}`);
    },
    async updateQueuePosition(queueId, position) {
      return apiClient.patch(`/api/v1/triage/queue/${queueId}/position`, { position });
    },
    async callNextPatient(departmentId, doctorId) {
      return apiClient.post(`/api/v1/triage/queue/${departmentId}/call-next`, { doctorId });
    },
    async completePatient(queueId) {
      return apiClient.post(`/api/v1/triage/queue/${queueId}/complete`);
    },
    async prioritizeQueue(departmentId) {
      return apiClient.post(`/api/v1/triage/queue/${departmentId}/prioritize`);
    },

    // ==================== DOCTOR PORTAL ====================
    async getDoctorQueue() {
      return apiClient.get('/api/v1/doctor/queue');
    },
    async getDoctorPatientById(patientId) {
      return apiClient.get(`/api/v1/doctor/patients/${patientId}`);
    },
    async orderLabTests(labOrder) {
      return apiClient.post('/api/v1/doctor/lab-orders', labOrder);
    },
    async orderImaging(imagingOrder) {
      return apiClient.post('/api/v1/doctor/imaging', imagingOrder);
    },
    async createPrescription(prescription) {
      return apiClient.post('/api/v1/doctor/prescriptions', prescription);
    },
    async recordVitals(patientId, vitals) {
      return apiClient.post(`/api/v1/doctor/patients/${patientId}/vitals`, vitals);
    },
    async updateDisposition(patientId, dispositionData) {
      return apiClient.put(`/api/v1/doctor/patients/${patientId}/disposition`, dispositionData);
    },
    async getLabResults(patientId) {
      return apiClient.get(`/api/v1/doctor/patients/${patientId}/lab-results`);
    },
    async getDoctorStatistics() {
      return apiClient.get('/api/v1/doctor/statistics');
    },

    // ==================== RESOURCE MANAGEMENT ====================
    async getResourceDashboard() {
      return apiClient.get('/api/v1/resources/dashboard');
    },
    async getResourceAvailability() {
      return apiClient.get('/api/v1/resources/availability');
    },
    async getPredictiveResourceLoad() {
      return apiClient.get('/api/v1/resources/predictive-load');
    },
    async allocateResource(resourceId, patientId) {
      return apiClient.post(`/api/v1/resources/${resourceId}/allocate`, { patientId });
    },
    async releaseResource(resourceId) {
      return apiClient.post(`/api/v1/resources/${resourceId}/release`);
    },
    async setResourceMaintenance(resourceId, maintenanceData) {
      return apiClient.post(`/api/v1/resources/${resourceId}/maintenance`, maintenanceData);
    },

    // ==================== INVENTORY MANAGEMENT ====================
    async getMedications() {
      return apiClient.get('/api/v1/inventory/medications');
    },
    async updateMedicationStock(medicationId, stockUpdate) {
      return apiClient.put(`/api/v1/inventory/medications/${medicationId}/stock`, stockUpdate);
    },
    async getLowStockAlerts() {
      return apiClient.get('/api/v1/inventory/alerts/low-stock');
    },

    // ==================== ANALYTICS ====================
    async getAnalytics() {
      return apiClient.get('/api/v1/analytics');
    },

    // ==================== UTILITIES ====================
    setAuthToken(token) {
      localStorage.setItem('authToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    clearAuthToken() {
      localStorage.removeItem('authToken');
      delete apiClient.defaults.headers.common['Authorization'];
    },
    getAuthToken() {
      return localStorage.getItem('authToken');
    }
  }

export default apiService;
