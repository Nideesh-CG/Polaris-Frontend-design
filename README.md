# POLARIS — Find Your Next Somewhere

A premium, responsive, luxury travel discovery and bespoke itinerary planning platform.

> **Brand Tagline:** *"Find your next somewhere."*

---

## 1. Project Overview

POLARIS is an editorial-grade single-page web application designed for discerning travelers. Built with a contemporary luxury travel magazine aesthetic, POLARIS allows users to:
* **Discover Global Destinations:** Explore a curated catalogue of 12 iconic world destinations across 5 continents.
* **Filter and Search:** Multi-attribute filtering by continent, travel style, and illustrative daily budget with real-time updates.
* **Curated Travel Collections:** Six editorial anthologies linking mountain escapes, slow travel, island retreats, and cultural heritage routes.
* **Interactive SVG World Map:** Lightweight, responsive SVG discovery map with radar-pulse destination markers, hover tooltips, and interactive destination preview drawers.
* **Comprehensive Destination Details:** Rich overviews, main highlights, suggested daily activities, and concierge travel tips.
* **Bespoke Travel Planner:** Multi-field trip planner with date validation, duration calculation, and automated baseline cost estimation.
* **Day-by-Day Itinerary Builder:** Activity scheduling by day, sequence/timing, categories, and estimated costs with live budget comparison meters.
* **My Journeys:** Management of saved trips with status tracking (*Planning*, *Upcoming*, *Completed*), editing, and deletion.
* **Personal Wishlist (Favourites):** Seamless bookmarking with persistent storage and navbar badge count.
* **Travel Insights:** Dynamic personal analytics calculated live from stored favourites and itineraries (destination counts, total planned budget, travel persona scoring, and continent affinity breakdown).

---

## 2. Technology Stack

POLARIS is built strictly according to project specifications:
* **Core:** Semantic HTML5 and Vanilla JavaScript (ES6+).
* **Styling:** Custom CSS3 Design System with CSS Custom Properties and Bootstrap 5 (Official CDN).
* **Icons:** Bootstrap Icons (Official CDN).
* **Fonts:** Google Fonts (*Playfair Display* for editorial serif headings and *Plus Jakarta Sans* for clean UI typography).
* **Data Persistence:** Browser `localStorage` with error handling, schema defaults, and demo reset support.
* **Zero Disallowed Dependencies:** No React, Vue, Angular, Tailwind CSS, TypeScript, jQuery, Node.js backend frameworks, paid map APIs, or database keys.

---

## 3. Brand & Visual Identity

### Color Palette
```css
--color-background:  #F8F6F1; /* Warm editorial parchment */
--color-surface:     #FFFFFF; /* Crisp card & modal surfaces */
--color-text:        #17252E; /* Deep navy-charcoal typography */
--color-muted:       #707873; /* Subtle neutral commentary */
--color-accent:      #B89B66; /* Warm ochre gold */
--color-secondary:   #EEE9DF; /* Soft sand accents */
--color-border:      #E5E0D6; /* Hairline borders */
--color-dark:        #14212A; /* Midnight obsidian background */
```

### Typography Hierarchy
* **Brand Logo:** `POLARIS` set in uppercase serif with `0.25em` tracking.
* **Editorial Headings:** `Playfair Display` (serif, elegant, high contrast).
* **Body & UI Text:** `Plus Jakarta Sans` (sans-serif, generous line-height, crisp legibility).

---

## 4. Project Structure

```
POLARIS/
├── index.html              # Main application layout and SPA section containers
├── css/
│   └── style.css           # Design system tokens, layout, typography, cards & animations
├── js/
│   ├── data.js             # 12 destinations, 6 collections, and starter sample journeys
│   ├── storage.js          # Safe localStorage service with error recovery and CRUD helpers
│   ├── destinations.js     # Filtering, search, modal details, favourites & SVG map
│   ├── planner.js          # Trip planner, day-by-day itinerary builder & budget calculations
│   ├── insights.js         # Real-time analytics, continent distribution & style affinity
│   └── app.js              # SPA navigation, global search modal (Ctrl+K), and toasts
├── assets/
│   └── images/             # High-quality fallback SVG graphics for all 12 destinations
└── README.md               # Documentation, setup guide, and test verification
```

---

## 5. Local Setup & Execution

Since POLARIS is built purely with vanilla web standards and CDN assets, it can be launched using any lightweight local development server.

### Option A: Using Python (Recommended)
```bash
# Navigate to the POLARIS directory
cd "d:\Frontend desgin\Polaris"

# Start Python HTTP server on port 3000
python -m http.server 3000
```
Open your browser and navigate to: `http://localhost:3000`

### Option B: Using Node `npx serve`
```bash
npx --yes serve -p 3000 .
```

### Option C: Direct Browser Opening
You can also directly open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

---

## 6. Curated Destinations in Catalogue

