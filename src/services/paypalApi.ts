import { BASE_URL, getToken } from "@/utils/apiConfig";

export const capturePaypalOrder = async (
  { order_id }: { order_id: string }
) => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${BASE_URL}/payments/capture/p1/payment`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ paypal_order_id: order_id }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to capture PayPal order");
  }

  return res.json();
};
export const createPaypalOrder = async (
  payload: {
    amount: number;
    currency: string;
    destination: string;
  
  }
) => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${BASE_URL}/payments/p1/order`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create PayPal order");
  }

  return res.json();
};
