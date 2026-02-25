import { PassportGuest } from '@/types/passport';
import { getAgeFromDob, isFutureDate } from '@/lib/helper';

export const isValidName = (s?: string): boolean => {
  if (!s) return false;
  if (s === '--') return false;
  return /^[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF' \-]+$/.test(s.trim());
};

export const isValidEmail = (s?: string): boolean => {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
};

export const isValidPhone = (s?: string): boolean => {
  if (!s) return false;
  const digits = s.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

export interface ValidateRequiredFieldsConfig {
  travelers: PassportGuest[];
  totalTravelers: number;
  adultCount: number;
  childCount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingData: {
    emergencyName: string;
    emergencyContact: string;
    medicalRestrictions: string;
    mealPreference: string;
    mealPreferenceOther: string;
    mobilityIssues: string[];
    mobilityOther: string;
    allergies: string[];
  };
  isFamilyBooking: boolean;
  paymentPlan: string;
}

export const validateRequiredFields = (
  config: ValidateRequiredFieldsConfig
): { valid: boolean; firstInvalid?: string } => {
  const {
    travelers,
    totalTravelers,
    adultCount,
    childCount,
    userName,
    userEmail,
    userPhone,
    bookingData,
    isFamilyBooking,
    paymentPlan,
  } = config;

  // 1. Traveler count mismatch
  if (travelers.length !== totalTravelers) {
    const missingIndex = travelers.length + 1;
    return { valid: false, firstInvalid: `travelerMissing_${missingIndex}` };
  }

  // 2. Primary traveler basic validation
  const primary = travelers[0];
  if (!primary) return { valid: false, firstInvalid: 'travelerCount' };

  if (!primary.firstName || !isValidName(primary.firstName))
    return { valid: false, firstInvalid: 'primaryFirstName' };
  if (!primary.lastName || !isValidName(primary.lastName))
    return { valid: false, firstInvalid: 'primaryLastName' };
  if (!primary.gender) return { valid: false, firstInvalid: 'primaryGender' };
  if (!primary.dob) return { valid: false, firstInvalid: 'primaryDob' };
  if (!primary.nationality || !isValidName(primary.nationality))
    return { valid: false, firstInvalid: 'primaryNationality' };

  for (let i = 1; i < travelers.length; i++) {
    const t = travelers[i];
    const idx = i + 1;
    if (!t.firstName || !isValidName(t.firstName))
      return { valid: false, firstInvalid: `traveler_${idx}_firstName` };
    if (!t.lastName || !isValidName(t.lastName))
      return { valid: false, firstInvalid: `traveler_${idx}_lastName` };
    if (!t.gender) return { valid: false, firstInvalid: `traveler_${idx}_gender` };
    if (!t.dob) return { valid: false, firstInvalid: `traveler_${idx}_dob` };
    if (!t.nationality || !isValidName(t.nationality))
      return { valid: false, firstInvalid: `traveler_${idx}_nationality` };
  }

  if (!userName || !userName.trim()) return { valid: false, firstInvalid: 'contactName' };
  if (!isValidName(userName)) return { valid: false, firstInvalid: 'contactNameInvalid' };
  if (!isValidEmail(userEmail)) return { valid: false, firstInvalid: 'contactEmail' };
  if (!isValidPhone(userPhone)) return { valid: false, firstInvalid: 'contactPhone' };
  if (!isValidName(bookingData.emergencyName))
    return { valid: false, firstInvalid: 'emergencyName' };
  if (!isValidPhone(bookingData.emergencyContact || ''))
    return { valid: false, firstInvalid: 'emergencyPhone' };
  if (!bookingData.medicalRestrictions.trim())
    return { valid: false, firstInvalid: 'medicalRestrictions' };
  if (!bookingData.mealPreference) return { valid: false, firstInvalid: 'mealPreference' };
  if (bookingData.mealPreference === 'Other' && !bookingData.mealPreferenceOther.trim())
    return { valid: false, firstInvalid: 'mealPreferenceOther' };
  if (!bookingData.mobilityIssues || bookingData.mobilityIssues.length === 0)
    return { valid: false, firstInvalid: 'mobilityIssues' };
  if (bookingData.mobilityIssues.includes('Other') && !bookingData.mobilityOther.trim())
    return { valid: false, firstInvalid: 'mobilityOther' };
  if (!bookingData.allergies || bookingData.allergies.length === 0)
    return { valid: false, firstInvalid: 'allergies' };

  let invalidAdultCount = 0;
  let invalidChildCount = 0;

  for (let i = 0; i < travelers.length; i++) {
    const t = travelers[i];
    if (!t.dob) continue;
    if (isFutureDate(t.dob)) {
      return {
        valid: false,
        firstInvalid: i === 0 ? 'primaryDobInvalid' : `traveler_${i + 1}_dobInvalid`,
      };
    }
    const age = getAgeFromDob(t.dob);
    const isAdultSelected = i < adultCount;
    if (isAdultSelected && age < 12) invalidAdultCount++;
    if (!isAdultSelected && age >= 12) invalidChildCount++;
  }

  if (invalidAdultCount > 0) return { valid: false, firstInvalid: 'adultAgeMismatch' };
  if (invalidChildCount > 0) return { valid: false, firstInvalid: 'childAgeMismatch' };

  if (!isFamilyBooking) {
    if (!paymentPlan) return { valid: false, firstInvalid: 'paymentPlan' };
  }

  return { valid: true };
};
