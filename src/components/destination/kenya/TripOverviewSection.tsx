"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Check,
  AlertTriangle,
  DollarSign,
  CloudSun,
  MapPin,
  CheckCircle,
  FileText,
  Globe,
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  Heart,
  Info,
  CalendarClock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import FooterSection from "@/components/landing/Footer";
import KoursairImage from "@/components/Media/Images/KoursairImage";
import { createPaypalOrder } from "@/services/paypalApi";
import { uploadFile, createUserBooking } from "@/services/kenyaApi";
import Image from "next/image";
import PaymentOption from "@/components/destination/payment_options";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import Popup from "@/components/Popup";
import { getAgeFromDob, isFutureDate } from "@/lib/helper";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { kenyaReunionAdventure } from "@/constants/kenya";
import { PassportGuest } from "@/types/passport";
import { ItineraryItem } from "./ItineraryItem";
import { ItineraryMap } from "./RouteMapSection";
import { PassportUploader } from "./PassportUploader";
import { FactCard } from "./FactCard";
import { useProtectedPage } from "@/hooks/useProtectedPage";
import { CustomSelect } from "@/components/UIComponents/customselect";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
type NationalityOption = {
  value: string;
  label: string;
};

countries.registerLocale(en);

// Manual mapping for common irregular nationalities
const nationalityOverrides: { [key: string]: string } = {
  US: "American",
  GB: "British",
  AE: "Emirati",
  SA: "Saudi",
  KR: "South Korean",
  KP: "North Korean",
  RU: "Russian",
  VN: "Vietnamese",
  TH: "Thai",
  PH: "Filipino",
  CZ: "Czech",
  IN: "Indian",
};

const nationalityOptions: NationalityOption[] = Object.entries(
  countries.getNames("en"),
).map(([code, country]) => ({
  value: code,
  label: nationalityOverrides[code] || `${country}`,
}));

