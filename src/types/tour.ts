// types/tour.ts (FINALIZED STRUCTURE)

// --- ICON PATHS ---
// Defined here for clarity, though used in the object below.
export const ICON_PATHS = {
    // Currency: Dollar sign / coin stack / general currency symbol
    CURRENCY: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
    // Temperature: Thermometer (simplified)
    TEMPERATURE: "M12 2a3 3 0 00-3 3v8.5a4.5 4.5 0 106 0V5a3 3 0 00-3-3z",
    // Timezone: Clock / Earth with circle
    TIMEZONE: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2",
    // Language: Globe/Translation symbol
    LANGUAGE: "M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
    // Checkmark/Included
    CHECKMARK: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    // Group/Small Group
    GROUP: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    // Weather Guarantee (Pin/Location)
    WEATHER: "M17.657 18.657A8 8 0 016.343 7.343C7.226 6.46 8.44 6 9.775 6S12.324 6.46 13.207 7.343L12 8.55V3h-1v5.55L9.343 7.343A8 8 0 006.343 18.657a8 8 0 0011.314 0zM12 21a5 5 0 100-10 5 5 0 000 10z",
    YOGA: "M5 13l4 4L19 7",
    MEDITATION: "M12 11V5m0 0a2 2 0 00-4 0v6m4 0a2 2 0 014 0v6m0 0l-1.5 1.5M12 11l-1.5 1.5", 
    NUTRITION: "M10 21h.01M16 3.5c1.4-1.4 4.6-1.4 6 0s1.4 4.6 0 6l-3.5 3.5L12 12l-6.5 6.5-1.4-1.4L12 9l6.5-6.5z",
    HEALING: "M12 19l9 2-9-18-9 18 9-2z",

    ADRENALINE: "M13 10V3L4 14h7v7l9-11h-7z", // Lightning/Adventure
    LUXURY: "M12 18.7l-5.6 3.3 1.5-6.5-5-4.3 6.6-.6L12 1l2.5 6.4 6.6.6-5 4.3 1.5 6.5z", // Diamond/Luxury
    SKYLINE: "M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z", // Location
    AYURVEDA: "M12 21.25l-7.7-4.4a2 2 0 010-3.5l7.7-4.4a2 2 0 012 0l7.7 4.4a2 2 0 010 3.5l-7.7 4.4z", // Lotus/Healing
    SPIRITUAL: "M12 12c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z", // Third Eye/Spiritual
    SURF: "M16.5 6c-1.5 0-3 .5-4.5 1.5-1.5-1-3-1.5-4.5-1.5C4 6 1.5 8.5 1.5 12c0 3.5 4 6.5 9 10.5 5-4 9-7 9-10.5 0-3.5-2.5-6-4.5-6z M12 21.5c-3.5-3-7-5.5-7-8.5 0-2.5 1.5-4.5 3.5-4.5 1 0 2 .5 3.5 1.5 1.5-1 2.5-1.5 3.5-1.5 2 0 3.5 2 3.5 4.5 0 3-3.5 5.5-7 8.5z",
    HOTEL: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z",
    ADVENTURE: "M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.55 8.26 9 8.26 9L4 18h16l-6-12z"
}


export interface FactDetail {
    value: string;
    iconPath: string;
    // Optional attributes for custom SVG styling (used by TripDetailHero)
    svgAttributes?: {
        viewBox?: string;
        strokeWidth?: number;
        paths?: string[]; // For icons with multiple paths (like language/timezone)
    };
}

export interface DestinationFacts {
    currency: FactDetail;
    avgTemp: FactDetail;
    timezone: FactDetail;
    language: FactDetail;
}

export interface KeySellingPoint {
    title: string;
    text: string;
    iconPath: string; 
}

export interface DepartureDate {
    date: string;
    price: number;
    label: string;
}

export interface Review {
    name: string;
    rating: number;
    date: string;
    comment: string;
}

export interface ItineraryItem {
    day: number;
    title: string;
    images: string[];
    activities: string[];
    coordinates?: { lat: number; lng: number;  };
    zoom?: number;
    subtitle?: string;
    accommodation?: string;
}

export interface BookingSectionData {
    overview: {
        title: string;
        paragraphs: string[];
    };
    keySellingPoints: KeySellingPoint[];
    inclusions: string[];
    exclusions: string[];
    itinerary: ItineraryItem[];
    reviews: Review[];
    fixedDepartureDates: DepartureDate[];
    minDeposit?: number;
    contactNumber: string;
}

export interface HighlightPoint {
    title: string;
    desc: string;
}

export interface HighlightsBox {
    title: string;
    points: HighlightPoint[];
}

export interface TripData {
    slug: string;
    destination: string;
    title: string;
    duration: string;
    type: string;
    images: string[];
    facts: DestinationFacts;
    mapImageUrl: string;
    bookingSection: BookingSectionData;
    overviewHtml?: string;
    heroImage?: string;
    highlightsBox?: HighlightsBox;
}

