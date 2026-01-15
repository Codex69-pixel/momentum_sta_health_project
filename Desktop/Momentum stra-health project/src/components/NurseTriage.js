import React, { useState } from 'react';
import { User, Phone, Heart, Activity, Save, FileText, Pill, TestTube, Mail, CheckCircle, XCircle } from 'lucide-react';

export function NurseTriage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Section 1: Patient Information
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    parentGuardianName: '',
    sex: '',
    mailingAddress: '',
    city: '',
    postalCode: '',
    country: '',
    homePhone: '',
    mobilePhone: '',
    fax: '',
    email: '',
    
    // Section 2: Medical History - Past Illnesses
    chickenPox: { had: false, when: '' },
    rubella: { had: false, when: '' },
    measles: { had: false, when: '' },
    mumps: { had: false, when: '' },
    diabetes: { had: false, when: '' },
    tuberculosis: { had: false, when: '' },
    hepatitis: { had: false, when: '' },
    epilepsy: { had: false, when: '' },
    mentalIllness: { had: false, when: '' },
    eatingDisorder: { had: false, when: '' },
    sleepingDisorder: { had: false, when: '' },
    
    // Section 3: Personal Medical History
    allergies: '',
    regularMedications: '',
    learningProblems: '',
    dietaryRequirements: '',
    accidentHistory: '',
    
    // Section 4: Medical Examination by Nurse/Doctor
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heightCm: '',
    weightKg: '',
    pulseRate: '',
    
    // Laboratory Tests/Immunizations
    tbBCG: { status: '', date: '', doses: '' },
    whoopingCough: { status: '', date: '', doses: '' },
    tetanus: { status: '', date: '', doses: '' },
    poliomyelitis: { status: '', date: '', doses: '' },
    diphtheria: { status: '', date: '', doses: '' },
    hepatitisVaccine: { status: '', date: '', doses: '' },
    diabetesTest: { status: '', date: '', doses: '' },
    
    // Physical Examination Areas
    mouthThroat: { normal: true, notes: '' },
    eyesEars: { normal: true, notes: '' },
    neckHead: { normal: true, notes: '' },
    skinCondition: { normal: true, notes: '' },
    chestsLungs: { normal: true, notes: '' },
    heartBloodVessels: { normal: true, notes: '' },
    digestiveSystem: { normal: true, notes: '' },
    nervousSystem: { normal: true, notes: '' },
    skeletalMuscular: { normal: true, notes: '' },
    urinaryReproductive: { normal: true, notes: '' },
    others: { normal: true, notes: '' },
    
    // Additional
    chiefComplaint: '',
    additionalComments: '',
    nurseNotes: ''
  });

  const medicalHistoryItems = [
    { key: 'chickenPox', label: 'Chicken Pox' },
    { key: 'rubella', label: 'Rubella' },
    { key: 'measles', label: 'Measles' },
    { key: 'mumps', label: 'Mumps' },
    { key: 'diabetes', label: 'Diabetes' },
    { key: 'tuberculosis', label: 'Tuberculosis' },
    { key: 'hepatitis', label: 'Hepatitis A/B/C' },
    { key: 'epilepsy', label: 'Epilepsy' },
    { key: 'mentalIllness', label: 'Mental Illness' },
    { key: 'eatingDisorder', label: 'Eating Disorder' },
    { key: 'sleepingDisorder', label: 'Sleeping Disorder' }
  ];

  const immunizationTests = [
    { key: 'tbBCG', label: 'Tuberculosis (BCG)' },
    { key: 'whoopingCough', label: 'Whooping Cough' },
    { key: 'tetanus', label: 'Tetanus' },
    { key: 'poliomyelitis', label: 'Poliomyelitis' },
    { key: 'diphtheria', label: 'Diphtheria' },
    { key: 'hepatitisVaccine', label: 'Hepatitis A/B & C' },
    { key: 'diabetesTest', label: 'Diabetes' }
  ];

  const physicalExamAreas = [
    { key: 'mouthThroat', label: 'Mouth & Throat' },
    { key: 'eyesEars', label: 'Eyes & Ears' },
    { key: 'neckHead', label: 'Neck & Head' },
    { key: 'skinCondition', label: 'Skin Condition' },
    { key: 'chestsLungs', label: 'Chests & Lungs' },
    { key: 'heartBloodVessels', label: 'Heart & Blood Vessels' },
    { key: 'digestiveSystem', label: 'Digestive System' },
    { key: 'nervousSystem', label: 'Nervous System' },
    { key: 'skeletalMuscular', label: 'Skeletal, Muscular System' },
    { key: 'urinaryReproductive', label: 'Urinary, Reproductive System' },
    { key: 'others', label: 'Others (Specify)' }
  ];

  const handleMedicalHistoryChange = (key, field, value) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], [field]: value }
    });
  };

  const handleImmunizationChange = (key, field, value) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], [field]: value }
    });
  };

  const handlePhysicalExamChange = (key, field, value) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], [field]: value }
    });
  };

  const handleSubmit = () => {
    const straId = `STRA-${Date.now().toString().slice(-8)}`;
    const dateOfBirth = `${formData.birthDay}/${formData.birthMonth}/${formData.birthYear}`;
    
    alert(`✅ Medical Examination Completed!\n\nSTRA-ID: ${straId}\nPatient: ${formData.name}\nDate of Birth: ${dateOfBirth}\nSex: ${formData.sex}\n\nVitals Summary:\n• BP: ${formData.bloodPressureSystolic}/${formData.bloodPressureDiastolic} mmHg\n• Pulse: ${formData.pulseRate} bpm\n• Height: ${formData.heightCm} cm\n• Weight: ${formData.weightKg} kg\n\nMedical assessment recorded successfully.\nPatient added to queue.`);
    
    // Reset form
    setStep(1);
    window.location.reload();
  };

  const totalSteps = 7;
  const stepTitles = [
    'Patient Information',
    'Medical History',
    'Personal Medical History',
    'Vital Signs',
    'Immunizations',
    'Physical Exam',
    'Review & Submit'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <h1 className="text-gray-900 mb-2 text-2xl font-bold">Medical Examination Form</h1>
          <p className="text-gray-600">Comprehensive patient medical assessment and examination</p>
        </div>

        {/* Progress Bar */}
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
          <div className="text-center text-gray-600 mt-3 text-sm">
            Step {step} of {totalSteps}: {' '}
            {step === 1 && 'Patient Information'}
            {step === 2 && 'Medical History'}
            {step === 3 && 'Personal Medical History'}
            {step === 4 && 'Vital Signs & Physical Measurements'}
            {step === 5 && 'Laboratory Tests & Immunizations'}
            {step === 6 && 'Physical Examination'}
            {step === 7 && 'Review & Submit'}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6" style={{ minHeight: '500px' }}>
          {/* Step 1: Patient Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <User className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Section 1: Patient Information</h3>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Birth Year *</label>
                  <input
                    type="number"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                    placeholder="YYYY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Month *</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.birthMonth}
                    onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                    placeholder="MM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Day *</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={formData.birthDay}
                    onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                    placeholder="DD"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Name of Parent/Guardian</label>
                <input
                  type="text"
                  value={formData.parentGuardianName}
                  onChange={(e) => setFormData({...formData, parentGuardianName: e.target.value})}
                  placeholder="Parent or guardian name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Sex *</label>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="Male"
                      checked={formData.sex === 'Male'}
                      onChange={(e) => setFormData({...formData, sex: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="Female"
                      checked={formData.sex === 'Female'}
                      onChange={(e) => setFormData({...formData, sex: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Mailing Address</label>
                <input
                  type="text"
                  value={formData.mailingAddress}
                  onChange={(e) => setFormData({...formData, mailingAddress: e.target.value})}
                  placeholder="Street address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    placeholder="Postal code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    placeholder="Country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Home Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.homePhone}
                    onChange={(e) => setFormData({...formData, homePhone: e.target.value})}
                    placeholder="Home phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobilePhone}
                    onChange={(e) => setFormData({...formData, mobilePhone: e.target.value})}
                    placeholder="Mobile phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Fax</label>
                  <input
                    type="tel"
                    value={formData.fax}
                    onChange={(e) => setFormData({...formData, fax: e.target.value})}
                    placeholder="Fax number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
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
            </div>
          )}

          {/* Step 2: Medical History */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Section 2: Have You Ever Had or Do You Suffer From</h3>
              </div>

              <div className="space-y-3">
                {medicalHistoryItems.map((item) => (
                  <div key={item.key} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="font-medium text-gray-900">{item.label}</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={item.key}
                            checked={!formData[item.key].had}
                            onChange={() => handleMedicalHistoryChange(item.key, 'had', false)}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">No</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={item.key}
                            checked={formData[item.key].had}
                            onChange={() => handleMedicalHistoryChange(item.key, 'had', true)}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">Yes</span>
                        </label>
                      </div>
                    </div>
                    {formData[item.key].had && (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={formData[item.key].when}
                          onChange={(e) => handleMedicalHistoryChange(item.key, 'when', e.target.value)}
                          placeholder="If yes, when?"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Personal Medical History */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <Pill className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Section 3: Personal Medical History</h3>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Do you have allergies? (Specify)</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  placeholder="Describe any allergies..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Do you take medication on a regular basis? (Specify)</label>
                <textarea
                  value={formData.regularMedications}
                  onChange={(e) => setFormData({...formData, regularMedications: e.target.value})}
                  placeholder="List regular medications..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Do you have learning problems? (Specify)</label>
                <textarea
                  value={formData.learningProblems}
                  onChange={(e) => setFormData({...formData, learningProblems: e.target.value})}
                  placeholder="Describe any learning problems..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Do you have any special dietary requirements? (Specify)</label>
                <textarea
                  value={formData.dietaryRequirements}
                  onChange={(e) => setFormData({...formData, dietaryRequirements: e.target.value})}
                  placeholder="Describe dietary requirements..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Have you ever had any accident with mental or physical impairment?</label>
                <textarea
                  value={formData.accidentHistory}
                  onChange={(e) => setFormData({...formData, accidentHistory: e.target.value})}
                  placeholder="Describe any accidents or impairments..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Chief Complaint (Reason for Visit)</label>
                <textarea
                  value={formData.chiefComplaint}
                  onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
                  placeholder="Describe the main reason for visit..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 4: Vital Signs */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <Activity className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Section 4: Medical Report - Vital Signs & Physical Measurements</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Blood Pressure - Systolic (mmHg) *</label>
                  <input
                    type="number"
                    value={formData.bloodPressureSystolic}
                    onChange={(e) => setFormData({...formData, bloodPressureSystolic: e.target.value})}
                    placeholder="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Blood Pressure - Diastolic (mmHg) *</label>
                  <input
                    type="number"
                    value={formData.bloodPressureDiastolic}
                    onChange={(e) => setFormData({...formData, bloodPressureDiastolic: e.target.value})}
                    placeholder="80"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Height (cm) *</label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({...formData, heightCm: e.target.value})}
                    placeholder="170"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Weight (Kg) *</label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({...formData, weightKg: e.target.value})}
                    placeholder="70"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    <Heart className="inline w-4 h-4 mr-1" />
                    Pulse Rate (bpm) *
                  </label>
                  <input
                    type="number"
                    value={formData.pulseRate}
                    onChange={(e) => setFormData({...formData, pulseRate: e.target.value})}
                    placeholder="72"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Vital signs provide essential information about the patient's current health status. 
                  Ensure accurate measurements are taken.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Laboratory Tests & Immunizations */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <TestTube className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Required Laboratory Tests / Information</h3>
              </div>

              <div className="space-y-3">
                {immunizationTests.map((test) => (
                  <div key={test.key} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-gray-900">{test.label}</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`${test.key}-status`}
                            checked={formData[test.key].status === 'Yes'}
                            onChange={() => handleImmunizationChange(test.key, 'status', 'Yes')}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`${test.key}-status`}
                            checked={formData[test.key].status === 'No'}
                            onChange={() => handleImmunizationChange(test.key, 'status', 'No')}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">No</span>
                        </label>
                      </div>
                    </div>
                    {formData[test.key].status === 'Yes' && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Date(s)</label>
                          <input
                            type="text"
                            value={formData[test.key].date}
                            onChange={(e) => handleImmunizationChange(test.key, 'date', e.target.value)}
                            placeholder="Date(s)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Doses</label>
                          <input
                            type="text"
                            value={formData[test.key].doses}
                            onChange={(e) => handleImmunizationChange(test.key, 'doses', e.target.value)}
                            placeholder="Number of doses"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Physical Examination */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <Activity className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Physical Examination - Observation on Each Area</h3>
              </div>

              <div className="space-y-3">
                {physicalExamAreas.map((area, index) => (
                  <div key={area.key} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-gray-900">{index + 1}. {area.label}</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={area.key}
                            checked={formData[area.key].normal}
                            onChange={() => handlePhysicalExamChange(area.key, 'normal', true)}
                            className="w-4 h-4"
                          />
                          <span className="text-green-700 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Normal
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={area.key}
                            checked={!formData[area.key].normal}
                            onChange={() => handlePhysicalExamChange(area.key, 'normal', false)}
                            className="w-4 h-4"
                          />
                          <span className="text-red-700 flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            Abnormal
                          </span>
                        </label>
                      </div>
                    </div>
                    {!formData[area.key].normal && (
                      <div>
                        <textarea
                          value={formData[area.key].notes}
                          onChange={(e) => handlePhysicalExamChange(area.key, 'notes', e.target.value)}
                          placeholder="Describe abnormalities or observations..."
                          className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Additional Comments</label>
                <textarea
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({...formData, additionalComments: e.target.value})}
                  placeholder="Other observations, comments, or notes..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Nurse/Physician Notes</label>
                <textarea
                  value={formData.nurseNotes}
                  onChange={(e) => setFormData({...formData, nurseNotes: e.target.value})}
                  placeholder="Clinical notes and recommendations..."
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <Save className="w-6 h-6 text-blue-600" />
                <h3 className="text-gray-900 text-lg font-semibold">Review & Submit Medical Examination</h3>
              </div>

              {/* Patient Information Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.name || 'Not provided'}</span></div>
                  <div><span className="text-gray-600">DOB:</span> <span className="font-medium">{formData.birthDay}/{formData.birthMonth}/{formData.birthYear}</span></div>
                  <div><span className="text-gray-600">Sex:</span> <span className="font-medium">{formData.sex || 'Not provided'}</span></div>
                  <div><span className="text-gray-600">Mobile:</span> <span className="font-medium">{formData.mobilePhone || 'Not provided'}</span></div>
                </div>
              </div>

              {/* Vital Signs Summary */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Vital Signs</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-600">Blood Pressure:</span> <span className="font-medium">{formData.bloodPressureSystolic}/{formData.bloodPressureDiastolic} mmHg</span></div>
                  <div><span className="text-gray-600">Pulse Rate:</span> <span className="font-medium">{formData.pulseRate} bpm</span></div>
                  <div><span className="text-gray-600">Height:</span> <span className="font-medium">{formData.heightCm} cm</span></div>
                  <div><span className="text-gray-600">Weight:</span> <span className="font-medium">{formData.weightKg} kg</span></div>
                </div>
              </div>

              {/* Medical History Summary */}
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Medical History</h4>
                <div className="text-sm space-y-1">
                  {medicalHistoryItems.filter(item => formData[item.key].had).map(item => (
                    <div key={item.key}>
                      <span className="font-medium">{item.label}</span>
                      {formData[item.key].when && <span className="text-gray-600"> - {formData[item.key].when}</span>}
                    </div>
                  ))}
                  {medicalHistoryItems.filter(item => formData[item.key].had).length === 0 && (
                    <div className="text-gray-600">No significant medical history reported</div>
                  )}
                </div>
              </div>

              {/* Declaration */}
              <div className="p-4 border-2 border-blue-300 rounded-lg bg-blue-50">
                <h4 className="font-semibold text-gray-900 mb-2">Declaration</h4>
                <p className="text-sm text-gray-700">
                  I hereby certify that the above information is correct and that the general state of health, 
                  physical and mental condition of the patient has been assessed. The patient is suitable for 
                  medical care and treatment.
                </p>
              </div>

              <div className="text-center text-gray-600 text-sm">
                <p>By submitting this form, you confirm that all information provided is accurate and complete.</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation with Dropdown */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center flex-wrap gap-4">
          <select
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-medium"
          >
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <option key={s} value={s}>
                Step {s} of {totalSteps} - {stepTitles[s - 1]}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                step === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Submit Medical Form</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NurseTriage;
