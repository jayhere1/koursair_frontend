import { describe, it, expect } from 'vitest';
import {
  isValidName,
  isValidEmail,
  isValidPhone,
  validateRequiredFields,
  type ValidateRequiredFieldsConfig,
} from '@/utils/kenyaBookingValidation';

describe('isValidName', () => {
  it('returns false for undefined', () => expect(isValidName(undefined)).toBe(false));
  it('returns false for empty string', () => expect(isValidName('')).toBe(false));
  it('returns false for "--"', () => expect(isValidName('--')).toBe(false));
  it('returns true for "John"', () => expect(isValidName('John')).toBe(true));
  it('returns true for accented "Jose"', () => expect(isValidName('Jos\u00E9')).toBe(true));
  it('returns true for hyphenated "Mary-Jane"', () => expect(isValidName('Mary-Jane')).toBe(true));
  it("returns true for apostrophe \"O'Brien\"", () => expect(isValidName("O'Brien")).toBe(true));
  it('returns false for digits', () => expect(isValidName('John123')).toBe(false));
  it('returns false for special chars', () => expect(isValidName('John@Doe')).toBe(false));
  it('returns true for spaces "John Doe"', () => expect(isValidName('John Doe')).toBe(true));
});

describe('isValidEmail', () => {
  it('returns false for undefined', () => expect(isValidEmail(undefined)).toBe(false));
  it('returns false for empty', () => expect(isValidEmail('')).toBe(false));
  it('returns false for no @', () => expect(isValidEmail('john')).toBe(false));
  it('returns false for no domain', () => expect(isValidEmail('john@')).toBe(false));
  it('returns true for valid email', () => expect(isValidEmail('john@example.com')).toBe(true));
  it('returns false for spaces', () => expect(isValidEmail('john @example.com')).toBe(false));
});

describe('isValidPhone', () => {
  it('returns false for undefined', () => expect(isValidPhone(undefined)).toBe(false));
  it('returns false for empty', () => expect(isValidPhone('')).toBe(false));
  it('returns false for too short (< 7 digits)', () => expect(isValidPhone('123')).toBe(false));
  it('returns true for 7 digits', () => expect(isValidPhone('1234567')).toBe(true));
  it('returns true for phone with country code', () => expect(isValidPhone('+1-234-567-8900')).toBe(true));
  it('returns false for 16+ digits', () => expect(isValidPhone('1234567890123456')).toBe(false));
});

describe('validateRequiredFields', () => {
  const makeTraveler = (overrides = {}) => ({
    id: 1,
    prefix: 'Mr',
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    gender: 'Male',
    dob: '1990-06-15',
    nationality: 'US',
    ...overrides,
  });

  const makeConfig = (overrides: Partial<ValidateRequiredFieldsConfig> = {}): ValidateRequiredFieldsConfig => ({
    travelers: [makeTraveler()],
    totalTravelers: 1,
    adultCount: 1,
    childCount: 0,
    userName: 'John',
    userEmail: 'john@example.com',
    userPhone: '+1234567890',
    bookingData: {
      emergencyName: 'Jane',
      emergencyContact: '+1234567890',
      medicalRestrictions: 'None',
      mealPreference: 'Vegan',
      mealPreferenceOther: '',
      mobilityIssues: ['None'],
      mobilityOther: '',
      allergies: ['None'],
    },
    isFamilyBooking: false,
    paymentPlan: 'FULL',
    ...overrides,
  });

  it('valid config → { valid: true }', () => {
    expect(validateRequiredFields(makeConfig())).toEqual({ valid: true });
  });

  it('traveler count mismatch', () => {
    const result = validateRequiredFields(makeConfig({ travelers: [], totalTravelers: 1 }));
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toContain('travelerMissing');
  });

  it('missing primary firstName', () => {
    const result = validateRequiredFields(
      makeConfig({ travelers: [makeTraveler({ firstName: '' })] })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('primaryFirstName');
  });

  it('missing primary gender', () => {
    const result = validateRequiredFields(
      makeConfig({ travelers: [makeTraveler({ gender: '' })] })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('primaryGender');
  });

  it('missing contactName', () => {
    const result = validateRequiredFields(makeConfig({ userName: '' }));
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('contactName');
  });

  it('invalid contactName', () => {
    const result = validateRequiredFields(makeConfig({ userName: 'John123' }));
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('contactNameInvalid');
  });

  it('invalid email', () => {
    const result = validateRequiredFields(makeConfig({ userEmail: 'notanemail' }));
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('contactEmail');
  });

  it('invalid phone', () => {
    const result = validateRequiredFields(makeConfig({ userPhone: '12' }));
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('contactPhone');
  });

  it('missing emergency name', () => {
    const result = validateRequiredFields(
      makeConfig({
        bookingData: {
          ...makeConfig().bookingData,
          emergencyName: '',
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('emergencyName');
  });

  it('missing meal preference', () => {
    const result = validateRequiredFields(
      makeConfig({
        bookingData: {
          ...makeConfig().bookingData,
          mealPreference: '',
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('mealPreference');
  });

  it('meal preference "Other" without detail', () => {
    const result = validateRequiredFields(
      makeConfig({
        bookingData: {
          ...makeConfig().bookingData,
          mealPreference: 'Other',
          mealPreferenceOther: '',
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('mealPreferenceOther');
  });

  it('empty mobility issues', () => {
    const result = validateRequiredFields(
      makeConfig({
        bookingData: {
          ...makeConfig().bookingData,
          mobilityIssues: [],
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('mobilityIssues');
  });

  it('mobility "Other" without detail', () => {
    const result = validateRequiredFields(
      makeConfig({
        bookingData: {
          ...makeConfig().bookingData,
          mobilityIssues: ['Other'],
          mobilityOther: '',
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('mobilityOther');
  });

  it('empty allergies', () => {
    const result = validateRequiredFields(
      makeConfig({
        bookingData: {
          ...makeConfig().bookingData,
          allergies: [],
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('allergies');
  });

  it('adult age < 12 → adultAgeMismatch', () => {
    const childDob = new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0];
    const result = validateRequiredFields(
      makeConfig({ travelers: [makeTraveler({ dob: childDob })] })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('adultAgeMismatch');
  });

  it('child age >= 12 → childAgeMismatch', () => {
    const adultDob = new Date(new Date().getFullYear() - 30, 0, 1).toISOString().split('T')[0];
    const teenDob = new Date(new Date().getFullYear() - 14, 0, 1).toISOString().split('T')[0];
    const result = validateRequiredFields(
      makeConfig({
        travelers: [makeTraveler({ dob: adultDob }), makeTraveler({ id: 2, dob: teenDob })],
        totalTravelers: 2,
        adultCount: 1,
        childCount: 1,
      })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('childAgeMismatch');
  });

  it('future DOB → primaryDobInvalid', () => {
    const result = validateRequiredFields(
      makeConfig({ travelers: [makeTraveler({ dob: '2099-01-01' })] })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('primaryDobInvalid');
  });

  it('no payment plan when not family → paymentPlan', () => {
    const result = validateRequiredFields(
      makeConfig({ paymentPlan: '', isFamilyBooking: false })
    );
    expect(result.valid).toBe(false);
    expect(result.firstInvalid).toBe('paymentPlan');
  });

  it('family booking skips payment plan check', () => {
    const result = validateRequiredFields(
      makeConfig({ paymentPlan: '', isFamilyBooking: true })
    );
    expect(result.valid).toBe(true);
  });
});
