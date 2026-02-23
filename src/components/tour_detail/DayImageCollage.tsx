import React from "react";
import KoursairImage from "../Media/Images/KoursairImage"; // Adjust path as needed

interface DayImageCollageProps {
  images: string[];
  title: string;
}

const DayImageCollage: React.FC<DayImageCollageProps> = ({ images, title }) => {
  const count = images.length;
  const imageClasses = "object-cover transition-transform duration-500 group-hover:scale-105";
  const wrapperBaseClasses = "relative w-full h-full overflow-hidden group";

  if (count >= 5) {
    return (
      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full w-full">
        <div className={`${wrapperBaseClasses} col-span-2 row-span-4`}>
          <KoursairImage src={images[0]} alt={`${title} 1`} fill className={imageClasses} />
        </div>
        <div className={`${wrapperBaseClasses} col-span-2 row-span-1`}>
          <KoursairImage src={images[1]} alt={`${title} 2`} fill className={imageClasses} />
        </div>
        <div className={`${wrapperBaseClasses} col-span-1 row-span-1`}>
          <KoursairImage src={images[2]} alt={`${title} 3`} fill className={imageClasses} />
        </div>
        <div className={`${wrapperBaseClasses} col-span-1 row-span-1`}>
          <KoursairImage src={images[3]} alt={`${title} 4`} fill className={imageClasses} />
        </div>
        <div className={`${wrapperBaseClasses} col-span-2 row-span-2`}>
          <KoursairImage src={images[4]} alt={`${title} 5`} fill className={imageClasses} />
        </div>
      </div>
    );
  } else if (count === 4) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full w-full">
        {images.slice(0, 4).map((imgSrc, imgIdx) => (
          <div key={imgIdx} className={wrapperBaseClasses}>
            <KoursairImage src={imgSrc} alt={`${title} ${imgIdx + 1}`} fill className={imageClasses} />
          </div>
        ))}
      </div>
    );
  } else if (count === 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full w-full">
        <div className={`${wrapperBaseClasses} row-span-2`}>
          <KoursairImage src={images[0]} alt={`${title} 1`} fill className={imageClasses} />
        </div>
        <div className={wrapperBaseClasses}>
          <KoursairImage src={images[1]} alt={`${title} 2`} fill className={imageClasses} />
        </div>
        <div className={wrapperBaseClasses}>
          <KoursairImage src={images[2]} alt={`${title} 3`} fill className={imageClasses} />
        </div>
      </div>
    );
  } else if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 h-full w-full">
        {images.slice(0, 2).map((imgSrc, imgIdx) => (
          <div key={imgIdx} className={wrapperBaseClasses}>
            <KoursairImage src={imgSrc} alt={`${title} ${imgIdx + 1}`} fill className={imageClasses} />
          </div>
        ))}
      </div>
    );
  } else if (count === 1) {
    return (
      <div className={wrapperBaseClasses}>
        <KoursairImage src={images[0]} alt={title} fill className={imageClasses} />
      </div>
    );
  } else {
    return <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">No Images Available</div>;
  }
};

export default DayImageCollage;