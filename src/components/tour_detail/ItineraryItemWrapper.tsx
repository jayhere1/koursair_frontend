import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';

interface ItineraryItemWrapperProps { 
  children: React.ReactNode; 
  day: {
    day: number;
    title: string;
    images: string[];
    activities: string[];
    coordinates?: { lat: number; lng: number };
    zoom?: number;
  };
  onVisible: (coords: { lat: number, lng: number }, zoom: number) => void 
}

const ItineraryItemWrapper: React.FC<ItineraryItemWrapperProps> = ({ children, day, onVisible }) => {
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && day.coordinates) {
      onVisible(day.coordinates, day.zoom || 11);
    }
  }, [inView, day, onVisible]);

  return <div ref={ref} className="scroll-item">{children}</div>;
};

export default ItineraryItemWrapper;