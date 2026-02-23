import React from "react";

interface OverviewSectionProps {
  overview: {
    title: string;
    paragraphs: string[];
  };
  keySellingPoints: {
    iconPath: string;
    title: string;
    text: string;
  }[];
}

const RenderSellingPointIcon = ({ path }: { path: string }) => (
  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
  </svg>
);

const OverviewSection: React.FC<OverviewSectionProps> = ({ overview, keySellingPoints }) => {
  return (
    <div className="col-span-3 lg:col-span-2 space-y-8">
      <h2 className="text-4xl font-extrabold text-primary tracking-tight border-b-4 border-primary pb-3">{overview.title}</h2>
      {overview.paragraphs.map((p, index) => (
        <p key={index} className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      <div className="grid md:grid-cols-3 gap-6 pt-4">
        {keySellingPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md">
            <RenderSellingPointIcon path={point.iconPath} />
            <div>
              <h3 className="font-bold text-primary">{point.title}</h3>
              <p className="text-sm text-gray-600">{point.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;