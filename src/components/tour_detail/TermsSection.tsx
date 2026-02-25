import React from "react";

const TermsSection = () => {
  return (
    <div className="space-y-10 scroll-m-24">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
        Full Terms & Essential Details
      </h2>
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 space-y-6 border-t-4 border-primary">
        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Booking & Payment
          </h3>
          <p className="text-gray-600">
            A minimum deposit of **25%** of the total package cost is
            required at the time of booking to secure your reservation. The
            balance payment must be made no later than **45 days** prior to
            departure. Bookings made within **45 days** of travel require
            full payment at the time of booking. Payments can be made via
            bank transfer, credit/debit card, or any other approved payment
            method.
          </p>
          <p className="text-gray-600 mt-2">
            All prices are quoted in **USD** unless otherwise specified.
          </p>
        </div>
        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Passport & Visa Requirements
          </h3>
          <p className="text-gray-600">
            It is the traveler’s responsibility to ensure they hold a valid
            passport with at least 6 months’ validity from the date of
            return. Koursair can assist in visa processing (additional
            charges may apply). The granting of visas is solely at the
            discretion of the Immigration Authorities.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Travel Insurance
          </h3>
          <p className="text-gray-600">
            Comprehensive travel insurance is highly recommended to cover
            trip cancellations, medical expenses, and personal belongings.
            Koursair will not be liable for any loss, injury, or damage
            incurred during travel.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Itinerary Changes
          </h3>
          <p className="text-gray-600">
            Koursair reserves the right to alter the itinerary due to
            unforeseen circumstances such as flight rescheduling, weather
            conditions, or operational reasons. Any changes will be
            communicated promptly, and alternative arrangements of similar
            value will be provided.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Cancellation Policy
          </h3>
          <p className="text-gray-600">
            More than **45 days** before departure – **20%** cancellation
            fee applies.
            <br />
            **30–44 days** before departure – **50%** cancellation fee
            applies.
            <br />
            **15–29 days** before departure – **75%** cancellation fee
            applies.
            <br />
            **Less than 15 days** before departure – **100%** cancellation
            fee applies.
            <br />
            Refunds, if applicable, will be processed within 21 working days
            from the cancellation date.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Responsibility & Liability
          </h3>
          <p className="text-gray-600">
            Koursair acts only as an agent between the traveler and hotels,
            airlines, transportation companies, and other suppliers. We are
            not responsible for any injury, loss, damage, delay, or
            irregularity caused by third parties or factors beyond our
            control. All travel arrangements are subject to the terms and
            conditions of the suppliers providing the services.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Health & Safety
          </h3>
          <p className="text-gray-600">
            Travelers must be in good health to undertake the tour and
            should consult their doctor regarding any health precautions for
            travel. Any medical expenses incurred during the trip are the
            sole responsibility of the traveler.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            Acceptance of Terms
          </h3>
          <p className="text-gray-600">
            By confirming your booking with Koursair, you acknowledge that
            you have read, understood, and agreed to the above Terms &
            Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;