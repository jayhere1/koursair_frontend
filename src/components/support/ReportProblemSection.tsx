"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createSupportIssue } from "@/services/supportApi";

const ReportProblemSection = () => {
  const [reportForm, setReportForm] = useState({
    subject: "",
    priority: "",
    issue_type: "",
    description: "",
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!reportForm.subject.trim()) {
      toast.error("Subject is required");
      return;
    }

    if (!reportForm.priority) {
      toast.error("Priority is required");
      return;
    }

    if (!reportForm.issue_type) {
      toast.error("Issue Type is required");
      return;
    }

    if (!reportForm.description.trim()) {
      toast.error("Description is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createSupportIssue({
        subject: reportForm.subject,
        priority: reportForm.priority,
        issue_type: reportForm.issue_type,
        description: reportForm.description,
        file: reportForm.file,
      });

      if (response.success) {
        toast.success(response.message || "Support issue submitted successfully!");
        setReportForm({
          subject: "",
          priority: "",
          issue_type: "",
          description: "",
          file: null,
        });
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        toast.error(response.message || "Failed to submit support issue");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while submitting the issue";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">
        Report a Problem
      </h2>

      <form onSubmit={handleSubmitReport}>
        <div className="space-y-3 sm:space-y-2">

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Subject <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={reportForm.subject}
              onChange={(e) =>
                setReportForm({ ...reportForm, subject: e.target.value })
              }
              placeholder="Brief subject of the issue"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Priority <span className="text-red-600">*</span>
            </label>
            <select
              value={reportForm.priority}
              onChange={(e) =>
                setReportForm({ ...reportForm, priority: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Issue Type <span className="text-red-600">*</span>
            </label>
            <select
              value={reportForm.issue_type}
              onChange={(e) =>
                setReportForm({ ...reportForm, issue_type: e.target.value })
              }
              
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50"
            >
              <option value="">Select issue type</option>
              <option value="Booking Issue">Booking Issue</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Travel Issue">Travel Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={4}
              value={reportForm.description}
              onChange={(e) =>
                setReportForm({ ...reportForm, description: e.target.value })
              }
              placeholder="Describe the issue in detail"
              
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Attachment (optional)
            </label>
            <input
              type="file"
              onChange={(e) =>
                setReportForm({
                  ...reportForm,
                  file: e.target.files?.[0] || null,
                })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BAA68E] focus:ring-opacity-50"
            />
          </div>

        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer font-semibold text-sm sm:text-base bg-primary text-white hover:bg-[#A6957D] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportProblemSection;
