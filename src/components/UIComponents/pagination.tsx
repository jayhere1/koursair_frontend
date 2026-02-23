"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface PaginationProps {
    page: number;
    totalPages: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPages,
    pageSize,
    // pageSizeOptions = [5, 10, 20, 50, 100],
    onPageChange,
    onPageSizeChange,
    className = "",
}) => {
    const [open, setOpen] = useState(false);

    const safeTotalPages = Math.max(totalPages, 1);

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (safeTotalPages <= maxVisible) {
            for (let i = 1; i <= safeTotalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, "...", safeTotalPages - 1, safeTotalPages);
            } else if (page >= safeTotalPages - 2) {
                pages.push(1, 2, "...", safeTotalPages - 2, safeTotalPages - 1, safeTotalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", safeTotalPages);
            }
        }
        return pages;
    };

    return (
        <div className={`mt-10 ${className}`}>
            <div className="flex items-center justify-between bg-white rounded-xl shadow px-4 py-3">

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Show items</span>

                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                        >
                            {pageSize}
                        <ChevronDown />
                        </button>

                        {open && (
                            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-20">
                                {[5, 10, 20, 50, 100].map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => {
                                            onPageSizeChange(size);
                                            setOpen(false);
                                        }}
                                        className={`px-3 py-2 text-sm cursor-pointer
            ${pageSize === size
                                                ? "bg-[#1b3658] text-white"
                                                : "hover:bg-[#1b3658] hover:text-white"
                                            }`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>

                {/* RIGHT: PAGINATION */}
                <div className="flex items-center gap-2">
                    {/* PREV */}
                    <button
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        disabled={page <= 1}
                        className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
                    >
                        &lt;
                    </button>

                    {getPageNumbers().map((p, index) =>
                        typeof p === "number" ? (
                            <button
                                key={index}
                                onClick={() => onPageChange(p)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium
                  ${page === p
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {p}
                            </button>
                        ) : (
                            <span key={index} className="px-2 text-gray-400">
                                {p}
                            </span>
                        )
                    )}

                    {/* NEXT */}
                    <button
                        onClick={() => onPageChange(Math.min(safeTotalPages, page + 1))}
                        disabled={page >= safeTotalPages}
                        className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
