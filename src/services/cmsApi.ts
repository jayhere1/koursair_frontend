import { BASE_URL } from "@/utils/apiConfig";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchFromStrapi(path: string): Promise<any> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchTourBySlugDraft(slug: string) {
  const json = await fetchFromStrapi(
    `/tours?filters[slug][$eq]=${encodeURIComponent(slug)}&status=draft&populate=*`
  );
  return json?.data?.[0] ?? null;
}

export async function fetchDestinationBySlugDraft(slug: string) {
  const json = await fetchFromStrapi(
    `/destinations?filters[slug][$eq]=${encodeURIComponent(slug)}&status=draft&populate[keyFacts]=*&populate[highlights][populate]=*&populate[tours][populate]=*`
  );
  return json?.data?.[0] ?? null;
}

export async function fetchAllDestinations() {
  const res = await fetch(`${BASE_URL}/cms/destinations`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error("Failed to fetch destinations");
  const json = await res.json();
  return json.data;
}

export async function fetchDestinationBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/cms/destinations/${slug}`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function fetchAllTours() {
  const res = await fetch(`${BASE_URL}/cms/tours`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error("Failed to fetch tours");
  const json = await res.json();
  return json.data;
}

export async function fetchTourBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/cms/tours/${slug}`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