export const TOUR_DATA: Record<string, TripData> = {
  'dubai-discovery': {
    slug: 'dubai-discovery',
    destination: 'Dubai, United Arab Emirates',
    title: 'Dubai Discovery',
    duration: '5 Nights • 6 Days',
    type: 'Cultural & Sightseeing',
    images: [
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai1.jpg", 
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai2.jpg", 
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai3.jpg",
    ],
    mapImageUrl: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/map.jpg",
    facts: {
      currency: { value: "AED (Dirham)", iconPath: ICON_PATHS.CURRENCY, svgAttributes: { strokeWidth: 1.5 } },
      avgTemp: { value: "28°C", iconPath: ICON_PATHS.TEMPERATURE, svgAttributes: { viewBox: "0 0 24 24", strokeWidth: 1.5 } },
      timezone: { value: "UTC +4 (GST)", iconPath: ICON_PATHS.TIMEZONE, svgAttributes: { strokeWidth: 1.5, paths: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"] } },
      language: { value: "Arabic, English", iconPath: ICON_PATHS.LANGUAGE, svgAttributes: { strokeWidth: 1.5, paths: ["M2 12h20M12 2a15.3 15.3 0 010 20", "M12 2a15.3 15.3 0 000 20"] } },
    },
    bookingSection: {
        overview: {
            title: "The Dubai Dream: 6-Day Luxury Adventure",
            paragraphs: [
                "Discover Dubai's dazzling blend of **iconic sightseeing** and rich **Arabian heritage** on this perfectly curated 6-day journey. From the towering Burj Khalifa and the innovation of the Museum of the Future to the tranquility of a traditional Dhow Cruise and an exhilarating desert safari, this trip offers the best of the Emirates. It’s designed for the traveler who seeks both **unforgettable sights and deep cultural immersion**.",
                "We handle every detail: **roundtrip flights from the USA**, hand-picked 4-star or 5-star hotel stays, all meals (half-board), and pre-booked tickets to every major landmark. Travel with confidence, knowing the value and quality are guaranteed."
            ]
        },
        keySellingPoints: [
            { iconPath: ICON_PATHS.CURRENCY, title: "All-Inclusive Pricing", text: "Flights, half-board meals, and all entry tickets covered." },
            { iconPath: ICON_PATHS.WEATHER, title: "Best Weather Guarantee", text: "Departures scheduled exclusively during Dubai's cool season." },
            { iconPath: ICON_PATHS.GROUP, title: "Small Group Focus", text: "Limited to 12 travelers for a personalized, intimate experience." },
        ],
        inclusions: [
            "Roundtrip International Flights (Economy Class)",
            "5 Nights accommodation in 4★ or 5★ Hotel",
            "Daily Breakfast & Dinner",
            "Airport & City Transfers (AC Vehicle)",
            "All Attraction Entry Tickets (Burj Khalifa, MOTF, etc.)",
            "Desert Safari, Dune Bashing & BBQ Dinner",
            "All local taxes and tourism fees",
        ],
        exclusions: [
            "Personal expenses (laundry, minibar, phone calls, etc.)",
            "Meals not mentioned in the itinerary",
            "Visa fees (unless specified as included)",
            "Travel insurance (We recommend taking travel Insurance)",
            "Gratuities and tips for guides and drivers",
            "Additional activities and excursions not listed in the itinerary",
        ],
        itinerary: [
            { 
                day: 1, 
                title: "Arrival & Evening Dhow Cruise", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day1-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day1-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day1-4.jpg"], 
                activities: [" Arrive at Dubai International Airport", " Meet & greet + private transfer to your hotel", " Check-in & relax after your long-haul flight from the USA", "Buffet Dinner in the hotel &  Overnight stay in Dubai"],
                coordinates: { lat: 25.2532, lng: 55.3657 }, // Dubai Airport Area
                zoom: 10
            },
            { 
                day: 2, 
                title: "Iconic City Tour & Burj Khalifa", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-3.jpg"], 
                activities: [" Breakfast at hotel  ", " Start your day with a Half-Day Guided Dubai City Tour:1. Jumeirah Mosque (photo stop) 2. Jumeirah Beach & Burj Al Arab (photo stop) 3. Drive through Palm Jumeirah & Atlantis (photo stop) 4. Drive down Sheikh Zayed Road (Dubai’s main highway)", " Late afternoon: Visit Burj Khalifa – At The Top (124th Floor) – High speed elevator to the observation deck", " Evening: Head to Deira Creek Dhow Cruise - Traditional wooden boat ride on the historic Dubai creek", "Buffet dinner with live music & Tanoura dance", " Overnight stay at hotel in Dubai"],
                coordinates: { lat: 25.1972, lng: 55.2744 }, // Burj Khalifa / Downtown
                zoom: 12
            },
            { 
                day: 3, 
                title: "Desert Adventure & BBQ Feast", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-4.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-5.jpg"], 
                activities: [" Breakfast at hotel  ", "Morning at leisure (relax by the pool or explore local cafes)", "Afternoon: Depart for Desert Safari - 4x4 Dune Bashing across the golden sand dunes", "Camel rides, sandboarding, and henna painting", "Traditional dance performances: Belly Dance & Tanoura", "Lavish BBQ Dinner at desert camp", "Return to hotel & overnight stay"],
                coordinates: { lat: 24.8500, lng: 55.7000 }, // Dubai Desert Conservation Reserve area
                zoom: 10
            },
            { 
                day: 4, 
                title: "Future & Past: Museums & Souqs", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-3.jpg"], 
                activities: [" Breakfast at hotel  ", "Visit the futuristic & immersive Museum of the Future - Explore exhibits on AI, space, health & future tech", "Visit the Dubai Frame", "Explore the Gold Souq & Spice Souq in Deira. (Optional: Purchase authentic gold, souvenirs, spices)", "Continue to Dubai Mall - World's largest shopping mall with 1,200 + stores", "Free time for shopping", "Buffet Dinner in the hotel &  Overnight stay in Dubai"],
                coordinates: { lat: 25.2194, lng: 55.2818 }, // Museum of the Future
                zoom: 13
            },
            { 
                day: 5, 
                title: "Botanical Wonders & Global Village", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day5-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day5-3.jpg"], 
                activities: [" Breakfast at hotel  ", "Explore the world’s largest natural flower garden – Miracle Garden", "Start exploring the world’s cultures in one place – Global Village 1. 25+ country pavilions (India, Egypt, Turkey, Africa, Europe, USA, and more) 2. Authentic souvenirs, street performances, and cultural shows 3. Street Food: Turkish kebabs, Indian chaat, Filipino snacks 4. Don’t miss Floating Market for seafood & Asian bites 5. Catch live shows, acrobatics, or musical performances at the Main Stage 6. Stroll through pavilions for souvenirs, crafts, perfumes, and spices 7. Optional: Enjoy rides at the Carnaval amusement park", "Buffet Dinner in the hotel & Overnight stay in Dubai"],
                coordinates: { lat: 25.0599, lng: 55.2446 }, // Miracle Garden / Global Village area
                zoom: 12
            },
            { 
                day: 6, 
                title: "Departure", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day6.jpg"], 
                activities: [" Breakfast at hotel  ", "Check-out and transfer to Dubai International Airport ", "Board your flight back to the USA", "Take home unforgettable memories of Dubai’s wonders."],
            },
        ],
        reviews: [
            { name: "Sarah K.", rating: 5, date: "Sept 2024", comment: "Absolutely flawless trip! The itinerary was perfectly balanced, and the hotels were magnificent. The desert safari was the highlight." },
            { name: "Omar H.", rating: 5, date: "Mar 2025", comment: "Worth every penny. The included flights and tickets made everything seamless. Our guide was knowledgeable and highly professional." },
            { name: "Elena R.", rating: 4, date: "Apr 2025", comment: "Fantastic hotels and transportation. The city is amazing. Wish there was a bit more time for shopping at the Mall, but otherwise excellent." },
        ],
        fixedDepartureDates: [
            { date: "2025-03-15", price: 2749, label: "Mar 15 - 20, 2025 ($2,749)" },
            { date: "2025-04-12", price: 2749, label: "Apr 12 - 17, 2025 ($2,749)" },
            { date: "2025-10-18", price: 2749, label: "Oct 18 - 23, 2025 ($2,749)" },
        ],
        minDeposit: 500,
        contactNumber: "+1 1800-521-4263"
    }
  },
  'thailand-vibrant-escape': {
    slug: 'thailand-vibrant-escape',
    destination: 'Phuket, Krabi, Bangkok, Thailand',
    title: 'Thailand Vibrant Escape',
    duration: '9 Nights • 10 Days',
    type: 'Island Hopping & City Exploration',
    images: [
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/thailand-1.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/thailand-2.jpg", 
         "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/Thailand.jpg",
    ],
    mapImageUrl: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/map.jpg",
    facts: {
        currency: { value: "THB (Baht)", iconPath: ICON_PATHS.CURRENCY, svgAttributes: { strokeWidth: 1.5 } },
        avgTemp: { value: "32°C", iconPath: ICON_PATHS.TEMPERATURE, svgAttributes: { viewBox: "0 0 24 24", strokeWidth: 2.5 } },
        timezone: { value: "UTC +7 (ICT)", iconPath: ICON_PATHS.TIMEZONE, svgAttributes: { strokeWidth: 2, paths: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"] } },
        language: { value: "Thai, English", iconPath: ICON_PATHS.LANGUAGE, svgAttributes: { strokeWidth: 2, paths: ["M2 12h20M12 2a15.3 15.3 0 010 20", "M12 2a15.3 15.3 0 000 20"] } },
    },
    bookingSection: {
        overview: {
            title: "Thailand Vibrant Escape: 10 Days of Tropical Beauty",
            paragraphs: [
                "Experience the very best of Thailand on this 10-day journey, combining the **tropical tranquility** of Phuket and Krabi with the **bustling, modern energy** of Bangkok. This itinerary is a perfect blend of island hopping, cultural sightseeing, and vibrant city nightlife.",
                "The trip includes **all domestic transfers (flights and ferry)**, island excursions, and guaranteed flights from major international airports. You'll enjoy 4 nights in Phuket, 2 nights in Krabi, and 3 nights in Bangkok, with all necessary meals included."
            ]
        },
        keySellingPoints: [
            { iconPath: ICON_PATHS.CHECKMARK, title: "Triple Destination", text: "Phuket's beaches, Krabi's karsts, and Bangkok's city life." },
            { iconPath: ICON_PATHS.GROUP, title: "Island Hopping Included", text: "Full-day excursions to Phi Phi Islands, James Bond Island & Krabi 4 Islands." },
            { iconPath: ICON_PATHS.CURRENCY, title: "Value Packed", text: "Includes international flights, all accommodation, and 10 meals." },
        ],
        inclusions: [
            "International & domestic flights.",
            "Airport transfers in Phuket, Krabi & Bangkok.",
            "9 Nights accommodation in 4★/5★ hotels.",
            "Daily breakfast, 4 lunches, 3 dinners.",
            "Tours & excursions as per itinerary (with entrance fees).",
            "Professional English-speaking guide.",
            "Snorkeling gear & national park fees (for island tours).",
            "Dinner cruise in Bangkok.",
        ],
        exclusions: [
            "Visa fees & travel insurance.",
            "Personal expenses (shopping, minibar, etc.).",
            "Optional activities on free days (spa, ziplining, ATV, etc.).",
            "Alcoholic beverages (wine, spirits, etc.).",
            "Tips & gratuities for guides and drivers.",
            "Any meals not mentioned in the itinerary.",
        ],
        itinerary: [
            { 
                day: 1, 
                title: "Arrival in Phuket", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day1-2.jpg"], 
                activities: [" Arrival at Phuket International Airport – greeted by representative.", "Transfer & hotel check-in.", "Relax and recover from the journey.", "Evening: Welcome dinner at hotel + leisure walk to soak in the tropical vibe."],
                coordinates: { lat: 8.1110, lng: 98.3075 }, // Phuket Airport / City
                zoom: 10
            },
            { 
                day: 2, 
                title: "Phuket City & Beaches Tour", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day2-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day2-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day2-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day2-4.jpg"], 
                activities: ["Breakfast at hotel.", "Highlights:1. Big Buddha – A majestic 45-meter marble statue offering breathtaking panoramic views of Phuket Town, Chalong Bay, and Kata Beach. 2. Wat Chalong – Phuket’s most revered Buddhist temple, known for its intricate architecture and spiritual ambiance. 3. Phuket Old Town – Discover colorful Sino-Portuguese architecture, vibrant street art, and local markets. Lunch at a local restaurant.", "Evening: Phuket FantaSea Show – cultural extravaganza with Thai traditions, acrobatics & entertainment."],
                coordinates: { lat: 7.8275, lng: 98.3129 }, // Big Buddha Phuket
                zoom: 12
            },
            { 
                day: 3, 
                title: "Phi Phi Islands & James Bond Island Adventure", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-4.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-5.jpg"], 
                activities: ["Full-day speedboat excursion:1. Maya Bay – Iconic film location (The Beach). 2. Pileh Lagoon – Swim among towering limestone cliffs. 3. Viking Cave – Famous for bird nests & ancient wall paintings. 4. Monkey Beach – Encounter playful monkeys. 5. James Bond Island – Featured in The Man with the Golden Gun. Lunch at Phi Phi Don Island – Savor authentic Thai cuisine by the beach.", "Evening: Return to Phuket. Relax or explore Patong Beach & Walking Street nightlife."],
                coordinates: { lat: 7.7407, lng: 98.7784 }, // Phi Phi Islands
                zoom: 10
            },
            { 
                day: 4, 
                title: "Free Day in Phuket", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day4-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day4-3.jpg"], 
                activities: ["Leisure day at your own pace.", "Optional activities: Ziplining, ATV, snorkeling, or Thai spa."],
                coordinates: { lat: 7.8804, lng: 98.3923 }, // Phuket Town
                zoom: 11
            },
            { 
                day: 5, 
                title: "Transfer to Krabi", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day5-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day5-3.jpg"], 
                activities: ["Breakfast + hotel check-out.", "Ferry/speedboat transfer to Krabi (2 hrs).", "Hotel check-in.", "Evening: Relax on Ao Nang Beach, explore local walking street & enjoy beachside dinner."],
                coordinates: { lat: 8.0307, lng: 98.8213 }, // Ao Nang, Krabi
                zoom: 12
            },
            { 
                day: 6, 
                title: "Krabi 4-Island Tour", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day6-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day6-2.jpg"], 
                activities: ["Full-day speedboat tour:1. Phra Nang Cave Beach – Known for the sacred Princess Cave and its intriguing local legends. 2. Chicken Island – Unique rock formation, snorkeling. 3. Tup Island – Sandbar walk connecting islands at low tide. 4. Poda Island – White sands & tropical relaxation.", "Inclusions: Snorkeling gear, lunch on the beach, and national park fees.", "Evening at leisure."],
                coordinates: { lat: 7.9620, lng: 98.8105 }, // Poda Island area
                zoom: 11
            },
            { 
                day: 7, 
                title: "Krabi → Bangkok", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day7-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day7-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day7-3.jpg"], 
                activities: ["Breakfast & check-out.", "Flight to Bangkok (2 hrs).", "Hotel check-in.", "Evening: Chao Phraya River Dinner Cruise – illuminated views of Wat Arun & Grand Palace."],
                coordinates: { lat: 13.7563, lng: 100.5018 }, // Bangkok
                zoom: 11
            },
            { 
                day: 8, 
                title: "Floating Market & Shopping", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day8-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day8-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day8-3.jpg"], 
                activities: ["Morning: Visit Damnoen Saduak Floating Market (traditional boat ride).", "Return to Bangkok by noon.", "Afternoon: Shopping at Siam Paragon, MBK, or Icon Siam.", "Evening: Dinner with skyline views at a rooftop bar (e.g., Sky Bar, Lebua Tower)."],
                coordinates: { lat: 13.5186, lng: 99.9602 }, // Damnoen Saduak
                zoom: 11
            },
            { 
                day: 9, 
                title: "Bangkok Exploration & Leisure", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day9-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day9-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day9-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day9-4.jpg"], 
                activities: ["Morning shopping at Platinum Mall or Terminal 21.", "Afternoon optional: Grand Palace, Wat Pho, tuk-tuk ride.", "Evening free for nightlife or relaxation."],
            },
            { 
                day: 10, 
                title: "Departure from Bangkok", 
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day10.jpg"], 
                activities: ["Breakfast at hotel.", "Hotel check-out & airport transfer.", "Flight home with unforgettable memories."],
            },
        ],
        reviews: [
            { name: "Liam F.", rating: 5, date: "May 2025", comment: "The island hopping was spectacular! Perfectly organized and the hotels were top-notch. Loved the seamless transfer to Bangkok." },
            { name: "Chloe S.", rating: 5, date: "Jan 2025", comment: "A truly vibrant escape! A great mix of relaxation and city excitement. The floating market was a unique experience." },
            { name: "Raja M.", rating: 4, date: "Feb 2025", comment: "Excellent value for money, especially with flights included. The food and sights were incredible. Minor delays on the ferry transfer, but overall fantastic." },
        ],
        fixedDepartureDates: [
            { date: "2026-02-20", price: 4799, label: "Feb 20 - Mar 1, 2026 ($4,799)" },
            { date: "2026-05-10", price: 4799, label: "May 10 - 19, 2026 ($4,799)" },
            { date: "2026-11-05", price: 4799, label: "Nov 5 - 14, 2026 ($4,799)" },
        ],
        minDeposit: 600,
        contactNumber: "+1-800-521-4263"
    }
  },
  'bali-yoga-retreat': {
    slug: 'bali-yoga-retreat',
    destination: 'Ubud, Canggu, Seminyak, Uluwatu, Bali, Indonesia',
    title: 'Bali Yoga Retreat',
    duration: '9 Nights • 10 Days',
    type: 'Wellness & Cultural',
    images: [
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/bali1.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/bali2.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/Bali.jpg",
    ],
    mapImageUrl: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/map.jpg",
    facts: {
        currency: { value: "IDR (Rupiah)", iconPath: ICON_PATHS.CURRENCY, svgAttributes: { strokeWidth: 1.5 } },
        avgTemp: { value: "28°C", iconPath: ICON_PATHS.TEMPERATURE, svgAttributes: { viewBox: "0 0 24 24", strokeWidth: 2.5 } },
        timezone: { value: "UTC +8 (WITA)", iconPath: ICON_PATHS.TIMEZONE, svgAttributes: { strokeWidth: 2, paths: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"] } },
        language: { value: "Indonesian, Balinese, English", iconPath: ICON_PATHS.LANGUAGE, svgAttributes: { strokeWidth: 2, paths: ["M2 12h20M12 2a15.3 15.3 0 010 20", "M12 2a15.3 15.3 0 000 20"] } },
    },
    bookingSection: {
        overview: {
            title: "Mind • Body • Soul Rejuvenation",
            paragraphs: [
                "Experience Bali’s sacred landscapes, immersive yoga practices, traditional healing and ocean-side calm in a **10-day retreat designed for renewal**. This journey blends daily Hatha, Vinyasa and Restorative yoga with meditation and complementary wellness experiences.",
                "The journey shifts from the **spiritual heartland of Ubud** to the surf-and-soul vibes of Canggu, then to the stylish beaches of Seminyak and the dramatic clifftops of **Uluwatu** for an unforgettable finale. Retreat includes all essential wellness offerings and cultural excursions."
            ]
        },
        keySellingPoints: [
            { iconPath: ICON_PATHS.YOGA, title: "Dual Daily Yoga", text: "Active morning sessions (Vinyasa/Hatha) and restorative evening sessions (Yin/Restorative)." },
            { iconPath: ICON_PATHS.HEALING, title: "Traditional Healing", text: "Sacred Water Temple ritual, Balinese massage, and deeply calming Sound Healing." },
            { iconPath: ICON_PATHS.NUTRITION, title: "Plant-Forward Meals", text: "Daily Breakfast, Lunch, Dinner, plus detox juices focusing on local organic produce." },
        ],
        inclusions: [
            "9 nights accommodation in curated yoga-friendly properties (Ubud x4, Canggu x2, Seminyak x2).",
            "Two daily yoga classes (morning + evening) with certified instructors.",
            "All listed excursions, entrance fees, and sound healing session.",
            "One traditional Balinese spa treatment per person.",
            "Private air-conditioned transfers between airports and all locations.",
            "Daily Breakfast, Lunch, and Dinner, including water, coffee, tea, and detox juices.",
            "Welcome pack and a certificate of participation.",
        ],
        exclusions: [
            "International flights to and from Denpasar (DPS).",
            "Visa fees or comprehensive travel insurance.",
            "Optional Ayurvedic consults, extra spa treatments, or surf lessons.",
            "Alcoholic beverages and personal expenses (shopping, etc.).",
            "Tips and gratuities for staff and instructors.",
        ],
        itinerary: [
            { 
              day: 1, 
              title: "Arrival in Bali (Ubud)", 
              activities: [
                "Private transfer from Ngurah Rai International Airport (DPS) to Ubud.",
                "Hotel check-in and orientation with the teacher team.",
                "Gentle arrival yoga class to relieve jet lag.",
                "Evening: Welcome dinner with locally sourced vegetarian cuisine."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day1-2.jpg" ],
              coordinates: { lat: -8.5069, lng: 115.2625 }, // Ubud
              zoom: 10
            },
            { 
              day: 2, 
              title: "Ubud: Movement & Culture", 
              activities: [
                "Morning: Sunrise pranayama and active Vinyasa flow (spinal mobility, hip opening).",
                "Mid-morning: Visit the Sacred Monkey Forest Sanctuary and the Ubud Royal Palace.",
                "Afternoon: Browse the Ubud Art Market for handcrafted goods.",
                "Evening: Restorative Yin session for the parasympathetic nervous system."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day2-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day2-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day2-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day2-4.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day2-5.jpg" ],
              coordinates: { lat: -8.5190, lng: 115.2580 }, // Monkey Forest
              zoom: 12
            },
            { 
              day: 3, 
              title: "Water Temple & Rice Terraces", 
              activities: [
                "Visit Tirta Empul water temple for a cultural explanation of the rituals.",
                "Optional participation in the **Sacred Water Purification Ritual**.",
                "Guided mindfulness walk through the Tegalalang rice terraces.",
                "Evening: Slow restorative yoga to integrate the day's cultural depth."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day3-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day3-3.jpg" ],
              coordinates: { lat: -8.4332, lng: 115.2796 }, // Tegalalang / Tirta Empul
              zoom: 11
            },
            { 
              day: 4, 
              title: "Spa, Healing & Sound", 
              activities: [
                "Morning: Gentle flow and guided meditation.",
                "Personalized spa treatments (Balinese massage, boreh herbal body scrub, optional flower bath).",
                "Late afternoon: **Sound Healing Ceremony** using gongs and singing bowls.",
                "Evening: Deep relaxation and emotional release therapy."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day4-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day4-3.jpg" ],
            },
            { 
              day: 5, 
              title: "Transfer to Canggu: Beach Energy", 
              activities: [
                "Transfer to Canggu (approx: 1–2 hours) for a change of coastal scenery.",
                "Afternoon beachfront yoga focusing on balance and core strength.",
                "Optional: Beginner surf lesson.",
                "Evening: Dinner and leisure time to explore Canggu's vibrant cafe culture."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day5-2.jpg" ],
              coordinates: { lat: -8.6478, lng: 115.1385 }, // Canggu
              zoom: 13
            },
            { 
              day: 6, 
              title: "Tanah Lot & Ocean Practices", 
              activities: [
                "Morning ocean-side breathwork and active Vinyasa.",
                "Afternoon: Visit **Tanah Lot Temple**—an iconic sea temple best viewed at sunset.",
                "Enjoy quiet ceremonial feeling and optimal photography opportunities.",
                "Evening: Slow restorative yoga to integrate the day’s energy."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day6-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day6-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day6-3.jpg" ],
              coordinates: { lat: -8.6212, lng: 115.0868 }, // Tanah Lot
              zoom: 13
            },
            { 
              day: 7, 
              title: "Seminyak: Style & Soul", 
              activities: [
                "Transfer to Seminyak (stylish coastal experience).",
                "Morning practice emphasising mobility and strength.",
                "Free afternoon to enjoy beach clubs, boutique shopping, or a seaside spa.",
                "Evening class: Restorative practices, optionally incorporating gentle moon salutations."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day7-1.jpg" ],
              coordinates: { lat: -8.6845, lng: 115.1599 }, // Seminyak
              zoom: 13
            },
            { 
              day: 8, 
              title: "Uluwatu Excursion & Kecak Dance", 
              activities: [
                "Day trip to **Uluwatu Temple** perched on dramatic limestone cliffs.",
                "Witness the spectacular sunset **Kecak Fire Dance** (male chorus, rhythmic chanting).",
                "Evening: Return to Seminyak or dine at a nearby clifftop venue."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day8-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day8-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day8-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/bali2.jpg" ],
              coordinates: { lat: -8.8291, lng: 115.0849 }, // Uluwatu
              zoom: 13
            },
            { 
              day: 9, 
              title: "Reflection, Closing Ceremony", 
              activities: [
                "Morning: Silent meditation followed by an intention-setting yoga session.",
                "Midday: Free time for final shopping or spa session.",
                "Late afternoon: Group sharing circle and a **gratitude closing ceremony** with guided journaling.",
                "Farewell dinner with live music and certificate of participation."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day9-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day9-2.jpg" ],
            },
            { 
              day: 10, 
              title: "Departure", 
              activities: [
                "Optional sunrise meditation and final light yoga.",
                "Breakfast and check-out.",
                "Private transfer to Ngurah Rai International Airport (DPS)."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day-10.jpg" ],
            },
        ],
        reviews: [
            { name: "Hannah K.", rating: 5, date: "Sep 2025", comment: "The combination of Ubud and Canggu was perfect. The sound healing was transformative, and the daily yoga was suitable for my mixed level. Highly recommend!" },
            { name: "David M.", rating: 5, date: "May 2025", comment: "The food was incredible, and the cultural trips (Tirta Empul and Kecak Dance) were cinematic. The scheduling made sure we never felt rushed." },
            { name: "Sophie L.", rating: 4, date: "Feb 2025", comment: "Beautifully organised. Accommodation was peaceful. My only note is the travel time between spots was sometimes long due to traffic." },
        ],
        fixedDepartureDates: [
            { date: "2026-01-22", label: "Jan 22nd - Feb 02nd ($4,449)", price: 4449 },
            { date: "2026-02-26", label: "Feb 26th - Mar 09th ($4,449)", price: 4449 },
            { date: "2026-04-02", label: "Apr 02nd - Apr 13th ($4,449)", price: 4449 },
            { date: "2026-05-07", label: "May 07th - May 18th ($4,449)", price: 4449 },
            { date: "2026-08-11", label: "Aug 11th - Aug 22nd ($4,449)", price: 4449 },
            { date: "2026-09-09", label: "Sep 09th - Sep 20th ($4,449)", price: 4449 },
        ],
        minDeposit: 800,
        contactNumber: "+1-800-521-4263"
    }
  },
  'dubai-luxury-adventure': {
    slug: 'dubai-luxury-adventure',
    destination: 'Dubai, United Arab Emirates',
    title: 'Dubai Luxury Adventure',
    duration: '5 Nights • 6 Days',
    type: 'Luxury & Adventure',
    images: [
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai1.jpg", 
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai2.jpg", 
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai3.jpg",
    ],
    mapImageUrl: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/map.jpg",
    facts: {
        currency: { value: "AED (Dirham)", iconPath: ICON_PATHS.CURRENCY, svgAttributes: { strokeWidth: 1.5 } },
        avgTemp: { value: "27°C", iconPath: ICON_PATHS.TEMPERATURE, svgAttributes: { viewBox: "0 0 24 24", strokeWidth: 2.5 } },
        timezone: { value: "UTC +4", iconPath: ICON_PATHS.TIMEZONE, svgAttributes: { strokeWidth: 2, paths: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"] } },
        language: { value: "Arabic, English", iconPath: ICON_PATHS.LANGUAGE, svgAttributes: { strokeWidth: 2, paths: ["M2 12h20M12 2a15.3 15.3 0 010 20", "M12 2a15.3 15.3 0 000 20"] } },
    },
    bookingSection: {
        overview: {
            title: "Dubai: Ultimate Luxury & Thrill Seeker's Journey",
            paragraphs: [
                "This **5-night package** delivers the ultimate blend of Dubai's famous luxury and high-octane adventure. Experience the city from every angle—from the 124th floor of the Burj Khalifa to the world’s longest urban **X-Line Zipline** and a high-end desert safari.",
                "Accommodation is strictly **5-star** with luxury transfers included (Mercedes S Class/BMW 7 Series). Highlights include the **Aura Skypool party**, a private yacht cruise in Dubai Marina, and optional **Skydiving over the Palm Jumeirah** for the ultimate adrenaline rush."
            ]
        },
        keySellingPoints: [
            { iconPath: ICON_PATHS.LUXURY, title: "5-Star Exclusive", text: "Accommodation in 5★ hotels and luxury airport transfers (S Class/7 Series)." },
            { iconPath: ICON_PATHS.ADRENALINE, title: "Extreme Adventure", text: "X-Line Zipline, Indoor Skydiving, and Edge Walk included (Skydive optional)." },
            { iconPath: ICON_PATHS.SKYLINE, title: "Elite Nightlife", text: "Aura Skypool party, Private Yacht Party, and Premium Desert Safari BBQ." },
        ],
        inclusions: [
            "Roundtrip Economy Flights from USA (upgrades available).",
            "5 Nights accommodation in 5★ hotel (Breakfast & Dinner included).",
            "Luxury Airport transfers (Mercedes S Class / BMW 7 Series or similar).",
            "All sightseeing with Luxury vehicles (sharing with trip members only).",
            "Entry tickets for Burj Khalifa (124th Floor), Dubai Frame, Museum of the Future.",
            "Aura Skypool party entry (evening session) with dinner.",
            "Premium Desert Safari (Land Rovers) with Luxury BBQ dinner.",
            "X-Line Zipline Dubai Marina experience.",
            "Sky Views (Glass Slide & Edge Walk) experience.",
            "Indoor Skydiving experience.",
            "Private 4-hour yacht party in Dubai Marina (with dinner and drinks).",
            "All taxes included.",
        ],
        exclusions: [
            "Optional Skydive over Palm Jumeirah (+$800 surcharge).",
            "Upgrades to Premium Economy, Business, or First Class flights.",
            "Visa fees and travel insurance.",
            "Meals/drinks not specified (e.g., drinks during Aura Skypool party beyond initial serving).",
            "Tips and gratuities.",
            "Personal expenses and shopping.",
        ],
        itinerary: [
            { 
              day: 1, 
              title: "Arrival in Dubai - Luxury Transfer", 
              activities: [
                "✈️ Arrive at Dubai International Airport.",
                "🛬 Meet & greet + private transfer (luxury vehicle) to your 5★ hotel.",
                "🏨 Check-in & relax after your long-haul flight from the USA.",
                "Evening: Buffet Dinner in the hotel & 🌙 Overnight stay in Dubai."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day1-3.jpg" ],
              coordinates: { lat: 25.2532, lng: 55.3657 }, // Dubai Airport
              zoom: 10
            },
            { 
              day: 2, 
              title: "City Tour, Burj Khalifa & Aura Skypool Party", 
              activities: [
                "🍽️ Breakfast at hotel.",
                "🚌 Start your day with a Half-Day Guided Dubai City Tour: 1. Jumeirah Mosque (photo stop),2. Jumeirah Beach & Burj Al Arab (photo stop),3. Drive through Palm Jumeirah & Atlantis (photo stop),4. Get a glimpse of Dubai’s iconic Sheikh Zayed Road (Dubai’s main highway),5. Dubai Frame (150m architectural landmark showing historic/futuristic areas),6. Visit Iconic Museum of the Future (torus-shaped building housing immersive experiences about science, technology, and innovation, aiming to transport visitors to the year 2071).",
                "🏙️ Late afternoon: Visit Burj Khalifa – At The Top (124th Floor) – Experience the high speed elevator to the observation deck.",
                "🌆 Evening: Party at Aura Skypool Dubai – the world’s highest 360° infinity pool with music, skyline views, and drinks (8 pm onwards).",
                "Ala Carte Dinner with music & 🌙 Overnight stay at hotel in Dubai."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day2-1.jpg" ],
              coordinates: { lat: 25.1127, lng: 55.1390 }, // Palm Jumeirah / Aura Skypool Area
              zoom: 12
            },
            { 
              day: 3, 
              title: "Premium Desert Safari with Luxury BBQ", 
              activities: [
                "🍽️ Breakfast at hotel.",
                "🕗 Morning at leisure (explore local cafes or relax by the pool).",
                "🏜️ Afternoon: Depart for **Premium Desert Safari** - 4x4 Dune Bashing across the golden sand dunes in Premium Land Rovers.",
                "Enjoy camel rides, sandboarding, and henna painting.",
                "Traditional dance performances: Belly Dance & Tanoura.",
                "**Luxurious BBQ Dinner** with closest seating to stage under the stars at desert camp.",
                "🌙 Return to hotel & overnight stay."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-4.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-5.jpg" ],
              coordinates: { lat: 24.8500, lng: 55.7000 }, // Desert Reserve
              zoom: 10
            },
            { 
              day: 4, 
              title: "X-Line Zipline & Sky Views Dubai", 
              activities: [
                "🍽️ Breakfast at hotel.",
                "Morning: Zipline adventure on the **X-Line Dubai Marina**, the world’s longest urban Zipline, stretching approximately 1 km at 170 m above ground.",
                "Afternoon: Experience the **Glass Slide** and **Edge Walk** at Sky Views for a thrilling skyline view.",
                "Free time for shopping.",
                "Evening: Buffet Dinner in the hotel & 🌙 Overnight stay in Dubai."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day4-2.jpg" ],
              coordinates: { lat: 25.0784, lng: 55.1407 }, // Dubai Marina
              zoom: 13
            },
            { 
              day: 5, 
              title: "Indoor Skydiving & Private Yacht Party", 
              activities: [
                "🍽️ Breakfast at hotel (prefer to have light breakfast).",
                "Morning: Dubai’s Ultimate Gravity - Defying Adventure – Enjoy the **Indoor Skydiving** experience.",
                "Optional upgrade: Jump over Dubai’s Paradise Palm Jumeirah (Leap from 13,000 feet) for an additional surcharge of $800 per person.",
                "Evening: Relax on a **private 4-hour yacht party** in Dubai Marina with unlimited drinks, a BBQ dinner, and scenic cruising past Palm Jumeirah, Bluewaters, and Ain Dubai.",
                "🌙 Overnight stay in Dubai."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day5-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day5-3.jpg" ],
            },
            { 
              day: 6, 
              title: "Departure from Dubai", 
              activities: [
                "🍽️ Breakfast at hotel.",
                "Check-out and transfer to Dubai International Airport.",
                "✈️ Board your flight back to the USA.",
                "📸 Take home unforgettable memories of Dubai’s Adventures."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/luxury-adventure/day6-1.jpg" ],
            },
        ],
        reviews: [
            { name: "Alex R.", rating: 5, date: "May 2025", comment: "The Zipline and yacht party alone were worth the price. True 5-star service throughout." },
            { name: "Priya S.", rating: 5, date: "Jan 2025", comment: "Perfect balance of thrills and luxury. The Aura Skypool party was the ultimate highlight." },
            { name: "Robert J.", rating: 5, date: "Feb 2025", comment: "Upgraded to the skydive and do not regret it—an unforgettable experience! Excellent hotels." },
        ],
        fixedDepartureDates: [
            { date: "2026-03-05", label: "Mar 05 - Mar 10, 2026 ($6,389)", price: 6389 },
            { date: "2026-05-15", label: "May 15 - May 20, 2026 ($6,389)", price: 6389 },
            { date: "2026-11-20", label: "Nov 20 - Nov 25, 2026 ($6,389)", price: 6389 },
        ],
        minDeposit: 1000,
        contactNumber: "+1-800-521-4263"
    }
  },
  'rishikesh-haridwar-yoga-healing': {
    slug: 'rishikesh-haridwar-yoga-healing',
    destination: 'Rishikesh & Haridwar, India',
    title: 'Yoga & Healing Journey',
    duration: '6 Nights • 7 Days',
    type: 'Wellness, Yoga & Spiritual',
    images: [
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/main-1.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/main-2.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/main-3.jpg",
    ],
    mapImageUrl: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/map.jpg",
    facts: {
        currency: { value: "INR (Rupee)", iconPath: ICON_PATHS.CURRENCY, svgAttributes: { strokeWidth: 1.5 } },
        avgTemp: { value: "24°C (Avg)", iconPath: ICON_PATHS.TEMPERATURE, svgAttributes: { viewBox: "0 0 24 24", strokeWidth: 2.5 } },
        timezone: { value: "UTC +5:30 (IST)", iconPath: ICON_PATHS.TIMEZONE, svgAttributes: { strokeWidth: 2, paths: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"] } },
        language: { value: "Hindi, English", iconPath: ICON_PATHS.LANGUAGE, svgAttributes: { strokeWidth: 2, paths: ["M2 12h20M12 2a15.3 15.3 0 010 20", "M12 2a15.3 15.3 0 000 20"] } },
    },
    bookingSection: {
        overview: {
            title: "Rishikesh: Deep Healing & Spiritual Renewal on the Ganges",
            paragraphs: [
                "Embark on a profound **7-day Yoga & Healing Journey** to Rishikesh, the 'Yoga Capital of the World,' complemented by a spiritual visit to Haridwar. This retreat blends daily Hatha, Vinyasa, and Ashtanga practice with authentic Ayurvedic treatments and Vedic purification ceremonies.",
                "Focus on **inner balance and detoxification** through Kriya cleansing, Abhyanga massage, sound healing, and exclusive participation in the sacred **Ganga Aarti ceremony** at Har Ki Pauri in Haridwar (VIP seating included)."
            ]
        },
        keySellingPoints: [
            { iconPath: ICON_PATHS.AYURVEDA, title: "Ayurvedic Detox", text: "Includes Ayurvedic consultation, Abhyanga massage, and detox sattvic meals." },
            { iconPath: ICON_PATHS.SPIRITUAL, title: "Vedic Ceremonies", text: "Experience Ganga Aarti in Haridwar (VIP seating) and a sacred Fire Ceremony (Havan)." },
            { iconPath: ICON_PATHS.YOGA, title: "Holistic Yoga Focus", text: "Practice Hatha, Vinyasa, Kriya, and Ashtanga with expert yoga masters." },
        ],
        inclusions: [
            "6 Nights accommodation in a specialized Yoga Centre (Rishikesh).",
            "Private roundtrip transfers: Delhi Airport to Rishikesh.",
            "Daily Yoga (Hatha, Vinyasa, Ashtanga, Kriya) and Meditation/Pranayama sessions.",
            "All prescribed Sattvic Meals: Breakfast, Lunch (select days), Dinner.",
            "Guided visit to Haridwar, Mansa Devi & Chandi Devi temples (cable car included).",
            "VIP seating for Har Ki Pauri Ganga Aarti in Haridwar.",
            "Ayurvedic Consultation, Abhyanga Massage, and Shirodhara treatment.",
            "Sound healing, mantra chanting, and Fire Ceremony (Havan).",
            "Guided nature walks/hikes.",
        ],
        exclusions: [
            "International flights to and from Delhi (DEL).",
            "Visa fees and travel insurance.",
            "Personal expenses, shopping, and tips/gratuities.",
            "Reiki or crystal healing therapy (may be an optional surcharge depending on provider).",
            "Lunch on non-travel days not explicitly marked as included.",
        ],
        itinerary: [
            { 
              day: 1, 
              title: "Arrival & Orientation in Rishikesh", 
              activities: [
                "Private transfer from Delhi Airport to Rishikesh (by road).",
                "Check-in at a dedicated Yoga centre.",
                "Evening: Orientation session with your yoga master.",
                "Light sattvic welcome dinner & Overnight stay in Rishikesh."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day1-2.jpg" ],
              coordinates: { lat: 30.0869, lng: 78.2676 }, // Rishikesh
              zoom: 11
            },
            { 
              day: 2, 
              title: "Yoga & River Meditation", 
              activities: [
                "Sunrise Hatha Yoga & Pranayama session by the Ganges.",
                "Nutritious breakfast.",
                "Morning: Guided meditation & mindfulness therapy.",
                "Afternoon: Ayurvedic consultation & personalized healing plan.",
                "Evening: Ganga Aarti ceremony.",
                "Overnight in Rishikesh."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day2-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day2-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day2-3.jpg" ],
              coordinates: { lat: 30.1302, lng: 78.3242 }, // Parmarth Niketan Area
              zoom: 12
            },
            { 
              day: 3, 
              title: "Detox & Ayurveda Healing", 
              activities: [
                "Morning: Kriya yoga & cleansing techniques (under supervision).",
                "Detox breakfast with herbal teas.",
                "Ayurvedic therapies: Abhyanga massage & Shirodhara for deep relaxation.",
                "Afternoon rest / nature walk.",
                "Evening: Sound healing & mantra chanting session.",
                "Overnight in Rishikesh."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day3-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day3-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day3-4.jpg" ],
              coordinates: { lat: 30.1198, lng: 78.3090 }, // Tapovan Area
              zoom: 14
            },
            { 
              day: 4, 
              title: "Spiritual Haridwar Pilgrimage", 
              activities: [
                "Morning yoga before breakfast.",
                "Transfer to Haridwar (approx. 1 hr).",
                "Visit Mansa Devi & Chandi Devi temples (by cable car).",
                "Lunch: Sattvic meal.",
                "Evening: Har Ki Pauri Ganga Aarti (special VIP seating).",
                "Return to Rishikesh & overnight stay."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-4.jpg" ],
              coordinates: { lat: 29.9560, lng: 78.1706 }, // Har Ki Pauri, Haridwar
              zoom: 12
            },
            { 
              day: 5, 
              title: "Deep Healing & Nature Immersion", 
              activities: [
                "Sunrise Vinyasa Yoga & breathing therapy.",
                "Breakfast with organic Himalayan produce.",
                "Guided hike to nearby waterfalls / caves (Vashishta or Beatles Ashram meditation caves).",
                "Afternoon: Reiki or crystal healing therapy.",
                "Evening: Silent meditation by candlelight.",
                "Overnight in Rishikesh."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day5-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day5-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day5-4.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day5-5.jpg" ],
              coordinates: { lat: 30.1130, lng: 78.3150 }, // Beatles Ashram
              zoom: 12
            },
            { 
              day: 6, 
              title: "Advanced Yoga & Inner Balance", 
              activities: [
                "Morning: Ashtanga Yoga practice with expert guidance.",
                "Brunch: Thali with healing herbs.",
                "Afternoon: Workshop on stress management & holistic living.",
                "Evening: Fire ceremony (Havan) with Vedic chanting for purification.",
                "Overnight in Rishikesh."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day6-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day6-2.jpg" ],
            },
            { 
              day: 7, 
              title: "Departure & Renewal", 
              activities: [
                "Morning: Closing meditation & gratitude circle.",
                "Breakfast.",
                "Private transfer to Delhi Airport for onward journey."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day7-1.jpg" ],
            },
        ],
        reviews: [
            { name: "Anjali S.", rating: 5, date: "Apr 2025", comment: "A truly soul-cleansing experience. The balance of physical yoga and spiritual ceremony was perfect. The VIP Aarti seating was a highlight." },
            { name: "Ben H.", rating: 5, date: "Sep 2025", comment: "The Ayurvedic treatments were fantastic, and the Kriya cleansing was supervised professionally. Rishikesh is stunning. Seamless logistics from Delhi." },
            { name: "Lian G.", rating: 4, date: "Mar 2025", comment: "The yoga classes were challenging and rewarding. Would have appreciated more free time, but the immersion was worth it. Great value for a detox retreat." },
        ],
        fixedDepartureDates: [
            { date: "2026-03-10", label: "Mar 10 - Mar 16, 2026 ($4,779)", price: 4779 },
            { date: "2026-04-20", label: "Apr 20 - Apr 26, 2026 ($4,779)", price: 4779 },
            { date: "2026-10-01", label: "Oct 01 - Oct 07, 2026 ($4,779)", price: 4779 },
        ],
        minDeposit: 350,
        contactNumber: "+91-98765-43210"
    }
  },

'tahiti-endless-summer-experience': {
    slug: 'tahiti-endless-summer-experience',
    destination: 'Tahiti & Moorea, French Polynesia',
    title: 'The Endless Summer Tahiti Experience',
    duration: '5 Nights • 6 Days',
    type: 'Surf, Adventure & Island Lifestyle',
    images: [
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/main1.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-03.jpg.jpg", 
        "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-09.jpg.jpg",
    ],
    mapImageUrl: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tahiti/map.jpg",
    facts: {
        currency: { value: "XPF (CFP Franc)", iconPath: ICON_PATHS.CURRENCY, svgAttributes: { strokeWidth: 1.5 } },
        avgTemp: { value: "26°C (Avg)", iconPath: ICON_PATHS.TEMPERATURE, svgAttributes: { viewBox: "0 0 24 24", strokeWidth: 2.5 } },
        timezone: { value: "UTC -10 (TAHT)", iconPath: ICON_PATHS.TIMEZONE, svgAttributes: { strokeWidth: 2, paths: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M12 6v6l4 2"] } },
        language: { value: "French, Tahitian", iconPath: ICON_PATHS.LANGUAGE, svgAttributes: { strokeWidth: 2, paths: ["M2 12h20M12 2a15.3 15.3 0 010 20", "M12 2a15.3 15.3 0 000 20"] } },
    },
    bookingSection: {
        overview: {
            title: "Moorea: The Ultimate Endless Summer Escape",
            paragraphs: [
                "Experience a premium **5-day Tahitian escape** in a flagship collaboration between Koursair, Green Lodge Moorea, and The Endless Summer. This seamless end-to-end journey offers direct departures from Los Angeles or San Francisco (Supplement applies from different airports), whisking you away to the lush landscapes and protected lagoons of Moorea.",
                "Anchored at the boutique **Green Lodge Moorea**, this trip blends the authentic surf-culture ethos of The Endless Summer with high-touch hospitality. Enjoy a curated balance of guided surf sessions, marine adventures, and cultural immersion, all designed to be the ultimate accessible island getaway."
            ]
        },
        keySellingPoints: [
            { iconPath: ICON_PATHS.SURF, title: "Endless Summer Surf", text: "Two full days of guided surf sessions with instruction and in-water coaching for all levels." },
            { iconPath: ICON_PATHS.HOTEL, title: "Green Lodge Buyout", text: "Exclusive group stay at Green Lodge Moorea in Beach or Garden Bungalows." },
            { iconPath: ICON_PATHS.ADVENTURE, title: "Curated Adventures", text: "Includes ATV tour, lagoon snorkeling, and scenic island excursions." },
        ],
        inclusions: [
            "Round-trip International Flights: Los Angeles (LAX) or San Francisco (SFO) (Supplement applies from different airports) to Tahiti (PPT).",
            "5 Nights accommodation at Green Lodge Moorea (Bungalow occupancy).",
            "All Transportation: Airport transfers, Ferry crossing to Moorea, and ground logistics.",
            "Two full days of guided surf sessions (Transport + Coaching included).",
            "Food and Drink Allocation (10 meals included).",
            "Guided Moorea Island Tour (Belvedere Lookout, Rotui Rum Distillery).",
            "Lagoon Snorkeling experience in coral gardens.",
            "Guided ATV Adventure.",
            "On-island logistical support and experience coordination.",
        ],
        exclusions: [
            "Travel insurance.",
            "Alcoholic beverages outside of allocated meals/tastings.",
            "Optional activities during free time (Spa, shopping, rental cars).",
            "Personal expenses and gratuities.",
            "Meals beyond the 10-meal allocation.",
        ],
        itinerary: [
            { 
              day: 1, 
              title: "Arrival in Tahiti – Transfer to Moorea", 
              activities: [
                "Arrival at Fa’a’ā International Airport (PPT) with dedicated assistance.",
                "Ground transfer to the ferry terminal.",
                "Scenic ferry crossing from Tahiti to Moorea.",
                "Complimentary transfer to Green Lodge Moorea for check-in.",
                "Free time to settle in, explore the lodge, and relax."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-07.jpg.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-12.jpg.jpg" ],
              coordinates: { lat: -17.5069, lng: -149.7577 }, // Green Lodge area
              zoom: 11
            },
            { 
              day: 2, 
              title: "Surf Day One + Moorea Island Tour", 
              activities: [
                "Morning: Endless Summer–led surf session (break selected based on conditions).",
                "Instruction and in-water coaching tailored to skill levels.",
                "Afternoon: Guided Moorea Island Tour.",
                "Visit Belvedere Lookout, interior viewpoints, waterfalls, and plantations.",
                "Tasting at the Rotui Rum Distillery."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-06.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-14.jpg.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-02.jpg" ],
              coordinates: { lat: -17.5330, lng: -149.8335 }, // Belvedere Lookout
              zoom: 12
            },
            { 
              day: 3, 
              title: "Surf Day Two + Lagoon Snorkeling", 
              activities: [
                "Morning: Second guided surf session focused on progression.",
                "Extended time in the water.",
                "Afternoon: Lagoon snorkeling experience.",
                "Explore coral gardens and tropical marine life in protected waters.",
                "Evening: Free for rest or independent exploration."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day3-2.jpg","https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day3-3.jpg","https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day3-4.jpg" ],
              coordinates: { lat: -17.4900, lng: -149.8500 }, // Lagoon area
              zoom: 14
            },
            { 
              day: 4, 
              title: "Interior Adventure", 
              activities: [
                "Guided ATV adventure through Moorea’s valleys and jungle trails.",
                "Remainder of the day at leisure."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day4-2.jpg" ],
              coordinates: { lat: -17.5500, lng: -149.8000 }, // Interior/Ocean
              zoom: 12
            },
            { 
              day: 5, 
              title: "Free Day in Moorea + Farewell Dinner", 
              activities: [
                "Unstructured day to enjoy Moorea at your own pace.",
                "Optional ideas: Beach time, lagoon cruising, spa services, or rental car exploration.",
                "Evening: Hosted Farewell Dinner celebrating the week’s experience."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day5-2.jpg" ],
              coordinates: { lat: -17.5069, lng: -149.7577 }, // Green Lodge
              zoom: 13
            },
            { 
              day: 6, 
              title: "Departure – Moorea to Tahiti", 
              activities: [
                "Breakfast at Green Lodge.",
                "Check-out and complimentary transfer to Moorea ferry port.",
                "Ferry crossing back to Tahiti.",
                "Transfer to Fa’a’ā International Airport (PPT).",
                "Return flight to Los Angeles or San Francisco (Supplement applies from different airports)."
              ],
              images: [ "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/day6.jpg" ],
            },
        ],
        reviews: [
            { name: "Sarah J.", rating: 5, date: "Nov 2025", comment: "A dream trip! The surf coaching was top-notch and Green Lodge is paradise. Koursair made the logistics completely stress-free." },
            { name: "Mike T.", rating: 5, date: "Dec 2025", comment: "Seamless from LAX to Moorea. The balance of adventure and chill time was perfect. Highly recommend the ATV tour!" },
            { name: "Jessica L.", rating: 4, date: "Jan 2026", comment: "Incredible value for a Tahiti trip. The food was amazing and the bungalows were beautiful. Loved the Endless Summer vibe." },
        ],
        fixedDepartureDates: [
            { date: "2026-03-28", label: "Mar 28 - Apr 3, 2026 ($3,250)", price: 3250 },
        ],
        contactNumber: "+1-800-555-0199"
    }
}
};