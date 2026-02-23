"use client";
import React, { useState, useMemo, useRef } from 'react';
import { Upload, ChevronRight, Plus, Minus, ChevronDown, ChevronUp, FileCheck, Trash2, Loader2 } from 'lucide-react';
import countryList from 'react-select-country-list'; 
import { MemberDetails, BookingCounts } from '@/types/booking';
import { uploadFile } from '@/services/kenyaApi';
import Popup from '@/components/Popup';
import { CustomSelect } from '@/components/UIComponents/customselect';

// --- NEW IMPORTS ---
import 'react-phone-number-input/style.css'
import PhoneInputWithCountrySelect, { parsePhoneNumber, Value } from "react-phone-number-input";


interface Props {
  userData: { name: string; email: string; phone: string };
  userPhoneCode: string;
  setUserData: { 
    setName: (val: string) => void; 
    setEmail: (val: string) => void; 
    setPhone: (val: string) => void; 
    setPhoneCode: (val: string) => void;
  };
  isPhoneEditable: boolean;
  counts: BookingCounts;
  setCounts: (counts: BookingCounts) => void;
  members: MemberDetails[];
  updateMember: (index: number, field: keyof MemberDetails | 'passportFile', value: string | File) => void;
  errors: Record<string, string>;
  onNext: () => void;
  isLoading: boolean;
}

