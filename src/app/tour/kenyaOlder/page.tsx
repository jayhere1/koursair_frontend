"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    Lock, Check, AlertTriangle, DollarSign, CloudSun, MapPin,
    CheckCircle, User, UploadCloud, Plus, X, ChevronDown,
    ChevronUp, Mail, Heart, ChevronLeft, ChevronRight, FileText, Trash2, Globe,
    Eye, EyeOff
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import FooterSection from '@/components/landing/Footer';
import { useInView } from 'react-intersection-observer';
import KoursairImage from '@/components/Media/Images/KoursairImage';

const kenyaReunionAdventure = {
    slug: 'wharton-kenya-adventure',
    destination: 'Nairobi, Lake Naivasha, Masai Mara',
    title: "WHARTON : A Kenyan Adventure",
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
            { title: "Nairobi Culture", desc: "Sheldrick Wildlife Trust & Karen Blixen Museum." },
            { title: "Lake Naivasha", desc: "Boat rides and wildlife at Sopa Lodge." },
            { title: "The Masai Mara", desc: "Stay at the iconic Governors' Camp with Big 5 game drives." }
        ]
    },
    heroImage: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/kenya.jpg",
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
                    "Enjoy a light snack or late dinner, depending on arrival time."
                ],
                accommodation: "Nairobi Luxury Hotel",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day1-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day1-2.jpg"],
                coordinates: { lat: -1.2921, lng: 36.8219 },
                zoom: 7
            },
            {
                day: 2,
                title: "Day 2: Full-Day Nairobi Excursion",
                subtitle: "September 8, 2026",
                activities: [
                    "David Sheldrick Wildlife Trust: Visit during exclusive viewing hour to see orphaned elephants.",
                    "Giraffe Centre: Hand-feed endangered Rothschild giraffes from raised platforms.",
                    "Karen Blixen Museum: Explore the historic home of the 'Out of Africa' author.",
                    "Lunch in Karen Area (Suggested: The Talisman, Cultiva Farm, or Karen Blixen Coffee Garden).",
                    "Kazuri Beads Women’s Cooperative: Shop for handmade ceramic beads and learn about women empowerment.",
                    "Evening: Dinner at Carnivore Restaurant (Nyama Choma) or quiet dinner at the hotel."
                ],
                accommodation: "Nairobi Luxury Hotel",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day2-4.jpg"],
                zoom: 11
            },
            {
                day: 3,
                title: "Day 3: College Alumni Event",
                subtitle: "September 9, 2026",
                activities: [
                    "Morning at leisure to rest or enjoy hotel amenities.",
                    "College Alumni Event hosted in a private conference room or hall.",
                    "Includes audio-visual support, light refreshments, tea/coffee service, and optional photography.",
                    "Evening private dinner for alumni at the hotel or a local restaurant."
                ],
                accommodation: "Nairobi Luxury Hotel",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day3-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day3-2.jpg"],
            },
            {
                day: 4,
                title: "Day 4: Departure to Lake Naivasha",
                subtitle: "September 10, 2026",
                activities: [
                    "Breakfast at hotel and check-out.",
                    "Private transfer to Lake Naivasha (~2.5–3 hours).",
                    "Stop at the Great Rift Valley Escarpment for panoramic views.",
                    "Lunch at Lake Naivasha Sopa Lodge, overlooking the lake.",
                    "Afternoon at leisure: relax by the pool or explore grounds where giraffes and waterbucks roam.",
                    "Dinner at the lodge."
                ],
                accommodation: "Lake Naivasha Sopa Lodge",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day4-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day4-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day4-3.jpg"],
                coordinates: { lat: -0.7667, lng: 36.4333 }, // Lake Naivasha
                zoom: 11
            },
            {
                day: 5,
                title: "Day 5: Lake Nakuru National Park",
                subtitle: "September 11, 2026",
                activities: [
                    "Early breakfast and depart with packed lunches for Lake Nakuru National Park.",
                    "Game drive to spot rhinos, lions, leopards, and (seasonally) flamingos creating a pink shoreline.",
                    "Picnic lunch at scenic viewpoints.",
                    "Return to Lake Naivasha Sopa Lodge for dinner and overnight stay."
                ],
                accommodation: "Lake Naivasha Sopa Lodge",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day5-4.jpg"]
            },
            {
                day: 6,
                title: "Day 6: Flight to Masai Mara",
                subtitle: "September 12, 2026",
                activities: [
                    "Transfer to Loldia Naivasha Airstrip for a charter flight to Masai Mara.",
                    "Witness spectacular aerial views of savannahs and farmlands.",
                    "Arrival at Masai Mara airstrip and transfer to Governors’ Camp.",
                    "Lunch at the camp.",
                    "Late afternoon game drive to spot the Big Five: lions, elephants, leopards, buffaloes, and rhinos.",
                    "Dinner and overnight at the camp."
                ],
                accommodation: "Governors' Camp",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day6-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day6-2.jpg"],
                coordinates: { lat: -1.4061, lng: 35.0123 }, // Masai Mara
                zoom: 10
            },
            {
                day: 7,
                title: "Day 7: Full-Day Masai Mara Game Drives",
                subtitle: "September 13, 2026",
                activities: [
                    "Morning game drive to catch wildlife activity at its peak.",
                    "Return to camp for lunch.",
                    "Afternoon game drive exploring deeper areas of the reserve.",
                    "Look for cheetahs sprinting across plains and elephants grazing.",
                    "Dinner and overnight at Governors' Camp."
                ],
                accommodation: "Governors' Camp",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-3.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day7-4.jpg"]
            },
            {
                day: 8,
                title: "Day 8: Masai Mara Wildlife Exploration",
                subtitle: "September 14, 2026",
                activities: [
                    "Morning game drive to experience sunrise over the savannah.",
                    "Return for lunch at the camp.",
                    "Afternoon game drive for final wildlife sightings and photography opportunities.",
                    "Evening dinner under the African sky, celebrating the adventures of the past days."
                ],
                accommodation: "Governors' Camp",
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day8-1.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day8-2.jpg", "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day8-3.jpg"]
            },
            {
                day: 9,
                title: "Day 9: Departure",
                subtitle: "September 15, 2026",
                activities: [
                    "Breakfast and check-out.",
                    "Charter flight from Musiara Airstrip to Nairobi (Wilson Airport).",
                    "Transfer to Jomo Kenyatta International Airport (JKIA) for international departure.",
                    "End of Service."
                ],
                images: ["https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/day9.jpg"]
            },
        ],
        keySellingPoints: [
            { title: "Curated Luxury", text: "Stay at Sopa Lodge & Governors' Camp", iconPath: "M12 18.7l-5.6 3.3 1.5-6.5-5-4.3 6.6-.6L12 1l2.5 6.4 6.6.6-5 4.3 1.5 6.5z" },
            { title: "Alumni Reunion", text: "Private events & networking included", iconPath: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Big Five Safari", text: "Game drives in Nakuru & Masai Mara", iconPath: "M17 10l-4 4-2-2-4 4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
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
            "AMREF Flying Doctors' cover"
        ],
        exclusions: [
            "International flights & departure taxes",
            "Drinks & laundry at City Hotel(s)",
            "Travel and health insurance",
            "Champagne, luxury spirits and private cellar wines",
            "Additional activities not listed",
            "Exclusive use of safari vehicle",
            "All statutory increases beyond our control",
            "Staff gratuities and any other extras"
        ],
    },
};

