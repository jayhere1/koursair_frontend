import KoursairImage from "../Media/Images/KoursairImage";

const SupportHero = () => {
  return (
    <div className="relative pt-16 flex items-center justify-center overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <KoursairImage
          src="https://koursair-media.s3.us-east-1.amazonaws.com/images/others/support/travel_support_.jpg"
          alt="Support Hero"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-alegreya mb-4">
          Support
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90">
          We&apos;re here to help with your travel needs.
        </p>
      </div>

      {/* Scroll Arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default SupportHero;
