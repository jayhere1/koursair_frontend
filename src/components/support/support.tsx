import SupportHero from "./SupportHero";
import FAQSection from "./FAQSection";
import { faqs } from "@/constants/faq";
import ReportProblemSection from "./ReportProblemSection";
import SupportContactSection from "./SupportContactSection";

const Support = () => {
  return (
    <div className="w-full">
      <SupportHero />
      <div className="py-12 sm:py-16 lg:py-20 bg-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">

            <div className="lg:col-span-4 space-y-12 sm:space-y-16">
              <FAQSection faqs={faqs} />
            </div>
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
              <ReportProblemSection />
              <SupportContactSection />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
