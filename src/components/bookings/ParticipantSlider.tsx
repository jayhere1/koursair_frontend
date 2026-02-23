"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { capitalizeFirstLetter } from "@/utils/helper";

/* ---------------- Types ---------------- */

type Participant = {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
};

/* ---------------- Arrow Button ---------------- */

const ArrowButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Previous" : "Next"}
    className={`
      w-9 h-9 rounded-full border flex items-center justify-center transition
      ${
        disabled
          ? "border-gray-200 text-gray-300 cursor-not-allowed"
          : "border-gray-300 hover:bg-gray-100"
      }
    `}
  >
    {direction === "left" ? (
      <ChevronLeft size={18} />
    ) : (
      <ChevronRight size={18} />
    )}
  </button>
);

/* ---------------- Slider Component ---------------- */

const ParticipantSlider = ({ members }: { members: Participant[] }) => {
  const sliderRef = useRef<Slider | null>(null);

  if (!members || members.length === 0) return null;

  const slidesToShow = Math.min(3, members.length);
  const isDisabled = members.length <= slidesToShow;

  const settings = {
    dots: false,
    speed: 400,
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    infinite: members.length > slidesToShow,
    centerMode: false,
    variableWidth: false,
  };

  return (
    <div className="max-w-[360px] mt-3 mb-6 participant-slider">
      <Slider ref={sliderRef} {...settings}>
        {members.map((p, i) => {
          const fullName = [p.first_name, p.middle_name, p.last_name]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={i}>
              <div className="flex flex-col items-start pl-3 gap-2 px-2">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-base font-medium">
                  {p.first_name?.[0]?.toUpperCase() || "?"}
                </div>

                <p className="text-base font-medium text-gray-800">
                  {capitalizeFirstLetter(fullName)}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>

      <div className="flex justify-center gap-4 mt-4">
        <ArrowButton
          direction="left"
          disabled={isDisabled}
          onClick={() => sliderRef.current?.slickPrev()}
        />
        <ArrowButton
          direction="right"
          disabled={isDisabled}
          onClick={() => sliderRef.current?.slickNext()}
        />
      </div>
    </div>
  );
};


export default ParticipantSlider;
