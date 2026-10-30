/**
 * POLARIS — Premium Travel Discovery and Itinerary Planning Platform
 * Brand Tagline: "Find your next somewhere."
 * 
 * Comprehensive Destination Catalogue & Curated Editorial Collections
 */

const POLARIS_DESTINATIONS = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    description: 'Ancient bamboo groves, moss-carpeted zen gardens, and timeless wooden tea houses along misty mountain ridges.',
    overview: 'Kyoto stands as the eternal heart of Japanese cultural heritage. With over a thousand Buddhist temples, centuries-old shrines, and preserved geisha districts like Gion, the ancient imperial capital invites slow contemplative wandering. From morning reflections at Kinkaku-ji to private evening ceremonies in Gion, Kyoto balances meditative tranquility with sublime gastronomic mastery.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/kyoto.svg',
    travelStyles: ['Culture', 'Relaxation', 'Food and Cuisine'],
    duration: '5 - 7 Days',
    bestSeason: 'March – May & October – November',
    dailyBudget: 185,
    currency: 'USD',
    highlights: [
      'Fushimi Inari Shrine Vermillion Torii',
      'Arashiyama Sagano Bamboo Grove',
      'Kinkaku-ji (The Golden Pavilion)',
      'Gion Historic Tea & Geisha District',
      'Daitoku-ji Zen Meditation Gardens'
    ],
    suggestedActivities: [
      {
        name: 'Private Tea Ceremony with a Urasenke Master',
        day: 1,
        time: '10:00 AM',
        category: 'Culture',
        cost: 65,
        description: 'Immerse yourself in traditional ritual and matcha preparation inside an authentic 18th-century machiya.'
      },
      {
        name: 'Early Morning Dawn Walk at Fushimi Inari',
        day: 2,
        time: '06:30 AM',
        category: 'Sightseeing',
        cost: 15,
        description: 'Ascend the mountain path through thousands of vermilion gates before morning crowds arrive.'
      },
      {
        name: 'Michelin Kaiseki Dining along the Kamo River',
        day: 2,
        time: '07:30 PM',
        category: 'Dining',
        cost: 140,
        description: 'Multi-course seasonal Japanese haute cuisine showcasing Kyoto heirloom vegetables and fresh sashimi.'
      },
      {
        name: 'Philosopher’s Path Stroll & Zen Garden Meditation',
        day: 3,
        time: '02:00 PM',
        category: 'Leisure',
        cost: 30,
        description: 'A serene canalside walk lined with cherry trees and ancient stone temples.'
      }
    ],
    travelTips: [
      'Reserve traditional Ryokan accommodations at least 4 to 6 months in advance for autumn and spring peaks.',
      'Purchase an ICOCA card for seamless navigation of local buses, subways, and regional trains.',
      'Begin major temple excursions at dawn (around 06:30 - 07:00 AM) to experience pure stillness.'
    ],
    coordinates: { x: 877, y: 153 }
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    continent: 'Europe',
    description: 'Dramatic snow-capped limestone peaks, crystal alpine tarns, and ultra-luxury mountain chalets.',
    overview: 'The Swiss Alps redefine high-altitude elegance. Whether gazing at the iconic pyramid silhouette of the Matterhorn in Zermatt, boarding the panoramic Glacier Express across breathtaking viaducts, or skiing legendary off-piste trails in Verbier, this region represents the gold standard of mountain sanctuary and refined alpine hospitality.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/swiss-alps.svg',
    travelStyles: ['Nature', 'Adventure', 'Luxury'],
    duration: '7 - 10 Days',
    bestSeason: 'December – March (Ski) & July – September (Hiking)',
    dailyBudget: 340,
    currency: 'USD',
    highlights: [
      'Matterhorn Glacier Paradise & Zermatt Village',
      'Glacier Express Panoramic Alpine Railway',
      'Lauterbrunnen Valley of 72 Waterfalls',
      'St. Moritz Luxury Mountain Promenade',
      'Lake Oeschinen Alpine Rowboating'
    ],
    suggestedActivities: [
      {
        name: 'First Cliff Walk & Grindelwald Panorama',
        day: 1,
        time: '11:00 AM',
        category: 'Adventure',
        cost: 45,
        description: 'Suspended metal walkway clinging to vertical cliffs overlooking the Eiger North Face.'
      },
      {
        name: 'Thermal Bath & Alpine Wellness in Bad Ragaz',
        day: 2,
        time: '03:00 PM',
        category: 'Leisure',
        cost: 110,
        description: 'Healing thermal water fed from the mystical Tamina Gorge amidst alpine panoramas.'
      },
      {
        name: 'Private Heli-Scenic Tour over Aletsch Glacier',
        day: 3,
        time: '10:00 AM',
        category: 'Adventure',
        cost: 290,
        description: 'Breathtaking aerial flight over the largest glacier in the European Alps.'
      },
      {
        name: 'Swiss Fondue & Vintage Wine Tasting in Zermatt',
        day: 3,
        time: '07:30 PM',
        category: 'Dining',
        cost: 95,
        description: 'Authentic Gruyère and Vacherin fondue paired with crisp Valais white wines.'
      }
    ],
    travelTips: [
      'Invest in a Swiss Travel Pass for limitless trains, mountain steamers, and city transit.',
      'Pack high-performance layers regardless of season—alpine weather shifts in minutes.',
      'Tap water throughout Switzerland is pristine glacier spring water; carry a reusable flask.'
    ],
    coordinates: { x: 524, y: 121 }
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    description: 'Emerald jungle canopies, cascading rice terraces, sacred ocean temples, and holistic wellness retreats.',
    overview: 'Known as the Island of the Gods, Bali is a tapestry of spiritual vibrancy, artistic excellence, and tropical luxury. From the tranquil artisan sanctuaries of Ubud hidden within dense river valleys to the dramatic cliffside sunsets of Uluwatu, Bali captivates with warm hospitality, holistic spa rituals, and world-class culinary innovation.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/bali.svg',
    travelStyles: ['Relaxation', 'Culture', 'Nature'],
    duration: '7 - 14 Days',
    bestSeason: 'May – September',
    dailyBudget: 115,
    currency: 'USD',
    highlights: [
      'Tegallalang Emerald Rice Terraces',
      'Uluwatu Sunset Sea Temple & Kecak Dance',
      'Sacred Monkey Forest Sanctuary Ubud',
      'Nusa Penida Kelingking T-Rex Coastal Cliffs',
      'Tirta Empul Sacred Water Purification'
    ],
    suggestedActivities: [
      {
        name: 'Traditional Melukat Water Cleansing Ceremony',
        day: 1,
        time: '09:00 AM',
        category: 'Culture',
        cost: 40,
        description: 'A deeply moving Balinese spiritual cleansing led by a local priest at Sebatu holy springs.'
      },
      {
        name: 'Organic Farm-to-Table Feast in Ubud',
        day: 2,
        time: '01:00 PM',
        category: 'Dining',
        cost: 50,
        description: 'Multi-course lunch harvested straight from permaculture gardens overlooking the Ayung river.'
      },
      {
        name: 'Sunset Catamaran Cruise around Nusa Lembongan',
        day: 3,
        time: '04:30 PM',
        category: 'Leisure',
        cost: 85,
        description: 'Sail the azure waters with fresh tropical fruit cocktails as the sun dips below Mount Agung.'
      },
      {
        name: 'Ayurvedic Herbal Compress Massage',
        day: 4,
        time: '03:00 PM',
        category: 'Leisure',
        cost: 60,
        description: 'Deep restorative 90-minute body treatment utilizing warm healing ginger and clove compresses.'
      }
    ],
    travelTips: [
      'Dress respectfully with shoulders and knees covered when entering sacred temples (sarongs provided at entry).',
      'Hire a reputable private driver for day excursions across Ubud, Sidemen, and Northern waterfalls.',
      'The dry season between May and September brings gentle breezes and minimal tropical rainfall.'
    ],
    coordinates: { x: 820, y: 273 }
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    description: 'Iconic whitewashed caldera villages, cobalt blue domes, volcanic cliffs, and legendary Aegean sunsets.',
    overview: 'Forged from one of the most powerful volcanic eruptions in recorded history, Santorini rises precipitously from the sapphire Aegean Sea. The cliff-clinging towns of Oia and Imerovigli boast world-renowned infinity pools, cave suites, family-run wine estates producing crisp Assyrtiko, and open-air seaside tavernas that epitomize Greek island romance.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/santorini.svg',
    travelStyles: ['Luxury', 'Relaxation', 'Food and Cuisine'],
    duration: '4 - 6 Days',
    bestSeason: 'May – June & September – October',
    dailyBudget: 270,
    currency: 'USD',
    highlights: [
      'Oia Iconic Windmills & Golden Hour Sunsets',
      'Fira to Oia Dramatic Caldera Trail',
      'Akrotiri Minoan Bronze Age Excavations',
      'Red Beach & White Beach Volcanic Sands',
      'Sunken Caldera Private Yacht Excursion'
    ],
    suggestedActivities: [
      {
        name: 'Private Lagoon 42 Catamaran Sunset Cruise',
        day: 1,
        time: '03:00 PM',
        category: 'Luxury',
        cost: 160,
        description: 'Sail into the sunken volcanic caldera, swim in warm sulphur springs, and enjoy freshly grilled seafood.'
      },
      {
        name: 'Assyrtiko Wine Tasting at Santo Wines',
        day: 2,
        time: '05:30 PM',
        category: 'Dining',
        cost: 75,
        description: 'Sample mineral-rich volcanic wines perched 300 meters above the Aegean.'
      },
      {
        name: 'Guided Walking Tour of Historic Akrotiri',
        day: 3,
        time: '10:00 AM',
        category: 'Culture',
        cost: 50,
        description: 'Explore the "Greek Pompeii", a sophisticated prehistoric civilization preserved under volcanic ash.'
      }
    ],
    travelTips: [
      'Visit Oia during early morning to capture uncrowded photos before cruise ship day-trippers arrive.',
      'Wear sturdy walking shoes with grip; the cobblestone stairs and caldera pathways are slick marble.',
      'Book caldera-facing cave hotels well in advance for uninterrupted sunset vistas.'
    ],
    coordinates: { x: 570, y: 149 }
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    continent: 'Europe',
    description: 'A mystical realm of dancing auroras, roaring waterfalls, black volcanic beaches, and ancient glaciers.',
    overview: 'Iceland is an otherworldly sanctuary where elemental extremes collide. Known as the Land of Fire and Ice, its dramatic terrain features steaming geothermal geysers, towering basalt sea stacks, massive ice caps like Vatnajökull, and crystalline natural hot springs. It represents the quintessential frontier for mindful explorers seeking untamed wilderness.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/iceland.svg',
    travelStyles: ['Adventure', 'Nature'],
    duration: '8 - 12 Days',
    bestSeason: 'June – August (Midnight Sun) & September – March (Auroras)',
    dailyBudget: 250,
    currency: 'USD',
    highlights: [
      'Jökulsárlón Glacial Lagoon & Diamond Beach',
      'Reynisfjara Jet-Black Basalt Beach',
      'Skógafoss & Seljalandsfoss Cascades',
      'Thingvellir National Park Tectonic Rift',
      'Blue Lagoon & Sky Lagoon Geothermal Spas'
    ],
    suggestedActivities: [
      {
        name: 'Vatnajökull Blue Ice Cave Expedition',
        day: 1,
        time: '09:00 AM',
        category: 'Adventure',
        cost: 175,
        description: 'Venture into naturally sculpted sapphire-crystal subterranean ice caverns with crampons and helmet.'
      },
      {
        name: 'Sky Lagoon 7-Step Geothermal Ritual',
        day: 2,
        time: '04:00 PM',
        category: 'Leisure',
        cost: 95,
        description: 'Oceanfront thermal soak, cold plunge, body scrub, and sauna overlooking the stormy North Atlantic.'
      },
      {
        name: 'Private Superjeep Aurora Borealis Hunt',
        day: 2,
        time: '09:30 PM',
        category: 'Sightseeing',
        cost: 140,
        description: 'Head deep into dark hinterlands away from light pollution guided by real-time satellite solar data.'
      },
      {
        name: 'Silfra Fissure Snorkeling between Tectonic Plates',
        day: 3,
        time: '11:00 AM',
        category: 'Adventure',
        cost: 150,
        description: 'Drysuit swim in glacial waters with over 100 meters of crystalline underwater visibility.'
      }
    ],
    travelTips: [
      'Renting a 4x4 vehicle is essential if traversing gravel F-roads or winter mountain passes.',
      'Check Vedur.is and SafeTravel.is daily for real-time weather alerts and wind warnings.',
      'Tap water in Iceland is pure spring water with zero filtration needed; avoid buying bottled water.'
    ],
    coordinates: { x: 448, y: 70 }
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    country: 'Türkiye',
    continent: 'Europe',
    description: 'Fairy chimney valleys, subterranean ancient cities, and sunrise skies filled with hundreds of hot air balloons.',
    overview: 'Cappadocia is an extraordinary geological wonder shaped by million-year volcanic deposits and carved by human resilience. Early Christian monks chiseled monasteries and frescoes directly into soft tufa rock. Today, travelers sleep in converted luxury cave mansions in Göreme and Üçhisar and awaken before dawn to drift silently over surreal honeycombed gorges.',
    image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/cappadocia.svg',
    travelStyles: ['Culture', 'Adventure', 'Luxury'],
    duration: '3 - 5 Days',
    bestSeason: 'April – June & September – October',
    dailyBudget: 155,
    currency: 'USD',
    highlights: [
      'Sunrise Hot Air Balloon Flight over Rose Valley',
      'Göreme Open Air Museum Byzantine Frescoes',
      'Derinkuyu 8-Level Underground Fortress City',
      'Uchisar Castle Rock Citadel Panoramic View',
      'Pasabag (Monks Valley) Twin Fairy Chimneys'
    ],
    suggestedActivities: [
      {
        name: 'Royal Hot Air Balloon Flight at Sunrise',
        day: 1,
        time: '05:30 AM',
        category: 'Adventure',
        cost: 210,
        description: 'Float at 2,000 feet as morning gold light sweeps across surreal tufa formations and cave dwellings.'
      },
      {
        name: 'Subterranean Exploration of Kaymakli City',
        day: 2,
        time: '11:00 AM',
        category: 'Culture',
        cost: 35,
        description: 'Descend through narrow rock-hewn passages, ancient wine presses, ventilation shafts, and chapels.'
      },
      {
        name: 'Traditional Pottery Masterclass in Avanos',
        day: 2,
        time: '03:00 PM',
        category: 'Culture',
        cost: 45,
        description: 'Throw Red River clay under the guidance of 5th-generation master artisans.'
      },
      {
        name: 'Sunset Horseback Trail across Red Valley',
        day: 3,
        time: '05:00 PM',
        category: 'Adventure',
        cost: 65,
        description: 'Ride native Anatolian horses through orchard pathways and secluded rock sanctuaries.'
      }
    ],
    travelTips: [
      'Balloon flights are strictly wind-dependent; book your flight for your first morning so you have backup days.',
      'Cave suites offer natural climate control, remaining refreshingly cool in summer and warm in winter.',
      'Comfortable hiking footwear with grip is indispensable for walking through loose sandstone trails.'
    ],
    coordinates: { x: 597, y: 143 }
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    country: 'India',
    continent: 'Asia',
    description: 'High-altitude Himalayan desert, ancient Tibetan monasteries, azure alpine lakes, and dramatic mountain passes.',
    overview: 'Often referred to as "The Land of High Passes" or "Little Tibet", Ladakh sits nestled between the Karakoram and Great Himalaya ranges. Perched at elevations exceeding 3,500 meters, this remote desert sanctuary captivates with cliff-hanging monasteries like Thiksey and Hemis, the shifting turquoise waters of Pangong Tso, and deep Buddhist serenity.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/ladakh.svg',
    travelStyles: ['Adventure', 'Nature', 'Culture'],
    duration: '7 - 10 Days',
    bestSeason: 'June – September',
    dailyBudget: 85,
    currency: 'USD',
    highlights: [
      'Pangong Tso High-Altitude Saltwater Lake',
      'Thiksey Monastery Sunrise Prayers',
      'Nubra Valley Sand Dunes & Bactrian Camels',
      'Khardung La Pass (5,359 meters above sea level)',
      'Leh Palace & Ancient Old Town Bazaar'
    ],
    suggestedActivities: [
      {
        name: 'Dawn Meditation with Monks at Thiksey Monastery',
        day: 1,
        time: '06:00 AM',
        category: 'Culture',
        cost: 20,
        description: 'Listen to the resonance of deep Tibetan horn blasts and rhythmic chanting in the golden morning mist.'
      },
      {
        name: 'Scenic Drive across Khardung La Pass',
        day: 2,
        time: '08:30 AM',
        category: 'Adventure',
        cost: 60,
        description: 'Cross one of the highest motorable mountain passes in the world with snow-clad panoramas.'
      },
      {
        name: 'Stargazing Camp beside Pangong Tso',
        day: 3,
        time: '09:00 PM',
        category: 'Leisure',
        cost: 75,
        description: 'Sleep in luxury glamping domes beneath an unpolluted Milky Way at 4,350 meters altitude.'
      }
    ],
    travelTips: [
      'Dedicate the first full 48 hours in Leh strictly to rest and acclimatization to prevent acute mountain sickness (AMS).',
      'Inner Line Permits (ILP) are mandatory for visiting Nubra Valley, Pangong Lake, and Tso Moriri.',
      'Carry cash as digital connectivity and ATMs become sporadic outside of Leh town.'
    ],
    coordinates: { x: 715, y: 155 }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    continent: 'Asia',
    description: 'Tranquil palm-fringed backwaters, misty emerald tea estates, spice plantations, and Ayurvedic healing sanctuaries.',
    overview: 'Christened "God’s Own Country", Kerala is an idyllic tropical sanctuary nestled along India’s southwestern Malabar coast. Glide aboard handcrafted wooden kettuvallam houseboats along peaceful lagoons, wake up to fragrant cardamom-scented breezes in the high tea hills of Munnar, and experience authentic thousand-year-old holistic Ayurvedic healing rituals.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/kerala.svg',
    travelStyles: ['Relaxation', 'Nature', 'Food and Cuisine', 'Culture'],
    duration: '6 - 9 Days',
    bestSeason: 'October – March',
    dailyBudget: 80,
    currency: 'USD',
    highlights: [
      'Alleppey Luxury Houseboat Cruise',
      'Munnar Rolling Emerald Tea Estates',
      'Fort Kochi Colonial Heritage & Chinese Fishing Nets',
      'Periyar Wildlife Reserve Spice Plantations',
      'Traditional Kathakali Dance Theatre'
    ],
    suggestedActivities: [
      {
        name: 'Overnight Private Luxury Houseboat Cruise in Alleppey',
        day: 1,
        time: '12:00 PM',
        category: 'Leisure',
        cost: 130,
        description: 'Meander serene canals with a private onboard chef serving fresh Karimeen fish curry on banana leaves.'
      },
      {
        name: 'Private Tea Tasting & Heritage Walk in Munnar',
        day: 2,
        time: '10:00 AM',
        category: 'Culture',
        cost: 25,
        description: 'Walk through 100-year-old tea bushes and discover artisan leaf processing in high-altitude plantations.'
      },
      {
        name: 'Authentic Abhyanga & Shirodhara Ayurvedic Session',
        day: 3,
        time: '04:00 PM',
        category: 'Leisure',
        cost: 65,
        description: 'Ancient dual-therapist herbal oil massage followed by rhythmic warm oil streaming over the forehead.'
      }
    ],
    travelTips: [
      'Choose eco-certified solar houseboats to preserve the fragile backwater ecosystem.',
      'Savor traditional Sadhya—a 24-dish vegetarian feast served on a fresh plantain leaf.',
      'Munnar evenings are cool year-round; carry a light wool cardigan or pashmina shawl.'
    ],
    coordinates: { x: 712, y: 222 }
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    description: 'Pastel-hued cliffside villas, fragrant lemon groves, azure Mediterranean waters, and glamorous Italian lifestyle.',
    overview: 'A vertical dreamscape where craggy limestone cliffs plunge directly into the Tyrrhenian Sea, the Amalfi Coast has captured artists and aristocrats for centuries. From Positano’s chic boutique-lined staircases to Ravello’s classical cliffside concert gardens and Amalfi’s 9th-century Arab-Norman cathedral, this coast represents the pinnacle of Mediterranean romance and luxury.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/amalfi.svg',
    travelStyles: ['Luxury', 'Food and Cuisine', 'Relaxation'],
    duration: '5 - 7 Days',
    bestSeason: 'May – June & September – October',
    dailyBudget: 310,
    currency: 'USD',
    highlights: [
      'Positano Cliffside Cascades & Spiaggia Grande',
      'Path of the Gods (Sentiero degli Dei) Cliff Hike',
      'Ravello Villa Cimbrone Infinity Terrace',
      'Amalfi Duomo di Sant’Andrea Cathedral',
      'Capri Island Blue Grotto Private Wooden Boat Tour'
    ],
    suggestedActivities: [
      {
        name: 'Private Riva Boat Charter along the Coastline',
        day: 1,
        time: '10:00 AM',
        category: 'Luxury',
        cost: 250,
        description: 'Glide past secluded sea caves, Fiordo di Furore, and anchor in crystalline hidden coves for swimming.'
      },
      {
        name: 'Lemon Grove Walk & Limoncello Tasting in Amalfi',
        day: 2,
        time: '03:00 PM',
        category: 'Dining',
        cost: 55,
        description: 'Learn the secrets of organic Sfusato Amalfitano lemons on terraced hillside orchards.'
      },
      {
        name: 'Cliffside Sunset Aperitivo at Franco’s Bar Positano',
        day: 2,
        time: '06:30 PM',
        category: 'Dining',
        cost: 70,
        description: 'Handcrafted Campari cocktails and local olives overlooking the glowing pastel evening facades.'
      }
    ],
    travelTips: [
      'Take ferry connections rather than buses between towns to bypass cliffside coastal traffic jams.',
      'Pack lightweight, breathable linen clothing and comfortable espadrilles for thousands of cliff stairs.',
      'High season in July and August sees immense crowding; May and September offer perfection.'
    ],
    coordinates: { x: 540, y: 137 }
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    description: 'Alpine fjords, crystal glacial lakes, adrenaline pursuits, and world-class Central Otago Pinot Noir estates.',
    overview: 'Cradled against the rugged Remarkables mountain range along the shores of Lake Wakatipu, Queenstown is celebrated globally as the adventure capital of the southern hemisphere. Yet beyond skydiving and bungee jumping, it is equally a realm of refined serenity: secluded boutique vineyard retreats, panoramic lake cruises on vintage steamships, and gateway to majestic Milford Sound.',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/queenstown.svg',
    travelStyles: ['Adventure', 'Nature', 'Luxury'],
    duration: '6 - 8 Days',
    bestSeason: 'December – February (Summer) & June – August (Winter)',
    dailyBudget: 220,
    currency: 'USD',
    highlights: [
      'Milford Sound Fjord Helicopter & Cruise Excursion',
      'Lake Wakatipu TSS Earnslaw Vintage Steamer',
      'Gibbston Valley Boutique Pinot Noir Wineries',
      'Skyline Gondola & Bob’s Peak Panorama',
      'Dart River Wilderness Jet Boating & Kayaking'
    ],
    suggestedActivities: [
      {
        name: 'Scenic Helicopter Flight & Alpine Glacier Landing',
        day: 1,
        time: '10:00 AM',
        category: 'Adventure',
        cost: 280,
        description: 'Touch down on pristine mountaintop snowfields with 360-degree views of the Southern Alps.'
      },
      {
        name: 'Private Central Otago Wine Trail',
        day: 2,
        time: '01:30 PM',
        category: 'Dining',
        cost: 95,
        description: 'Cellar door barrel tastings paired with artisanal cheeses in the world’s southernmost wine region.'
      },
      {
        name: 'Onsen Hot Pools Private Mountain Soak',
        day: 2,
        time: '06:00 PM',
        category: 'Leisure',
        cost: 85,
        description: 'Cedar-lined hot tub perched dramatically over the Shotover River canyon with retractable glass walls.'
      }
    ],
    travelTips: [
      'Book Onsen Hot Pools several months ahead as slots sell out rapidly.',
      'Milford Sound is a must-visit; choose a flight-cruise-flight combination to save 9 hours of road driving.',
      'Remember that seasons are inverted in the Southern Hemisphere: July is mid-winter ski season.'
    ],
    coordinates: { x: 968, y: 375 }
  },
  {
    id: 'banff',
    name: 'Banff',
    country: 'Canada',
    continent: 'North America',
    description: 'Glacial turquoise waters, towering granite summits, wild pine forests, and historic mountain châteaux.',
    overview: 'Canada’s first national park, Banff, encompasses some of the most awe-inspiring wilderness on earth. Located in the heart of the Canadian Rocky Mountains, it is famed for Lake Louise with its opulent Fairmont Château, the electric cyan waters of Moraine Lake beneath the Valley of the Ten Peaks, and thriving wildlife populations including grizzly bears, elk, and bighorn sheep.',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/banff.svg',
    travelStyles: ['Nature', 'Adventure'],
    duration: '5 - 7 Days',
    bestSeason: 'June – September (Hiking & Lakes) & December – March (Skiing)',
    dailyBudget: 235,
    currency: 'USD',
    highlights: [
      'Moraine Lake & The Valley of the Ten Peaks',
      'Lake Louise & Plain of Six Glaciers Teahouse',
      'Icefields Parkway One of the World’s Greatest Drives',
      'Banff Upper Hot Springs Natural Mineral Pools',
      'Johnston Canyon Suspended Catwalks & Waterfalls'
    ],
    suggestedActivities: [
      {
        name: 'Sunrise Canoe on Moraine Lake',
        day: 1,
        time: '06:15 AM',
        category: 'Adventure',
        cost: 90,
        description: 'Paddle a wooden canoe on mirror-calm turquoise waters before park shuttles arrive.'
      },
      {
        name: 'Athabasca Glacier Ice Explorer Walk',
        day: 2,
        time: '11:00 AM',
        category: 'Adventure',
        cost: 85,
        description: 'Ride an all-terrain vehicle directly onto the ancient Columbia Icefield and drink pristine meltwater.'
      },
      {
        name: 'Fairmont Château Lake Louise Afternoon Tea',
        day: 3,
        time: '02:30 PM',
        category: 'Dining',
        cost: 75,
        description: 'Traditional English high tea served beside floor-to-ceiling arched windows framing Victoria Glacier.'
      }
    ],
    travelTips: [
      'Moraine Lake road is closed to personal vehicles; reserve Parks Canada shuttle tickets in spring.',
      'Always carry bear spray on hikes and ensure it is easily accessible on your hip, not inside your backpack.',
      'Purchase a Parks Canada Discovery Pass if staying longer than 3 days.'
    ],
    coordinates: { x: 179, y: 108 }
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    continent: 'Africa',
    description: 'Ochre ramparts, labyrinthine spice souks, serene riad courtyards, and starlit Atlas mountain vistas.',
    overview: 'Known as the Red City, Marrakech is a sensory feast where thousand-year-old Moorish architecture meets vibrant contemporary art. Behind carved cedar doors along bustling medina alleyways lie secret oasis courtyards with zellij tilework, sweet orange blossoms, and tranquil reflection pools. Beyond the ramparts, the rugged snow-topped High Atlas mountains beckon.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/marrakech.svg',
    travelStyles: ['Culture', 'Food and Cuisine', 'Luxury'],
    duration: '4 - 6 Days',
    bestSeason: 'October – April',
    dailyBudget: 125,
    currency: 'USD',
    highlights: [
      'Jemaa el-Fnaa Night Market & Storytellers',
      'Jardin Majorelle & Yves Saint Laurent Museum',
      'Ben Youssef Islamic Madrasa Architecture',
      'Bahia Palace Intricate Cedar & Zellij Artistry',
      'Historic Medina Artisan Leather & Spice Souks'
    ],
    suggestedActivities: [
      {
        name: 'Private Riad Cooking Class & Souk Spice Walk',
        day: 1,
        time: '09:30 AM',
        category: 'Dining',
        cost: 55,
        description: 'Handpick ras el hanout and fresh mint, then prepare aromatic lamb tagine and zaalouk in a private courtyard.'
      },
      {
        name: 'Traditional Royal Hammam & Gommage Scrub',
        day: 2,
        time: '04:00 PM',
        category: 'Leisure',
        cost: 85,
        description: 'Eucalyptus black soap cleanse, kessa mitt exfoliation, and pure argan oil massage in candlelit marble vaults.'
      },
      {
        name: 'Early Morning Private Walk of Jardin Majorelle',
        day: 3,
        time: '08:30 AM',
        category: 'Culture',
        cost: 30,
        description: 'Admire electric cobalt blue architecture, exotic cacti, and lotus pools in morning tranquility.'
      }
    ],
    travelTips: [
      'Stay in an authentic restored riad inside the Medina rather than a conventional Western hotel for the true experience.',
      'Always agree on taxi fares before boarding or insist on the meter (compteur).',
      'Accepting a glass of hot fresh mint tea is an integral gesture of Moroccan warmth and hospitality.'
    ],
    coordinates: { x: 478, y: 162 }
  }
];

const POLARIS_COLLECTIONS = [
  {
    id: 'mountain-escapes',
    title: 'Hidden Mountain Escapes',
    subtitle: 'High-Altitude Sanctuaries & Majestic Peaks',
    description: 'Elevate your senses among dramatic snow-carved summits, crystalline alpine tarns, and secluded luxury mountain chalets.',
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    destinationIds: ['swiss-alps', 'ladakh', 'banff']
  },
  {
    id: 'island-retreats',
    title: 'Island Retreats',
    subtitle: 'Sun-Drenched Coasts & Volcanic Horizons',
    description: 'Surrender to the rhythm of ocean tides, clifftop infinity pools, ancient island traditions, and private sunset sailing.',
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    destinationIds: ['bali', 'santorini']
  },
  {
    id: 'architecture-heritage',
    title: 'Architecture and Heritage',
    subtitle: 'Monuments of Devotion, Empires & Craft',
    description: 'Wander through millennium-old wooden temples, Byzantine frescoes, fairy chimney forts, and exquisite Moorish palatial courtyards.',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    destinationIds: ['kyoto', 'marrakech', 'cappadocia', 'ladakh']
  },
  {
    id: 'northern-landscapes',
    title: 'Northern Landscapes',
    subtitle: 'Untamed Glaciers, Auroras & Granite Wilderness',
    description: 'Traverse volcanic sands, blue subterranean ice caverns, turquoise glacial lakes, and the celestial dance of northern lights.',
    coverImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    destinationIds: ['iceland', 'banff', 'swiss-alps']
  },
  {
    id: 'slow-travel',
    title: 'Slow Travel',
    subtitle: 'Mindful Pacing, Local Craft & Meditative Rest',
    description: 'Disconnect from urgency. Drift on tranquil backwaters, stroll zen stone gardens, and savor long seaside culinary afternoons.',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    destinationIds: ['kerala', 'kyoto', 'amalfi-coast']
  },
  {
    id: 'indian-cultural-trails',
    title: 'Indian Cultural Trails',
    subtitle: 'From Himalayan Monasteries to Tropical Backwaters',
    description: 'Immerse in the rich diversity of the subcontinent—from chants at 3,500m Tibetan monasteries to peaceful Ayurvedic waterways.',
    coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    destinationIds: ['ladakh', 'kerala']
  }
];

/**
 * High-quality starter sample journey for first-time visits
 */
const DEFAULT_SAMPLE_JOURNEYS = [
  {
    id: 'journey-kyoto-autumn',
    name: 'Autumn Tranquility in Kyoto',
    destinationId: 'kyoto',
    startDate: '2026-11-10',
    endDate: '2026-11-15',
    travellers: 2,
    budget: 2800,
    travelStyle: 'Culture',
    status: 'Upcoming',
    createdAt: '2026-10-20T10:00:00Z',
    activities: [
      {
        id: 'act-1',
        day: 1,
        time: '10:00 AM',
        name: 'Private Tea Ceremony with a Urasenke Master',
        category: 'Culture',
        cost: 65,
        description: 'Traditional ritual in an authentic 18th-century machiya.'
      },
      {
        id: 'act-2',
        day: 1,
        time: '07:00 PM',
        name: 'Gion Kaiseki Dinner at Hanasato',
        category: 'Dining',
        cost: 160,
        description: 'Multi-course seasonal Kyoto dining.'
      },
      {
        id: 'act-3',
        day: 2,
        time: '06:30 AM',
        name: 'Dawn Walk at Fushimi Inari',
        category: 'Sightseeing',
        cost: 15,
        description: 'Early walk through vermilion torii gates.'
      },
      {
        id: 'act-4',
        day: 2,
        time: '02:00 PM',
        name: 'Philosopher’s Path & Zen Garden',
        category: 'Leisure',
        cost: 30,
        description: 'Canalside stroll through Nanzen-ji temples.'
      },
      {
        id: 'act-5',
        day: 3,
        time: '09:00 AM',
        name: 'Arashiyama Bamboo Grove & Tenryu-ji',
        category: 'Nature',
        cost: 40,
        description: 'Morning walk in bamboo forest and dragon temple.'
      }
    ]
  },
  {
    id: 'journey-swiss-alps',
    name: 'Alpine Grandeur & Zermatt Retreat',
    destinationId: 'swiss-alps',
    startDate: '2026-12-18',
    endDate: '2026-12-24',
    travellers: 2,
    budget: 4500,
    travelStyle: 'Luxury',
    status: 'Planning',
    createdAt: '2026-10-22T14:30:00Z',
    activities: [
      {
        id: 'act-101',
        day: 1,
        time: '12:00 PM',
        name: 'Arrival in Zermatt & Car-Free Village Walk',
        category: 'Sightseeing',
        cost: 20,
        description: 'Check into chalet with Matterhorn views.'
      },
      {
        id: 'act-102',
        day: 2,
        time: '09:30 AM',
        name: 'Gornergrat Bahn Panoramic Mountain Ride',
        category: 'Adventure',
        cost: 120,
        description: 'Cogwheel train to 3,100 meters above sea level.'
      },
      {
        id: 'act-103',
        day: 2,
        time: '07:30 PM',
        name: 'Traditional Swiss Fondue & Valais Wine',
        category: 'Dining',
        cost: 110,
        description: 'Dinner at a cozy timber tavern in the old town.'
      }
    ]
  }
];
