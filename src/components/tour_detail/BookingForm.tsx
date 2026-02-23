"use client";

import React, { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from "react";
import { CustomSelect } from "../UIComponents/customselect";
import PhoneInputWithCountrySelect, { parsePhoneNumber } from "react-phone-number-input";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../AuthContext"; // Adjust path
import Popup from "../Popup"; // Adjust path
import { useRouter } from "next/navigation";

interface BookingFormProps {
  title: string;
  fixedDepartureDates: { date: string; price: number; label: string }[];
  minDeposit?: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ title, fixedDepartureDates, minDeposit }) => {
  const baseCountryCodes = useMemo(() => ["+91", "+1", "+44", "+61"], []);
  const { isAuthenticated, user, detectedPhoneCode, isPhoneCodeLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstInvalidField, setFirstInvalidField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<{ message: string; type: "success" | "error"; } | null>(null);
  const [popup, setPopup] = useState<{ message: string; type?: "success" | "error" | "info"; } | null>(null);
  
  const [bookingData, setBookingData] = useState({
    whereTo: title,
    selectedDate: fixedDepartureDates.length > 0 ? fixedDepartureDates[0].date : "",
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    travellerCount: 1,
    message: "",
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (isAuthenticated && user) {
      let userCountryCode = "+1";
      let userPhone = "";
      if (user.phone && user.phone.startsWith("+")) {
        const matchingCode = baseCountryCodes.find((code) => user.phone && user.phone.startsWith(code));
        if (matchingCode) {
          userCountryCode = matchingCode;
          userPhone = user.phone.substring(matchingCode.length);
        } else {
           userPhone = user.phone;
        }
      } else if (user.phone) {
        userPhone = user.phone;
      }
      setBookingData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: userPhone,
        countryCode: userCountryCode,
      }));
    }
  }, [isAuthenticated, user, baseCountryCodes]);

  useEffect(() => {
    if (!isAuthenticated && detectedPhoneCode) {
      if (isPhoneCodeLoading) {
        setBookingData(prev => ({ ...prev, countryCode: "..." })); 
      } else if (detectedPhoneCode) {
        setBookingData(prev => ({ ...prev, countryCode: detectedPhoneCode }));
      }
    }
  }, [isAuthenticated, user, detectedPhoneCode, isPhoneCodeLoading]);

  const getSelectedPrice = () => {
    const selected = fixedDepartureDates.find((d) => d.date === bookingData.selectedDate);
    return selected ? selected.price : fixedDepartureDates[0]?.price || 0;
  };


  const handlePhoneChange = (value: string | undefined) => {
    if (value) {
      const parsed = parsePhoneNumber(value);
      if (parsed) {
        setBookingData(prev => ({
          ...prev,
          countryCode: parsed.countryCallingCode,
          phone: parsed.nationalNumber
        }));
      }
    } else {
      setBookingData(prev => ({ ...prev, phone: '' }));
    }
    if (firstInvalidField === "contactPhone") setFirstInvalidField(null);
  };

  const handleEnquiry = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormStatus(null);
    setFirstInvalidField(null);

    if (!bookingData.name || bookingData.name.trim().length < 3) {
      setFormStatus({ message: "Please enter a valid full name.", type: "error" });
      setFirstInvalidField("name");
      return;
    }
    if (!bookingData.email || !isValidEmail(bookingData.email)) {
      setFormStatus({ message: "Please enter a valid email address.", type: "error" });
      setFirstInvalidField("email");
      return;
    }
    if (!bookingData.phone || bookingData.phone.length < 5) {
      setFormStatus({ message: "Please enter a valid phone number.", type: "error" });
      setFirstInvalidField("contactPhone");
      return;
    }
    if (!bookingData.selectedDate) {
      setFormStatus({ message: "Please select a departure date.", type: "error" });
      setFirstInvalidField("selectedDate");
      return;
    }

    setLoading(true);

    try {
      const formattedCountryCode = bookingData.countryCode.startsWith('+') 
        ? bookingData.countryCode 
        : `+${bookingData.countryCode}`;

      const response = await fetch('/api/auth/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,            
          countryCode: formattedCountryCode,
          selectedDate: bookingData.selectedDate,
          travellerCount: bookingData.travellerCount,
          message: bookingData.message,
          whereTo: bookingData.whereTo
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send enquiry");
      }

      //setFormStatus({ message: "Enquiry sent successfully!", type: "success" });
      router.push('/enquiry/success');
      setBookingData(prev => ({ ...prev, message: '', travellerCount: 1 }));

    } catch (error: unknown) {
      console.error("Enquiry Error:", error);
      let errorMessage = "Something went wrong. Please try again.";
      if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string") {
        errorMessage = (error as { message: string }).message;
      }
      setFormStatus({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (e: MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    if (!bookingData.selectedDate) {

      setPopup({ message: "Please select a valid Departure Date.", type: "error" });

      return;

    }

    router.push(

      `/booking?destination=${encodeURIComponent(title)}&date=${encodeURIComponent(bookingData.selectedDate)}&travelers=${bookingData.travellerCount}&price=${getSelectedPrice()}`

    );

  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: name === "travellerCount" ? Number(value) : value }));
    if (firstInvalidField === e.target.name) {
      setFirstInvalidField(null);
    }
  };

  const handleClosePopup = () => setPopup(null);

  return (
    <>
    {popup && <Popup message={popup.message} type={popup.type} onClose={handleClosePopup} />}
    <div className="bg-white rounded-3xl shadow-2xl p-3 sm:p-4 sticky top-[100px] space-y-4 border-t-8 border-primary">
      <h3 className="text-3xl font-extrabold text-primary text-center border-b pb-3">Secure Your Seat</h3>
      <form className="space-y-2">
        {/* NAME */}
        <input
          type="text"
          placeholder="Your FullName*"
          name="name"
          onChange={handleChange}
          value={bookingData.name}
          className={`w-full px-5 py-3 rounded-xl text-base outline-none ${
            firstInvalidField === "name" ? "border-red-400 ring-1 ring-red-400 bg-red-50" : "border border-gray-300 focus:border-primary"
          }`}
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Your Email*"
          name="email"
          onChange={handleChange}
          value={bookingData.email}
          className={`w-full px-5 py-3 rounded-xl text-base outline-none ${
            firstInvalidField === "email" ? "border-red-400 ring-1 ring-red-400 bg-red-50" : "border border-gray-300 focus:border-primary"
          }`}
          required
        />

        {/* PHONE */}
        <div className="w-full">
          <PhoneInputWithCountrySelect
            value={bookingData.phone ? `+${bookingData.countryCode.toString().replace('+', '')}${bookingData.phone}` : ''}
            onChange={handlePhoneChange}
            international
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            placeholder="Enter mobile number"
            className={`w-full p-3 rounded-lg text-sm outline-none bg-white ${
                firstInvalidField === "contactPhone" ? "border-red-400 ring-1 ring-red-400" : "border border-gray-300"
            }`}
            numberInputProps={{
              className: "border-none outline-none focus:outline-none focus:ring-0 w-full h-full ml-2", 
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* DATE SELECT */}
          <CustomSelect
            options={[
              { value: "", label: "Select a Date..." },
              ...fixedDepartureDates.map(date => ({ value: date.date, label: date.label.split(',')[0] }))
            ]}
            value={bookingData.selectedDate}
            onChange={value => {
              setBookingData(prev => ({ ...prev, selectedDate: value }));
              if (firstInvalidField === "selectedDate") setFirstInvalidField(null);
            }}
            placeholder="Select a Date..."
            className={`w-full px-3 py-3 rounded-xl text-base outline-none ${
              firstInvalidField === "selectedDate" ? "border-red-400 ring-1 ring-red-400 bg-red-50" : "border border-gray-300 focus:border-primary"
            }`}
          />

          {/* TRAVELLERS */}
          <input
            placeholder="Travellers"
            type="number"
            name="travellerCount"
            value={bookingData.travellerCount}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:border-primary"
            required
            min={1}
          />
        </div>

        <textarea
          placeholder="Message..."
          name="message"
          rows={3}
          value={bookingData.message}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base resize-none focus:outline-none focus:border-primary"
        />

        {/* PRICING DISPLAY */}
        <div className="bg-[#F4EFE7]/80 rounded-xl p-2 sm:p-2 text-center border-2 border-primary">
          <p className="text-gray-700 text-sm font-medium uppercase tracking-wider">Total Price Per Person</p>
          <p className="text-3xl font-extrabold text-primary my-1">${getSelectedPrice().toLocaleString()}</p>
          {minDeposit && (
          <p className="text-gray-600 text-sm">
            Minimum Deposit: <span className="font-bold text-red-500">${minDeposit}</span>
          </p>)}
        </div>

        {/* FORM STATUS FEEDBACK */}
        {formStatus && (
          <div
            className={`p-3 text-center rounded-xl text-sm font-medium ${
              formStatus.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <div className="flex flex-row items-center justify-center gap-2">
          <button
            type="submit"
            onClick={handleEnquiry}
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-bold text-lg cursor-pointer rounded-xl shadow-xl hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Sending..." : "Send Enquiry"}
          </button>
          <button
            onClick={handleBooking}
            className="w-full py-4 bg-primary text-white font-bold text-lg cursor-pointer rounded-xl shadow-xl hover:bg-green-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default BookingForm;