import { BASE_URL } from "@/utils/apiConfig";

export async function fetchAllDestinations() {
  const res = await fetch(`${BASE_URL}/cms/destinations`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch destinations");
  const json = await res.json();
  return json.data;
}

export async function fetchDestinationBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/cms/destinations/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function fetchAllTours() {
  const res = await fetch(`${BASE_URL}/cms/tours`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch tours");
  const json = await res.json();
  return json.data;
}

export async function fetchTourBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/cms/tours/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
