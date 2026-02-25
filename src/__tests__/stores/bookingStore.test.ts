import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies before importing the store
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('react-phone-number-input', () => ({
  isValidPhoneNumber: (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  },
}));

import { useBookingStore } from '@/stores/bookingStore';

describe('bookingStore', () => {
  beforeEach(() => {
    useBookingStore.getState().reset();
    localStorage.clear();
  });

  // --- validateForm() ---
  describe('validateForm', () => {
    it('fails when all fields empty — contact name', () => {
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('Contact Name');
    });

    it('fails on email when only userName set', () => {
      useBookingStore.setState({ userName: 'John' });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('Email');
    });

    it('fails on traveler prefix when contact info valid', () => {
      useBookingStore.setState({
        userName: 'John',
        userEmail: 'j@e.com',
        userPhone: '1234567890',
        userPhoneCode: '+1',
      });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('Traveler 1');
    });

    it('validates adult age < 12 shows error', () => {
      // Set up a member in adult slot with age < 12
      const members = useBookingStore.getState().members.map((m, i) => {
        if (i === 0) {
          return {
            ...m,
            prefix: 'Mr',
            firstName: 'Kid',
            lastName: 'Test',
            gender: 'male',
            nationality: 'US',
            dateOfBirth: new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0],
          };
        }
        return m;
      });
      useBookingStore.setState({
        userName: 'John',
        userEmail: 'j@e.com',
        userPhone: '1234567890',
        userPhoneCode: '+1',
        counts: { adults: 1, children: 0 },
        members,
      });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('Must be 12+');
    });

    it('validates child age >= 12 shows error', () => {
      const members = useBookingStore.getState().members.map((m, i) => {
        if (i === 0) {
          return {
            ...m,
            prefix: 'Mr',
            firstName: 'Adult',
            lastName: 'Test',
            gender: 'male',
            nationality: 'US',
            dateOfBirth: new Date(new Date().getFullYear() - 30, 0, 1).toISOString().split('T')[0],
          };
        }
        if (i === 1) {
          return {
            ...m,
            prefix: 'Mr',
            firstName: 'Teen',
            lastName: 'Test',
            gender: 'male',
            nationality: 'US',
            dateOfBirth: new Date(new Date().getFullYear() - 14, 0, 1).toISOString().split('T')[0],
          };
        }
        return m;
      });
      useBookingStore.setState({
        userName: 'John',
        userEmail: 'j@e.com',
        userPhone: '1234567890',
        userPhoneCode: '+1',
        counts: { adults: 1, children: 1 },
        members,
      });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('Must be under 12');
    });

    it('fails on invalid phone number', () => {
      useBookingStore.setState({
        userName: 'John',
        userEmail: 'j@e.com',
        userPhone: '12',
        userPhoneCode: '+1',
      });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('mobile number');
    });

    it('passes when everything is valid', () => {
      const members = useBookingStore.getState().members.map((m, i) => {
        if (i === 0) {
          return {
            ...m,
            prefix: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            nationality: 'US',
            dateOfBirth: new Date(new Date().getFullYear() - 30, 0, 1).toISOString().split('T')[0],
          };
        }
        return m;
      });
      useBookingStore.setState({
        userName: 'John',
        userEmail: 'j@e.com',
        userPhone: '1234567890',
        userPhoneCode: '+1',
        counts: { adults: 1, children: 0 },
        members,
      });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(true);
    });

    it('fails on missing dateOfBirth', () => {
      const members = useBookingStore.getState().members.map((m, i) => {
        if (i === 0) {
          return {
            ...m,
            prefix: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            nationality: 'US',
            dateOfBirth: '',
          };
        }
        return m;
      });
      useBookingStore.setState({
        userName: 'John',
        userEmail: 'j@e.com',
        userPhone: '1234567890',
        userPhoneCode: '+1',
        counts: { adults: 1, children: 0 },
        members,
      });
      const result = useBookingStore.getState().validateForm();
      expect(result.isValid).toBe(false);
      expect(result.firstErrorMessage).toContain('details required');
    });
  });

  // --- updateMember() ---
  describe('updateMember', () => {
    it('updates name correctly', () => {
      useBookingStore.getState().updateMember(0, 'firstName', 'Jane');
      expect(useBookingStore.getState().members[0].firstName).toBe('Jane');
    });

    it('rejects name with digits', () => {
      useBookingStore.getState().updateMember(0, 'firstName', 'Jane');
      useBookingStore.getState().updateMember(0, 'firstName', 'Jane123');
      expect(useBookingStore.getState().members[0].firstName).toBe('Jane');
    });

    it('updates non-name field (gender) normally', () => {
      useBookingStore.getState().updateMember(0, 'gender', 'male');
      expect(useBookingStore.getState().members[0].gender).toBe('male');
    });

    it('clears error key after update', () => {
      useBookingStore.setState({ errors: { '0_firstName': 'required' } });
      useBookingStore.getState().updateMember(0, 'firstName', 'Jane');
      expect(useBookingStore.getState().errors['0_firstName']).toBeUndefined();
    });
  });

  // --- loadUserFromStorage() ---
  describe('loadUserFromStorage', () => {
    it('no user in localStorage — no change', () => {
      useBookingStore.getState().loadUserFromStorage();
      expect(useBookingStore.getState().userName).toBe('');
    });

    it('user with long phone — phone set, isPhoneEditable false', () => {
      localStorage.setItem('user', JSON.stringify({ name: 'Jay', email: 'j@e.com', phone: '+1234567890' }));
      useBookingStore.getState().loadUserFromStorage();
      expect(useBookingStore.getState().userName).toBe('Jay');
      expect(useBookingStore.getState().userPhone).toBe('+1234567890');
      expect(useBookingStore.getState().isPhoneEditable).toBe(false);
    });

    it('user with short phone — isPhoneEditable true', () => {
      localStorage.setItem('user', JSON.stringify({ name: 'Jay', email: 'j@e.com', phone: '+1' }));
      useBookingStore.getState().loadUserFromStorage();
      expect(useBookingStore.getState().isPhoneEditable).toBe(true);
    });
  });

  // --- reset() ---
  describe('reset', () => {
    it('returns all state to initial defaults', () => {
      useBookingStore.setState({ userName: 'Jay', userEmail: 'j@e.com' });
      useBookingStore.getState().reset();
      expect(useBookingStore.getState().userName).toBe('');
      expect(useBookingStore.getState().userEmail).toBe('');
      expect(useBookingStore.getState().counts).toEqual({ adults: 1, children: 0 });
    });
  });
});
