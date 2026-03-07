import { BASE_URL } from "@/utils/apiConfig";

export interface NameDetail {
  name: string;
  details?: string;
}

export interface HealthDietary {
  dietry_preferences?: NameDetail[];
  mobility_issue?: NameDetail[];
  allergies_and_intolerances?: NameDetail[];
}

export interface EmergencyContact {
  name?: string;
  phone_number?: string;
  medical_condition?: string;
  additional_info?: string;
}


export interface TravellerDetails {
  number_of_adults?: number;
  number_of_children?: number;
  family_pack?: boolean;

  primary_traveller?: {
    prefix?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    gender?: string;
    dob?: string;
    nationality?: string;
    passport?: string;
  };

  members?: {
    prefix?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    gender?: string;
    dob?: string;
    nationality?: string;
    passport?: string;
  }[];

  health_dietry?: HealthDietary;
  emergency_contact?: EmergencyContact;
}


export type PrimaryTraveller = {
  prefix?: string;
  first_name?: string;
  middle_name?: string | null;
  last_name?: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  passport?: string;
};

export type TravellerMember = PrimaryTraveller;


export interface GetLastBookingResponse {
  success: boolean;
  message?: string;
  data?: {
    payment_id?: number;
    name?: string;
    email?: string;
    phone_number?: string;

    payment_type?: "Full" | "Half" | "Deposit";

    traveller_details?: TravellerDetails;

    total_fee?: number;
    total_payable_amount?: number;
    currency?: string;
  };
}

export type BookingPayload = {
  name: string;
  email: string;
  phone_number: string;
  traveller_details: TravellerDetails;
  is_normal: boolean;
  payment_plan: { id: number };
};

export type CreateUserBookingResponse = {
  code: number;
  message: string;
  data?: {
    payment_id?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    traveller_details?: TravellerDetails;
    total_fee?: number;
    total_payable_amount?: number;
    currency?: string;
  };
  success: boolean;
};
const hasMessage = (val: unknown): val is { message: string } => {
  return (
    typeof val === "object" &&
    val !== null &&
    "message" in val &&
    typeof (val as { message?: unknown }).message === "string"
  );
};


export const createEnrollment = async (
  payload: { adults: number; children: number },
  token?: string
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${BASE_URL}/users/enrollment-payment-summary`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create PayPal order");
  }

  return res.json();
}; 
export const uploadFile = async (file: File, token?: string): Promise<string> => {
  const form = new FormData();
  form.append("file", file);
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(
    `${BASE_URL}/api/upload/file`,
    {
      method: "POST",
      headers,
      body: form,
    }
  );

  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Upload failed");

  const data = json.data;
  if (typeof data === 'string') return data;
  if (data && typeof data.url === 'string') return data.url;
  throw new Error('Upload response missing url');
};

export const createUserBooking = async (
  payload: BookingPayload,
  token?: string
): Promise<CreateUserBookingResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `${BASE_URL}/users/travel/booking`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      }
    );

    let json: unknown = null;
    try {
      json = await res.json();
    } catch {
      json = null;
    }

    if (!res.ok) {
      return {
        success: false,
        message: hasMessage(json)
          ? json.message
          : "Booking failed. Please try again.",
        code: res.status,
      };
    }

    return json as CreateUserBookingResponse;
  } catch (err) {
    console.error("Network/CORS error:", err);

    return {
      success: false,
      message:
        "Unable to connect to server. Please check your internet connection or try again later.",
      code: 0,
    };
  }
};


export const getLastBooking = async (
  token?: string
): Promise<GetLastBookingResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `${BASE_URL}/users/travel/last-booking`,
      {
        method: "GET",
        headers,
      }
    );

    if (!res.ok) {
      let message = "Failed to fetch last booking";

      try {
        const errJson = await res.json();
        if (typeof errJson?.message === "string") {
          message = errJson.message;
        }
      } catch {
      }

      return {
        success: false,
        message,
      };
    }

    const json = (await res.json()) as GetLastBookingResponse;
    return json;

  } catch (err) {
    console.error("Last booking fetch failed:", err);

    return {
      success: false,
      message:
        "Unable to connect to server. Please check your internet connection and try again.",
    };
  }
};
