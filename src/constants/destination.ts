import { DestinationData } from "@/types/destination";

export const kenyaReunionAdventure = {
  slug: "kenya-business-excursion-where-the-world-meets-the-wild",
  destination: "Nairobi, Lake Naivasha, Masai Mara",
  title: "Kenya Business Excursion: Where the World Meets the Wild",
  duration: "9 Nights | 10 Days",
  overview: `
        <div class="space-y-4">
            <p class="italic text-lg text-primary font-serif border-l-4 border-primary pl-4">
                "The world is a book, and those who do not travel read only one page." — Saint Augustine
            </p>
            <p class="font-bold text-lg text-gray-700">
                Experience the heart of Kenya—a land of sweeping savannahs, spectacular wildlife, and vibrant culture.
            </p>
            <p class="text-gray-600">
                This journey combines Nairobi’s cultural richness, the tranquil beauty of Lake Naivasha, and the thrilling wildlife encounters in Masai Mara, offering a perfect blend of adventure, luxury, and relaxation.
            </p>
        </div>
    `,
  highlightsBox: {
    title: "Adventure Highlights",
    points: [
      {
        title: "Nairobi Culture",
        desc: "Sheldrick Wildlife Trust & Karen Blixen Museum.",
      },
      {
        title: "Lake Naivasha",
        desc: "Boat rides and wildlife at Sopa Lodge.",
      },
      {
        title: "The Masai Mara",
        desc: "Stay at the iconic Governors' Camp with Big 5 game drives.",
      },
    ],
  },
  heroImage:
    "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/kenya.jpg",
  facts: {
    currency: { value: "USD (All Inclusive)" },
    avgTemp: { value: "20°C - 28°C" },
    timezone: { value: "UTC +3 (EAT)" },
    language: { value: "Swahili, English" },
  },
  bookingSection: {
    minDeposit: 2500,
    contactNumber: "+1-555-WHARTON",
    fixedDepartureDates: [
      { date: "2026-09-07", label: "Sep 7th - Sep 15th, 2026", price: 7500 },
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival in Nairobi",
        subtitle: "September 7, 2026",
        activities: [
          "Arrive at Jomo Kenyatta International Airport (NBO).",
          "Private representative welcome and assistance with airport formalities.",
          "Transfer to your hotel in Nairobi for check-in.",
        ],
        accommodation: "Nairobi Luxury Hotel (Tribe Hotel or Similar)",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/kenya_1st.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day1-2.jpg",
        ],
        coordinates: {
          lat: -1.2921,
          lng: 36.8219,
        },
        zoom: 7,
      },
      {
        day: 2,
        title: "Day 2: Full-Day Nairobi Excursion",
        subtitle: "September 8, 2026",
        activities: [
          "Early Morning Breakfast at Hotel (6.30 am to 8.00 am).",
          "Entry Ticket for all the below excursions is included.",
          "Visit to Nairobi National Park at 8 am.",
          "Daphne Sheldrick Wildlife Trust: Visit during the exclusive viewing hour to see orphaned elephants.",
          "Karen Blixen Museum: Explore the historic home of the 'Out of Africa' author.",
          "Lunch at Local Restaurant (2 Drinks per Guest).",
          "Giraffe Centre: Hand-feed endangered Rothschild giraffes from raised platforms.",
          "Evening: Dinner at Hotel (2 Drinks per guest).",
        ],
        accommodation: "Nairobi Luxury Hotel (Tribe Hotel or Similar)",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-2.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-3.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-4.jpg",
        ],
        zoom: 11,
      },
      {
        day: 3,
        title: "Day 3: College Alumni Event",
        subtitle: "September 9, 2026",
        activities: [
          "Morning at leisure to rest or enjoy hotel amenities.",
          "College Alumni Event hosted at Strathmore University Kenya.",
          "Lunch at the University.",
          "Includes audio-visual support, light refreshments, tea/coffee service, and optional photography.",
          "Evening dinner at the hotel (2 Drinks per guest).",
        ],
        accommodation: "Nairobi Luxury Hotel (Tribe Hotel or Similar)",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day3-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day3-2.jpg",
        ],
      },
      {
        day: 4,
        title: "Day 4: Transfer to Masai Mara",
        subtitle: "September 10, 2026",
        activities: [
          "After Breakfast at hotel in Nairobi, check-out and proceed to Masai Mara.",
          "Private Transfer by Charter Plane.",
          "Check in to Little Zebra River Camp and Zebra Valley Camp.",
          "Lunch at the camp.",
          "Late afternoon game drive to spot the Big Five: lions, elephants, leopards, buffaloes, and rhinos.",
          "Dinner and overnight at the camp.",
        ],
        accommodation: "Little Zebra River Camp and Zebra Valley Camp",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day6-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day6-2.jpg",
        ],
        coordinates: {
          lat: -1.4061,
          lng: 35.0123,
        },
        zoom: 10,
      },
      {
        day: 5,
        title: "Day 5: Full-Day Masai Mara Game Drives",
        subtitle: "September 11, 2026",
        activities: [
          "Morning game drive to catch wildlife activity at its peak.",
          "Return to camp for lunch.",
          "Afternoon game drive exploring deeper areas of the reserve.",
          "Look for cheetahs sprinting across plains and elephants grazing.",
          "Dinner and overnight at Camp.",
        ],
        accommodation: "Little Zebra River Camp and Zebra Valley Camp",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-2.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-3.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-4.jpg",
        ],
      },
      {
        day: 6,
        title: "Day 6: Masai Mara Wildlife Exploration",
        subtitle: "September 12, 2026",
        activities: [
          "Morning game drive to experience sunrise over the savannah.",
          "Return for lunch at the camp.",
          "Afternoon game drive for final wildlife sightings and photography opportunities.",
          "Evening dinner under the African sky, celebrating the adventures of the past days.",
        ],
        accommodation: "Little Zebra River Camp and Zebra Valley Camp",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day8-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day8-2.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day8-3.jpg",
        ],
      },
      {
        day: 7,
        title: "Day 7: Transfer to Lake Naivasha Sopa Resort",
        subtitle: "September 13, 2026",
        activities: [
          "After Breakfast at Camp in Masai Mara, check-out and proceed to Lake Naivasha Sopa Resort.",
          "Private Transfer by Charter Plane to Nairobi.",
          "Stop at the Great Rift Valley Escarpment for panoramic views.",
          "Lunch at Lake Naivasha Sopa Lodge, overlooking the lake.",
          "Afternoon at leisure: relax by the pool or explore grounds where giraffes and waterbucks roam.",
          "Dinner at the lodge.",
        ],
        accommodation: "Lake Naivasha Sopa Lodge",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day4-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day4-2.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day4-3.jpg",
        ],
        coordinates: {
          lat: -0.7667,
          lng: 36.4333,
        },
        zoom: 11,
      },
      {
        day: 8,
        title: "Day 8: Lake Nakuru National Park",
        subtitle: "September 14, 2026",
        activities: [
          "Early breakfast and depart with packed lunches for Lake Nakuru National Park.",
          "Game drive to spot rhinos, lions, leopards, and (seasonally) flamingos creating a pink shoreline.",
          "Picnic lunch at scenic viewpoints.",
          "Return to Lake Naivasha Sopa Lodge for dinner and overnight stay.",
        ],
        accommodation: "Lake Naivasha Sopa Lodge",
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-1.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-2.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-3.jpg",
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-4.jpg",
        ],
      },
      {
        day: 9,
        title: "Day 9: Departure",
        subtitle: "September 15, 2026",
        activities: [
          "Breakfast and check-out.",
          "Transfer to Jomo Kenyatta International Airport (JKIA) for international departure.",
          "Enroute Lunch.",
          "End of Service.",
        ],
        images: [
          "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day9.jpg",
        ],
      },
    ],
    keySellingPoints: [
      {
        title: "Curated Luxury",
        text: "Stay at Sopa Lodge & Governors' Camp",
        iconPath:
          "M12 18.7l-5.6 3.3 1.5-6.5-5-4.3 6.6-.6L12 1l2.5 6.4 6.6.6-5 4.3 1.5 6.5z",
      },
      {
        title: "Alumni Reunion",
        text: "Private events & networking included",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        title: "Big Five Safari",
        text: "Game drives in Nakuru & Masai Mara",
        iconPath: "M17 10l-4 4-2-2-4 4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      },
    ],
    inclusions: [
      "Full board accommodation at safari properties",
      "Soft drinks, beer and house wine at safari properties",
      "Airport / airstrip transfers",
      "Park fees, camping fees and conservancy fees",
      "Game drives in shared 4x4 safari vehicle",
      "Scheduled flights mentioned",
      "Limited Laundry at safari properties",
      "All domestic flight departure taxes & Government taxes",
      "AMREF Flying Doctors' cover",
    ],
    exclusions: [
      "International flights & departure taxes",
      "Drinks & laundry at City Hotel(s)",
      "Travel and health insurance",
      "Champagne, luxury spirits and private cellar wines",
      "Additional activities not listed",
      "Exclusive use of safari vehicle",
      "All statutory increases beyond our control",
      "Staff gratuities and any other extras",
    ],
  },
};


