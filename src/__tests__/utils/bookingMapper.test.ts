import { describe, it, expect } from 'vitest';
import { buildBookingPayload } from '@/utils/bookingMapper';
import type { MemberDetails } from '@/types/booking';

const makeMember = (overrides: Partial<MemberDetails> = {}): MemberDetails => ({
  id: '1',
  prefix: 'Mr',
  firstName: 'John',
  middleName: '',
  lastName: 'Doe',
  gender: 'male',
  dateOfBirth: '1990-06-15',
  nationality: 'US',
  passportFile: undefined,
  passportUrl: '',
  ...overrides,
});

describe('buildBookingPayload', () => {
  it('single adult — primary set, members empty, counts correct', () => {
    const result = buildBookingPayload(
      { name: 'John', email: 'j@e.com', phone: '+1234' },
      { adults: 1, children: 0 },
      [{ member: makeMember(), url: 'https://s3.com/p.jpg' }]
    );
    expect(result.traveller_details.primary_traveller.first_name).toBe('John');
    expect(result.traveller_details.members).toHaveLength(0);
    expect(result.traveller_details.number_of_adults).toBe(1);
    expect(result.traveller_details.number_of_children).toBe(0);
  });

  it('formats date as DD-MM-YYYY', () => {
    const result = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ dateOfBirth: '1990-06-15' }), url: '' }]
    );
    expect(result.traveller_details.primary_traveller.dob).toBe('15-06-1990');
  });

  it('maps gender correctly', () => {
    const maleResult = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ gender: 'male' }), url: '' }]
    );
    expect(maleResult.traveller_details.primary_traveller.gender).toBe('Male');

    const femaleResult = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ gender: 'female' }), url: '' }]
    );
    expect(femaleResult.traveller_details.primary_traveller.gender).toBe('Female');

    const otherResult = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ gender: 'other' }), url: '' }]
    );
    expect(otherResult.traveller_details.primary_traveller.gender).toBe('Other');
  });

  it('maps field names correctly (firstName -> first_name)', () => {
    const result = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ firstName: 'Jane', lastName: 'Smith' }), url: '' }]
    );
    expect(result.traveller_details.primary_traveller.first_name).toBe('Jane');
    expect(result.traveller_details.primary_traveller.last_name).toBe('Smith');
  });

  it('handles empty middleName', () => {
    const result = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ middleName: '' }), url: '' }]
    );
    expect(result.traveller_details.primary_traveller.middle_name).toBe('');
  });

  it('handles multiple members — primary + 2 in members array', () => {
    const result = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 2, children: 1 },
      [
        { member: makeMember({ firstName: 'Primary' }), url: 'u1' },
        { member: makeMember({ id: '2', firstName: 'Second' }), url: 'u2' },
        { member: makeMember({ id: '3', firstName: 'Third' }), url: 'u3' },
      ]
    );
    expect(result.traveller_details.primary_traveller.first_name).toBe('Primary');
    expect(result.traveller_details.members).toHaveLength(2);
    expect(result.traveller_details.members[0].first_name).toBe('Second');
    expect(result.traveller_details.members[1].first_name).toBe('Third');
  });

  it('handles empty dateOfBirth', () => {
    const result = buildBookingPayload(
      { name: 'A', email: 'a@b.com', phone: '+1' },
      { adults: 1, children: 0 },
      [{ member: makeMember({ dateOfBirth: '' }), url: '' }]
    );
    expect(result.traveller_details.primary_traveller.dob).toBe('');
  });
});