| # | Destination | Country | Continent | Travel Styles | Daily Budget |
|---|-------------|---------|-----------|---------------|--------------|
| 1 | Kyoto | Japan | Asia | Culture, Relaxation, Food & Cuisine | $185 / day |
| 2 | Swiss Alps | Switzerland | Europe | Nature, Adventure, Luxury | $340 / day |
| 3 | Bali | Indonesia | Asia | Relaxation, Culture, Nature | $115 / day |
| 4 | Santorini | Greece | Europe | Luxury, Relaxation, Food & Cuisine | $270 / day |
| 5 | Iceland | Iceland | Europe | Adventure, Nature | $250 / day |
| 6 | Cappadocia | Türkiye | Europe | Culture, Adventure, Luxury | $155 / day |
| 7 | Ladakh | India | Asia | Adventure, Nature, Culture | $85 / day |
| 8 | Kerala | India | Asia | Relaxation, Nature, Food & Cuisine, Culture | $80 / day |
| 9 | Amalfi Coast | Italy | Europe | Luxury, Food & Cuisine, Relaxation | $310 / day |
| 10 | Queenstown | New Zealand | Oceania | Adventure, Nature, Luxury | $220 / day |
| 11 | Banff | Canada | North America | Nature, Adventure | $235 / day |
| 12 | Marrakech | Morocco | Africa | Culture, Food & Cuisine, Luxury | $125 / day |

---

## 7. Curated Collections

1. **Hidden Mountain Escapes:** Swiss Alps, Ladakh, Banff
2. **Island Retreats:** Bali, Santorini
3. **Architecture and Heritage:** Kyoto, Marrakech, Cappadocia, Ladakh
4. **Northern Landscapes:** Iceland, Banff, Swiss Alps
5. **Slow Travel:** Kerala, Kyoto, Amalfi Coast
6. **Indian Cultural Trails:** Ladakh, Kerala

---

## 8. Verification & Acceptance Testing Matrix

| Requirement | Test Scenario | Expected Result | Status |
|---|---|---|---|
| **Home Page** | Load application root | Hero loads with display typography, CTAs, search card, and philosophy | **PASSED** |
| **SPA Navigation** | Click all navbar items (Home, Explore, Destinations, Collections, Plan, Journeys, Insights) | Smooth view switching without page reloads; active indicator updates | **PASSED** |
| **Data Rendering** | Render 12 destinations from `data.js` | All 12 cards render with images, badges, prices, and action buttons | **PASSED** |
| **Search Filter** | Type "kyoto" or "greece" in catalogue | Instant matching and count badge updates | **PASSED** |
| **Multi-Filtering** | Combine Continent="Europe" + Style="Luxury" | Correctly filters down to matching subset (Santorini, Amalfi Coast, Swiss Alps) | **PASSED** |
| **Sorting** | Sort by "Budget: Low to High" and "Budget: High to Low" | Cards order dynamically without reload | **PASSED** |
| **Details Modal** | Click "View Details" on any card | Opens modal with overview, highlights, suggested activities, and concierge tips | **PASSED** |
| **Favourites Toggle** | Click heart icon on card or modal | Favourites badge updates, heart toggles active color, persisted to storage | **PASSED** |
| **Persistence** | Refresh browser | Saved favourites and journeys persist seamlessly | **PASSED** |
| **Interactive Map** | Click markers on SVG world map | Marker highlights with active ring, shows bottom drawer preview card | **PASSED** |
| **Collections** | Click "Explore Collection" on Mountain Escapes | Switches to Destinations with filtered view of the collection | **PASSED** |
| **Trip Planner** | Submit invalid dates (end date before start date) | Form validation flags error and prevents submission | **PASSED** |
| **Trip Creation** | Submit valid trip form | Trip saved to `localStorage`, pre-populates editable activities, toast displays | **PASSED** |
| **Activity Builder** | Add new activity to Day 2 | Activity added, subtotal recalculates, budget meter adjusts | **PASSED** |
| **Budget Calculator** | Modify activity cost | Total estimated cost vs planned budget recalculates live with status badge | **PASSED** |
| **Edit/Delete Trip** | Edit trip parameters or delete trip | Modal updates or removes trip after confirmation | **PASSED** |
| **Travel Insights** | Add/remove trip or favourite | Analytics, budget, and continent distribution update automatically | **PASSED** |
| **Keyboard Access** | Press `Ctrl+K` | Opens global search modal with autofocus | **PASSED** |
| **Mobile Responsiveness** | Test at 390px / 768px / 1280px / 1440px | Collapsible hamburger menu, no horizontal scroll, fluid images | **PASSED** |
| **Offline Fallbacks** | Block image CDN | Fallback custom SVGs in `assets/images/` render gracefully without broken icons | **PASSED** |

---

## 9. Known Limitations & Notes

* **Illustrative Budgets:** All daily costs, activity prices, and seasonal ratings are illustrative editorial guidelines designed for planning simulations, not live booking transactions.
* **SVG Map Scope:** The world map uses an equirectangular artistic SVG projection optimized for discovery rather than military precision geodesy.
* **Storage Scope:** Client data is stored in the user's browser `localStorage`. Resetting browser cookies/site data will clear user customizations (a "Reset Demo Data" option is provided to restore the starter dataset at any time).