const TravelerDetails: React.FC<Props> = ({
  userData,
  userPhoneCode,
  setUserData,
  isPhoneEditable,
  counts,
  setCounts,
  members,
  updateMember,
  errors,
  onNext,
  isLoading
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const [expandedTraveler, setExpandedTraveler] = useState<number | null>(0);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [uploadingPassportIds, setUploadingPassportIds] = useState<number[]>([]);
  const [localPopup, setLocalPopup] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);

  // Prepare static options for Select components
  const titleOptions = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Miss", label: "Miss" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // Prepare country options
  const nationalityOptions = useMemo(() => 
    options.map(c => ({ value: c.label, label: c.label })), 
  [options]);

  const toggleTraveler = (index: number) => {
    setExpandedTraveler(expandedTraveler === index ? null : index);
  };

  const handleCountChange = (type: 'adults' | 'children', operation: 'inc' | 'dec') => {
    const current = counts[type];
    if (operation === 'dec' && current === 0) return;
    if (type === 'adults' && operation === 'dec' && current === 1) return;
    const newCount = operation === 'inc' ? current + 1 : current - 1;
    setCounts({ ...counts, [type]: newCount });
    if (operation === 'inc') setExpandedTraveler(counts.adults + counts.children);
  };

  const handleFileClick = (index: number) => fileInputRefs.current[index]?.click();
  const handleFileChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateMember(index, 'passportFile', file);
    await handlePassportUpload(index, file);
  };

  const handlePassportUpload = async (index: number, file: File) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || undefined
        : undefined;
    try {
      setUploadingPassportIds((prev) => [...prev, index]);
      const url = await uploadFile(file, token);
      updateMember(index, 'passportUrl', url);
    } catch (err) {
      console.error("Passport upload failed", err);
      setLocalPopup({
        message: "Passport upload failed. Please try again.",
        type: "error",
      });
      updateMember(index, 'passportFile', '');
    } finally {
      setUploadingPassportIds((prev) => prev.filter((x) => x !== index));
    }
  };

  const handlePassportDelete = (index: number) => {
    updateMember(index, 'passportFile', '');
    updateMember(index, 'passportUrl', '');
  };

  const totalTravelers = counts.adults + counts.children;
  
  const getInputClass = (errorKey: string, disabled: boolean = false) => {
    const base = "w-full h-11 px-4 border rounded-lg outline-none transition-colors";
    if (disabled) return `${base} bg-gray-50 text-gray-500 cursor-not-allowed border-gray-300`;
    if (errors[errorKey]) return `${base} bg-white border-red-500 focus:ring-1 focus:ring-red-500`;
    return `${base} bg-white border-gray-300 focus:ring-1 focus:ring-[#222D65]`;
  };

  const handlePhoneChange = (value?: Value) => {
    if (value) {
       const parsed = parsePhoneNumber(value);
       if (parsed) {
         setUserData.setPhoneCode(`+${parsed.countryCallingCode}`);
         setUserData.setPhone(parsed.nationalNumber);
       } else {
         setUserData.setPhone(value);
       }
    } else {
       setUserData.setPhone('');
    }
  };

  const currentPhoneValue = userData.phone
    ? (userData.phone.startsWith('+') 
        ? userData.phone 
        : `+${(userPhoneCode || '').replace('+', '')}${userData.phone}`)
    : undefined;

  return (
    <>
      {localPopup && <Popup message={localPopup.message} type={localPopup.type} onClose={() => setLocalPopup(null)} />}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
      
      {/* 1. Contact Information */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              value={userData.name} 
              disabled={true} 
              className={getInputClass('contact_name', true)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="text" 
              value={userData.email} 
              disabled={true} 
              className={getInputClass('contact_email', true)}
            />
          </div>
          
          <div className="w-full">
            <label className="block text-xs font-bold text-gray-700 mb-1">Mobile</label>
            <PhoneInputWithCountrySelect
                value={currentPhoneValue as Value}
                onChange={handlePhoneChange}
                international
                defaultCountry="IN"
                countryCallingCodeEditable={false}
                disabled={!isPhoneEditable}
                placeholder="Enter mobile number"
                className={`flex w-full h-11 items-center px-4 rounded-lg text-sm outline-none transition-all ${
                  errors['contact_phone'] 
                  ? "border border-red-500 ring-1 ring-red-500" 
                  : (!isPhoneEditable ? "bg-gray-50 border-1 border-gray-300 opacity-70" : "bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-[#222D65]")
                }`}
                numberInputProps={{
                  className: "border-none outline-none focus:outline-none focus:ring-0 w-full h-full ml-2 bg-transparent", 
                }}
            />
            {errors['contact_phone'] && <p className="text-xs text-red-500 mt-1">{errors['contact_phone']}</p>}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 2. Travelers Counters */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-4">Travelers</h2>
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <div>
                <span className="font-medium text-gray-800 block">Adults</span>
                <span className="text-xs text-gray-500">12+ years</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleCountChange('adults', 'dec')} className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-bold text-[#253B80]">{counts.adults}</span>
              <button onClick={() => handleCountChange('adults', 'inc')} className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex items-center justify-between">
             <div>
                <span className="font-medium text-gray-800 block">Children</span>
                <span className="text-xs text-gray-500">Below 12 years</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleCountChange('children', 'dec')} className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-bold text-[#253B80]">{counts.children}</span>
              <button onClick={() => handleCountChange('children', 'inc')} className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 3. Traveler Details Accordion */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Traveler Details</h2>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
            {totalTravelers} Traveler(s) Added
          </span>
        </div>
        
        <p className="text-sm text-gray-500 italic mb-6">
          Please enter information exactly as it appears on your PASSPORT.
        </p>

        {members.slice(0, totalTravelers).map((member, index) => {
          const isOpen = expandedTraveler === index;
          const isAdult = index < counts.adults;
          const travelerLabel = isAdult ? "Adult" : "Child";
          const fileName = member.passportFile ? member.passportFile.name : null;
          
          return (
            <div key={index} className={`border rounded-lg mb-4 overflow-hidden transition-all duration-200 ${
                isOpen ? 'bg-white border-blue-200 shadow-md' : 'bg-gray-50 border-gray-300'
            }`}>
              <div 
                onClick={() => toggleTraveler(index)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isOpen ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                      <h3 className={`font-bold text-base ${isOpen ? 'text-primary' : 'text-gray-600'}`}>
                        {`Traveler ${index + 1}`}
                      </h3>
                      <span className="text-xs text-gray-500 font-medium">({travelerLabel})</span>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </div>

              {isOpen && (
                <div className="p-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Title <span className="text-red-500">*</span></label>
                      <CustomSelect 
                        value={member.prefix}
                        options={titleOptions}
                        onChange={(val) => updateMember(index, 'prefix', val)}
                        className={getInputClass(`${index}_prefix`)}
                        placeholder="Select..."
                        // No search needed for Mr/Mrs
                      />
                      {errors[`${index}_prefix`] && <span className="text-[10px] text-red-500">Required</span>}
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">First Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={member.firstName}
                        onChange={(e) => updateMember(index, 'firstName', e.target.value)}
                        placeholder="First Name"
                        className={getInputClass(`${index}_firstName`)}
                      />
                      {errors[`${index}_firstName`] && <span className="text-[10px] text-red-500">Required</span>}
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Middle Name</label>
                      <input 
                        type="text" 
                        value={member.middleName}
                        placeholder="(optional)"
                        onChange={(e) => updateMember(index, 'middleName', e.target.value)}
                        className={getInputClass(`${index}_middleName`)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Last Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={member.lastName}
                        onChange={(e) => updateMember(index, 'lastName', e.target.value)}
                        placeholder="Last Name"
                        className={getInputClass(`${index}_lastName`)}
                      />
                      {errors[`${index}_lastName`] && <span className="text-[10px] text-red-500">Required</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Gender <span className="text-red-500">*</span></label>
                      <CustomSelect 
                        value={member.gender}
                        options={genderOptions}
                        onChange={(val) => updateMember(index, 'gender', val)}
                        className={getInputClass(`${index}_gender`)}
                        placeholder="Select..."
                        // No search needed for Male/Female
                      />
                      {errors[`${index}_gender`] && <span className="text-[10px] text-red-500">Required</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Date of Birth <span className="text-red-500">*</span></label>
                      <input 
                        type="date" 
                        value={member.dateOfBirth}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => updateMember(index, 'dateOfBirth', e.target.value)}
                        className={getInputClass(`${index}_dateOfBirth`)}
                      />
                      {errors[`${index}_dateOfBirth`] && <span className="text-[10px] text-red-500">{errors[`${index}_dateOfBirth`]}</span>}
                    </div>

                    {/* NATIONALITY - ENABLE SEARCH HERE */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nationality <span className="text-red-500">*</span></label>
                      <CustomSelect 
                        value={member.nationality}
                        options={nationalityOptions}
                        onChange={(val) => updateMember(index, 'nationality', val)}
                        className={getInputClass(`${index}_nationality`)}
                        placeholder="Select Nationality"
                        searchable={true} // <--- Makes this a typing field
                      />
                      {errors[`${index}_nationality`] && <span className="text-[10px] text-red-500">Required</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Passport Copy (Front Page)</label>
                    <input 
                        type="file" 
                        ref={(el) => { fileInputRefs.current[index] = el; }}
                        onChange={(e) => handleFileChange(index, e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        disabled={uploadingPassportIds.includes(index)}
                    />
                    <div className="relative">
                      <div 
                          onClick={() => !uploadingPassportIds.includes(index) && handleFileClick(index)}
                          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors ${
                              uploadingPassportIds.includes(index) 
                                ? 'bg-gray-50 border-gray-300 cursor-wait' 
                                : fileName || member.passportUrl
                                ? 'bg-blue-50 border-primary cursor-pointer hover:bg-blue-100' 
                                : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
                          }`}
                      >
                        {uploadingPassportIds.includes(index) ? (
                           <>
                              <Loader2 className="w-8 h-8 text-primary mb-2 animate-spin" />
                              <span className="font-bold text-primary">Uploading...</span>
                              <span className="text-xs text-gray-500 mt-1">Please wait</span>
                           </>
                        ) : (fileName || member.passportUrl) ? (
                           <>
                              <FileCheck className="w-8 h-8 text-primary mb-2" />
                              <span className="font-bold text-primary">{fileName || 'Passport uploaded'}</span>
                              <span className="text-xs text-gray-500 mt-1">Click to change</span>
                           </>
                        ) : (
                           <>
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="font-bold text-gray-600">Click to Upload Passport Copy</span>
                              <span className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max 5MB)</span>
                           </>
                        )}
                      </div>
                      {(fileName || member.passportUrl) && !uploadingPassportIds.includes(index) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePassportDelete(index);
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete passport"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={isLoading}
        aria-busy={isLoading}
        className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-xl hover:bg-[#1a2350] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Continue to Payment"}
        {!isLoading && <ChevronRight className="w-5 h-5" />}
      </button>

      </div>
    </>
  );
};

export default TravelerDetails;