"use client";

import React, { useState, useEffect } from 'react';
import {  useSearchParams } from 'next/navigation';
import { useProtectedPage } from '@/hooks/useProtectedPage'; 
import { isValidPhoneNumber } from 'react-phone-number-input';

// Components
import Popup from '@/components/Popup';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/landing/Footer';
import BookingStepper from './BookingStepper';
import BookingSummary from './BookingSummary';
import TravelerDetails from './MemberDetails';

// Logic Hook
import { useBookingSubmit } from '@/hooks/useTahitiBooking';

// Types
import { MemberDetails, BookingCounts, BookingData } from '@/types/booking';

const BookingFlow: React.FC = () => {
  const searchParams = useSearchParams();
  const { isReady, isAuthenticated } = useProtectedPage();
  
  // -- Business Logic Hook --
  const { submitBooking, isLoading, error, clearError } = useBookingSubmit();

  // -- UI State --
  const [popup, setPopup] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);
  
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState(""); 
  const [userPhoneCode, setUserPhoneCode] = useState(""); 
  const [isPhoneEditable, setIsPhoneEditable] = useState(true);

  const [bookingData, setBookingData] = useState<BookingData>({
    destination: "Tahiti",
    departureDate: "6th Nov 2025",
    travelerCount: 2,
    price: 2499
  });

  // Step 1 State
  const [counts, setCounts] = useState<BookingCounts>({ adults: 1, children: 0 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [members, setMembers] = useState<MemberDetails[]>(Array(10).fill(null).map((_, i) => ({
    id: i.toString(), 
    prefix: '', 
    firstName: '', 
    middleName: '', 
    lastName: '', 
    gender: '', 
    dateOfBirth: '', 
    nationality: '',
    passportFile: undefined,
    passportUrl: '' 
  })));

  // -- Effects --
  useEffect(() => {
    // Sync hook errors to UI popup
    if (error) setPopup({ message: error, type: 'error' });
  }, [error]);

  // Load User Data
  useEffect(() => {
    if (isReady && isAuthenticated && typeof window !== "undefined") {
      let attempts = 0;
      const maxAttempts = 10;

      const loadUserData = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            if (user.name || user.email || user.phone) {
                setUserName(user.name || user.firstName || "");
                setUserEmail(user.email || "");
                const rawPhone = user.phone || user.phoneNumber || user.mobile || "";
                
                if (rawPhone && rawPhone.length > 5) {
                    setUserPhone(rawPhone); 
                    setIsPhoneEditable(false);
                } else {
                    setIsPhoneEditable(true);
                }
                return true;
            }
          } catch (e) {
            console.error("Error parsing user data", e);
          }
        }
        return false;
      };

      if (loadUserData()) return;
      const intervalId = setInterval(() => {
        attempts++;
        if (loadUserData() || attempts >= maxAttempts) clearInterval(intervalId);
      }, 200);
      return () => clearInterval(intervalId);
    }
  }, [isReady, isAuthenticated]);

  // Load Params
  useEffect(() => {
    const destination = searchParams?.get('destination');
    const date = searchParams?.get('date');
    const price = searchParams?.get('price');
    if (destination && date && price) {
      setBookingData(prev => ({ ...prev, destination, departureDate: date, price: parseFloat(price) }));
    }
  }, [searchParams]);

  // -- Handlers --
  const updateMember = (
    index: number,
    field: keyof MemberDetails | 'passportFile',
    value: string | undefined | File
  ) => {
    const newMembers = [...members];
    if (typeof value === 'string' && (field === 'firstName' || field === 'lastName' || field === 'middleName')) {
        if (value !== '' && !/^[a-zA-Z\s]*$/.test(value)) return;
    }
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
    
    // Clear error for this field
    if (errors[`${index}_${field}`]) {
        const newErrors = { ...errors };
        delete newErrors[`${index}_${field}`];
        setErrors(newErrors);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let firstErrorMessage = ""; 
    let isValid = true;
    const totalTravelers = counts.adults + counts.children;

    if (!userName.trim()) { 
        newErrors['contact_name'] = "Contact Name is required"; 
        isValid = false; 
        if (!firstErrorMessage) firstErrorMessage = "Please enter Contact Name";
    }
    if (!userEmail.trim()) { 
        newErrors['contact_email'] = "Contact Email is required"; 
        isValid = false; 
        if (!firstErrorMessage) firstErrorMessage = "Please enter Contact Email";
    }
    
    const fullPhone = userPhoneCode ? `${userPhoneCode}${userPhone}` : userPhone;
    
    if (!userPhone) {
        newErrors['contact_phone'] = "Mobile number is required"; 
        isValid = false;
        if (!firstErrorMessage) firstErrorMessage = "Please enter Mobile Number";
    } else if (fullPhone && !isValidPhoneNumber(fullPhone)) {
        newErrors['contact_phone'] = "Invalid Mobile Number"; 
        isValid = false;
        if (!firstErrorMessage) firstErrorMessage = "Please enter a valid mobile number";
    }

    for (let i = 0; i < totalTravelers; i++) {
        const member = members[i];
        const setError = (field: string, msg: string) => {
            newErrors[`${i}_${field}`] = msg;
            isValid = false;
            if (!firstErrorMessage) firstErrorMessage = `Traveler ${i+1}: ${msg}`;
        };

        if (!member.prefix) setError('prefix', "details required");
        if (!member.firstName) setError('firstName', "details required");
        if (!member.lastName) setError('lastName', "details required");
        if (!member.gender) setError('gender', "details required");
        if (!member.nationality) setError('nationality', "details required");
        
        if (!member.dateOfBirth) { 
            setError('dateOfBirth', "details required");
        } else {
            const age = calculateAge(member.dateOfBirth);
            const isAdultSlot = i < counts.adults;
            if (isAdultSlot && age < 12) setError('dateOfBirth', "Must be 12+ (Adult)");
            if (!isAdultSlot && age >= 12) setError('dateOfBirth', "Must be under 12 (Child)");
        }
    }

    setErrors(newErrors);
    return { isValid, firstErrorMessage };
  };

  const handleNext = async () => {
    try {
      await submitBooking({
        userData: { 
            name: userName, 
            email: userEmail, 
            phone: userPhoneCode ? `${userPhoneCode}${userPhone}` : userPhone 
        },
        counts,
        members,
        validateForm
      });
    } catch (e: unknown) {
      if (!error) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setPopup({ message: errorMessage, type: 'error' });
      }
    }
  };

  const handleClosePopup = () => {
    setPopup(null);
    clearError();
  };

  if (!isReady) return <div className="min-h-screen bg-[#F4EFE7] flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <main>
      <Navbar />
      {popup && <Popup message={popup.message} type={popup.type} onClose={handleClosePopup} />}
      <div className="min-h-screen bg-[#F4EFE7] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Stepper fixed at step 1 as we redirect after completion */}
          <BookingStepper currentStep={1} /> 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <TravelerDetails 
                   userData={{ name: userName, email: userEmail, phone: userPhone }}
                   userPhoneCode={userPhoneCode}
                   setUserData={{
                      setName: setUserName,
                      setEmail: setUserEmail,
                      setPhone: setUserPhone,
                      setPhoneCode: setUserPhoneCode
                   }}
                   isPhoneEditable={isPhoneEditable}
                   counts={counts}
                   setCounts={setCounts}
                   members={members}
                   updateMember={updateMember}
                   errors={errors}
                   onNext={handleNext}
                   isLoading={isLoading}
                />
            </div>
            <div className="lg:col-span-1">
              <BookingSummary 
                bookingData={bookingData}
                additionalMembersCount={(counts.adults + counts.children) - 1}
                currentStep={1}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
};

export default BookingFlow;