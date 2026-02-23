// lib/seo.ts
import type { Metadata } from "next";

export const createMetadata = (
  title: string,
  description: string,
  canonical: string
): Metadata => ({
  title,
  description,
  alternates: { canonical },
  robots: { index: true, follow: true },
});
