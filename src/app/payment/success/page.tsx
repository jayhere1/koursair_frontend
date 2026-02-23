import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";
import Loader from "@/components/UIComponents/loader";

export default function Page() {
  return (
    <Suspense
      fallback={<Loader />}
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