const TripOverviewBooking = () => {
  const { isReady, isAuthenticated } = useProtectedPage();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  // const { isAuthenticated, openAuth } = useAuth();
  const [paymentPlan, setPaymentPlan] = useState("FULL");
  const [rateType, setRateType] = useState("EARLY");

  const [isLoading, setIsLoading] = useState(false);

  const [localPopup, setLocalPopup] = useState<{
    message: string;
    type?: "error" | "info" | "success";
  } | null>(null);

  const [mapState, setMapState] = useState({
    lat: -1.2921,
    lng: 36.8219,
    zoom: 10,
  });
  const [bookingData, setBookingData] = useState<BookingData>({
    email: "",
    mobile: "",
    roomPreference: "",
    mealPreference: "",
    mealPreferenceOther: "",
    medicalRestrictions: "",
    travelInsurance: "No",
    emergencyName: "",
    emergencyContact: "",
    mailingAddress: "",
    additionalInfo: "",
    mobilityIssues: [],
    mobilityOther: "",
    allergies: [],
    allergyDetails: "",
  });

  const [travelers, setTravelers] = useState<PassportGuest[]>([
    {
      id: 1,
      prefix: "Mr",
      lastName: "",
      firstName: "",
      middleName: "",
      gender: "",
      dob: "",
      nationality: "",
    },
  ]);
  const [uploadingPassportIds, setUploadingPassportIds] = useState<number[]>(
    [],
  );

  const [expandedTravelerId, setExpandedTravelerId] = useState<number | null>(
    1,
  );

  const [firstInvalidField, setFirstInvalidField] = useState<string | null>(
    null,
  );
  const tripData = useMemo(() => kenyaReunionAdventure, []);
  const { destination, title, overview, heroImage, facts, bookingSection } =
    tripData;

  const { itinerary } = bookingSection;

  const mapRoute = useMemo(() => {
    return itinerary
      .filter(
        (day) => day.coordinates && day.coordinates.lat && day.coordinates.lng,
      )
      .map((day) => ({
        lat: day.coordinates!.lat,
        lng: day.coordinates!.lng,
        title: day.title.split(":")[0],
      }));
  }, [itinerary]);
  const contactNameRef = useRef<HTMLInputElement | null>(null);
  const contactEmailRef = useRef<HTMLInputElement | null>(null);
  const emergencyNameRef = useRef<HTMLInputElement | null>(null);
  const emergencyContactRef = useRef<HTMLInputElement | null>(null);

  const primaryFirstRef = useRef<HTMLInputElement | null>(null);
  const primaryLastRef = useRef<HTMLInputElement | null>(null);
  const primaryGenderRef = useRef<HTMLSelectElement | null>(null);
  const primaryDobRef = useRef<HTMLInputElement | null>(null);
  const primaryNationalityRef = useRef<HTMLInputElement | null>(null);

  const addButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.name || "--");
          setUserEmail(user.email || "--");
          setUserPhone(user.phone || "--");
        } catch {
          setUserName("");
          setUserEmail("");
          setUserPhone("");
        }
      } else {
        setUserName("");
        setUserEmail("");
        setUserPhone("");
      }
    }
  }, []);

  const ADULT_PRICE_DYNAMIC = rateType === "EARLY" ? 6850 : 7150;

  const CHILD_PRICE_DYNAMIC = rateType === "EARLY" ? 4650 : 4850;

  const totalTravelers = adultCount + childCount;

  const totalAmount =
    adultCount * ADULT_PRICE_DYNAMIC + childCount * CHILD_PRICE_DYNAMIC;

  const isFamilyBooking = totalTravelers >= 4;

  useEffect(() => {
    setTravelers((prev) => {
      if (prev.length > totalTravelers) {
        return prev.slice(0, totalTravelers);
      }
      return prev;
    });
  }, [totalTravelers]);
  // --- Validation helpers ---
  const isValidName = (s?: string) => {
    if (!s) return false;
    if (s === "--") return false; // placeholder not acceptable
    // allow letters (including accents), spaces, hyphens and apostrophes
    return /^[A-Za-zÀ-ÖØ-öø-ÿ' \-]+$/.test(s.trim());
  };

  const isValidEmail = (s?: string) => {
    if (!s) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  };

  const isValidPhone = (s?: string) => {
    if (!s) return false;
    const digits = s.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  };

  const validateRequiredFields = (): {
    valid: boolean;
    firstInvalid?: string;
  } => {
    // 1️⃣ Traveler count mismatch
    if (travelers.length !== totalTravelers) {
      const missingIndex = travelers.length + 1;
      return { valid: false, firstInvalid: `travelerMissing_${missingIndex}` };
    }

    // 2️⃣ Primary traveler basic validation
    const primary = travelers[0];
    if (!primary) return { valid: false, firstInvalid: "travelerCount" };

    if (!primary.firstName || !isValidName(primary.firstName))
      return { valid: false, firstInvalid: "primaryFirstName" };

    if (!primary.lastName || !isValidName(primary.lastName))
      return { valid: false, firstInvalid: "primaryLastName" };

    if (!primary.gender) return { valid: false, firstInvalid: "primaryGender" };

    if (!primary.dob) return { valid: false, firstInvalid: "primaryDob" };

    if (!primary.nationality || !isValidName(primary.nationality))
      return { valid: false, firstInvalid: "primaryNationality" };

    for (let i = 1; i < travelers.length; i++) {
      const t = travelers[i];
      const idx = i + 1;

      if (!t.firstName || !isValidName(t.firstName))
        return { valid: false, firstInvalid: `traveler_${idx}_firstName` };

      if (!t.lastName || !isValidName(t.lastName))
        return { valid: false, firstInvalid: `traveler_${idx}_lastName` };

      if (!t.gender)
        return { valid: false, firstInvalid: `traveler_${idx}_gender` };

      if (!t.dob) return { valid: false, firstInvalid: `traveler_${idx}_dob` };

      if (!t.nationality || !isValidName(t.nationality))
        return { valid: false, firstInvalid: `traveler_${idx}_nationality` };
    }

    if (!userName || !userName.trim()) {
      return { valid: false, firstInvalid: "contactName" };
    }

    if (!isValidName(userName)) {
      return { valid: false, firstInvalid: "contactNameInvalid" };
    }

    if (!isValidEmail(userEmail))
      return { valid: false, firstInvalid: "contactEmail" };

    if (!isValidPhone(userPhone))
      return { valid: false, firstInvalid: "contactPhone" };

    if (!isValidName(bookingData.emergencyName))
      return { valid: false, firstInvalid: "emergencyName" };

    if (!isValidPhone(bookingData.emergencyContact || ""))
      return { valid: false, firstInvalid: "emergencyPhone" };

    if (!bookingData.medicalRestrictions.trim())
      return { valid: false, firstInvalid: "medicalRestrictions" };

    if (!bookingData.mealPreference)
      return { valid: false, firstInvalid: "mealPreference" };

    if (
      bookingData.mealPreference === "Other" &&
      !bookingData.mealPreferenceOther.trim()
    )
      return { valid: false, firstInvalid: "mealPreferenceOther" };

    if (!bookingData.mobilityIssues || bookingData.mobilityIssues.length === 0)
      return { valid: false, firstInvalid: "mobilityIssues" };

    if (
      bookingData.mobilityIssues.includes("Other") &&
      !bookingData.mobilityOther.trim()
    ) {
      return { valid: false, firstInvalid: "mobilityOther" };
    }

    if (!bookingData.allergies || bookingData.allergies.length === 0)
      return { valid: false, firstInvalid: "allergies" };

    let invalidAdultCount = 0;
    let invalidChildCount = 0;

    for (let i = 0; i < travelers.length; i++) {
      const t = travelers[i];
      if (!t.dob) continue;

      if (isFutureDate(t.dob)) {
        return {
          valid: false,
          firstInvalid:
            i === 0 ? "primaryDobInvalid" : `traveler_${i + 1}_dobInvalid`,
        };
      }

      const age = getAgeFromDob(t.dob);

      const isAdultSelected = i < adultCount;

      if (isAdultSelected && age < 12) {
        invalidAdultCount++;
      }

      if (!isAdultSelected && age >= 12) {
        invalidChildCount++;
      }
    }

    if (invalidAdultCount > 0) {
      return {
        valid: false,
        firstInvalid: "adultAgeMismatch",
      };
    }

    // ❌ Child DOB mismatch
    if (invalidChildCount > 0) {
      return {
        valid: false,
        firstInvalid: "childAgeMismatch",
      };
    }

    // 8️⃣ Payment plan — REQUIRED ONLY FOR NON-FAMILY
    if (!isFamilyBooking) {
      if (!paymentPlan) return { valid: false, firstInvalid: "paymentPlan" };
    }

    return { valid: true };
  };

  const focusField = (key?: string | number) => {
    if (!key) return;
    const k = String(key);

    const scrollToEl = (el?: Element | null) => {
      if (!el) return;
      (el as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      try {
        (el as HTMLElement).focus?.();
      } catch {}
    };

    if (k === "contactName" || k === "contactEmail" || k === "contactPhone") {
      const el =
        document.querySelector("#contact-section") ||
        document.querySelector("#register");
      if (el) scrollToEl(el);
      return;
    }

    if (k === "emergencyName") {
      scrollToEl(emergencyNameRef.current);
      emergencyNameRef.current?.focus();
      return;
    }
    if (k === "emergencyPhone") {
      if (emergencyContactRef.current) {
        scrollToEl(emergencyContactRef.current);
        emergencyContactRef.current.focus?.();
      } else {
        scrollToEl(emergencyNameRef.current);
      }
      return;
    }

    if (k.startsWith("travelerMissing_")) {
      const idx = parseInt(k.split("_")[1] || "", 10);
      if (!Number.isNaN(idx)) {
        if (addButtonRef.current) {
          scrollToEl(addButtonRef.current);
          try {
            addButtonRef.current.focus();
          } catch {}
        }
      }
      return;
    }

    if (k.startsWith("traveler_")) {
      const parts = k.split("_");
      const idx = parseInt(parts[1] || "", 10);
      const field = parts.slice(2).join("_");
      if (!Number.isNaN(idx)) {
        const trav = travelers[idx - 1];
        if (trav) {
          setExpandedTravelerId(trav.id);
          const el = document.querySelector(`[data-traveler-id="${trav.id}"]`);
          if (el) scrollToEl(el);
          const selector = `[name="${field}-${trav.id}"]`;
          const fieldEl = document.querySelector(
            selector,
          ) as HTMLElement | null;
          if (fieldEl) {
            setTimeout(() => {
              try {
                (fieldEl as HTMLInputElement).focus();
              } catch {}
            }, 60);
          }
        }
      }
      return;
    }

    if (k.startsWith("primary") || k.startsWith("primary")) {
      scrollToEl(document.querySelector("[data-traveler-id]"));
      if (k === "primaryFirstName") {
        primaryFirstRef.current?.focus();
        scrollToEl(primaryFirstRef.current);
      }
      if (k === "primaryLastName") {
        primaryLastRef.current?.focus();
        scrollToEl(primaryLastRef.current);
      }
      if (k === "primaryGender") {
        primaryGenderRef.current?.focus();
        scrollToEl(primaryGenderRef.current);
      }
      if (k === "primaryDob") {
        primaryDobRef.current?.focus();
        scrollToEl(primaryDobRef.current);
      }
      if (k === "primaryNationality") {
        primaryNationalityRef.current?.focus();
        scrollToEl(primaryNationalityRef.current);
      }
      if (k === "primaryPassport") {
        const el = document.querySelector("[data-traveler-id]");
        if (el) {
          setExpandedTravelerId(travelers[0]?.id);
          scrollToEl(el);
        }
      }
      return;
    }

    if (k.startsWith("passport_")) {
      const id = parseInt(k.split("_")[1] || "", 10);
      if (!Number.isNaN(id)) {
        setExpandedTravelerId(id);
        const el = document.querySelector(`[data-traveler-id="${id}"]`);
        if (el) scrollToEl(el);
      }
      return;
    }

    const findHeading = (text: string) =>
      Array.from(document.querySelectorAll("h2,h3,h4")).find((h) =>
        h.textContent?.includes(text),
      );

    if (k === "mealPreference" || k === "mealPreferenceOther") {
      const el =
        findHeading("Health & Dietary") ||
        document.querySelector('[name="mealPreference"]');
      if (el) scrollToEl(el);
      return;
    }
    if (k === "mobilityIssues") {
      const el =
        findHeading("Health & Dietary") ||
        document.querySelector('[name="mobilityIssues"]');
      if (el) scrollToEl(el);
      return;
    }
    if (k === "allergies") {
      const el =
        findHeading("Allergies & Intolerances") ||
        document.querySelector('[name="allergyDetails"]');
      if (el) scrollToEl(el);
      return;
    }
    if (k === "paymentPlan") {
      const el =
        findHeading("Payment Plan") ||
        document.querySelector('[name="paymentPlan"]');
      if (el) scrollToEl(el);
      return;
    }
  };

  const formatNumber = (n?: number) => {
    if (typeof n !== "number" || Number.isNaN(n)) return "0";
    return n.toLocaleString();
  };

  const formatCurrency = (n?: number) => `$${formatNumber(n)}`;

  const fullDiscount = Math.round(totalAmount * 0.08);
  const halfDiscount = Math.round(totalAmount * 0.04);

  const payToday = (() => {
    if (isFamilyBooking) return 0;
    if (paymentPlan === "FULL") return totalAmount - fullDiscount;
    if (paymentPlan === "HALF")
      return Math.round((totalAmount - halfDiscount) / 2);
    if (paymentPlan === "DEPOSIT") return totalTravelers * 1000;
  })();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleDayVisibility = (
    coords: { lat: number; lng: number },
    zoom: number,
  ) => {
    setMapState((prev) => {
      if (
        prev.lat === coords.lat &&
        prev.lng === coords.lng &&
        prev.zoom === zoom
      ) {
        return prev;
      }
      return { ...coords, zoom };
    });
  };

  type BookingData = {
    email: string;
    mobile: string;
    roomPreference: string;
    mealPreference: string;
    mealPreferenceOther: string;
    medicalRestrictions: string;
    travelInsurance: string;
    emergencyName: string;
    emergencyContact: string;
    mailingAddress: string;
    additionalInfo: string;
    mobilityIssues: string[];
    mobilityOther: string;
    allergies: string[];
    allergyDetails: string;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    // clear first invalid field when user interacts
    if (firstInvalidField) setFirstInvalidField(null);

    const { name, value } = e.target;
    let newValue = value;

    // sanitize names to prevent digits in name fields
    if (name === "emergencyName") {
      newValue = value.replace(/[0-9]/g, "");
    }

    const phoneFields = ["mobile"];
    if (phoneFields.includes(name)) {
      // remove any character that's not a digit
      let cleaned = value.replace(/\D/g, "");
      // cap number length to 15 digits
      cleaned = cleaned.slice(0, 15);
      newValue = cleaned;
    }

    setBookingData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleTravelerChange = (
    id: number,
    field: keyof PassportGuest,
    value: string,
  ) => {
    // clear first invalid highlight on interaction
    if (firstInvalidField) setFirstInvalidField(null);
    // strip digits from name/nationality fields as user types
    const sanitizedFields = [
      "firstName",
      "middleName",
      "lastName",
      "nationality",
    ];
    const newValue = sanitizedFields.includes(field as string)
      ? value.replace(/[0-9]/g, "")
      : value;
    setTravelers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: newValue } : t)),
    );
  };

  const handlePassportUpload = async (id: number, file: File) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || undefined
        : undefined;
    try {
      setUploadingPassportIds((prev) => [...prev, id]);
      const url = await uploadFile(file, token);
      setTravelers((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                passport: url,
                passportFileName: file.name,
                passportFile: null,
              }
            : t,
        ),
      );
    } catch (err) {
      console.error("Passport upload failed", err);
      setLocalPopup({
        message: "Passport upload failed. Please try again.",
        type: "error",
      });
    } finally {
      setUploadingPassportIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handlePassportDelete = (id: number) => {
    setTravelers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              passportFile: null,
              passportFileName: undefined,
              passport: undefined,
            }
          : t,
      ),
    );
  };

  const REQUIRED_FIELD_LABELS: Record<string, string> = {
    mealPreference: "Dietary Preference",
    mealPreferenceOther: "Dietary Preference (Other)",
    mobilityIssues: "Mobility Issues",
    mobilityOther: "Mobility Issues (Other)",
    allergies: "Allergies & Intolerances",
    medicalRestrictions: "General Medical Conditions",
    emergencyName: "Emergency Contact Name",
    emergencyPhone: "Emergency Contact Number",
    contactName: "Contact Name",
    contactEmail: "Email",
    contactPhone: "Mobile Number",
  };

  const handleRegistrationSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || undefined
          : undefined;

      const v = validateRequiredFields();
      if (!v.valid) {
        const fieldLabel =
          v.firstInvalid && REQUIRED_FIELD_LABELS[v.firstInvalid]
            ? REQUIRED_FIELD_LABELS[v.firstInvalid]
            : null;

        let message = fieldLabel
          ? `${fieldLabel} is required.`
          : "Please fill all required fields before proceeding.";
        if (v.firstInvalid) {
          // 0️⃣ AGE MISMATCH (MOST IMPORTANT — MUST BE FIRST)

          // Not enough adults (someone marked as adult is actually below 12)
          if (v.firstInvalid === "adultAgeMismatch") {
            message = `You selected ${adultCount} adult(s). Please ensure at least ${adultCount} traveler(s) are 12 years or older.`;
          } else if (v.firstInvalid === "childAgeMismatch") {
            const invalidChildren = travelers
              .slice(adultCount)
              .filter((t) => t.dob && getAgeFromDob(t.dob) >= 12).length;

            message = `You selected ${childCount} child(ren), but ${invalidChildren} traveler(s) selected as children have age 12 years or above. Please correct their Date of Birth.`;
          }

          // 1️⃣ DOB INVALID (today or future)
          else if (
            v.firstInvalid === "primaryDobInvalid" ||
            v.firstInvalid.endsWith("dobInvalid")
          ) {
            message = "Date of birth cannot be today or a future date.";
          }

          // 2️⃣ Missing traveler forms
          else if (v.firstInvalid.startsWith("travelerMissing_")) {
            const idx = parseInt(v.firstInvalid.split("_")[1] || "", 10);
            const missingCount = totalTravelers - travelers.length;

            message =
              missingCount === 1
                ? `Please add details for traveler ${idx} of ${totalTravelers}. Click "Add Another Traveler" to add the form.`
                : `Please add details for ${missingCount} more travellers (starting with traveller ${idx}). Click "Add Another Traveler" to add forms.`;
          }

          // 3️⃣ Any traveler field missing
          else if (v.firstInvalid.startsWith("traveler_")) {
            const idx = v.firstInvalid.split("_")[1];
            message = `Please complete details for traveller ${idx}.`;
          }

          // 4️⃣ Primary traveler missing fields
          else if (v.firstInvalid.startsWith("primary")) {
            message = "Please complete the primary traveller details.";
          } else if (v.firstInvalid === "contactNameInvalid") {
            message =
              "Contact Name contains invalid characters. Please use only letters.";
          }
        }

        setLocalPopup({ message, type: "error" });
        setFirstInvalidField(v.firstInvalid || null);
        setIsLoading(false);

        window.setTimeout(() => {
          focusField(v.firstInvalid);
        }, 50);
        return;
      }

      // Upload any pending passport files
      for (const t of travelers) {
        if (!t.passport && t.passportFile) {
          // await will call handlePassportUpload which uploads and updates state
          await handlePassportUpload(t.id, t.passportFile);
        }
      }

      // Basic validation for primary traveler passport url (after uploads)
      const primary = travelers[0];
      // Helper to normalize different upload response shapes (string or { url })
      const getPassportUrl = (p?: string | { url?: string } | null): string => {
        if (!p) return "";
        if (typeof p === "string") return p;
        // p is an object; check url property safely
        const maybeUrl = (p as { url?: unknown }).url;
        if (typeof maybeUrl === "string") return maybeUrl;
        return "";
      };

      const payload = {
        name: userName || "",
        email: userEmail || "",
        phone_number: userPhone || "",
        traveller_details: {
          number_of_adults: adultCount,
          number_of_children: childCount,
          family_pack: isFamilyBooking,
          primary_traveller: {
            prefix: primary.prefix,
            first_name: primary.firstName,
            middle_name: primary.middleName || undefined,
            last_name: primary.lastName,
            gender: primary.gender,
            dob: primary.dob,
            nationality: primary.nationality,
            passport: getPassportUrl(primary.passport),
          },
          members: travelers.slice(1).map((m) => ({
            prefix: m.prefix,
            first_name: m.firstName,
            middle_name: m.middleName || undefined,
            last_name: m.lastName,
            gender: m.gender,
            dob: m.dob,
            nationality: m.nationality,
            passport: getPassportUrl(m.passport),
          })),
          health_dietry: {
            dietry_preferences: bookingData.mealPreference
              ? [
                  {
                    name: bookingData.mealPreference,
                    details: bookingData.mealPreferenceOther || "",
                  },
                ]
              : [],

            mobility_issue: bookingData.mobilityIssues.map((i) => ({
              name: i,
              details: i === "Other" ? bookingData.mobilityOther : "",
            })),

            allergies_and_intolerances: bookingData.allergies.map((a) => ({
              name: a,
              details: bookingData.allergyDetails || "",
            })),
          },

          emergency_contact: {
            name: bookingData.emergencyName,
            phone_number: bookingData.emergencyContact,
            medical_condition: bookingData.medicalRestrictions,
            additional_info: bookingData.additionalInfo,
          },
        },
        is_normal: rateType === "NORMAL",
        payment_plan: {
          id: 382829395602,
          payment_type:
            paymentPlan === "FULL"
              ? "Full"
              : paymentPlan === "HALF"
                ? "Half"
                : "Deposit",
        },
      };

      const bookingRes = await createUserBooking(payload, token);

      if (!bookingRes.success) {
        setLocalPopup({
          message:
            bookingRes.message ||
            "Something went wrong. Please try again later.",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      const data = bookingRes.data;
      const paymentId = data?.payment_id;

      if (!data) throw new Error("Booking response missing data");
      const td = data.traveller_details;
      if (!td) throw new Error("Booking traveller details missing");
      if (typeof data.total_payable_amount !== "number")
        throw new Error("Invalid payable amount from booking");

      if (isFamilyBooking) {
        setLocalPopup({
          message: "Registration submitted. Our team will contact you shortly.",
          type: "success",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);

        return;
      }

      const orderPayload = {
        payment_id: paymentId,
        amount: data.total_payable_amount,
        currency: data.currency || "USD",
        destination: "Kenya",
      };

      const orderRes = await createPaypalOrder(orderPayload);
      if (orderRes.data && orderRes.data.approval_url) {
        window.location.href = orderRes.data.approval_url;
      } else {
        throw new Error("PayPal order failed");
      }
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddTraveler = () => {
    if (travelers.length >= totalTravelers) return;

    const newId = Date.now();
    setTravelers((prev) => [
      ...prev,
      {
        id: newId,
        prefix: "",
        lastName: "",
        firstName: "",
        middleName: "",
        gender: "",
        dob: "",
        nationality: "",
      },
    ]);
    setExpandedTravelerId(newId);
  };

  const handleRemoveTraveler = (id: number) => {
    setTravelers((prev) => prev.filter((t) => t.id !== id));
    if (expandedTravelerId === id) setExpandedTravelerId(null);
  };

  const toggleTraveler = (id: number) =>
    setExpandedTravelerId((prev) => (prev === id ? null : id));

  const handleAllergyChange = (allergy: string) => {
    setBookingData((prev) => {
      const allergies = prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy];
      return { ...prev, allergies: allergies };
    });
  };

  const handleMobilityChange = (issue: string) => {
    setBookingData((prev) => {
      if (issue === "None") {
        return { ...prev, mobilityIssues: ["None"], mobilityOther: "" };
      }

      const issues = prev.mobilityIssues.includes(issue)
        ? prev.mobilityIssues.filter((i) => i !== issue)
        : [...prev.mobilityIssues.filter((i) => i !== "None"), issue];

      return { ...prev, mobilityIssues: issues };
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "itinerary",
      label: "Itinerary",
      icon: <MapPin className="w-4 h-4" />,
    },
    { id: "map", label: "Route Map", icon: <Globe className="w-4 h-4" /> },
    {
      id: "register",
      label: "Book Now",
      icon: <CheckCircle className="w-4 h-4" />,
      isPrimary: true,
    },
  ];

  const factIcons: Record<string, React.ReactNode> = {
    currency: <DollarSign className="w-6 h-6" />,
    avgTemp: <CloudSun className="w-6 h-6" />,
    timezone: <Globe className="w-6 h-6" />,
    language: <MapPin className="w-6 h-6" />,
  };

  // Extract all coordinates and titles for the map line

  return (
    <main>
      <Navbar />
      {localPopup && (
        <Popup
          message={localPopup.message}
          type={localPopup?.type}
          onClose={() => setLocalPopup(null)}
        />
      )}
      <div className="relative min-h-screen bg-[#F4EFE7] pb-20">
        {/* 1. HERO SECTION */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <KoursairImage
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white max-w-5xl px-4 md:px-6">
              <h1 className="text-3xl md:text-6xl font-extrabold font-alegreya mb-4">
                {title}
              </h1>
              <p className="text-lg md:text-xl lg:text-3xl font-light">
                {destination}
              </p>

              <p className="mt-2 flex justify-center items-center gap-2 text-sm md:text-xl lg:text-lg font-medium text-white/90">
                <CalendarClock className="w-4 h-4" />
                {bookingSection.fixedDepartureDates?.[0]?.label}
              </p>
            </div>
          </div>
        </section>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 -mt-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <FactCard
              icon={factIcons["currency"]}
              label="Currency"
              value={facts.currency.value}
            />
            <FactCard
              icon={factIcons["avgTemp"]}
              label="Avg Temp"
              value={facts.avgTemp.value}
            />
            <FactCard
              icon={factIcons["timezone"]}
              label="Focus"
              value="Luxury & Business"
            />
            <FactCard
              icon={factIcons["language"]}
              label="Language"
              value={facts.language.value}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 space-y-12 md:space-y-15 px-4 md:px-6">
          <div className="flex flex-wrap gap-2 md:gap-4 sticky top-[80px] z-30 py-4 px-0 bg-[#F4EFE7]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-bold text-gray-700 bg-white cursor-pointer shadow-md border-1 border-transparent 
                                             hover:bg-[#1b3658] hover:text-white transition duration-300 transform hover:scale-[1.02] whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            id="overview"
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 scroll-mt-16"
          >
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight border-b-4 border-primary pb-3">
                Trip Overview
              </h2>
              <div
                className="text-gray-700 leading-relaxed text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: overview }}
              />

              <div className="bg-[#F4EFE7]/50 p-6 md:p-8 rounded-2xl border border-primary mt-6">
                <h3 className="font-bold text-lg md:text-xl mb-6 text-primary">
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bookingSection.inclusions.map((inc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <Check className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="leading-snug">{inc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h4 className="font-bold text-primary mb-2">
                    Cost Exclusions (Not Included):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bookingSection.exclusions.map((inc, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                  {kenyaReunionAdventure.highlightsBox.title}
                </h3>
                <div className="space-y-4">
                  {kenyaReunionAdventure.highlightsBox.points.map(
                    (point, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="bg-primary p-2 rounded-full h-min">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {point.title}
                          </h4>
                          <p className="text-sm text-gray-600">{point.desc}</p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="grid-cols-2 gap-2 h-100 rounded-2xl overflow-hidden shadow-lg hidden md:grid">
                <div className="w-full h-[150px] relative">
                  <KoursairImage
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main1.jpg"
                    alt="Safari"
                    fill
                    className="object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="w-full h-[150px] relative">
                  <KoursairImage
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main3.jpg"
                    alt="Lion"
                    fill
                    className="object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="col-span-2 w-[462px] h-[257px]">
                  <KoursairImage
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main2.jpg"
                    alt="Mara"
                    fill
                    className="object-contain hover:scale-110 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            id="itinerary"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 scroll-mt-32"
          >
            <div className="lg:col-span-1 space-y-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                Detailed Itinerary
              </h2>
              <div className="relative border-l-4 border-primary ml-2 md:ml-4">
                {itinerary.map((day) => (
                  <ItineraryItem
                    key={day.day}
                    day={day}
                    onVisible={handleDayVisibility}
                  />
                ))}
              </div>
            </div>
            <div
              id="map"
              className="lg:col-span-1 sticky top-[100px] h-min space-y-6 scroll-mt-32"
            >
              <h3 className="text-2xl font-bold text-primary border-b pb-2">
                Route Map
              </h3>
              <div className="h-[300px] md:h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative z-0">
                <ItineraryMap
                  center={{ lat: mapState.lat, lng: mapState.lng }}
                  zoom={mapState.zoom}
                  route={mapRoute}
                />
              </div>
              <p className="text-sm text-gray-500 italic text-center">
                Track your journey: Nairobi → Naivasha → Nakuru → Masai Mara.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
              <div>
                <div
                  className="bg-[#fffafa] rounded-3xl shadow-2xl border-t-8 border-primary overflow-hidden scroll-mt-32"
                  id="register"
                >
                  <div className="bg-primary-light p-6 md:pt-8 md:pl-8 md:pr-8 md:pb-1 text-center">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-2">
                      Secure Your Spot
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                      Book your place for the Kenya Adventure
                    </p>
                    <div className=" my-2 flex justify-center gap-7 text-sm md:text-base">
                      <p>
                        <strong>Adult Fee:</strong> $7,150
                      </p>
                      <p>
                        <strong>Child Fee (Below 12 yrs):</strong> $4,850
                      </p>
                    </div>
                  </div>

                  <form
                    className="p-4 sm:p-8 md:p-12 space-y-8"
                    onSubmit={handleRegistrationSubmit}
                  >
                    <div className="mb-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <label className="flex items-start gap-2 cursor happy-pointer">
                          <input
                            type="radio"
                            name="rateType"
                            value="EARLY"
                            checked={rateType === "EARLY"}
                            onChange={() => setRateType("EARLY")}
                            className="mt-1"
                          />

                          <div>
                            <p className="font-semibold text-primary">
                              Early Rate:{" "}
                              <span className="font-normal">Till Mar 31</span>
                            </p>
                            <p className="text-sm text-gray-700">
                              Adult: <strong>$6,850</strong> &nbsp;&nbsp; Kid:{" "}
                              <strong>$4,650</strong>
                            </p>
                          </div>
                        </label>

                        {/* <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="rateType"
                            value="NORMAL"
                            checked={rateType === "NORMAL"}
                            onChange={() => setRateType("NORMAL")}
                            className="mt-1"
                          />

                          <div>
                            <p className="font-semibold text-primary">
                              Normal Rate:{" "}
                              <span className="font-normal">
                                From Feb 1 to Mar 31
                              </span>
                            </p>
                            <p className="text-sm text-gray-700">
                              Adult: <strong>$7,150</strong> &nbsp;&nbsp; Kid:{" "}
                              <strong>$4,850</strong>
                            </p>
                          </div>
                        </label> */}
                      </div>
                    </div>
                    <div>
                      <div id="contact-section" className="space-y-4">
                        <h4 className="text-2xl font-bold text-primary flex items-center gap-2">
                          {" "}
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1">
                              Name
                            </label>
                            <input
                              ref={contactNameRef}
                              type="text"
                              value={userName}
                              disabled
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50 ${
                                firstInvalidField === "contactName"
                                  ? "border-red-400 ring-1 ring-red-400"
                                  : "border border-gray-300"
                              }`}
                            />
                          </div>

                          <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1">
                              Email
                            </label>
                            <input
                              ref={contactEmailRef}
                              type="email"
                              value={userEmail}
                              disabled
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50 ${
                                firstInvalidField === "contactEmail"
                                  ? "border-red-400 ring-1 ring-red-400"
                                  : "border border-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1">
                              Mobile
                            </label>
                            <PhoneInputWithCountrySelect
                              value={userPhone || undefined}
                              onChange={(val) => {
                                setUserPhone(val || "");
                                if (firstInvalidField === "contactPhone") {
                                  setFirstInvalidField(null);
                                }
                              }}
                              international
                              countryCallingCodeEditable={true}
                              defaultCountry="IN"
                              placeholder="Enter mobile number"
                              className={`w-full p-3 rounded-lg text-sm outline-none ${
                                firstInvalidField === "contactPhone"
                                  ? "border-red-400 ring-1 ring-red-400"
                                  : "border border-gray-300"
                              }`}
                              numberInputProps={{
                                className:
                                  "border-none outline-none focus:outline-none focus:ring-0",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 max-w-sm">
                      <h4 className="text-xl font-bold text-primary">
                        Travelers{" "}
                      </h4>

                      <div className="flex items-center justify-between max-w-sm">
                        <span>Adults</span>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setAdultCount(Math.max(1, adultCount - 1))
                            }
                            className="px-2 py-1 border rounded"
                          >
                            −
                          </button>

                          <span className="px-4 py-1 border border-gray-400 rounded bg-white min-w-[2.5rem] text-center">
                            {adultCount}
                          </span>

                          <button
                            type="button"
                            onClick={() => setAdultCount(adultCount + 1)}
                            className="px-2 py-1 border rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Children */}
                      <div className="flex items-center justify-between max-w-sm">
                        <span>Children (Below 12)</span>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setChildCount(Math.max(0, childCount - 1))
                            }
                            className="px-2 py-1 border rounded"
                          >
                            −
                          </button>

                          <span className="px-4 py-1 border border-gray-400 rounded bg-white min-w-[2.5rem] text-center">
                            {childCount}
                          </span>

                          <button
                            type="button"
                            onClick={() => setChildCount(childCount + 1)}
                            className="px-2 py-1 border rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Family info checkbox */}
                      <div className="mt-3">
                        <label className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            className="mt-1"
                            checked={Boolean(isFamilyBooking)}
                            readOnly
                          />
                          <div>
                            <p className="font-medium text-gray-700">
                              Family of 4 or more
                            </p>
                            <p className="text-xs text-gray-500">
                              For 4 or more travelers, payment is not required
                              at this stage. Our team will contact you via email
                              with the next steps.
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Info message */}
                      {isFamilyBooking && (
                        <p className="text-xs text-orange-600 mt-2">
                          You have selected 4 or more travelers. Online payment
                          is disabled for family bookings.
                        </p>
                      )}
                    </div>

                    <hr className="border-gray-200" />

                    {/* Section 2: Traveler Details */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
                        <div>
                          <h4 className="text-2xl font-bold text-primary">
                            Traveler Details
                          </h4>
                          <p className="text-sm text-primary italic mt-1">
                            Please enter information exactly as it appears on
                            your PASSPORT.
                          </p>
                        </div>
                        <div className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                          {travelers.length} Traveler(s) Added
                        </div>
                      </div>

                      <div className="space-y-4">
                        {travelers.map((t, index) => {
                          const isExpanded = expandedTravelerId === t.id;
                          return (
                            <div
                              key={t.id}
                              data-traveler-id={t.id}
                              className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                                isExpanded
                                  ? "border-primary shadow-md bg-white"
                                  : "border-gray-200 bg-gray-50"
                              }`}
                            >
                              <div
                                className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={() => toggleTraveler(t.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                      isExpanded
                                        ? "bg-primary text-white"
                                        : "bg-gray-300 text-gray-600"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  <span
                                    className={`font-bold ${
                                      isExpanded
                                        ? "text-gray-900"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {index === 0
                                      ? "Primary Traveler (Traveler 1)"
                                      : `Traveler ${index + 1}`}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveTraveler(t.id);
                                      }}
                                      className="p-1 hover:bg-red-100 rounded-full text-red-500 mr-2 cursor-pointer"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                  {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                  )}
                                </div>
                              </div>

                              {isExpanded && (
                                <div className="p-6 pt-0 border-t border-gray-100 mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                                  <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      Prefix{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <CustomSelect
                                      options={[
                                        { value: "Mr", label: "Mr" },
                                        { value: "Ms", label: "Ms" },
                                        { value: "Mrs", label: "Mrs" },
                                        { value: "Dr", label: "Dr" }
                                      ]}
                                      value={t.prefix}
                                      onChange={(value) =>
                                        handleTravelerChange(
                                          t.id,
                                          "prefix",
                                          value,
                                        )
                                      }
                                      placeholder="Select"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none"
                                    />
                                  </div>
                                  <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      First Name{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      ref={
                                        index === 0
                                          ? primaryFirstRef
                                          : undefined
                                      }
                                      name={`firstName-${t.id}`}
                                      type="text"
                                      value={t.firstName}
                                      onChange={(e) =>
                                        handleTravelerChange(
                                          t.id,
                                          "firstName",
                                          e.target.value,
                                        )
                                      }
                                      className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none ${
                                        firstInvalidField ===
                                          "primaryFirstName" && index === 0
                                          ? "border-red-400 ring-1 ring-red-400"
                                          : "border-gray-300"
                                      }`}
                                    />
                                    {firstInvalidField ===
                                      `traveler_${index + 1}_firstName` && (
                                      <p className="text-xs text-red-600 mt-1">
                                        Please provide first name
                                      </p>
                                    )}
                                  </div>
                                  <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      Middle Name
                                    </label>
                                    <input
                                      type="text"
                                      value={t.middleName}
                                      onChange={(e) =>
                                        handleTravelerChange(
                                          t.id,
                                          "middleName",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none"
                                    />
                                  </div>
                                  <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      Last Name{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      ref={
                                        index === 0 ? primaryLastRef : undefined
                                      }
                                      name={`lastName-${t.id}`}
                                      type="text"
                                      value={t.lastName}
                                      onChange={(e) =>
                                        handleTravelerChange(
                                          t.id,
                                          "lastName",
                                          e.target.value,
                                        )
                                      }
                                      className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none ${
                                        firstInvalidField ===
                                          "primaryLastName" && index === 0
                                          ? "border-red-400 ring-1 ring-red-400"
                                          : "border-gray-300"
                                      }`}
                                    />
                                    {firstInvalidField ===
                                      `traveler_${index + 1}_lastName` && (
                                      <p className="text-xs text-red-600 mt-1">
                                        Please provide last name
                                      </p>
                                    )}
                                  </div>

                                  <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      Gender{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <CustomSelect
                                      options={[
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" }
                                      ]}
                                      value={t.gender}
                                      onChange={(value) =>
                                        handleTravelerChange(
                                          t.id,
                                          "gender",
                                          value,
                                        )
                                      }
                                      placeholder="Select..."
                                      className={`w-full p-3 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none ${
                                        firstInvalidField === "primaryGender" &&
                                        index === 0
                                          ? "border-red-400 ring-1 ring-red-400"
                                          : "border border-gray-300"
                                      }`}
                                    />
                                    {firstInvalidField === "primaryGender" &&
                                      index === 0 && (
                                        <p className="text-xs text-red-600 mt-1">
                                          Please select gender
                                        </p>
                                      )}
                                    {firstInvalidField ===
                                      `traveler_${index + 1}_gender` && (
                                      <p className="text-xs text-red-600 mt-1">
                                        Please select gender
                                      </p>
                                    )}
                                  </div>
                                  <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      Date of Birth{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      name={`dob-${t.id}`}
                                      ref={
                                        index === 0 ? primaryDobRef : undefined
                                      }
                                      type="date"
                                      value={t.dob}
                                      max={
                                        new Date(Date.now() - 86400000)
                                          .toISOString()
                                          .split("T")[0]
                                      }
                                      onChange={(e) =>
                                        handleTravelerChange(
                                          t.id,
                                          "dob",
                                          e.target.value,
                                        )
                                      }
                                      className={`w-full p-3 rounded-lg focus:ring-1 focus:ring-primary outline-none ${
                                        firstInvalidField === "primaryDob" &&
                                        index === 0
                                          ? "border-red-400 ring-1 ring-red-400"
                                          : "border border-gray-300"
                                      }`}
                                    />
                                    {firstInvalidField ===
                                      "primaryDobInvalid" && (
                                      <p className="text-xs text-red-600 mt-1">
                                        Date of birth cannot be today or a
                                        future date
                                      </p>
                                    )}

                                    {firstInvalidField ===
                                      `traveler_${index + 1}_dobInvalid` && (
                                      <p className="text-xs text-red-600 mt-1">
                                        Date of birth cannot be today or a
                                        future date
                                      </p>
                                    )}
                                  </div>
                                  <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                                      Nationality{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                      options={nationalityOptions}
                                      value={
                                        nationalityOptions.find(
                                          (opt) => opt.value === t.nationality,
                                        ) || null
                                      }
                                      onChange={(selected) =>
                                        handleTravelerChange(
                                          t.id,
                                          "nationality",
                                          (selected as NationalityOption | null)
                                            ?.value || "",
                                        )
                                      }
                                      placeholder="Select nationality"
                                      isSearchable
                                      styles={{
                                        control: (base, state) => ({
                                          ...base,
                                          minHeight: "48px",
                                          borderRadius: "0.5rem",
                                          borderColor:
                                            firstInvalidField ===
                                              "primaryNationality" &&
                                            index === 0
                                              ? "#f87171"
                                              : state.isFocused
                                                ? "#1b3658"
                                                : "#d1d5db",
                                          boxShadow: state.isFocused
                                            ? "0 0 0 1px #1b3658"
                                            : "none",
                                          "&:hover": {
                                            borderColor: "#1b3658",
                                          },
                                        }),
                                        valueContainer: (base) => ({
                                          ...base,
                                          padding: "0 12px",
                                        }),
                                        input: (base) => ({
                                          ...base,
                                          margin: 0,
                                          padding: 0,
                                        }),
                                        indicatorsContainer: (base) => ({
                                          ...base,
                                          height: "48px",
                                        }),
                                        menu: (base) => ({
                                          ...base,
                                          zIndex: 9999,
                                        }),
                                      }}
                                    />
                                    {firstInvalidField ===
                                      "primaryNationality" &&
                                      index === 0 && (
                                        <p className="text-xs text-red-600 mt-1">
                                          Please provide nationality
                                        </p>
                                      )}
                                    {firstInvalidField ===
                                      `traveler_${index + 1}_nationality` && (
                                      <p className="text-xs text-red-600 mt-1">
                                        Please provide nationality
                                      </p>
                                    )}
                                  </div>

                                  <div className="md:col-span-4">
                                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                                      Passport Copy (Front Page){" "}
                                    </label>
                                    <PassportUploader
                                      travelerId={t.id}
                                      fileName={
                                        t.passportFileName ||
                                        (t.passport
                                          ? t.passport.split("/").pop()
                                          : undefined)
                                      }
                                      isUploading={uploadingPassportIds.includes(
                                        t.id,
                                      )}
                                      onUpload={handlePassportUpload}
                                      onDelete={handlePassportDelete}
                                      onError={(msg: string) =>
                                        setLocalPopup({
                                          message: msg,
                                          type: "error",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {travelers.length < totalTravelers && (
                        <button
                          ref={addButtonRef}
                          type="button"
                          onClick={handleAddTraveler}
                          disabled={travelers.length >= totalTravelers}
                          aria-disabled={travelers.length >= totalTravelers}
                          title={
                            travelers.length >= totalTravelers
                              ? "All traveler forms are added"
                              : "Add another traveler"
                          }
                          className={`mt-4 py-3 px-6 border-2 border-dashed border-primary rounded-xl text-primary font-bold flex items-center gap-2 transition text-sm ${
                            travelers.length >= totalTravelers
                              ? "opacity-40 cursor-not-allowed pointer-events-none"
                              : "cursor-pointer"
                          }`}
                        >
                          <Plus className="w-4 h-4" /> Add Another Traveler
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <Heart className="w-5 h-5" /> Health & Dietary
                        </h4>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <label className="text-xs font-bold text-gray-500 mb-3 block uppercase">
                            Dietary Preference{" "}
                            <span className="text-red-500">*</span>
                            <br />
                            <span className="text-xs font-medium text-gray-600 normal-case">
                              Which best describes your dietary lifestyle?
                            </span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              "Vegan",
                              "Gluten Free",
                              "Keto/Low-Carb",
                              "Vegetarian",
                              "Pescatarian",
                              "No Restrictions",
                              "Other",
                            ].map((opt) => (
                              <label
                                key={opt}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="mealPreference"
                                  value={opt}
                                  checked={bookingData.mealPreference === opt}
                                  onChange={handleChange}
                                  className="text-primary focus:ring-[var(--color-primary)]"
                                />
                                <span className="text-sm text-gray-700">
                                  {opt}
                                </span>
                              </label>
                            ))}
                          </div>
                          {bookingData.mealPreference === "Other" && (
                            <input
                              type="text"
                              name="mealPreferenceOther"
                              value={bookingData.mealPreferenceOther}
                              onChange={handleChange}
                              placeholder="Please specify..."
                              className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-gray-400"
                            />
                          )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <label className="text-xs font-bold text-gray-500 mb-3 block uppercase">
                            Mobility Issues{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            {[
                              "Wheelchair",
                              "Diff. Walking",
                              "Special Room",
                              "None",
                              "Other",
                            ].map((opt) => (
                              <label
                                key={opt}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={opt}
                                  checked={bookingData.mobilityIssues.includes(
                                    opt,
                                  )}
                                  onChange={() => handleMobilityChange(opt)}
                                  className="rounded text-primary"
                                />
                                <span className="text-sm text-gray-700">
                                  {opt}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* 👇 SHOW ONLY WHEN "Other" IS SELECTED */}
                          {bookingData.mobilityIssues.includes("Other") && (
                            <input
                              type="text"
                              name="mobilityOther"
                              value={bookingData.mobilityOther}
                              onChange={handleChange}
                              placeholder="Please specify mobility issue..."
                              className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-gray-400"
                            />
                          )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                            Allergies & Intolerances{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <p className="text-xs text-gray-600 font-medium mb-3">
                            Please check any that apply, and specify details
                            below (Important for Safety).
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            {[
                              "Peanuts/Tree Nuts",
                              "Gluten/Wheat (Celiac)",
                              "Dairy (Lactose)",
                              "Shellfish",
                              "Soy",
                              "None",
                              "Other",
                            ].map((opt) => (
                              <label
                                key={opt}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={opt}
                                  checked={bookingData.allergies.includes(opt)}
                                  onChange={() => handleAllergyChange(opt)}
                                  className="rounded text-gray-500 focus:ring-gray-500"
                                />
                                <span className="text-sm text-gray-700">
                                  {opt}
                                </span>
                              </label>
                            ))}
                          </div>
                          {bookingData.allergies.includes("Other") && (
                            <input
                              type="text"
                              name="allergyDetails"
                              value={bookingData.allergyDetails}
                              onChange={handleChange}
                              placeholder="Please specify allergy details here..."
                              className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-gray-400"
                            />
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" /> Emergency & Info
                        </h4>

                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 space-y-3">
                          <label className="text-xs font-bold text-red-800 block uppercase">
                            Emergency Contact (Non-Traveler){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            ref={emergencyNameRef}
                            type="text"
                            name="emergencyName"
                            placeholder="Contact Name"
                            value={bookingData.emergencyName}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg text-sm outline-none ${
                              firstInvalidField === "emergencyName"
                                ? "border-red-400 ring-1 ring-red-400"
                                : "border border-red-200"
                            }`}
                          />
                          <div>
                            <PhoneInputWithCountrySelect
                              value={bookingData.emergencyContact || undefined}
                              onChange={(val) => {
                                setBookingData((prev) => ({
                                  ...prev,
                                  emergencyContact: val || "",
                                }));
                                if (firstInvalidField === "emergencyPhone")
                                  setFirstInvalidField(null);
                              }}
                              international
                              countryCallingCodeEditable={true}
                              defaultCountry="KE"
                              placeholder="Enter phone number"
                              className={`w-full p-3 rounded-lg text-sm outline-none ${
                                firstInvalidField === "emergencyPhone"
                                  ? "border-red-400 ring-1 ring-red-400"
                                  : "border border-red-200"
                              }`}
                              numberInputProps={{
                                className:
                                  "border-none  outline-none focus:outline-none focus:ring-0",
                              }}
                            />
                            {firstInvalidField === "emergencyPhone" && (
                              <p className="text-xs text-red-600 mt-1">
                                Please provide a valid emergency phone
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-bold text-gray-700">
                            General Medical Conditions
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="medicalRestrictions"
                            value={bookingData.medicalRestrictions}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none"
                            placeholder="Chronic conditions, diabetes, etc..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-bold text-gray-700">
                            Additional Info / Roommate Request
                          </label>
                          <textarea
                            name="additionalInfo"
                            rows={3}
                            value={bookingData.additionalInfo}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none resize-none"
                            placeholder="Any preferences?"
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-200" />

                    {!isFamilyBooking && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-primary">
                          Payment Plan <span className="text-red-500">*</span>
                        </h4>

                        <div
                          className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
                            isFamilyBooking
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }`}
                        >
                          {/* FULL PAYMENT */}
                          <PaymentOption
                            value="FULL"
                            title="Full Payment:"
                            discountText="8% Off"
                            description={`8% on $${formatNumber(
                              totalAmount,
                            )}: -$${formatNumber(fullDiscount)}`}
                            payTodayText={`Pay Today: $${formatNumber(
                              totalAmount - fullDiscount,
                            )}`}
                            checked={paymentPlan === "FULL"}
                            onChange={() => setPaymentPlan("FULL")}
                          />

                          <PaymentOption
                            value="HALF"
                            title="Half Payment:"
                            discountText="4% Off"
                            description={`4% on $${formatNumber(
                              totalAmount,
                            )}: -$${formatNumber(halfDiscount)}`}
                            payTodayText={`Pay Today: $${formatNumber(
                              Math.round((totalAmount - halfDiscount) / 2),
                            )}`}
                            checked={paymentPlan === "HALF"}
                            onChange={() => setPaymentPlan("HALF")}
                          />

                          <PaymentOption
                            value="DEPOSIT"
                            title="Deposit Only"
                            description="$1,000 per person"
                            payTodayText={`Pay Today: $${formatNumber(
                              totalTravelers * 1000,
                            )}`}
                            checked={paymentPlan === "DEPOSIT"}
                            onChange={() => setPaymentPlan("DEPOSIT")}
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-4 text-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`
    w-full md:w-2/4 py-3 md:py-2 font-extrabold text-lg rounded-2xl shadow-xl
    transition transform mx-auto mb-4
    ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:opacity-90 hover:scale-[1.01] cursor-pointer"
    }
    text-white flex items-center justify-center gap-2
  `}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Processing…
                          </>
                        ) : isFamilyBooking ? (
                          "Submit Registration"
                        ) : (
                          "Proceed to Payment"
                        )}
                      </button>

                      <p className="text-sm text-gray-500 mt-4">
                        <span className="text-red-500">*</span>By clicking
                        submit, you agree to the terms and conditions. A travel
                        specialist will review your details and contact you for
                        the final deposit.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:sticky lg:top-28 h-fit">
                <div className="bg-[#fffafa] rounded-3xl shadow-2xl border p-6">
                  <Image
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/spot_summary.jpg"
                    alt="Trip Summary"
                    width={400}
                    height={250}
                    className="rounded-2xl mb-6 w-full object-cover"
                  />

                  <h3 className="text-xl font-bold text-primary mb-4">
                    Summary
                  </h3>
                  <div className="flex items-start gap-2 mb-4 p-3 rounded-lg border bg-blue-50 border-blue-200">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />

                    <p className="text-xs font-medium text-blue-800 leading-snug">
                      {rateType === "EARLY"
                        ? "Early Bird pricing is applied. You are saving more by booking before Jan 31."
                        : "Normal pricing is applied as the Early Bird offer has ended."}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rate Type</span>
                      <span className="font-semibold">
                        {rateType === "EARLY" ? "Early Rate" : "Normal Rate"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Adults ({adultCount})</span>
                      <span>
                        {formatCurrency(adultCount * ADULT_PRICE_DYNAMIC)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Children ({childCount})</span>
                      <span>
                        {formatCurrency(childCount * CHILD_PRICE_DYNAMIC)}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total Fee</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="font-bold mb-2">Pricing Breakdown</h4>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Trip Cost</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>

                    {!isFamilyBooking && paymentPlan === "FULL" && (
                      <div className="flex justify-between text-green-600">
                        <span>Full Payment Discount (8%)</span>
                        <span>-{formatCurrency(fullDiscount)}</span>
                      </div>
                    )}

                    {!isFamilyBooking && paymentPlan === "HALF" && (
                      <div className="flex justify-between text-green-600">
                        <span>Half Payment Discount (4%)</span>
                        <span>-{formatCurrency(halfDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-base pt-2 mb-4">
                      <span>Pay Today</span>
                      <span>{formatCurrency(payToday)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
};

export default TripOverviewBooking;
