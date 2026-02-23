export interface MemberDetails {
  id: string;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  passportFile?: File;
  passportUrl?: string;
}

export interface BookingCounts {
  adults: number;
  children: number;
}

export interface AdditionalMember {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  gender: string;
}

export interface BookingData {
  destination: string;
  departureDate: string;
  travelerCount: number;
  price: number;
}

export interface TravelerApiSchema {
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  dob: string; // DD-MM-YYYY
  nationality: string;
  passport: string; // URL
}

export interface BookingPayload {
  name: string;
  email: string;
  phone_number: string;
  traveller_details: {
    number_of_adults: number;
    number_of_children: number;
    primary_traveller: TravelerApiSchema;
    members: TravelerApiSchema[];
  };
  payment_plan: {
    id: number;
    payment_type: "Full";
  };
}

export interface BookingResponseData {
  payment_id: number;
  total_payable_amount: number;
  currency: string;
  // ... add other fields if needed
}