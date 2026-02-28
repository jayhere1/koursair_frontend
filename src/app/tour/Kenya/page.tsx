import TripOverviewBooking from '@/components/destination/kenya/TripOverview'
import { fetchTourBySlug } from '@/services/cmsApi'
import { transformStrapiTour } from '@/utils/cmsTransformers'
import React from 'react'

const KENYA_SLUG = 'kenya-business-excursion-where-the-world-meets-the-wild'

const page = async () => {
  let tourData;
  try {
    const raw = await fetchTourBySlug(KENYA_SLUG);
    if (raw) {
      tourData = transformStrapiTour(raw);
    }
  } catch {
    // CMS unavailable, fall through to constant fallback
  }

  return (
    <div>
      <TripOverviewBooking data={tourData} />
    </div>
  )
}

export default page
