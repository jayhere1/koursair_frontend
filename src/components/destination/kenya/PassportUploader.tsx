import { FileText, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

export const PassportUploader = ({
  travelerId,
  fileName,
  onUpload,
  onDelete,
  isUploading = false,
  showError = false,
  onError,
}: {
  travelerId: number;
  fileName?: string;
  onUpload: (id: number, file: File) => void;
  onDelete: (id: number) => void;
  isUploading?: boolean;
  showError?: boolean;
  onError?: (msg: string) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const validateFile = (file: File) => {
    if (!file) return "No file selected.";
    const type = file.type || file.name.split(".").pop()?.toLowerCase();
    if (type && !ALLOWED_TYPES.includes(file.type)) {
      return "Invalid file type. Allowed: jpeg, jpg, png, pdf.";
    }
    if (file.size > MAX_SIZE) {
      return "File too large. Max size is 5MB.";
    }
    return null;
  };

  const handleFile = (file: File) => {
    const err = validateFile(file);
    if (err) {
      setFileError(err);
      onError?.(err);
      return;
    }
    setFileError(null);
    onUpload(travelerId, file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (fileName) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-800">Passport Attached</p>
            <p className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-[200px]">
              {fileName}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onDelete(travelerId)}
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${isDragging
        ? "border-primary bg-primary/5"
        : "border-gray-300 hover:border-primary hover:bg-gray-50"
        } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".jpeg,.jpg,.png,.pdf,image/jpeg,image/png"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          handleFile(f);
          // clear fileError when user selects a new file
          if (fileError) setFileError(null);
        }}
      />

      {isUploading ? (
        <div className="flex flex-col items-center animate-pulse">
          <UploadCloud className="w-10 h-10 text-primary mb-2" />
          <p className="text-sm font-bold text-primary">
            Uploading secure document...
          </p>
        </div>
      ) : (
        <>
          <UploadCloud
            className={`w-10 h-10 mx-auto mb-2 ${isDragging ? "text-primary" : "text-gray-400"
              }`}
          />
          <p className="text-sm font-bold text-gray-700">
            Click to Upload Passport Copy
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PDF, JPG or PNG (Max 5MB)
          </p>
        </>
      )}
      {fileError && <p className="text-xs text-red-600 mt-2">{fileError}</p>}
      {showError && (
        <p className="text-xs text-red-600 mt-2">
          Please upload a passport for this traveler.
        </p>
      )}
    </div>
  );
};