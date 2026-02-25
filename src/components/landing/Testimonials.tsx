"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { testimonials } from '@/constants/testimonial';

const TestimonialsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const Route = useRouter();

  useEffect(() => {
    const refs = videoRefs.current;
    return () => {
      Object.values(refs).forEach((video) => {
        if (video) {
          video.pause();
          // Remove <source> elements and reset
          while (video.firstChild) {
            video.removeChild(video.firstChild);
          }
          video.load();
        }
      });
    };
  }, []);

  const handleMouseEnter = useCallback((id: number) => {
    setHoveredCard(id);
    if (videoRefs.current[id]) {
      videoRefs.current[id]?.play();
    }
  }, []);

  const handleMouseLeave = useCallback((id: number) => {
    setHoveredCard(null);
    if (videoRefs.current[id]) {
      videoRefs.current[id]?.pause();
      if (videoRefs.current[id]) {
        videoRefs.current[id]!.currentTime = 0;
      }
    }
  }, []);

  return (
    <div className="w-full py-12 sm:py-16 lg:py-24 bg-[#F4EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Client Reviews
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it - hear from travelers who&apos;ve experienced the Koursair difference.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl group h-[400px] sm:h-[450px] md:h-[500px]"
              style={{
                transform: hoveredCard === testimonial.id ? 'scale(1.05) translateY(-8px)' : 'scale(1)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              onMouseEnter={() => handleMouseEnter(testimonial.id)}
              onMouseLeave={() => handleMouseLeave(testimonial.id)}
            >
              {/* Background Image - using Next.js Image instead of CSS backgroundImage */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredCard === testimonial.id ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Video Element */}
              <video
                ref={(el) => {
                  videoRefs.current[testimonial.id] = el;
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredCard === testimonial.id ? 'opacity-100' : 'opacity-0'
                }`}
                preload="none"
                muted
                loop
                playsInline
              >
                <source src={testimonial.videoUrl} type="video/mp4" />
              </video>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  aria-label="Play testimonial video"
                  className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border-none cursor-pointer ${
                    hoveredCard === testimonial.id ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  }`}
                >
                  <svg className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="text-left">
                  {/* Quote mark */}
                  <div className="mb-3 sm:mb-4">
                    <svg className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  {/* Quote text */}
                  <p className="text-white text-sm md:text-base lg:text-lg font-alegreya leading-relaxed mb-4 sm:mb-6 font-medium">
                    {testimonial.quote}
                  </p>

                  {/* Name */}
                  <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200">
                    {testimonial.name}
                  </p>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  hoveredCard === testimonial.id ? 'bg-black/10' : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-20">
          <button onClick={() => Route.push('/reviews')}
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full cursor-pointer font-semibold bg-primary text-white text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:scale-105 transform mr-3 sm:mr-4 hover:bg-[#A6957D]"
          >
            Read More Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
