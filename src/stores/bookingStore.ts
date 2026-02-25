import { create } from 'zustand';
import { MemberDetails, BookingCounts, BookingData } from '@/types/booking';
import { isValidPhoneNumber } from 'react-phone-number-input';

interface BookingState {
  userName: string;
  userEmail: string;
  userPhone: string;
  userPhoneCode: string;
  isPhoneEditable: boolean;
  bookingData: BookingData;
  counts: BookingCounts;
  members: MemberDetails[];
  errors: Record<string, string>;

  // Actions
  setUserName: (v: string) => void;
  setUserEmail: (v: string) => void;
  setUserPhone: (v: string) => void;
  setUserPhoneCode: (v: string) => void;
  setIsPhoneEditable: (v: boolean) => void;
  setBookingData: (data: Partial<BookingData>) => void;
  setCounts: (counts: BookingCounts) => void;
  setErrors: (errors: Record<string, string>) => void;
  updateMember: (index: number, field: keyof MemberDetails | 'passportFile', value: string | undefined | File) => void;
  validateForm: () => { isValid: boolean; firstErrorMessage: string };
  loadUserFromStorage: () => void;
  reset: () => void;
}

const createInitialMembers = (): MemberDetails[] =>
  Array(10).fill(null).map((_, i) => ({
    id: i.toString(),
    prefix: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    passportFile: undefined,
    passportUrl: '',
  }));

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

export const useBookingStore = create<BookingState>()((set, get) => ({
  userName: '',
  userEmail: '',
  userPhone: '',
  userPhoneCode: '',
  isPhoneEditable: true,
  bookingData: {
    destination: 'Tahiti',
    departureDate: '6th Nov 2025',
    travelerCount: 2,
    price: 2499,
  },
  counts: { adults: 1, children: 0 },
  members: createInitialMembers(),
  errors: {},

  setUserName: (v) => set({ userName: v }),
  setUserEmail: (v) => set({ userEmail: v }),
  setUserPhone: (v) => set({ userPhone: v }),
  setUserPhoneCode: (v) => set({ userPhoneCode: v }),
  setIsPhoneEditable: (v) => set({ isPhoneEditable: v }),
  setBookingData: (data) => set((s) => ({ bookingData: { ...s.bookingData, ...data } })),
  setCounts: (counts) => set({ counts }),
  setErrors: (errors) => set({ errors }),

  updateMember: (index, field, value) => {
    const { members, errors } = get();
    if (typeof value === 'string' && (field === 'firstName' || field === 'lastName' || field === 'middleName')) {
      if (value !== '' && !/^[a-zA-Z\s]*$/.test(value)) return;
    }
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };

    const newErrors = { ...errors };
    const errorKey = `${index}_${field}`;
    if (newErrors[errorKey]) {
      delete newErrors[errorKey];
    }
    set({ members: newMembers, errors: newErrors });
  },

  validateForm: () => {
    const { userName, userEmail, userPhone, userPhoneCode, counts, members } = get();
    const newErrors: Record<string, string> = {};
    let firstErrorMessage = '';
    let isValid = true;
    const totalTravelers = counts.adults + counts.children;

    if (!userName.trim()) {
      newErrors['contact_name'] = 'Contact Name is required';
      isValid = false;
      if (!firstErrorMessage) firstErrorMessage = 'Please enter Contact Name';
    }
    if (!userEmail.trim()) {
      newErrors['contact_email'] = 'Contact Email is required';
      isValid = false;
      if (!firstErrorMessage) firstErrorMessage = 'Please enter Contact Email';
    }

    const fullPhone = userPhoneCode ? `${userPhoneCode}${userPhone}` : userPhone;
    if (!userPhone) {
      newErrors['contact_phone'] = 'Mobile number is required';
      isValid = false;
      if (!firstErrorMessage) firstErrorMessage = 'Please enter Mobile Number';
    } else if (fullPhone && !isValidPhoneNumber(fullPhone)) {
      newErrors['contact_phone'] = 'Invalid Mobile Number';
      isValid = false;
      if (!firstErrorMessage) firstErrorMessage = 'Please enter a valid mobile number';
    }

    for (let i = 0; i < totalTravelers; i++) {
      const member = members[i];
      const setError = (field: string, msg: string) => {
        newErrors[`${i}_${field}`] = msg;
        isValid = false;
        if (!firstErrorMessage) firstErrorMessage = `Traveler ${i + 1}: ${msg}`;
      };

      if (!member.prefix) setError('prefix', 'details required');
      if (!member.firstName) setError('firstName', 'details required');
      if (!member.lastName) setError('lastName', 'details required');
      if (!member.gender) setError('gender', 'details required');
      if (!member.nationality) setError('nationality', 'details required');

      if (!member.dateOfBirth) {
        setError('dateOfBirth', 'details required');
      } else {
        const age = calculateAge(member.dateOfBirth);
        const isAdultSlot = i < counts.adults;
        if (isAdultSlot && age < 12) setError('dateOfBirth', 'Must be 12+ (Adult)');
        if (!isAdultSlot && age >= 12) setError('dateOfBirth', 'Must be under 12 (Child)');
      }
    }

    set({ errors: newErrors });
    return { isValid, firstErrorMessage };
  },

  loadUserFromStorage: () => {
    if (typeof window === 'undefined') return;
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      if (user.name || user.email || user.phone) {
        set({
          userName: user.name || user.firstName || '',
          userEmail: user.email || '',
        });
        const rawPhone = user.phone || user.phoneNumber || user.mobile || '';
        if (rawPhone && rawPhone.length > 5) {
          set({ userPhone: rawPhone, isPhoneEditable: false });
        } else {
          set({ isPhoneEditable: true });
        }
      }
    } catch (e) {
      console.error('Error parsing user data', e);
    }
  },

  reset: () => set({
    userName: '',
    userEmail: '',
    userPhone: '',
    userPhoneCode: '',
    isPhoneEditable: true,
    bookingData: { destination: 'Tahiti', departureDate: '6th Nov 2025', travelerCount: 2, price: 2499 },
    counts: { adults: 1, children: 0 },
    members: createInitialMembers(),
    errors: {},
  }),
}));
