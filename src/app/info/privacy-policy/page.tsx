// src/pages/PrivacyPolicy.tsx or /privacy-policy route
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
        <Navbar/>
    <div className="bg-[#F4EFE7] text-gray-600 px-6 md:px-20 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center text-primary font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6">
        At Koursair.com, we are committed to safeguarding your privacy and
        protecting your personal information. This Privacy Policy explains how
        we collect, use, disclose, and secure your data when you access or use
        our website, app, or related services. By using our platform, you agree
        to the terms outlined in this policy. If you do not agree with any part
        of this policy, we kindly ask that you refrain from using our services.
      </p>

      <Section title="1. Information We Collect">
        <SubSection title="Directly from You">
            <p>Information you provide via our website, app, or other communication methods (such as phone, email, or fax) may include:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full name, phone number, mailing and email address</li>
            <li>Payment information (credit/debit card details)</li>
            <li>
              Travel preferences (meal/seat choices, frequent flyer numbers,
              etc.)
            </li>
            <li>Booking details, reviews, comments, or other transaction-related data</li>
          </ul>
          <p className="mt-2">
            Please note that while providing information is optional, certain
            details are essential for membership, bookings, and other
            transactions.
          </p>
        </SubSection>

        <SubSection title="For Others You Book on Behalf Of">
          <p>
            When booking travel for others, you may need to provide their
            personal and travel preference information. Ensure you obtain their
            consent before sharing their details. As the account holder, only
            you will have access to modify their information.
          </p>
        </SubSection>

        <SubSection title="From Third Parties">
            <p>We may receive updated information from business partners or external sources, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Address updates for better service delivery</li>
            <li>
              Demographic or preference data to enhance our service offering
            </li>
          </ul>
        </SubSection>

        <SubSection title="Automatically Collected Information">
            <p>We may collect technical and usage data such as:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address, browser type, device and OS info</li>
            <li>Pages visited, referring URLs, timestamps</li>
            <li>Interaction patterns to improve user experience</li>
          </ul>
        </SubSection>

        <SubSection title="Cookies and Tracking Technologies">
            <p>Cookies and similar technologies help us:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Remember your preferences</li>
            <li>Track site/app usage</li>
            <li>Deliver personalized content</li>
          </ul>
          <p className="mt-2">
            You can manage cookie settings via your browser.
          </p>
        </SubSection>
      </Section>

      <Section title="2. Use and Disclosure of Personal Information">
        <p>We use your personal information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Book travel and provide requested services</li>
          <li>Customize and enhance your travel experience</li>
          <li>Process payments and communicate trip details</li>
          <li>Conduct internal operations and customer support</li>
          <li>
            Send promotional emails and newsletters (you can opt out anytime)
          </li>
          <li>Comply with legal, regulatory, or immigration requirements</li>
        </ul>
      </Section>

      <Section title="3. Information Sharing">
        <p>We may share your data with:</p>
        <SubSection title="Suppliers">
          <p>
            Airlines, hotels, cruise lines, car rental agencies, and activity
            providers who require your information to fulfill bookings. Their
            use of your data is subject to their own privacy policies.
          </p>
        </SubSection>
        <SubSection title="Third-Party Service Providers">
          <p>These include companies that handle:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payment processing</li>
            <li>Customer service</li>
            <li>Marketing and analytics</li>
            <li>Fraud prevention</li>
          </ul>
        </SubSection>
        <SubSection title="Legal Compliance">
          <p>
            We may disclose your information if required by law, to enforce
            legal rights, or protect user safety.
          </p>
        </SubSection>
        <SubSection title="Sale or Restructuring">
          <p>
            In the event of a sale, merger, bankruptcy, or restructuring, your
            personal information may be transferred as part of the business
            assets.
          </p>
        </SubSection>
      </Section>

      <Section title="4. Data Security">
        <p>
          We implement reasonable administrative, technical, and physical
          safeguards to protect your data. However, no method of online
          transmission or storage is completely secure. While we strive to
          protect your information, we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We retain your information only for as long as necessary to fulfill
          the purposes outlined in this policy or to comply with legal
          obligations.
        </p>
      </Section>

      <Section title="6. Your Rights and Access">
        <p>You may:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access and update your information via your account or by contacting us</li>
          <li>Request corrections to inaccurate data</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p className="mt-4">For users in the UK/EU/EEA, you also have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Request deletion of your personal data (subject to legal retention requirements)</li>
          <li>Object to or restrict processing</li>
          <li>Receive your data in a portable format</li>
          <li>File a complaint with a supervisory authority</li>
        </ul>
      </Section>

      <Section title="7. Minors and Children’s Privacy">
        <p>
          Children under 16 are not permitted to make bookings or transact
          directly with Koursair. All reservations for minors must be made by a
          parent or legal guardian to ensure appropriate consent and
          supervision.
        </p>
      </Section>

      <Section title="8. Contests, Newsletters, and Job Applications">
        <p>
          We may collect personal information (name, contact info, etc.) when you:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Enter a contest or sweepstakes</li>
          <li>Subscribe to our newsletter</li>
          <li>Apply for a job at Koursair</li>
        </ul>
        <p className="mt-2">
          This information is used solely for the intended purpose (e.g., contest administration, newsletter distribution, or recruitment).
        </p>
      </Section>

      <Section title="9. Group Reveal Feature (Post-Booking)">
        <p>
          To foster community and transparency in group travel, we may display
          limited participant information:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>First initial</li>
          <li>Gender</li>
          <li>Country of residence</li>
        </ul>
        <p className="mt-2">
          Opt-out: You may request exclusion from this feature at any time by
          emailing <a href="mailto:info@koursair.com" className="text-blue-600 underline">info@koursair.com</a>.
        </p>
      </Section>

      <Section title="10. International Data Transfers">
        <p>
          Your information may be transferred or stored outside your home
          country, including regions without equivalent data protection laws.
          Koursair takes appropriate measures to ensure your privacy is
          protected in such cases.
        </p>
      </Section>

      <Section title="11. Third-Party Links and Cookies">
        <p>
          Our website may include links to third-party websites or services.
          Their privacy practices are not governed by this policy. We encourage
          you to review their privacy statements before sharing any personal
          information.
        </p>
        <p className="mt-2">
          Additionally, third-party vendors may use cookies to serve Koursair
          ads based on your previous visits to our website. These cookies may be
          used for performance analysis, user experience improvement, or
          marketing purposes.
        </p>
      </Section>

      <Section title="12. Updates to This Policy">
        <p>
          We reserve the right to update this Privacy Policy at any time. Any
          changes will be posted on our website or app, and your continued use
          of our services indicates your acceptance of those changes. Please
          check this page periodically for the latest information.
        </p>
      </Section>

      <Section title="13. Contact Us">
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, you may contact us at:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>📧 Email: <a href="mailto:info@koursair.com" className="text-blue-600 underline">info@koursair.com</a></li>
          <li>🌐 Website: <a href="https://www.koursair.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.koursair.com</a></li>
        </ul>
      </Section>

      <p className="mt-10 text-sm italic">
        By using Koursair’s website, app, or services, you confirm that you have
        read, understood, and agreed to this Privacy Policy.
      </p>
    </div>
    <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-2 text-[#1b3658]">{title}</h2>
    {children}
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-base text-gray-700 mb-1">{title}</h3>
    {children}
  </div>
);
