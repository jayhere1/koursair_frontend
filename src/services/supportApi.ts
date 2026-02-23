import { getToken, BASE_URL } from "@/utils/apiConfig";

interface SupportIssuePayload {
  subject: string;
  priority: string;
  issue_type: string;
  description: string;
  file?: File | null;
}

interface SupportIssueResponse {
  code: number;
  message: string;
  data: {
    issue_id: number;
  } | null;
  success: boolean;
}

export const createSupportIssue = async (
  payload: SupportIssuePayload
): Promise<SupportIssueResponse> => {
  const formData = new FormData();
  
  formData.append("subject", payload.subject);
  formData.append("priority", payload.priority);
  formData.append("issue_type", payload.issue_type);
  formData.append("description", payload.description);
  
  if (payload.file) {
    formData.append("file", payload.file);
  }

  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/api/support/issue`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || "Failed to submit support issue");
  }

  return data;
}; 