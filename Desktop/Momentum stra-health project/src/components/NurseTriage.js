import React, { useState } from 'react';
import { User, Phone, Calendar, Heart, Thermometer, Activity, Droplet, Wind, AlertCircle, Save, FileText, Pill, TestTube, MapPin, Mail } from 'lucide-react';

export function NurseTriage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    emergencyContact: '',
    email: '',
    temperature: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    painScale: '',
    height: '',
    weight: '',
    symptoms: [],
    chiefComplaint: '',
    allergies: '',
    regularMedications: ''
  });

  const symptomsList = [
    'Chest Pain', 'Shortness of Breath', 'Fever', 'Headache',
    'Abdominal Pain', 'Nausea/Vomiting', 'Dizziness', 'Cough',
    'Bleeding', 'Injury/Trauma', 'Weakness', 'Fatigue'
  ];

  const calculateTriageScore = () => {
    let score = 0;
    const rr = parseInt(formData.respiratoryRate);
    if (rr < 9 || rr > 24) score += 2;
    else if ((rr >= 9 && rr <= 11) || (rr >= 21 && rr <= 24)) score += 1;
    
    const spo2 = parseInt(formData.oxygenSaturation);
    if (spo2 < 92) score += 3;
    else if (spo2 >= 92 && spo2 <= 93) score += 2;
    else if (spo2 >= 94 && spo2 <= 95) score += 1;
    
    const temp = parseFloat(formData.temperature);
    if (temp < 36.1 || temp > 38.5) score += 1;
    
    const hr = parseInt(formData.heartRate);
    if (hr < 40 || hr > 131) score += 2;
    else if ((hr >= 41 && hr <= 50) || (hr >= 101 && hr <= 110)) score += 1;
    
    return score;
  };

  const getUrgencyLevel = (score) => {
    if (score >= 4) return { level: 'RED', label: 'Critical', color: 'bg-red-500' };
    if (score >= 2) return { level: 'YELLOW', label: 'Urgent', color: 'bg-yellow-500' };
    return { level: 'GREEN', label: 'Non-Urgent', color: 'bg-green-500' };
  };

  const handleSubmit = () => {
    const score = calculateTriageScore();
    const urgency = getUrgencyLevel(score);
    const straId = `STRA-${Date.now().toString().slice(-8)}`;
    
    alert(`✅ Patient Successfully Registered!\n\nSTRA-ID: ${straId}\nPatient: ${formData.firstName} ${formData.lastName}\n\nTriage Assessment:\nMEWS Score: ${score}\nUrgency: ${urgency.level} - ${urgency.label}\n\nVitals Summary:\n• BP: ${formData.systolicBP}/${formData.diastolicBP} mmHg\n• HR: ${formData.heartRate} bpm\n• Temp: ${formData.temperature}°C\n• SpO₂: ${formData.oxygenSaturation}%\n\nPatient added to queue.`);
    
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      emergencyContact: '',
      email: '',
      temperature: '',
      systolicBP: '',
      diastolicBP: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      painScale: '',
      height: '',
      weight: '',
      symptoms: [],
      chiefComplaint: '',
      allergies: '',
      regularMedications: ''
    });
  };

  const totalSteps = 5;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <h1 className="text-gray-900 mb-2 text-2xl font-bold">Comprehensive Patient Registration & Triage</h1>
          <p className="text-gray-600">Complete medical assessment and triage classification</p>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step >= s ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < totalSteps && (
                  <div className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600 mt-3">
            Step {step} of {totalSteps}: {' '}
            {step === 1 && 'Patient Demographics'}
            {step === 2 && 'Vital Signs & Measurements'}
            {step === 3 && 'Current Symptoms'}
            {step === 4 && 'Personal Medical Information'}
            {step === 5 && 'Review & Submit'}
          </div>
        </div>

        <div className="p-6" style={{ minHeight: '500px' }}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <User className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Patient Demographics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="First name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <Activity className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Vital Signs & Physical Measurements</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Thermometer className="inline w-4 h-4 mr-1" />
                    Temperature (°C) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    placeholder="36.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Heart className="inline w-4 h-4 mr-1" />
                    Heart Rate (bpm) *
                  </label>
                  <input
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                    placeholder="72"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Wind className="inline w-4 h-4 mr-1" />
                    Respiratory Rate *
                  </label>
                  <input
                    type="number"
                    value={formData.respiratoryRate}
                    onChange={(e) => setFormData({...formData, respiratoryRate: e.target.value})}
                    placeholder="16"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Droplet className="inline w-4 h-4 mr-1" />
                    SpO₂ (%) *
                  </label>
                  <input
                    type="number"
                    value={formData.oxygenSaturation}
                    onChange={(e) => setFormData({...formData, oxygenSaturation: e.target.value})}
                    placeholder="98"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Systolic BP (mmHg) *</label>
                  <input
                    type="number"
                    value={formData.systolicBP}
                    onChange={(e) => setFormData({...formData, systolicBP: e.target.value})}
                    placeholder="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Diastolic BP (mmHg) *</label>
                  <input
                    type="number"
                    value={formData.diastolicBP}
                    onChange={(e) => setFormData({...formData, diastolicBP: e.target.value})}
                    placeholder="80"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Pain Scale (0-10)</label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">No Pain</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.painScale}
                    onChange={(e) => setFormData({...formData, painScale: e.target.value})}
                    className="flex-1"
                  />
                  <span className="text-gray-600 text-sm">Severe</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg min-w-[40px] text-center">
                    {formData.painScale || '0'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Current Symptoms</h3>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Chief Complaint</label>
                <textarea
                  value={formData.chiefComplaint}
                  onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
                  placeholder="Describe the main reason for visit..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-3">Select All Applicable Symptoms *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {symptomsList.map((symptom) => (
                    <label key={symptom} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.symptoms.includes(symptom)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, symptoms: [...formData.symptoms, symptom]});
                          } else {
                            setFormData({...formData, symptoms: formData.symptoms.filter(s => s !== symptom)});
                          }
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-900">{symptom}</span>
                    </label>
                  ))}
                </div>

                {formData.symptoms.length > 0 && (
                  <div className="mt-4">
                    <div className="text-blue-900 mb-2">Selected Symptoms ({formData.symptoms.length}):</div>
                    <div className="flex flex-wrap gap-2">
                      {formData.symptoms.map((symptom) => (
                        <span key={symptom} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <Pill className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Personal Medical Information</h3>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Do you have any allergies? (Specify)</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  placeholder="e.g., Penicillin, Peanuts, Latex, etc."
                  className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Regular Medications (Specify)</label>
                <textarea
                  value={formData.regularMedications}
                  onChange={(e) => setFormData({...formData, regularMedications: e.target.value})}
                  placeholder="e.g., Metformin 500mg, Lisinopril 10mg, etc."
                  className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  placeholder="Contact details"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Review & Submit</h3>
              </div>

              {formData.temperature && formData.heartRate && formData.systolicBP && (
                <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                  <h4 className="mb-3 font-semibold">Triage Assessment</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-blue-100 text-sm mb-1">MEWS Score</div>
                      <div className="text-2xl font-bold">{calculateTriageScore()}</div>
                    </div>
                    <div>
                      <div className="text-blue-100 text-sm mb-1">Urgency Level</div>
                      <div className="text-2xl font-bold">{getUrgencyLevel(calculateTriageScore()).level}</div>
                    </div>
                    <div>
                      <div className="text-blue-100 text-sm mb-1">Classification</div>
                      <div className="text-2xl font-bold">{getUrgencyLevel(calculateTriageScore()).label}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Patient Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Chief Complaint:</strong> {formData.chiefComplaint || 'Not specified'}</p>
                  <p><strong>Symptoms:</strong> {formData.symptoms.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </span>
            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Complete Registration</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}