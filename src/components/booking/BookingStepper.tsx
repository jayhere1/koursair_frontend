"use client";
import React from 'react';

interface Props {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Traveler Details' },
  { number: 2, title: 'Payment' },
  { number: 3, title: 'Confirmation' }
];

const BookingStepper: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center flex-1">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                currentStep >= step.number 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <div className="ml-2 md:ml-3 hidden sm:block">
                <p className={`font-semibold text-xs md:text-sm ${currentStep >= step.number ? 'text-black' : 'text-gray-400'}`}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 md:mx-4 rounded ${
                currentStep > step.number ? 'bg-black' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingStepper;