"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/landing/Footer";
import KoursairImage from "@/components/Media/Images/KoursairImage";

export default function SingleNewsPage() {
  const { title } = useParams();
  const router = useRouter();

  const newsItems = [
    {
      id: 1,
      image: "/landing/news/bali_temple.jpg",
      date: "15",
      month: "Jan",
      author: "EMILY CHAN",
      publishDate: "January 10th 2025",
      title: "Exploring Bali’s Hidden Temples",
      slug: "exploring-balis-hidden-temples",
      category: "Bali",
      description:
        "Join our group tour to discover Bali’s lesser-known temples, tucked away in lush jungles and serene villages. Experience spiritual serenity and vibrant culture on this unforgettable journey.",
      content: `
## Discovering the Island of the Gods

Bali, often called the Island of the Gods, captivates with its vibrant culture, lush landscapes, and deep spiritual heritage. While iconic temples like Tanah Lot and Uluwatu attract thousands, our group tour ventures off the beaten path to uncover Bali’s hidden sanctuaries—temples nestled in jungles and serene villages that offer a profound connection to the island’s soul. This journey is designed for those seeking authenticity, blending spiritual exploration with cultural immersion.

## Pura Luhur Batukaru: A Jungle Sanctuary

Our adventure begins in the heart of Bali at Pura Luhur Batukaru, a sacred temple enveloped by dense rainforest. Far from the tourist crowds, this tranquil site offers a peaceful retreat where the sounds of nature harmonize with distant chants. Our expert guides share the temple’s history, from its 11th-century origins to its role in Balinese spirituality. You’ll learn about local rituals, participate in offerings, and experience guided meditation amidst misty paths, fostering a deep sense of calm and connection.

## Pura Gunung Raung: Views and Traditions

Next, we travel to the remote village of Tabanan to visit Pura Gunung Raung, a lesser-known gem with stunning views of rice terraces and volcanic landscapes. This temple is a hub of community life, where you’ll witness authentic Balinese ceremonies and meet locals who warmly welcome our small group. The intimate setting allows you to engage with the subak irrigation system, a UNESCO-recognized tradition, and understand the temple’s role in fostering harmony. The surrounding scenery provides perfect moments for reflection and photography.

## Pura Beji: Sacred Springs and Healing

Our journey continues to Pura Beji, hidden amidst rice fields and sacred springs dedicated to Dewi Sri, the goddess of rice. The temple’s intricate carvings and holy waters, believed to have healing properties, create a serene atmosphere. Participate in a purification ritual, guided by our team, to cleanse the soul and connect with Balinese beliefs. The cascading rice terraces around the temple offer breathtaking photo opportunities, blending spirituality with natural beauty.

## Pura Ulun Danu Batur: Volcanic Serenity

We then explore Pura Ulun Danu Batur, perched near Mount Batur with panoramic views of the volcano and lake. Unlike the more famous Ulun Danu Beratan, this temple is quieter, allowing an intimate experience of volcanic appeasement rituals. A short hike to nearby shrines reveals Bali’s animistic roots, blending Hindu and indigenous beliefs. The crisp mountain air and spiritual energy make this a highlight for adventurers and spiritual seekers alike.

## Immersive Experiences and Sustainability

Throughout the tour, stay in eco-lodges and boutique villas that reflect Balinese architecture, complemented by farm-to-table cuisine like babi guling and lawar. Evenings feature cultural performances or bonfire storytelling, fostering bonds among travelers. Sustainability is key—we partner with local communities to support economic growth and preserve heritage. Small group sizes and eco-friendly practices ensure minimal environmental impact, with guides teaching respectful temple etiquette.

## A Transformative Journey

This 7-day tour, starting at $1,500, includes transfers, meals, and entries. Optional yoga sessions, wildlife encounters with monkeys and birds, and dawn photography tours enhance the experience. Bali’s temples are living monuments, integral to daily life, and our tour contributes to their preservation through donations. Join us to uncover Bali’s hidden treasures, leaving with a renewed sense of peace and stories to share.
      `,
    },
    {
      id: 2,
      image: "/destination/dubai/dubai2.jpg",
      date: "22",
      month: "Feb",
      author: "AMIR KHAN",
      publishDate: "February 15th 2025",
      title: "Dune Adventures in Dubai",
      slug: "dune-adventures-in-dubai",
      category: "Dubai",
      description:
        "Embark on an exhilarating desert safari with our Dubai group tour. From dune bashing to stargazing, this trip offers the perfect blend of thrill and luxury.",
      content: `
## Thrills in the Arabian Sands

Dubai’s vast deserts are a playground for adventure seekers, and our Dune Adventures tour offers an unforgettable journey into the heart of the Arabian sands. Blending adrenaline-pumping activities with the serene beauty of the desert, this tour is perfect for those craving excitement and luxury. From dune bashing to cultural immersion, it’s a journey that captures the essence of Dubai’s desert landscape.

## Dune Bashing in Lahbab Desert

The adventure kicks off with dune bashing in the Lahbab Desert, known for its striking red sands. Our expert drivers navigate towering dunes in 4x4 vehicles, delivering heart-racing thrills as you crest peaks and slide down steep slopes. The vast desert stretches endlessly, offering a stunning backdrop. For those seeking more action, sandboarding sessions let you glide down dunes, with instructors ensuring safety and fun for all levels.

## Bedouin Camp: Culture and Cuisine

As the sun sets, we arrive at a luxurious Bedouin-style camp for a traditional dinner under the stars. Savor Arabic mezze, grilled meats, and sweets like luqaimat, with vegetarian options available. Cultural experiences include camel rides, henna painting, and falconry displays, bringing Bedouin heritage to life. The evening peaks with stargazing, where the clear desert sky reveals constellations like the Milky Way, guided by our astronomers.

## Glamping and Wildlife Encounters

Accommodations range from glamping tents with king beds to luxury resorts like Al Maha, blending tradition with modern comforts. Wake to sunrise yoga or opt for a hot air balloon ride for aerial dune views. Wildlife spotting adds wonder—see Arabian oryx, gazelles, and camels in the Dubai Desert Conservation Reserve, where we learn about efforts to protect this fragile ecosystem.

## Cultural Immersion and Sustainability

Immerse in Bedouin culture through storytelling sessions around the fire, learning about nomadic life and navigation by stars. Sustainability is a priority; we use eco-friendly vehicles, minimize waste, and support local communities through fair wages. A visit to a camel farm offers insights into their role in Emirati culture, with milk tasting and race demonstrations.

## Optional Adventures and Photography

For thrill-seekers, optional quad biking or fat tire biking ramps up the adrenaline, with safety briefings ensuring a secure experience. Photography enthusiasts can capture the desert’s changing light, from orange dawn hues to deep dusk shadows, with tips from our guides. The 3-day tour, starting at $800, includes all activities, meals, and transfers, with extensions for city sights like Burj Khalifa.

## A Journey of Contrast

This tour is more than adventure—it’s an immersion into a world of contrast, blending thrill with tranquility. Participants often leave with a deeper appreciation for nature’s extremes and lifelong memories. Book now to experience Dubai’s dunes, where every moment is etched in golden sands.
      `,
    },
    {
      id: 3,
      image: "/landing/news/news4.jpg",
      date: "10",
      month: "Mar",
      author: "SARAH LIN",
      publishDate: "March 5th 2025",
      title: "Island Hopping in Thailand",
      slug: "island-hopping-in-thailand",
      category: "Thailand",
      description:
        "Dive into Thailand’s turquoise waters with our group island-hopping adventure. Explore Phuket, Krabi, and Koh Phi Phi, with vibrant coral reefs and stunning beaches awaiting.",
      content: `
## Paradise in the Andaman Sea

Thailand’s Andaman Sea is a tropical paradise of turquoise waters, limestone cliffs, and pristine beaches. Our island-hopping group tour explores Phuket, Krabi, and Koh Phi Phi, offering an unforgettable adventure through some of the world’s most stunning coastal landscapes. Perfect for beach lovers and adventure seekers, this journey blends exploration with relaxation.

## Phuket: Lagoons and Nightlife

We begin in Phuket, diving into hidden lagoons and vibrant coral reefs ideal for snorkeling and diving. Private boat tours grant access to secluded beaches, far from crowds, with crystal-clear waters teeming with marine life. Explore Phuket’s Old Town for Sino-Portuguese architecture and street food, or visit Big Buddha for panoramic views. A Thai cooking class teaches you to make pad Thai and tom yum, adding a culinary twist.

## Krabi: Cliffs and Kayaks

In Krabi, kayak through mangrove forests and visit Railay Beach, framed by towering cliffs and emerald waves. Rock climbing on limestone peaks offers thrills for all levels, with stunning vistas as rewards. Ao Nang’s night markets buzz with energy, offering fresh seafood and souvenirs. Our guides share insights into Krabi’s coastal culture, from fishing traditions to local festivals.

## Koh Phi Phi: Tropical Bliss

The highlight is Koh Phi Phi, a gem with breathtaking viewpoints and lively marine life. Swim in Maya Bay, famed from *The Beach*, and enjoy sunset cocktails with fellow travelers. Snorkel with turtles and colorful fish in protected marine areas. Koh Phi Phi Don’s nightlife contrasts with Leh’s serene beaches, catering to varied tastes. Small group sizes ensure personalized experiences.

## Sustainability and Culture

Sustainability is central—we partner with eco-projects, avoid single-use plastics, and support coral restoration. Guides teach responsible tourism, like not touching marine life. Accommodations range from beach bungalows to luxury resorts, all with sea views. Meals feature spicy curries and fresh fruits, with dietary options available.

## Optional Activities and Logistics

Optional Thai massage or muay Thai lessons add local flavor, while sunrise yoga promotes relaxation. The 10-day itinerary, from $1,200, covers boats, transfers, and most meals. Best from November to April, we monitor weather for safety. Cultural etiquette, like modest dress at temples, enhances local interactions.

## A Tropical Adventure

This tour balances adventure, culture, and relaxation, creating bonds among travelers. Book now to explore Thailand’s islands, where turquoise waters and vibrant culture await.
      `,
    },
    {
      id: 4,
      image: "/landing/news/bali_culinary.jpg",
      date: "18",
      month: "Apr",
      author: "JAMES PARK",
      publishDate: "April 12th 2025",
      title: "Bali’s Culinary Journey",
      slug: "balis-culinary-journey",
      category: "Bali",
      description:
        "Savor the flavors of Bali on our group food tour. From street-side warungs to fine dining, experience the island’s rich culinary heritage with fellow travel enthusiasts.",
      content: `
## A Feast for the Senses

Bali’s culinary scene is as vibrant as its culture, and our group food tour invites you to savor the island’s flavors in an unforgettable journey. From bustling street markets to elegant dining, this tour is a feast for food lovers and cultural explorers, blending traditional dishes with modern twists.

## Ubud: The Culinary Heart

We start in Ubud, Bali’s cultural hub, visiting warungs for authentic *nasi goreng* and *sate lilit*. A market tour teaches you about exotic ingredients like salak and galangal, followed by a cooking class with local chefs. Learn to balance sweet, sour, spicy, and salty flavors, crafting dishes like bebek betutu. The experience immerses you in Bali’s culinary heritage.

## Jimbaran: Seafood by the Sea

In Jimbaran, enjoy a beachside seafood feast with freshly grilled fish and sambal under the stars. The open-air setting, with waves lapping nearby, creates a magical ambiance. Meet local fishermen and learn about sustainable seafood practices, deepening your connection to Bali’s coastal culture.

## Seminyak: Fusion and Elegance

Seminyak’s upscale dining scene offers fusion dishes, blending Balinese flavors with global influences. Taste innovative creations like duck betutu with truffle or coconut-based desserts. A visit to a cacao farm teaches chocolate-making, from bean to bar, with tastings of spice-infused chocolates.

## Lovina and Beyond

In Lovina, savor seafood barbecues on black sand beaches, paired with dolphin-watching excursions. Sidemen’s farm-to-table dinners, set against Mount Agung, highlight organic ingredients. Wine pairings with arak or craft beers add variety, with vegetarian and vegan options aplenty.

## Sustainability and Community

Sourcing from organic farms supports smallholders and reduces environmental impact. The 8-day tour, from $1,000, includes meals, classes, and transport. Evening cultural performances and brewery tours enhance the experience, fostering group connections.

## A Delicious Adventure

Join us to taste Bali’s culinary heritage, from warungs to gourmet dining. This tour nourishes body and soul, leaving you with recipes and memories to cherish.
      `,
    },
  ];

  // Find the news item by matching the slug
  const newsItem = newsItems.find((item) => item.slug === title);

  // Handle case where news item is not found
  if (!newsItem) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-12 md:px-16 lg:px-24 xl:px-28">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              News Not Found
            </h2>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base mb-8">
              Sorry, the news article you’re looking for doesn’t exist.
            </p>
            <div className="text-right">
              <Link href="/news-insights">
                <button className="px-6 sm:px-8 py-2 sm:py-3 bg-primary text-white font-semibold cursor-pointer rounded-full hover:bg-[#a0927e] transition-colors duration-300">
                  Back to News & Insights
                </button>
              </Link>
            </div>
          </div>
        </section>
        <FooterSection />
      </div>
    );
  }

  // Filter recent posts: all other posts excluding the current one
  const recentPosts = newsItems.filter((item) => item.id !== newsItem.id);

  const handleRecentClick = (slug:string) => {
    router.push(`/news-insights/${slug}`);
  };

  return (
    <div className="w-full">
      <Navbar />
      {/* Hero Section */}
      <section>
        <div 
                      className="relative py-12 pt-16 sm:py-16 md:py-20 h-80 sm:h-85 md:h-94 flex items-center justify-center overflow-hidden"
                    >
                      {/* Hero Image */}
                      <div className="absolute inset-0">
                        <KoursairImage src={newsItem.image} alt={newsItem.title} fill className="object-cover" loading="eager" fetchPriority="high" sizes="100vw" />
                      </div>
                      {/* Dark Overlay (Replaces linear-gradient) */}
                      <div className="absolute inset-0 bg-black/50 z-10" />
              
                      <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl relative z-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-alegreya font-bold mb-4 sm:mb-6 tracking-wide">
            {newsItem.title}
          </h1>
        </div>
        </div>
      </section>

      {/* News Content Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* News Meta */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center text-sm sm:text-base text-gray-500 mb-4">
                <span className="uppercase font-medium tracking-wide">{newsItem.author}</span>
                <span className="mx-2">-</span>
                <span>{newsItem.publishDate}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-primary font-medium">{newsItem.category}</span>
              </div>
              <div className="relative inline-block mb-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
                  {newsItem.title}
                </h2>
                <div className="w-[100px] sm:w-[110px] md:w-[120px] h-[2px] bg-[#e1e1e1]">
                  <div className="w-[50px] sm:w-[55px] md:w-[60px] h-[2px] bg-primary"></div>
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-sm md:text-base max-w-md sm:max-w-lg md:max-w-2xl">
                {newsItem.description}
              </p>
            </div>

            {/* News Content */}
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700 mb-10">
              {newsItem.content.split("\n").map((paragraph, index) => (
                <div key={index}>
                  {paragraph.startsWith("## ") ? (
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold primary mt-8 mb-4">
                      {paragraph.replace("## ", "").trim()}
                    </h2>
                  ) : (
                    paragraph.trim() && (
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Back to News Button */}
            <div className="mt-10 sm:mt-12 text-left lg:text-right">
              <Link href="/news-insights">
                <button className="px-6 sm:px-8 py-2 sm:py-3 bg-primary text-white font-semibold rounded-full cursor-pointer hover:bg-[#a0927e] transition-colors duration-300">
                  Back to News & Insights
                </button>
              </Link>
            </div>
          </div>

          {/* Sidebar - Recent Posts */}
          <aside className="lg:col-span-2 bg-[#f9f9f9] p-6 rounded-lg shadow-md sticky top-20 h-fit w-[370px]">
            <h3 className="text-lg font-semibold primary mb-4">
              Recent Stories
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Check out our latest travel insights and adventures
            </p>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-3 cursor-pointer group"
                  onClick={() => handleRecentClick(post.slug)}
                >
                  <div className="relative w-full h-[150px] overflow-hidden rounded-md">
                    <KoursairImage src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h4 className="text-base font-bold text-gray-800 group-hover:primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {post.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}