export const nationalityOverrides: { [key: string]: string } = {
  US: "American",
  GB: "British",
  AE: "Emirati",
  SA: "Saudi",
  KR: "South Korean",
  KP: "North Korean",
  RU: "Russian",
  VN: "Vietnamese",
  TH: "Thai",
  PH: "Filipino",
  CZ: "Czech",
  IN: "Indian",
};


const ICON_PATHS = {
  CURRENCY: "currency-icon-path",
  TEMPERATURE: "temperature-icon-path",
  TIMEZONE: "timezone-icon-path",
  LANGUAGE: "language-icon-path",
};

export const DESTINATION_DATA: Record<string, DestinationData> = {
  'Dubai': {
    slug: "dubai",
    title: "Dubai, United Arab Emirates",
    subtitle: "Where Luxury Meets Limitless Adventure",
    continent: "Asia",
    heroImage: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/museum_of_the_future_dubai.jpg",
    overview:
      "Dubai is a city of unparalleled ambition, where **futuristic architecture** meets the ancient traditions of Arabia. From the world's tallest buildings and man-made islands to thrilling desert safaris and elite nightlife, Dubai offers a unique, luxurious experience that caters to both the cultural seeker and the extreme adventurer.",
    whygo:
      "Dubai offers the **guarantee of world-class luxury** and the excitement of **extreme, organized adventure**. It is a modern city built to amaze, making it ideal for travelers who want top-tier service, thrilling activities like skydiving and zip-lining, and iconic sightseeing.",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-3.jpg",

    keyFacts: {
      currency: { value: "AED (Dirham)", iconPath: ICON_PATHS.CURRENCY },
      avgTemp: { value: "27°C", iconPath: ICON_PATHS.TEMPERATURE },
      timezone: { value: "UTC +4", iconPath: ICON_PATHS.TIMEZONE },
      language: { value: "Arabic, English", iconPath: ICON_PATHS.LANGUAGE },
    },

    collageImages: [
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/BurjKhalifa.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-1.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day5-2.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-5.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day4-1.jpg",
    ],

    availableTours: [
      {
        title: "Dubai Luxury Adventure",
        slug: "dubai-luxury-adventure",
        duration: "5 Nights • 6 Days",
        price: 6389,
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/BurjKhalifa.jpg",
        type: "Luxury & Adventure",
        description:
          "Experience Dubai's ultimate blend of 5-star service, extreme activities like X-Line Ziplining, and elite nightlife including a Private Yacht Party.",
        rating: 4.8,
        reviews: 450,
        dates: ["Mar 5th - Mar 10th, 2026", "May 15th - May 20th, 2026", "Nov 20th - Nov 25th, 2026"
        ],
      },
      {
        title: "Dubai Discovery Package",
        slug: "dubai-discovery",
        duration: "5 Nights • 6 Days",
        price: 2749,
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/museum_of_the_future_dubai.jpg",
        type: "Sightseeing & Cultural",
        description:
          "A comprehensive tour covering the iconic Burj Khalifa, historic Deira Dhow Cruise, Desert Safari, and modern attractions like the Museum of the Future.",
        rating: 4.5,
        reviews: 320,
        dates: ["Mar 15th - Mar 20th, 2026", "Apr 12th - Apr 17th, 2026", "Oct 18th - Oct 23th, 2026"
        ],
      },
    ],

    highlights: [
      {
        title: "Burj Khalifa & Downtown",
        description:
          "Ascend the world's tallest structure for panoramic views and witness the mesmerizing Dubai Fountain Show.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-2.jpg",
      },
      {
        title: "Palm Jumeirah & Yachting",
        description:
          "Explore the iconic man-made island and enjoy luxury yacht cruises along the spectacular Marina skyline.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day2-3.jpg",
      },
      {
        title: "Desert Thrills",
        description:
          "Experience high-adrenaline dune bashing followed by a luxurious, traditional dinner under the Arabian stars.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai-discovery/day3-4.jpg",
      },
    ],
  },
  'Thailand': {
    slug: "thailand",
    title: "Thailand",
    subtitle: "The Land of Smiles: Tropical Isles & Ancient Temples",
    continent: "Asia",
    heroImage: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/thailand-1.jpg",
    overview:
      "Thailand offers an intoxicating mix of breathtaking natural beauty and rich cultural heritage. From the bustling, chaotic energy of Bangkok to the serene limestone cliffs of Krabi and the white-sand beaches of Phuket, it’s a destination that promises adventure, relaxation, and delicious street food at every turn.",
    whygo:
      "Visit Thailand for the stunning combination of tropical diversity and rich cultural heritage. Travelers come to experience the magnetic energy of Bangkok, explore ancient temples, and relax on world-famous, white-sand beaches perfect for adventurous island hopping.",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day9-2.jpg",
    keyFacts: {
      currency: { value: "THB (Baht)", iconPath: ICON_PATHS.CURRENCY },
      avgTemp: { value: "32°C", iconPath: ICON_PATHS.TEMPERATURE },
      timezone: { value: "UTC +7 (ICT)", iconPath: ICON_PATHS.TIMEZONE },
      language: { value: "Thai, English", iconPath: ICON_PATHS.LANGUAGE },
    },

    collageImages: [
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day2-2.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-1.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day3-5.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day5-2.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day6-2.jpg",
    ],

    availableTours: [
      {
        title: "Thailand Vibrant Escape",
        slug: "thailand-vibrant-escape",
        duration: "9 Nights • 10 Days",
        price: 4799,
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/Thailand_Street.jpg",
        type: "Island Hopping & City",
        description:
          "A comprehensive 10-day tour combining the islands of Phuket and Krabi with the bustling capital of Bangkok, including all domestic flights and transfers.",
        rating: 4.7,
        reviews: 650,
        dates: ["Feb 20th - Mar 1st, 2026", "Mar 10th - Mar 19th, 2026", "Nov 5th - Nov 14th, 2026"
        ],
      },
    ],

    highlights: [
      {
        title: "Island Hopping",
        description:
          "Discover the breathtaking beauty of Phi Phi Islands, Maya Bay, and the towering limestone karsts of Krabi.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day2-4.jpg",
      },
      {
        title: "Bangkok's Wonders",
        description:
          "Explore the Grand Palace, Wat Arun, and enjoy a vibrant dinner cruise on the Chao Phraya River.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day9-1.jpg",
      },
      {
        title: "Thai Cuisine",
        description:
          "Indulge in world-famous street food, floating markets, and authentic local cooking classes.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/thailand-vibrant-escape/day8-1.jpg",
      },
    ],
  },
  'Bali': {
    slug: 'bali',
    title: 'Bali',
    subtitle: 'Island of the Gods: Wellness, Culture & Tropical Serenity',
    continent: 'Asia',
    heroImage: 'https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day8-1.jpg',
    overview: "Known globally as the Island of the Gods, Bali is a spiritual haven renowned for its volcanic mountains, iconic rice paddies, world-class beaches, and vibrant artistic scene. It is the perfect destination for **wellness seekers**, honeymooners, and cultural explorers.",
    whygo:
      "Choose Bali for profound spiritual renewal, lush rice paddies, serene yoga retreats, and the deep culture of the Island of the Gods. It is the perfect destination for wellness seekers looking to combine tropical relaxation with deep cultural and artistic immersion.",
    image: 'https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day3-2.jpg',
    keyFacts: {
      currency: { value: "IDR (Rupiah)", iconPath: ICON_PATHS.CURRENCY },
      avgTemp: { value: "28°C", iconPath: ICON_PATHS.TEMPERATURE },
      timezone: { value: "UTC +8 (WITA)", iconPath: ICON_PATHS.TIMEZONE },
      language: { value: "Indonesian, Balinese, English", iconPath: ICON_PATHS.LANGUAGE },
    },

    collageImages: [
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/bali2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day3-1.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day6-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day8-2.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/day4-3.jpg",
    ],

    availableTours: [
      {
        title: 'Bali Yoga Retreat',
        slug: 'bali-yoga-retreat',
        duration: '9 Nights • 10 Days',
        price: 4449,
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/BaliResort.jpg",
        type: 'Wellness & Spiritual',
        description: "A 10-day retreat focusing on daily yoga, pranayama, Ayurvedic healing, and cultural immersion in Ubud, Canggu, Seminyak, and Uluwatu.",
        rating: 4.9,
        reviews: 210,
        dates: ["Jan 22nd - Feb 02nd","Feb 26th - Mar 09th","Apr 02nd - Apr 13th","May 07th - May 18th","Aug 11th - Aug 22nd","Sep 09th - Sep 20th"
        ],
      },
    ],

    highlights: [
      { title: "Ubud's Spiritual Heart", description: "Explore the Tegalalang Rice Terraces, the Monkey Forest, and participate in healing ceremonies in Bali's cultural center.", image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/bali1.jpg" },
      { title: "Water Temples", description: "Experience the sacred purification rituals at Tirta Empul and witness the dramatic clifftop location of Uluwatu Temple.", image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/Bali.jpg" },
      { title: "Coastal Vibe", description: "Enjoy the laid-back surf culture of Canggu and the stylish boutiques and nightlife of Seminyak.", image: 'https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/bali-yoga-retreat/highlight.jpg' }
    ]

  },
  'India': {
    slug: 'india',
    title: 'India: Yoga, Himalayas & Spiritual Rivers',
    subtitle: 'Gateway to the Ganges and the Yoga Capital of the World',
    continent: 'Asia',
    heroImage: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/main-3.jpg",
    overview: "This segment of India, focusing on the foothills of the Himalayas and the banks of the sacred Ganges, is a global epicenter for **yoga, meditation, and spiritual healing**. It combines ancient Ayurvedic practices with breathtaking natural landscapes in Rishikesh and Haridwar.",
    whygo:
      "Travel to this region for an immersive spiritual and healing journey focused on the self. Go to experience the profound connection with the sacred Ganges river, engage in intensive Yoga and detox practices in the global capital of Yoga (Rishikesh), and receive authentic Ayurvedic and Vedic healing treatments.",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day1-1.jpg",
    keyFacts: {
      currency: { value: "INR (Rupee)", iconPath: ICON_PATHS.CURRENCY },
      avgTemp: { value: "24°C (Avg)", iconPath: ICON_PATHS.TEMPERATURE },
      timezone: { value: "UTC +5:30 (IST)", iconPath: ICON_PATHS.TIMEZONE },
      language: { value: "Hindi, English", iconPath: ICON_PATHS.LANGUAGE },
    },

    collageImages: [
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day2-1.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day3-4.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/main-2.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day5-1.jpg",
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-3.jpg",
    ],

    availableTours: [
      {
        title: 'Yoga & Healing Journey – Rishikesh & Haridwar',
        slug: 'rishikesh-haridwar-yoga-healing',
        duration: '6 Nights • 7 Days',
        price: 4779,
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/main-1.jpg",
        type: 'Spiritual & Detox',
        description: "An intensive 7-day retreat covering Hatha, Vinyasa, Kriya Yoga, Ayurvedic detox treatments, and participation in the Haridwar Ganga Aarti.",
        rating: 4.7,
        reviews: 150,
        dates: ["Mar 10 - Mar 16, 2026", "Apr 20 - Apr 26, 2026", "Oct 01 - Oct 07, 2026"
        ],
      },
    ],

    highlights: [
      { title: "The Holy Ganges", description: "Witness the spectacular Ganga Aarti ceremony at Har Ki Pauri and meditate on the banks of the sacred river.", image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-4.jpg" },
      { title: "Rishikesh Yoga", description: "Practice various forms of yoga in the global capital of the discipline and explore the Beatles Ashram.", image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day2-3.jpg" },
      { title: "Ayurvedic Treatments", description: "Receive personalized Ayurvedic consultations and detoxifying treatments like Abhyanga massage and Shirodhara.", image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day3-2.jpg" }
    ]
  },
  'Tahiti': {
    slug: "tahiti",
    title: "Tahiti Meets Endless Summer",
    subtitle: "The Endless Summer: Surf, Lagoons & Island Luxury",
    continent: "Oceania",
    heroImage: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-banner.jpg.png",

    overview:
      "Tahiti and its sister island Moorea offer the ultimate South Pacific escape, where **turquoise lagoons, volcanic peaks, and world-class surf** meet relaxed island culture. This destination blends marine adventure, eco-boutique stays, and Polynesian landscapes into one seamless tropical journey.",

    whygo:
      "Travelers choose Tahiti for its rare mix of **surf culture, marine life encounters, and untouched island beauty**. From snorkeling coral gardens and watching whales to exploring lush interior valleys and iconic lagoons, this is a bucket-list destination that feels both adventurous and deeply rejuvenating.",

    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-03.jpg.jpg",

    keyFacts: {
      currency: { value: "CFP Franc (XPF)", iconPath: ICON_PATHS.CURRENCY },
      avgTemp: { value: "26°C", iconPath: ICON_PATHS.TEMPERATURE },
      timezone: { value: "UTC -10", iconPath: ICON_PATHS.TIMEZONE },
      language: { value: "French, Tahitian, English", iconPath: ICON_PATHS.LANGUAGE },
    },

    collageImages: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-12.jpg.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-05.jpg.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-04.jpg.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-07.jpg.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-09.jpg.jpg"],

    availableTours: [
      {
        title: "The Endless Summer Tahiti Experience",
        slug: "tahiti-endless-summer-experience",
        duration: "5 Nights • 6 Days",
        price: 3250,
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tihati.jpg",
        type: "Surf, Marine & Island Adventure",
        description:
          "A curated 6-day Tahiti and Moorea journey combining two full days of guided surf coaching, lagoon snorkeling, marine life encounters, scenic island tours, and boutique eco-lodge living at Green Lodge Moorea — all with seamless transfers and flights included.",
        rating: 4.9,
        reviews: 120,
        dates: ["Mar 28 - Apr 3, 2026"
        ],
      },
    ],

    highlights: [
      {
        title: "Endless Summer Surf",
        description:
          "Two days of coached surf sessions in Moorea’s warm Pacific waters, designed for beginner to intermediate levels with expert guidance.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-06.jpg",
      },
      {
        title: "Lagoon & Marine Life",
        description:
          "Snorkel coral gardens, spot tropical fish, and experience unforgettable whale and dolphin encounters in the pristine lagoons of French Polynesia.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-14.jpg.jpg",
      },
      {
        title: "Moorea Landscapes",
        description:
          "Discover Belvedere Lookout, waterfalls, pineapple plantations, jungle valleys, and panoramic island viewpoints on guided scenic tours.",
        image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/tahiti-visual-02.jpg",
      },
    ],
  },

};