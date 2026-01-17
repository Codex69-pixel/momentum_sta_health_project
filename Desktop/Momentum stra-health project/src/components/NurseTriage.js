import React, { useState, useMemo } from 'react';
import {
  User, Heart, Activity, Save, FileText, AlertCircle,
  CheckCircle, ArrowRight, ArrowLeft,
  Thermometer, Zap, Droplet, Wind, Gauge, Ruler
} from 'lucide-react';

export function NurseTriage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Demographics
    name: '',
    dob: '',
    gender: '',
    homePhone: '',
    mobilePhone: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    address: '',
    city: '',

    // Step 2: Vital Signs
    temperature: '',
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    respiratoryRate: '',
    spo2: '',
    height: '',
    weight: '',

    // Step 3: Symptoms
    chiefComplaint: '',
    symptoms: [],
    symptomDuration: '',
    severity: '',

    // Step 4: Medical History
    allergies: '',
    medications: '',
    pastConditions: [],
    surgicalHistory: '',
    familyHistory: '',

    // Step 5: Review
    triageNotes: ''
  });

  const [errors, setErrors] = useState({});

  const symptoms = [
    'Fever', 'Cough', 'Shortness of Breath', 'Chest Pain', 'Abdominal Pain',
    'Headache', 'Dizziness', 'Nausea/Vomiting', 'Fatigue', 'Body Aches'
  ];

  const pastConditions = [
    'Hypertension', 'Diabetes', 'Asthma', 'Heart Disease', 'Cancer',
    'Thyroid Disease', 'Arthritis', 'Kidney Disease'
  ];

  // Calculate MEWS Score
  const calculateMEWS = useMemo(() => {
    let score = 0;

    // Respiratory Rate
    const rr = parseInt(formData.respiratoryRate);
    if (rr >= 25) score += 2;
    else if (rr >= 21) score += 1;

    // Heart Rate
    const hr = parseInt(formData.heartRate);
    if (hr >= 131) score += 2;
    else if ((hr >= 111 && hr <= 130) || (hr >= 41 && hr <= 50)) score += 1;

    // Systolic BP
    const sbp = parseInt(formData.bloodPressureSystolic);
    if (sbp >= 201) score += 2;
    else if ((sbp >= 181 && sbp <= 200) || (sbp >= 71 && sbp <= 80)) score += 1;

    // SpO2
    const spo2 = parseInt(formData.spo2);
    if (spo2 <= 91) score += 2;
    else if (spo2 <= 93) score += 1;

    // Temperature
    const temp = parseFloat(formData.temperature);
    if (temp >= 39) score += 2;
    else if ((temp >= 38.5 && temp < 39) || (temp >= 35.1 && temp <= 36)) score += 1;

    return score;
  }, [formData.respiratoryRate, formData.heartRate, formData.bloodPressureSystolic, 
      formData.spo2, formData.temperature]);

  const triageLevel = useMemo(() => {
    if (calculateMEWS >= 5) return { level: 'RED', status: 'CRITICAL', color: 'from-red-500 to-red-600' };
    if (calculateMEWS >= 2) return { level: 'YELLOW', status: 'URGENT', color: 'from-yellow-500 to-yellow-600' };
    return { level: 'GREEN', status: 'STABLE', color: 'from-green-500 to-green-600' };
  }, [calculateMEWS]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleConditionToggle = (condition) => {
    setFormData(prev => ({
      ...prev,
      pastConditions: prev.pastConditions.includes(condition)
        ? prev.pastConditions.filter(c => c !== condition)
        : [...prev.pastConditions, condition]
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.dob) newErrors.dob = 'DOB is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.mobilePhone) newErrors.mobilePhone = 'Mobile phone is required';
        break;
      case 2:
        if (!formData.temperature) newErrors.temperature = 'Temperature is required';
        if (!formData.heartRate) newErrors.heartRate = 'Heart rate is required';
        if (!formData.bloodPressureSystolic) newErrors.bloodPressureSystolic = 'Systolic BP is required';
        if (!formData.bloodPressureDiastolic) newErrors.bloodPressureDiastolic = 'Diastolic BP is required';
        if (!formData.respiratoryRate) newErrors.respiratoryRate = 'Respiratory rate is required';
        if (!formData.spo2) newErrors.spo2 = 'SpO2 is required';
        break;
      case 3:
        if (!formData.chiefComplaint) newErrors.chiefComplaint = 'Chief complaint is required';
        if (formData.symptoms.length === 0) newErrors.symptoms = 'Select at least one symptom';
        break;
      case 4:
        if (!formData.allergies) newErrors.allergies = 'Allergy information is required';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 5) setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log('Submitting form:', formData);
      alert('Patient registered successfully!\nPatient ID: STRA-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0'));
      setStep(1);
      setFormData({
        name: '', dob: '', gender: '', homePhone: '', mobilePhone: '', email: '',
        emergencyContactName: '', emergencyContactPhone: '', address: '', city: '',
        temperature: '', heartRate: '', bloodPressureSystolic: '', bloodPressureDiastolic: '',
        respiratoryRate: '', spo2: '', height: '', weight: '',
        chiefComplaint: '', symptoms: [], symptomDuration: '', severity: '',
        allergies: '', medications: '', pastConditions: [], surgicalHistory: '', familyHistory: '', triageNotes: ''
      });
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-teal-50/30 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Nurse Triage Assessment</h1>
          <p className="text-gray-600">Complete 5-step patient assessment for optimal care</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Step {step} of 5</span>
            <span className="text-sm font-semibold text-blue-600">{Math.round((step/5)*100)}%</span>
          </div>
          <div className="flex items-center space-x-2">
            {[1,2,3,4,5].map((s) => (
              <div key={s} className="flex-1">
                <button
                  onClick={() => s < step && setStep(s)}
                  className={`w-full h-2 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-gradient-to-r from-teal-600 to-teal-700' : 'bg-gray-200'
                  }`}
                  disabled={s > step}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 animate-fadeIn">
          
          {/* Step 1: Demographics */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Patient Demographics
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter patient's full name"
                    className="input-field"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                  {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Mobile Phone *</label>
                  <input
                    type="tel"
                    name="mobilePhone"
                    value={formData.mobilePhone}
                    onChange={handleInputChange}
                    placeholder="+254 712 345 678"
                    className="input-field"
                  />
                  {errors.mobilePhone && <p className="text-red-600 text-sm mt-1">{errors.mobilePhone}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Home Phone</label>
                  <input
                    type="tel"
                    name="homePhone"
                    value={formData.homePhone}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="input-field"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="patient@email.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      placeholder="Contact person name"
                      className="input-field"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone</label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      placeholder="Contact number"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vital Signs */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                <Heart className="w-6 h-6 mr-2 text-red-600" />
                Vital Signs Assessment
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Temperature (°C)', name: 'temperature', icon: Thermometer, color: 'text-red-600' },
                  { label: 'Heart Rate (bpm)', name: 'heartRate', icon: Activity, color: 'text-pink-600' },
                  { label: 'Systolic BP (mmHg)', name: 'bloodPressureSystolic', icon: Zap, color: 'text-blue-600' },
                  { label: 'Diastolic BP (mmHg)', name: 'bloodPressureDiastolic', icon: Zap, color: 'text-blue-600' },
                  { label: 'Respiratory Rate', name: 'respiratoryRate', icon: Wind, color: 'text-teal-600' },
                  { label: 'SpO₂ (%)', name: 'spo2', icon: Droplet, color: 'text-cyan-600' }
                ].map((vital) => {
                  const Icon = vital.icon;
                  return (
                    <div key={vital.name} className="input-group">
                      <label className="input-label flex items-center">
                        <Icon className={`w-4 h-4 mr-2 ${vital.color}`} />
                        {vital.label} *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name={vital.name}
                        value={formData[vital.name]}
                        onChange={handleInputChange}
                        placeholder="Enter value"
                        className="input-field"
                      />
                      {errors[vital.name] && <p className="text-red-600 text-sm mt-1">{errors[vital.name]}</p>}
                    </div>
                  );
                })}

                <div className="input-group">
                  <label className="input-label flex items-center">
                    <Ruler className="w-4 h-4 mr-2 text-green-600" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Height in cm"
                    className="input-field"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label flex items-center">
                    <Gauge className="w-4 h-4 mr-2 text-purple-600" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight in kg"
                    className="input-field"
                  />
                </div>
              </div>

              {/* MEWS Score Display */}
              <div className={`bg-gradient-to-r ${triageLevel.color} text-white rounded-2xl p-6 shadow-lg`}>
                <h3 className="text-lg font-bold mb-2">MEWS Score: {calculateMEWS}</h3>
                <p className="text-white/90">Triage Level: <span className="font-bold text-lg">{triageLevel.level} - {triageLevel.status}</span></p>
              </div>
            </div>
          )}

          {/* Step 3: Symptoms */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
                Chief Complaint & Symptoms
              </h2>

              <div className="input-group">
                <label className="input-label">Chief Complaint *</label>
                <textarea
                  name="chiefComplaint"
                  value={formData.chiefComplaint}
                  onChange={handleInputChange}
                  placeholder="Describe the main reason for visit..."
                  rows="4"
                  className="input-field"
                />
                {errors.chiefComplaint && <p className="text-red-600 text-sm mt-1">{errors.chiefComplaint}</p>}
              </div>

              <div>
                <label className="input-label mb-3">Symptoms Present *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {symptoms.map((symptom) => (
                    <label key={symptom} className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleSymptomToggle(symptom)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">{symptom}</span>
                    </label>
                  ))}
                </div>
                {errors.symptoms && <p className="text-red-600 text-sm mt-2">{errors.symptoms}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Duration of Symptoms</label>
                  <input
                    type="text"
                    name="symptomDuration"
                    value={formData.symptomDuration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 days"
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Severity</label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select severity</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical History */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                <FileText className="w-6 h-6 mr-2 text-purple-600" />
                Medical History
              </h2>

              <div className="input-group">
                <label className="input-label">Allergies *</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="List any known allergies (medications, food, etc.)"
                  rows="3"
                  className="input-field"
                />
                {errors.allergies && <p className="text-red-600 text-sm mt-1">{errors.allergies}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Current Medications</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="List current medications with dosages"
                  rows="3"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label mb-3">Past Medical Conditions</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {pastConditions.map((condition) => (
                    <label key={condition} className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.pastConditions.includes(condition)}
                        onChange={() => handleConditionToggle(condition)}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                      <span className="text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Surgical History</label>
                <textarea
                  name="surgicalHistory"
                  value={formData.surgicalHistory}
                  onChange={handleInputChange}
                  placeholder="List any previous surgeries"
                  rows="3"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Family Medical History</label>
                <textarea
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleInputChange}
                  placeholder="Any significant family medical history"
                  rows="3"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Step 5: Review & Summary */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                Review & Triage Assessment
              </h2>

              {/* Triage Badge */}
              <div className={`bg-gradient-to-r ${triageLevel.color} text-white rounded-2xl p-6 shadow-lg mb-6`}>
                <h3 className="text-2xl font-bold mb-2">{triageLevel.level} - {triageLevel.status}</h3>
                <p className="text-white/90">MEWS Score: {calculateMEWS} points</p>
              </div>

              {/* Patient Summary */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Patient Information</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <p><span className="font-semibold text-gray-700">Name:</span> {formData.name}</p>
                  <p><span className="font-semibold text-gray-700">Phone:</span> {formData.mobilePhone}</p>
                  <p><span className="font-semibold text-gray-700">DOB:</span> {formData.dob}</p>
                  <p><span className="font-semibold text-gray-700">Gender:</span> {formData.gender}</p>
                </div>

                <h3 className="font-bold text-gray-900 mt-6">Chief Complaint</h3>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-gray-800">{formData.chiefComplaint}</p>
                </div>

                <h3 className="font-bold text-gray-900 mt-6">Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.symptoms.map((symptom) => (
                    <span key={symptom} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Triage Notes</label>
                <textarea
                  name="triageNotes"
                  value={formData.triageNotes}
                  onChange={handleInputChange}
                  placeholder="Additional notes for clinical staff..."
                  rows="4"
                  className="input-field"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 gap-4">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-sm text-gray-600 font-medium">
            Step {step} of 5
          </div>

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 btn btn-primary"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 btn btn-success px-8"
            >
              <Save className="w-4 h-4" />
              <span>Complete Registration</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
