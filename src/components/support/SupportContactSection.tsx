import { LifeBuoy } from "lucide-react";

const SupportContactSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center">
      <div className="flex items-center justify-center mb-5">
        <LifeBuoy size={54} color="#1e2939" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
        Need Immediate Help?
      </h3>

      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Our support team is available 24/7 to assist you with any issues.
      </p>

      <div className="space-y-2 text-sm sm:text-base text-gray-600">
        <p>info@koursair.com</p>
        <p>1-800-521-4263</p>
      </div>
    </div>
  );
};

export default SupportContactSection;
