"use client";

import React from "react";

const CheckCircleSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.8-5.8 1.4 1.4-7.2 7.2z" />
    </svg>
);

const ratingLabels = {
    5: { label: "Excellent", color: "text-green-600", bar: "bg-green-500" },
    4: { label: "Good", color: "text-teal-600", bar: "bg-teal-500" },
    3: { label: "Average", color: "text-yellow-600", bar: "bg-yellow-500" },
    2: { label: "Poor", color: "text-orange-600", bar: "bg-orange-500" },
    1: { label: "Terrible", color: "text-red-600", bar: "bg-red-500" },
};


interface OverallReviewsSummaryProps {
    distribution: Record<string, number>;
    percentages: Record<string, number>;
    overallSuccessRate: number | string;
}

const OverallReviewsSummary = ({
    distribution,
    percentages,
    overallSuccessRate,
}: OverallReviewsSummaryProps) => {
    return (
        <div className="bg-white rounded-2xl max-w-4xl justify-center mx-auto shadow-xl overflow-hidden mb-12 border-2 border-primary">
            <div className="bg-primary text-center text-white p-4 sm:p-6 text-xl sm:text-2xl font-semibold">
                Reviews of Experience Travel Group
            </div>

            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center border-b pb-4 md:border-b-0 md:border-r border-gray-200">
                    <p className="text-lg font-semibold text-primary mb-2">
                        Overall Rating
                    </p>

                    <div className="flex text-3xl mb-2">
                        {[...Array(5)].map((_, i) => (
                            <CheckCircleSvg
                                key={i}
                                className="w-8 h-8 mx-0.5 text-yellow-500"
                            />
                        ))}
                    </div>

                    <p className="text-5xl font-extrabold text-primary">
                        {overallSuccessRate}
                    </p>
                </div>

                <div className="md:col-span-2 space-y-2">
                    {Object.entries(distribution)
                        .reverse()
                        .map(([rating, count]: [string, number]) => {
                            const ratingInfo = ratingLabels[Number(rating) as keyof typeof ratingLabels];
                            return (
                                <div key={rating} className="flex items-center text-sm">
                                    <span className={`w-20 font-medium ${ratingInfo.color}`}>
                                        {ratingInfo.label}
                                    </span>

                                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-2">
                                        <div
                                            className={`h-3 rounded-full ${ratingInfo.bar}`}
                                            style={{ width: `${percentages[rating]}%` }}
                                        />
                                    </div>
                                    <span className={`w-8 text-right font-bold ${ratingInfo.color}`}>
                                        {count}
                                    </span>

                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default OverallReviewsSummary;
