"use client";

import React, { useEffect } from "react";

interface PopupProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number; // ms
  actionLabel?: string;
  onAction?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
  actionLabel,
  onAction,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  let bgColor = "bg-blue-500";
  if (type === "success") bgColor = "bg-green-500";
  if (type === "error") bgColor = "bg-red-500";

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white ${bgColor} min-w-[200px] max-w-[90vw] flex items-center justify-between`}>
      <span className="mr-4">{message}</span>
      <div className="flex items-center gap-2">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-sm"
          >
            {actionLabel}
          </button>
        )}
        <button onClick={onClose} className="ml-2 text-white font-bold">&times;</button>
      </div>
    </div>
  );
};

export default Popup;
