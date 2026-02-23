"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import KoursairImage from '../Media/Images/KoursairImage';

type TabKey = 'philosophy' | 'promise' | 'focus';

const PhilosophySection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('philosophy');
  const Route = useRouter()

  const content: Record<TabKey, {
    title: string;
    text: string;
    image: string;
  }> = {
    philosophy: {
      title: 'Our Philosophy',
      text: "Travel isn't just about where you go — it's how you feel while you're there. We believe it should be effortless, elevated, and full of connection. That's why we take care of every detail, so you can just show up and enjoy the ride.",
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/about/Philosophy.jpg"
    },
    promise: {
      title: 'Our Promise',
      text: "From start to finish, we handle everything — flights, stays, local guides, and epic experiences. You get the freedom to be present, the thrill of new places, and the support of a team that cares. No stress. All magic.",
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/about/Promise.jpg"
    },
    focus: {
      title: 'Our Focus',
      text: "Our secret? We focus only on select destinations we know inside and out. By securing large block bookings and leveraging trusted local partners, we deliver premium group travel experiences at prices no competitor can match.",
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/about/Focus.jpg"
    }
  };

  const currentContent = content[activeTab];

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 bg-[#F4EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
              {(Object.entries(content) as [TabKey, typeof content[TabKey]][]).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all cursor-pointer duration-300 flex items-center gap-2 transform hover:scale-105 text-sm sm:text-base ${
                    activeTab === key
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-700 bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  {currentContent.title}
                </h2>
              </div>
              
              <div 
                className="transition-all duration-500 ease-in-out transform"
                key={activeTab}
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-primary mb-6 sm:mb-8">
                  {currentContent.text}
                </p>
              </div>

              {/* Call to Action */}
              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row sm:gap-3">
                <button onClick={()=>Route.push('/groups')}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full cursor-pointer font-semibold bg-primary text-white text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-105 transform mb-3 sm:mb-0"
                >
                  Discover Our Trips
                </button>
                {/* <button 
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 border-primary text-primary bg-transparent text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                >
                  Learn More
                </button> */}
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="transition-all duration-700 ease-in-out transform h-64 sm:h-80 md:h-96 lg:h-[500px]"
                key={`image-${activeTab}`}
              >
                <KoursairImage
                  src={currentContent.image}
                  alt={currentContent.title}
                  fill
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700 rounded-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Floating badge */}
              <div 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white font-semibold shadow-lg backdrop-blur-sm bg-primary/90 text-sm sm:text-base"
              >
                {currentContent.title}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="relative mt-6 sm:mt-8">
              <div className="flex justify-center gap-2 sm:gap-3">
                {(Object.keys(content) as TabKey[]).map((key) => (
                  <div
                    key={key}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 bg-primary ${
                      activeTab === key ? 'scale-125' : 'scale-100 opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;