type ItineraryDay = {
    day: number;
    title: string;
    subtitle: string;
    activities: string[];
    accommodation?: string;
    images?: string[];
    coordinates?: { lat: number; lng: number };
    zoom?: number;
};

const ItineraryItem = ({ day, onVisible }: { day: ItineraryDay, onVisible: (coords: { lat: number; lng: number }, zoom: number) => void }) => {
    const { ref, inView } = useInView({
        threshold: 0.5, // Trigger when 50% of the card is visible
        triggerOnce: false
    });

    useEffect(() => {
        if (inView && day.coordinates) {
            onVisible(day.coordinates, day.zoom || 11);
        }
    }, [inView, day, onVisible]);


    return (
        <div ref={ref} className="mb-12 relative pl-6 md:pl-10 group">
            <div className="absolute left-0 top-6 -ml-2 md:-ml-3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary border-4 border-[#F4EFE7] z-10 group-hover:scale-125 transition"></div>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-500">

                {/* IMAGE SLIDER */}
                <div className="relative h-48 md:h-64">
                    <ImageSlider images={day.images || []} title={day.title} />
                    <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg backdrop-blur-sm z-10">
                        {day.subtitle}
                    </div>
                </div>

                <div className="p-4 md:p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{day.title}</h3>
                    </div>

                    <ul className="space-y-3 text-gray-600 mb-6">
                        {day.activities.map((act: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                                <span className="text-sm sm:text-base">{act}</span>
                            </li>
                        ))}
                    </ul>

                    {/* ACCOMMODATION SPOTLIGHT */}
                    {day.accommodation && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-500 uppercase tracking-wide">Accommodation</p>
                                <p className="font-bold text-gray-800 text-sm md:text-base">{day.accommodation}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CORRECT_PASSWORD = "WEMBA 50s";
const STORAGE_KEY = "koursair_protected_access";

// --- INTERFACES ---
interface PassportGuest {
    id: number;
    prefix: string;
    lastName: string;
    firstName: string;
    middleName: string;
    gender: string;
    dob: string;
    nationality: string;
    passportFile?: File | null;
    passportFileName?: string;
}

// --- SUB-COMPONENTS ---

const FactCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-primary flex items-center space-x-4">
        <div className="text-primary flex-shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-primary">{value}</p>
        </div>
    </div>
);

// --- NEW COMPONENT: IMAGE SLIDER ---
const ImageSlider = ({ images, title }: { images: string[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Preload next image logic
    useEffect(() => {
        if (!images || images.length <= 1) return;

        // Calculate the next index
        const nextIndex = (currentIndex + 1) % images.length;

        // Create a new Image object to force the browser to preload it
        const img = new window.Image();
        img.src = images[nextIndex];
    }, [currentIndex, images]);

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return <div className="bg-gray-200 h-full w-full"></div>;

    return (
        <div className="relative w-full h-full group overflow-hidden bg-gray-900">
            {/* The wrapper div ensures KoursairImage (which is absolute due to 'fill') 
               stays contained correctly.
            */}
            <div className="w-full h-full relative">
                <KoursairImage
                    // Key is crucial here! Changing the key forces React to re-mount the 
                    // component when the index changes, ensuring the shimmer effect 
                    // plays for every new slide.
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${title} - Slide ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentIndex === 0}
                />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>

            {/* Navigation Arrows (Only if > 1 image) */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/90 hover:text-primary text-white p-2 cursor-pointer rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/90 hover:text-primary text-white p-2 cursor-pointer rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
// --- NEW COMPONENT: PASSPORT UPLOADER ---
const PassportUploader = ({
    travelerId,
    fileName,
    onUpload,
    onDelete
}: {
    travelerId: number,
    fileName?: string,
    onUpload: (id: number, file: File) => void,
    onDelete: (id: number) => void
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (file) {
            setIsUploading(true);
            // Simulate upload delay
            setTimeout(() => {
                onUpload(travelerId, file);
                setIsUploading(false);
            }, 1000);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    if (fileName) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                        <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-800">Passport Attached</p>
                        <p className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-[200px]">{fileName}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => onDelete(travelerId)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition cursor-pointer"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            {isUploading ? (
                <div className="flex flex-col items-center animate-pulse">
                    <UploadCloud className="w-10 h-10 text-primary mb-2" />
                    <p className="text-sm font-bold text-primary">Uploading secure document...</p>
                </div>
            ) : (
                <>
                    <UploadCloud className={`w-10 h-10 mx-auto mb-2 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
                    <p className="text-sm font-bold text-gray-700">Click to Upload Passport Copy</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                </>
            )}
        </div>
    );
};


const ItineraryMap = dynamic(() => import('../../../components/map/interactive_map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[300px] md:h-[500px] bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    )
});

// --- MAIN COMPONENT ---

const TripOverviewBooking = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // ...other state...

    // Only check localStorage on the client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAuthenticated(localStorage.getItem(STORAGE_KEY) === 'granted');
        }
    }, []);
    const [passwordInput, setPasswordInput] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // NEW STATE FOR PASSWORD TOGGLE

    const [mapState, setMapState] = useState({
        lat: -1.2921, // Default Nairobi
        lng: 36.8219,
        zoom: 10
    });

    // Callback function to update map
    const handleDayVisibility = (coords: { lat: number, lng: number }, zoom: number) => {
        setMapState((prev) => {
            // If the values are identical, return the OLD object. 
            // React sees the same object reference and skips the update entirely.
            if (prev.lat === coords.lat && prev.lng === coords.lng && prev.zoom === zoom) {
                return prev;
            }
            return { ...coords, zoom };
        });
    };

    // Booking Form State
    type BookingData = {
        email: string;
        mobile: string;
        roomPreference: string;
        mealPreference: string;
        mealPreferenceOther: string;
        medicalRestrictions: string;
        travelInsurance: string;
        emergencyName: string;
        emergencyContact: string;
        mailingAddress: string;
        additionalInfo: string;
        mobilityIssues: string[];
        allergies: string[]; // NEW
        allergyDetails: string; // NEW
    };

    const [bookingData, setBookingData] = useState<BookingData>({
        email: '',
        mobile: '',
        roomPreference: '',
        mealPreference: '',
        mealPreferenceOther: '',
        medicalRestrictions: '',
        travelInsurance: 'No',
        emergencyName: '',
        emergencyContact: '',
        mailingAddress: '',
        additionalInfo: '',
        mobilityIssues: [],
        allergies: [], // NEW
        allergyDetails: '', // NEW
    });

    const [travelers, setTravelers] = useState<PassportGuest[]>([
        { id: 1, prefix: 'Mr', lastName: '', firstName: '', middleName: '', gender: '', dob: '', nationality: '' }
    ]);

    const [expandedTravelerId, setExpandedTravelerId] = useState<number | null>(1);

    const tripData = useMemo(() => kenyaReunionAdventure, []);
    const { destination, title, overview, heroImage, facts, bookingSection } = tripData;
    const { itinerary } = bookingSection;

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAuthError('');
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (passwordInput.trim() === CORRECT_PASSWORD) {
                setIsAuthenticated(true);
                if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, 'granted');
            } else {
                setAuthError("Incorrect password.");
            }
        }, 800);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));
    };

    const handleTravelerChange = (id: number, field: keyof PassportGuest, value: string) => {
        setTravelers(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const handlePassportUpload = (id: number, file: File) => {
        setTravelers(prev => prev.map(t => t.id === id ? { ...t, passportFile: file, passportFileName: file.name } : t));
    };

    const handlePassportDelete = (id: number) => {
        setTravelers(prev => prev.map(t => t.id === id ? { ...t, passportFile: null, passportFileName: undefined } : t));
    };

    const toggleTraveler = (id: number) => setExpandedTravelerId(prev => (prev === id ? null : id));

    const handleMobilityChange = (issue: string) => {
        setBookingData(prev => {
            const issues = prev.mobilityIssues.includes(issue)
                ? prev.mobilityIssues.filter(i => i !== issue)
                : [...prev.mobilityIssues, issue];
            return { ...prev, mobilityIssues: issues };
        });
    };

    // NEW HANDLER FOR ALLERGIES
    const handleAllergyChange = (allergy: string) => {
        setBookingData(prev => {
            const allergies = prev.allergies.includes(allergy)
                ? prev.allergies.filter(a => a !== allergy)
                : [...prev.allergies, allergy];
            return { ...prev, allergies: allergies };
        });
    };

    const handleAddTraveler = () => {
        if (travelers.length < 5) {
            const newId = Date.now();
            setTravelers(prev => [...prev, { id: newId, prefix: '', lastName: '', firstName: '', middleName: '', gender: '', dob: '', nationality: '' }]);
            setExpandedTravelerId(newId);
        }
    };

    const handleRemoveTraveler = (id: number) => {
        setTravelers(prev => prev.filter(t => t.id !== id));
        if (expandedTravelerId === id) setExpandedTravelerId(null);
    };

    const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", { bookingData, travelers });
        alert("Registration Submitted Successfully!");
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
        { id: 'itinerary', label: 'Itinerary', icon: <MapPin className="w-4 h-4" /> },
        { id: 'map', label: 'Route Map', icon: <Globe className="w-4 h-4" /> },
        { id: 'register', label: 'Book Now', icon: <CheckCircle className="w-4 h-4" />, isPrimary: true },
    ];

    const factIcons: Record<string, React.ReactNode> = {
        currency: <DollarSign className="w-6 h-6" />,
        avgTemp: <CloudSun className="w-6 h-6" />,
        timezone: <Globe className="w-6 h-6" />,
        language: <MapPin className="w-6 h-6" />,
    };

    // Extract all coordinates and titles for the map line
    const mapRoute = useMemo(() => {
        return itinerary
            .filter(day => day.coordinates && day.coordinates.lat && day.coordinates.lng) // STRICT FILTER
            .map(day => ({
                lat: day.coordinates!.lat,
                lng: day.coordinates!.lng,
                title: day.title.split(":")[0]
            }));
    }, [itinerary]);

    // --- RENDER ---
    if (!isAuthenticated) {
        return (
            <main>
                <Navbar />
                <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl max-w-lg w-full text-center space-y-6 border-t-8 border-primary">
                        <Lock className="w-12 h-12 text-primary mx-auto" />
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Exclusive Access Required</h2>
                        <p className="text-gray-600 text-sm md:text-base">Enter the password to continue.</p>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Passphrase"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary text-center pr-10"
                                    autoFocus
                                    disabled={isLoading}
                                />
                                {/* SHOW PASSWORD TOGGLE */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer transition"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                            {authError && <div className="text-red-600 text-sm flex items-center justify-center"><AlertTriangle className='w-4 h-4 mr-2' /> {authError}</div>}
                            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Unlock'}</button>
                        </form>
                    </div>
                </div>
                <FooterSection />
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <div className="relative min-h-screen bg-[#F4EFE7] pb-20">

                {/* 1. HERO SECTION */}
                <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                    <KoursairImage src={heroImage} alt={title} width={100} height={50} className="w-full h-[450px] object-cover" sizes="100vw" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white max-w-5xl px-4 md:px-6">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2">{title}</h1>
                            <p className="text-lg md:text-xl lg:text-3xl font-light">{destination}</p>
                        </div>
                    </div>
                </section>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 -mt-12 relative z-10">

                    {/* 2. KEY FACTS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        <FactCard icon={factIcons['currency']} label="Currency" value={facts.currency.value} />
                        <FactCard icon={factIcons['avgTemp']} label="Avg Temp" value={facts.avgTemp.value} />
                        <FactCard icon={factIcons['timezone']} label="Focus" value="Luxury & Business" />
                        <FactCard icon={factIcons['language']} label="Language" value={facts.language.value} />
                    </div>


                </div>
                <div className="max-w-7xl mx-auto mt-12 space-y-12 md:space-y-15 px-4 md:px-6">
                    <div className="flex flex-wrap gap-2 md:gap-4 sticky top-[80px] z-30 py-4 px-0 bg-[#F4EFE7]">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className='px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-bold text-gray-700 bg-white cursor-pointer shadow-md border-1 border-transparent 
                                             hover:bg-[#1b3658] hover:text-white transition duration-300 transform hover:scale-[1.02] whitespace-nowrap'
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* OVERVIEW & HIGHLIGHTS */}
                    <div id="overview" className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 scroll-mt-16">
                        <div className="lg:col-span-3 space-y-6 md:space-y-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight border-b-4 border-primary pb-3">
                                Trip Overview
                            </h2>
                            <div className="text-gray-700 leading-relaxed text-base md:text-lg" dangerouslySetInnerHTML={{ __html: overview }} />

                            <div className="bg-[#F4EFE7]/50 p-6 md:p-8 rounded-2xl border border-primary mt-6">
                                <h3 className="font-bold text-lg md:text-xl mb-6 text-primary">What&apos;s Included</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {bookingSection.inclusions.map((inc, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                            <Check className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                                            <span className="leading-snug">{inc}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <h4 className="font-bold text-primary mb-2">Cost Exclusions (Not Included):</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {bookingSection.exclusions.map((inc, i) => (
                                            <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                                <X className="w-4 h-4 mt-0.4 text-primary flex-shrink-0" />
                                                <span className="leading-snug">{inc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
                                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">{kenyaReunionAdventure.highlightsBox.title}</h3>
                                <div className="space-y-4">
                                    {kenyaReunionAdventure.highlightsBox.points.map((point, idx) => (
                                        <div key={idx} className="flex gap-4 p-3 rounded-lg bg-gray-50">
                                            <div className="bg-primary p-2 rounded-full h-min">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{point.title}</h4>
                                                <p className="text-sm text-gray-600">{point.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid-cols-2 gap-2 h-100 rounded-2xl overflow-hidden shadow-lg hidden md:grid">
                                {/* Image 1: Safari */}
                                <div className="w-full h-[150px] relative">
                                    <KoursairImage
                                        src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main1.jpg"
                                        alt="Safari"
                                        fill
                                        className="object-cover hover:scale-110 transition duration-500"
                                    />
                                </div>

                                {/* Image 2: Lion */}
                                <div className="w-full h-[150px] relative">
                                    <KoursairImage
                                        src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main3.jpg"
                                        alt="Lion"
                                        fill
                                        className="object-cover hover:scale-110 transition duration-500"
                                    />
                                </div>

                                {/* Image 3: Mara (Spans 2 columns) */}
                                <div className="col-span-2 w-[462px] h-[257px]">
                                    <KoursairImage
                                        src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main2.jpg"
                                        alt="Mara"
                                        fill
                                        className="object-contain hover:scale-110 transition duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ITINERARY */}
                    <div id="itinerary" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 scroll-mt-32">
                        <div className="lg:col-span-1 space-y-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Detailed Itinerary</h2>
                            <div className="relative border-l-4 border-primary ml-2 md:ml-4">
                                {itinerary.map((day) => (
                                    <ItineraryItem
                                        key={day.day}
                                        day={day}
                                        onVisible={handleDayVisibility}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* MAP */}
                        <div id="map" className="lg:col-span-1 sticky top-[100px] h-min space-y-6 scroll-mt-32">
                            <h3 className="text-2xl font-bold text-primary border-b pb-2">Route Map</h3>
                            <div className="h-[300px] md:h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative z-0">
                                {/* Render the dynamic map */}
                                <ItineraryMap
                                    center={{ lat: mapState.lat, lng: mapState.lng }}
                                    zoom={mapState.zoom}
                                    route={mapRoute} // <--- PASS THE ROUTE HERE
                                />
                            </div>
                            <p className="text-sm text-gray-500 italic text-center">
                                Track your journey: Nairobi → Naivasha → Nakuru → Masai Mara.
                            </p>
                        </div>
                    </div>

                    {/* REGISTRATION FORM */}
                    <div className="bg-[#fffafa] rounded-3xl shadow-2xl border-t-8 border-primary overflow-hidden scroll-mt-32" id="register">
                        <div className="bg-primary-light p-6 md:p-8 text-center">
                            <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-2">Secure Your Spot</h2>
                            <p className="text-base md:text-lg text-gray-600">Final Cost: <span className="font-bold text-primary-dark">$7,500 USD</span> (All-inclusive per person)</p>
                        </div>

                        <form className="p-4 sm:p-8 md:p-12 space-y-8" onSubmit={handleBookingSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-primary flex items-center gap-2"><Mail className="w-5 h-5" /> Contact Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1">Email *</label>
                                            <input type="email" name="email" value={bookingData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-main)] outline-none" required />
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1">Mobile Number *</label>
                                            <input type="tel" name="mobile" value={bookingData.mobile} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-main)] outline-none" placeholder="+1 555..." required />
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1">Mailing Address *</label>
                                            <textarea name="mailingAddress" rows={3} value={bookingData.mailingAddress} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-primary flex items-center gap-2"><User className="w-5 h-5" /> Travel Preferences</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1">Room Preference *</label>
                                            <select name="roomPreference" value={bookingData.roomPreference} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" required>
                                                <option value="">Select Room Type...</option>
                                                <option value="Single">Single Occupancy</option>
                                                <option value="Double">Double Occupancy (Sharing)</option>
                                                <option value="Triple">Triple Occupancy</option>
                                                <option value="Family">Family Room (Max 5)</option>
                                            </select>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <span className="text-sm font-bold text-gray-700 block mb-2">Do you have Travel Insurance?</span>
                                            <div className="flex gap-6">
                                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="travelInsurance" value="Yes" onChange={handleChange} checked={bookingData.travelInsurance === 'Yes'} className="text-primary focus:ring-primary" /> Yes</label>
                                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="travelInsurance" value="No" onChange={handleChange} checked={bookingData.travelInsurance === 'No'} className="text-primary focus:ring-primary" /> No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Section 2: Traveler Details */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
                                    <div>
                                        <h4 className="text-2xl font-bold text-primary">Traveler Details</h4>
                                        <p className="text-sm text-primary italic mt-1">Please enter information exactly as it appears on your PASSPORT.</p>
                                    </div>
                                    <div className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                                        {travelers.length} Traveler(s) Added
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {travelers.map((t, index) => {
                                        const isExpanded = expandedTravelerId === t.id;
                                        return (
                                            <div key={t.id} className={`border rounded-xl transition-all duration-300 overflow-hidden ${isExpanded ? 'border-primary shadow-md bg-white' : 'border-gray-200 bg-gray-50'}`}>
                                                <div
                                                    className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                                                    onClick={() => toggleTraveler(t.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isExpanded ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
                                                            {index + 1}
                                                        </div>
                                                        <span className={`font-bold ${isExpanded ? 'text-gray-900' : 'text-gray-600'}`}>
                                                            {t.firstName ? `${t.firstName} ${t.lastName}` : (index === 0 ? "Primary Traveler" : `Traveler ${index + 1}`)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {index > 0 && (
                                                            <button type="button" onClick={(e) => { e.stopPropagation(); handleRemoveTraveler(t.id); }} className="p-1 hover:bg-red-100 rounded-full text-red-500 mr-2 cursor-pointer">
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                                    </div>
                                                </div>

                                                {isExpanded && (
                                                    <div className="p-6 pt-0 border-t border-gray-100 mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                                                        {/* Row 1: Name */}
                                                        <div className="md:col-span-1">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Prefix *</label>
                                                            <select value={t.prefix} onChange={(e) => handleTravelerChange(t.id, 'prefix', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none bg-white">
                                                                <option value="">Select</option>
                                                                <option value="Mr">Mr</option>
                                                                <option value="Ms">Ms</option>
                                                                <option value="Mrs">Mrs</option>
                                                                <option value="Dr">Dr</option>
                                                            </select>
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">First Name *</label>
                                                            <input type="text" value={t.firstName} onChange={(e) => handleTravelerChange(t.id, 'firstName', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none" required={index === 0} />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Middle Name</label>
                                                            <input type="text" value={t.middleName} onChange={(e) => handleTravelerChange(t.id, 'middleName', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none" />
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Last Name *</label>
                                                            <input type="text" value={t.lastName} onChange={(e) => handleTravelerChange(t.id, 'lastName', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none" required={index === 0} />
                                                        </div>

                                                        {/* Row 2: Details */}
                                                        <div className="md:col-span-1">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Gender *</label>
                                                            <select value={t.gender} onChange={(e) => handleTravelerChange(t.id, 'gender', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-[var(--color-primary-main)] outline-none" required={index === 0}>
                                                                <option value="">Select...</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className="md:col-span-1">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Date of Birth *</label>
                                                            <input
                                                                type="date"
                                                                value={t.dob}
                                                                onChange={(e) => handleTravelerChange(t.id, 'dob', e.target.value)}
                                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none"
                                                                required={index === 0}
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Nationality *</label>
                                                            <input type="text" value={t.nationality} onChange={(e) => handleTravelerChange(t.id, 'nationality', e.target.value)} placeholder="e.g. American" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none" required={index === 0} />
                                                        </div>

                                                        {/* Row 3: Passport Upload */}
                                                        <div className="md:col-span-4">
                                                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">Passport Copy (Front Page) *</label>
                                                            <PassportUploader
                                                                travelerId={t.id}
                                                                fileName={t.passportFileName}
                                                                onUpload={handlePassportUpload}
                                                                onDelete={handlePassportDelete}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {travelers.length < 5 && (
                                    <button type="button" onClick={handleAddTraveler} className="mt-4 py-3 px-6 border-2 border-dashed border-primary rounded-xl text-primary font-bold flex items-center gap-2 transition text-sm cursor-pointer">
                                        <Plus className="w-4 h-4" /> Add Another Traveler
                                    </button>
                                )}
                            </div>

                            <hr className="border-gray-200" />

                            {/* Section 3: Health & Emergency */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Heart className="w-5 h-5" /> Health & Dietary</h4>

                                    {/* DIETARY PREFERENCE */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="text-xs font-bold text-gray-500 mb-3 block uppercase">Dietary Preference<br />
                                            <span className="text-xs font-medium text-gray-600 normal-case">Which best describes your dietary lifestyle?</span></label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {["Vegan", "Gluten Free", "Keto/Low-Carb", "Vegetarian", "Pescatarian", "Non Veg", "Other"].map(opt => (
                                                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="radio" name="mealPreference" value={opt} checked={bookingData.mealPreference === opt} onChange={handleChange} className="text-primary focus:ring-[var(--color-primary)]" />
                                                    <span className="text-sm text-gray-700">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {bookingData.mealPreference === "Other" && (
                                            <input type="text" name="mealPreferenceOther" value={bookingData.mealPreferenceOther} onChange={handleChange} placeholder="Please specify..." className="w-full mt-2 p-2 border rounded text-xs" />
                                        )}
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="text-xs font-bold text-gray-500 mb-3 block uppercase">Mobility Issues</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {["Wheelchair", "Diff. Walking", "Special Room", "Other"].map(opt => (
                                                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="checkbox" value={opt} checked={bookingData.mobilityIssues.includes(opt)} onChange={() => handleMobilityChange(opt)} className="rounded text-primary" />
                                                    <span className="text-sm text-gray-700">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/* NEW: ALLERGIES SECTION */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                            Allergies & Intolerances
                                        </label>
                                        <p className="text-xs text-gray-600 font-medium mb-3">Please check any that apply, and specify details below (Important for Safety).</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                            {[
                                                "Peanuts/Tree Nuts",
                                                "Gluten/Wheat (Celiac)",
                                                "Dairy (Lactose)",
                                                "Shellfish",
                                                "Soy",
                                                "Other"
                                            ].map(opt => (
                                                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={opt}
                                                        checked={bookingData.allergies.includes(opt)}
                                                        onChange={() => handleAllergyChange(opt)}
                                                        className="rounded text-gray-500 focus:ring-gray-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <input
                                            type="text"
                                            name="allergyDetails"
                                            value={bookingData.allergyDetails}
                                            onChange={handleChange}
                                            placeholder="Please specify allergy details here..."
                                            className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-gray-400"
                                        />
                                    </div>


                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Emergency & Info</h4>

                                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 space-y-3">
                                        <label className="text-xs font-bold text-red-800 block uppercase">Emergency Contact (Non-Traveler)</label>
                                        <input type="text" name="emergencyName" placeholder="Contact Name *" value={bookingData.emergencyName} onChange={handleChange} className="w-full p-3 border border-red-200 rounded-lg text-sm focus:border-red-400 outline-none" required />
                                        <input type="tel" name="emergencyContact" placeholder="Contact Phone *" value={bookingData.emergencyContact} onChange={handleChange} className="w-full p-3 border border-red-200 rounded-lg text-sm focus:border-red-400 outline-none" required />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">General Medical Conditions</label>
                                        <input type="text" name="medicalRestrictions" value={bookingData.medicalRestrictions} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none" placeholder="Chronic conditions, diabetes, etc..." />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">Additional Info / Roommate Request</label>
                                        <textarea name="additionalInfo" rows={3} value={bookingData.additionalInfo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none resize-none" placeholder="Any preferences?" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 text-center">
                                {/* FIXED WIDTH FOR MOBILE */}
                                <button type="submit" className="w-full md:w-1/4 py-3 md:py-2 cursor-pointer bg-primary text-white font-extrabold text-lg rounded-2xl shadow-xl hover:opacity-90 transition transform hover:scale-[1.01]">
                                    SUBMIT REGISTRATION
                                </button>
                                <p className="text-sm text-gray-500 mt-4">
                                    *By clicking submit, you agree to the terms and conditions. A travel specialist will review your details and contact you for the final deposit.
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <FooterSection />
        </main>
    );
};

export default TripOverviewBooking;