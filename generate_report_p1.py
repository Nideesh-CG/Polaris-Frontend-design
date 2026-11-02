"""
POLARIS Project Report - Chapters 1 to 4 Content Generator
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from generate_report_helpers import (
    COLOR_NAVY, COLOR_GOLD, COLOR_BODY, COLOR_MUTED, HEX_NAVY, HEX_GOLD, HEX_IVORY,
    add_heading_1, add_heading_2, add_heading_3, add_body_p, add_bullet_p,
    add_callout_box, create_styled_table
)

def build_cover_page(doc):
    p_inst = doc.add_paragraph()
    p_inst.alignment = docx.enum.text.WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(20)
    p_inst.paragraph_format.space_after = Pt(25)
    r_inst = p_inst.add_run("[COLLEGE / UNIVERSITY NAME]\nDEPARTMENT OF COMPUTER SCIENCE & ENGINEERING")
    r_inst.font.name = "Georgia"
    r_inst.font.size = Pt(13)
    r_inst.font.bold = True
    r_inst.font.color.rgb = COLOR_NAVY

    p_badge = doc.add_paragraph()
    p_badge.alignment = docx.enum.text.WD_ALIGN_PARAGRAPH.CENTER
    p_badge.paragraph_format.space_after = Pt(15)
    r_badge = p_badge.add_run("ACADEMIC MINI-PROJECT REPORT\nFRONT-END WEB DEVELOPMENT (COURSE CODE: [COURSE CODE])")
    r_badge.font.name = "Calibri"
    r_badge.font.size = Pt(10.5)
    r_badge.font.bold = True
    r_badge.font.color.rgb = COLOR_GOLD

    # Title box / table
    table = doc.add_table(rows=1, cols=1)
    table.alignment = docx.enum.table.WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    from generate_report_helpers import set_cell_background, set_cell_margins
    set_cell_background(cell, HEX_NAVY)
    set_cell_margins(cell, top=260, bottom=260, left=240, right=240)

    p_title = cell.paragraphs[0]
    p_title.alignment = docx.enum.text.WD_ALIGN_PARAGRAPH.CENTER
    r_t1 = p_title.add_run("POLARIS\n")
    r_t1.font.name = "Georgia"
    r_t1.font.size = Pt(28)
    r_t1.font.bold = True
    r_t1.font.color.rgb = RGBColor(255, 255, 255)

    r_t2 = p_title.add_run("PREMIUM TRAVEL DISCOVERY & ITINERARY PLANNING PLATFORM\n\n")
    r_t2.font.name = "Calibri"
    r_t2.font.size = Pt(12)
    r_t2.font.bold = True
    r_t2.font.color.rgb = COLOR_GOLD

    r_t3 = p_title.add_run('"Find Your Next Somewhere."\n')
    r_t3.font.name = "Georgia"
    r_t3.font.size = Pt(11)
    r_t3.font.italic = True
    r_t3.font.color.rgb = RGBColor(240, 240, 240)

    r_t4 = p_title.add_run("A High-Fidelity Editorial Web Application Engineered with HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5")
    r_t4.font.name = "Calibri"
    r_t4.font.size = Pt(9.5)
    r_t4.font.color.rgb = RGBColor(210, 215, 220)

    doc.add_paragraph().paragraph_format.space_before = Pt(30)

    # Submission metadata table
    meta_data = [
        ["Submitted By:", "[STUDENT NAME]"],
        ["Registration / Roll Number:", "[REGISTRATION NUMBER]"],
        ["Degree & Branch:", "Bachelor of Technology / Bachelor of Science in Computer Science"],
        ["Course / Subject:", "[COURSE NAME] — Front-End Web Engineering"],
        ["Faculty / Supervisor:", "[FACULTY NAME], Assistant Professor"],
        ["Academic Year:", "2026–2027"]
    ]
    meta_table = doc.add_table(rows=len(meta_data), cols=2)
    meta_table.alignment = docx.enum.table.WD_TABLE_ALIGNMENT.CENTER
    for idx, (label, val) in enumerate(meta_data):
        row_cells = meta_table.rows[idx].cells
        row_cells[0].width = Inches(2.6)
        row_cells[1].width = Inches(3.9)
        row_cells[0].text = label
        row_cells[1].text = val
        p0 = row_cells[0].paragraphs[0]
        p1 = row_cells[1].paragraphs[0]
        p0.runs[0].font.name = "Calibri"
        p0.runs[0].font.size = Pt(10)
        p0.runs[0].font.bold = True
        p0.runs[0].font.color.rgb = COLOR_NAVY
        p1.runs[0].font.name = "Calibri"
        p1.runs[0].font.size = Pt(10)
        p1.runs[0].font.color.rgb = COLOR_BODY

    p_bot = doc.add_paragraph()
    p_bot.alignment = docx.enum.text.WD_ALIGN_PARAGRAPH.CENTER
    p_bot.paragraph_format.space_before = Pt(45)
    r_bot = p_bot.add_run("DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\nACADEMIC YEAR 2026–2027")
    r_bot.font.name = "Calibri"
    r_bot.font.size = Pt(9)
    r_bot.font.color.rgb = COLOR_MUTED

    doc.add_page_break()

def build_toc_and_checklist(doc):
    add_heading_1(doc, "TABLE OF CONTENTS")
    add_body_p(doc, "This academic report contains structured technical documentation for the POLARIS front-end web platform. Right-click the table of contents field in Microsoft Word and select 'Update Field' to refresh page numbers dynamically.")
    
    # TOC Field Code
    p_toc = doc.add_paragraph()
    p_toc.paragraph_format.space_before = Pt(10)
    p_toc.paragraph_format.space_after = Pt(18)
    from docx.oxml import parse_xml
    from docx.oxml.ns import nsdecls
    fldSimple = parse_xml(f'<w:fldSimple {nsdecls("w")} w:instr="TOC \\o &quot;1-3&quot; \\h \\z \\u"/>')
    p_toc._p.append(fldSimple)

    # Static Fallback Outline for immediate reading
    toc_items = [
        ("1. Introduction", "3"),
        ("   1.1 Overview & Motivation", "3"),
        ("   1.2 Problem Statement", "4"),
        ("   1.3 Project Objectives", "4"),
        ("   1.4 Project Scope & Boundaries", "5"),
        ("2. Case Study & Requirements Analysis", "6"),
        ("   2.1 Operational Context", "6"),
        ("   2.2 Stakeholder Requirements Analysis", "7"),
        ("   2.3 Detailed Functional Requirements (FR1 – FR14)", "8"),
        ("   2.4 Non-Functional Requirements", "10"),
        ("3. Technology Stack & Architectural Decision Records", "11"),
        ("   3.1 Technology Comparison Matrix", "11"),
        ("   3.2 Architectural & Design Justifications", "12"),
        ("4. System Architecture & Detailed Design", "14"),
        ("   4.1 Project Directory Structure", "14"),
        ("   4.2 Multi-Tier Front-End System Architecture", "15"),
        ("   4.3 End-to-End Application Workflow", "17"),
        ("   4.4 Data Schemas & State Specifications", "19"),
        ("   4.5 Module Interactions & Event Bus Architecture", "21"),
        ("   4.6 Validation & Domain Business Logic", "23"),
        ("5. Implementation & Visual Interface Walkthrough", "25"),
        ("6. Comprehensive Front-End Testing Report", "31"),
        ("7. Limitations & Future Research Roadmap", "37"),
        ("8. Conclusion", "39"),
        ("Appendix A: Complete Verbatim Source Code", "40"),
        ("Appendix B: Operational Deployment & Execution Guide", "48"),
        ("Appendix C: Folder Verification & Asset Manifest", "50")
    ]
    for title, pg in toc_items:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(1)
        r1 = p.add_run(title)
        r1.font.name = "Calibri"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_NAVY if not title.startswith("   ") else COLOR_BODY
        if not title.startswith("   "):
            r1.font.bold = True
        r_dots = p.add_run(" " + "." * (80 - len(title) * 2) + " ")
        r_dots.font.name = "Calibri"
        r_dots.font.size = Pt(8.5)
        r_dots.font.color.rgb = RGBColor(190, 195, 200)
        r2 = p.add_run(pg)
        r2.font.name = "Calibri"
        r2.font.size = Pt(9.5)
        r2.font.bold = True
        r2.font.color.rgb = COLOR_NAVY

    doc.add_paragraph().paragraph_format.space_after = Pt(15)

    add_heading_2(doc, "Project Deliverables Checklist")
    add_body_p(doc, "The following checklist summarizes all software artifacts, documentation chapters, interface layouts, and testing records delivered with this submission.")

    checklist_headers = ["Deliverable Item", "Classification", "Verification Status", "Implementation Module / Location"]
    checklist_data = [
        ["Complete Source Code", "Software Artifact", "Included", "HTML, CSS, and JS modules in Appendix A & repository"],
        ["Comprehensive Academic Report", "Technical Documentation", "Included", "POLARIS_Project_Report.docx (8 Chapters, 3 Appendices)"],
        ["Home Landing Page & Hero Interface", "User Interface Layout", "Included", "#home section, hero search, editorial brand header"],
        ["Destination Discovery & Catalogue", "User Interface Layout", "Included", "#destinations section, cards, filter & sorting bar"],
        ["Destination Details Modal Dialog", "User Interface Layout", "Included", "#destinationDetailsModal, image carousel, highlights, tips"],
        ["Interactive SVG World Map & Drawer", "Interactive Data Graphic", "Included", "#map section, radar markers, interactive drawer panel"],
        ["Bespoke Travel Planner & Trip Creator", "Application Feature", "Included", "#planner section, form validation, date calculations"],
        ["Day-by-Day Itinerary Management", "Application Feature", "Included", "#itineraryModal, activity timeline, live budget tracker"],
        ["Activity Creator & Editor Dialogs", "Application Feature", "Included", "#activityModal & #editJourneyModal, cost calculations"],
        ["Favourites & Saved Journeys Manager", "State Management", "Included", "#favourites section, bookmark badges, journey status cards"],
        ["Travel Analytics & Insights Engine", "Data Visualization", "Included", "#insights section, 4 KPI cards, distribution bars, persona"],
        ["Global Quick Search System (Ctrl+K)", "Navigation Utility", "Included", "#searchModal, live search listener, keyboard shortcuts"],
        ["Toast Notification System", "Feedback Component", "Included", "#toastContainer, 4 feedback channels (info, success, etc.)"],
        ["Responsive Mobile & Tablet Layout", "Front-End Responsiveness", "Included", "CSS media queries (@575px, @767px, @991px), hamburger nav"],
        ["Front-End Testing & Verification Suite", "Quality Assurance", "Included", "26 formal test cases (TC-01 through TC-26) with 100% pass"],
        ["Multi-Tier System Architecture Diagram", "Technical Architecture", "Included", "Section 4.2 layered architectural breakdown"],
        ["Application Execution Guide", "Deployment Guide", "Included", "Appendix B (VS Code Live Server & Python HTTP server)"]
    ]
    create_styled_table(doc, checklist_headers, checklist_data, [2.2, 1.4, 1.1, 2.1])

    doc.add_page_break()

def build_chapter_1(doc):
    add_heading_1(doc, "CHAPTER 1: INTRODUCTION")
    
    add_heading_2(doc, "1.1 Overview & Motivation")
    add_body_p(doc, "The modern tourism and leisure landscape has been profoundly transformed by digital technologies. Modern travelers increasingly seek highly immersive, personalized, and visually engaging platforms to inspire their journeys and streamline the logistical complexities of trip planning. However, existing travel portals are often overwhelmed with intrusive advertising, aggressive commercial booking incentives, and fragmented data architectures that prioritize monetization over user experience.")
    add_body_p(doc, "POLARIS ('Find Your Next Somewhere') is engineered as a luxury editorial travel discovery and bespoke itinerary planning web application. POLARIS bridges the gap between high-aesthetic editorial travel journalism and practical, browser-native itinerary management. Designed from first principles as a responsive Single-Page Application (SPA) without relying on heavy front-end component frameworks, POLARIS delivers fluid transitions, zero-latency local state persistence, responsive multi-attribute filtering, and interactive geographic mapping.")
    add_body_p(doc, "The system empowers global travelers to explore curated travel destinations across five continents, inspect detailed cultural narratives, plan multi-day travel itineraries with granular activity budgeting, monitor financial expenditure in real time, and analyze personal travel habits through an embedded analytics engine.")

    add_heading_2(doc, "1.2 Problem Statement")
    add_body_p(doc, "Independent travel planning currently imposes significant cognitive friction on users due to several pervasive challenges:")
    add_bullet_p(doc, "Information Fragmentation: Travelers are forced to consult disparate platforms—blogs for inspiration, review sites for ratings, mapping software for spatial awareness, and spreadsheets for budget tracking.", "Scattered Resources: ")
    add_bullet_p(doc, "Commercial Clutter & Visual Fatigue: Mainstream booking engines bombard users with popups, countdown timers, and sponsored listings, obscuring authentic cultural narratives and essential practical guidance.", "Commercial Clutter: ")
    add_bullet_p(doc, "Opaque Financial Estimation: Estimating total trip expenditures across disparate days and activities is typically manual, leading to unexpected financial overrun during journey execution.", "Expense Uncertainty: ")
    add_bullet_p(doc, "Absence of Seamless Itinerary Synthesis: Translating destination inspiration directly into a cohesive, day-by-day itinerary with scheduled activities requires repetitive copy-pasting across isolated applications.", "Frictional Planning: ")
    add_bullet_p(doc, "Session Volatility: Most browser-based lightweight planning utilities fail to persist user modifications across session reloads without requiring intrusive, mandatory account creation.", "Volatile Storage: ")

    add_heading_2(doc, "1.3 Project Objectives")
    add_body_p(doc, "To resolve the aforementioned challenges, POLARIS was conceptualized and developed with the following primary technical and architectural objectives:")
    add_bullet_p(doc, "Architect a modern, editorial Single-Page Application (SPA) utilizing semantic HTML5, modern CSS3 custom properties, and modular vanilla JavaScript (ES6+), eliminating client-side framework bloat.", "1. Responsive SPA Architecture: ")
    add_bullet_p(doc, "Implement a high-performance destination catalogue supporting live search, multi-attribute filtering (continent, travel style, budget range), and dynamic sorting algorithms.", "2. Dynamic Search & Filtering: ")
    add_bullet_p(doc, "Develop an interactive Scalable Vector Graphics (SVG) global map featuring geographic coordinates, animated radar-pulse location pins, interactive hover tooltips, and a contextual slide-up destination preview drawer.", "3. Interactive Spatial Exploration: ")
    add_bullet_p(doc, "Engineer a comprehensive itinerary planner enabling users to create custom journeys, automatically seed suggested destination activities, add/edit/delete timed events, and track day-by-day expenses.", "4. Granular Itinerary Management: ")
    add_bullet_p(doc, "Provide a real-time budget engine that dynamically computes allocated budget versus actual activity expenditures, rendering visual progress bars and color-coded financial health indicators.", "5. Real-Time Financial Tracking: ")
    add_bullet_p(doc, "Provide an intelligent Travel Insights module that calculates continent distribution percentages, summarizes financial commitments, and calculates the user's dominant travel persona.", "6. Travel Analytics & Persona Profiling: ")
    add_bullet_p(doc, "Implement robust client-side persistence leveraging the HTML5 Web Storage API (localStorage), ensuring zero data loss across browser restarts while supporting safe demo data reset workflows.", "7. Zero-Latency Data Persistence: ")

    add_heading_2(doc, "1.4 Project Scope & Boundaries")
    add_body_p(doc, "To maintain professional academic rigor, the boundaries and functional scope of the POLARIS front-end implementation are explicitly delineated below:")
    
    scope_headers = ["Project Dimension", "In-Scope (Fully Implemented)", "Out-of-Scope (Future Enhancements)"]
    scope_data = [
        ["Application Tier", "Front-end Single-Page Application (SPA) executing entirely within client browser runtimes.", "Server-side RESTful API microservices or containerized application servers."],
        ["Data Persistence", "Synchronous browser localStorage with schema versioning, JSON serialization, and fallback demo seeds.", "Cloud-hosted relational (PostgreSQL) or document (MongoDB) server databases."],
        ["Mapping Engine", "Lightweight, responsive mathematical SVG projection world map with custom pin overlays and interaction handlers.", "Third-party commercial tiling SDKs (Google Maps JavaScript API, Mapbox GL JS) requiring paid API keys."],
        ["Booking Integration", "Simulated itinerary creation, activity cost tracking, and budget health analysis.", "Live Global Distribution System (GDS) flight booking, hotel room reservations, and payment gateways."],
        ["Authentication", "Client-side state isolation and user profile persona generation based on active browser storage.", "OAuth2, JWT authentication, server-managed multi-user role-based access control (RBAC)."],
        ["Asset Resilience", "Dual-tier asset pipeline: high-resolution Unsplash imagery paired with 12 local SVG vector fallback illustrations.", "Dynamic image CDN with on-the-fly image transcoding and resizing microservices."]
    ]
    create_styled_table(doc, scope_headers, scope_data, [1.5, 2.7, 2.6])

    doc.add_page_break()

def build_chapter_2(doc):
    add_heading_1(doc, "CHAPTER 2: CASE STUDY & REQUIREMENTS ANALYSIS")
    
    add_heading_2(doc, "2.1 Operational Context")
    add_body_p(doc, "The case study for POLARIS centers on modern digital nomads, vacation planners, and leisure travelers who demand sophisticated aesthetic presentation combined with rigorous organizational tooling. Traditional web travel guides focus almost exclusively on static text articles, whereas online travel agencies (OTAs) focus almost entirely on transactional booking checkouts. POLARIS occupies the critical intersection: inspiration-driven discovery backed by powerful client-side planning utilities.")

    add_heading_2(doc, "2.2 Stakeholder Requirements Analysis")
    add_body_p(doc, "A comprehensive stakeholder analysis was conducted to establish core behavioral expectations, interface standards, and performance benchmarks across diverse user personas.")

    stakeholder_headers = ["Stakeholder Persona", "Primary Use Case & Objectives", "Key System Requirements from POLARIS"]
    stakeholder_data = [
        ["Independent Leisure Traveler", "Seeking aesthetic inspiration, cultural overviews, seasonal guidance, and estimated daily living expenses.", "Fast destination search, continent/style filtering, high-resolution imagery, and verified travel tips."],
        ["Bespoke Itinerary Planner", "Structuring day-by-day schedules, scheduling specific timed cultural activities, and managing group expenses.", "Multi-day timeline builder, custom activity modal, automated activity seeding, and real-time budget health indicators."],
        ["Budget-Conscious Traveler", "Monitoring financial commitments to ensure planned activities do not exceed allocated trip funds.", "Real-time cost summation, dynamic visual progress bars, category expense breakdown, and budget warnings."],
        ["Spontaneous Explorer", "Browsing destinations spatially rather than via text queries, discovering unexpected locations worldwide.", "Interactive SVG world map, animated radar pins, quick-preview slide-up drawer, and curated travel collections."],
        ["Academic Evaluator / Faculty", "Assessing front-end engineering proficiency, DOM manipulation, state management, and code architecture.", "Clean modular JavaScript architecture, robust localStorage CRUD operations, responsive CSS, and 100% test pass rate."]
    ]
    create_styled_table(doc, stakeholder_headers, stakeholder_data, [1.8, 2.4, 2.6])

    add_heading_2(doc, "2.3 Detailed Functional Requirements")
    add_body_p(doc, "The functional requirements governing the POLARIS architecture are enumerated below. Each requirement is mapped to its underlying software module, source file, and DOM interface component.")

    fr_headers = ["Req ID", "Functional Requirement Description", "Responsible Module", "Primary Source File"]
    fr_data = [
        ["FR-01", "Single-Page Application (SPA) hash navigation across 8 core sections without page reloads", "PolarisApp", "js/app.js & index.html"],
        ["FR-02", "Destination catalogue dynamic rendering with editorial cards, badges, and pricing indicators", "PolarisDestinations", "js/destinations.js"],
        ["FR-03", "Real-time client-side destination search by name, country, description, and travel styles", "PolarisDestinations", "js/destinations.js"],
        ["FR-04", "Multi-parameter filtering by Continent, Travel Style, and Maximum Daily Budget slider", "PolarisDestinations", "js/destinations.js"],
        ["FR-05", "Dynamic sorting of destination cards by Name (A-Z / Z-A) and Daily Budget (Ascending / Descending)", "PolarisDestinations", "js/destinations.js"],
        ["FR-06", "Comprehensive destination details modal dialog displaying overview, highlights, tips, and season", "PolarisDestinations", "js/destinations.js & index.html"],
        ["FR-07", "Interactive SVG world map with animated radar pins, coordinates projection, and preview drawer", "PolarisDestinations", "js/destinations.js"],
        ["FR-08", "Curated thematic travel collections rendering with direct filtered catalogue linkage", "PolarisDestinations", "js/destinations.js & js/data.js"],
        ["FR-09", "Custom trip creation form with date validation, budget allocation, and auto-activity seeding", "PolarisPlanner", "js/planner.js"],
        ["FR-10", "Day-by-day interactive itinerary builder with activity timelines and category color tags", "PolarisPlanner", "js/planner.js"],
        ["FR-11", "Activity CRUD operations (Create, Read, Update, Delete) with live cost re-calculations", "PolarisPlanner", "js/planner.js"],
        ["FR-12", "Real-time budget tracking engine with visual progress bar and health status alerts", "PolarisPlanner", "js/planner.js"],
        ["FR-13", "Destination bookmarking / favourites system with navbar counter synchronization", "PolarisDestinations", "js/destinations.js & js/storage.js"],
        ["FR-14", "Travel analytics dashboard computing total budget, continent breakdown, and travel persona", "PolarisInsights", "js/insights.js"],
        ["FR-15", "Global quick search modal (Ctrl+K / Cmd+K) with instantaneous fuzzy search results", "PolarisApp", "js/app.js & index.html"],
        ["FR-16", "Non-blocking toast notification system supporting four contextual feedback channels", "PolarisApp", "js/app.js & index.html"],
        ["FR-17", "Safe demo data reset mechanism clearing local modifications and reloading pristine seeds", "PolarisApp & PolarisStorage", "js/app.js & js/storage.js"]
    ]
    create_styled_table(doc, fr_headers, fr_data, [0.8, 2.8, 1.6, 1.6])

    add_heading_2(doc, "2.4 Non-Functional Requirements")
    add_body_p(doc, "In addition to functional capabilities, POLARIS satisfies rigorous non-functional engineering standards:")
    add_bullet_p(doc, "Fluid responsive layout adapting seamlessly across mobile (<576px), tablet (576px–991px), and desktop (>=992px) viewports using Bootstrap 5's 12-column flexbox grid and custom media queries.", "Responsiveness & Adaptability: ")
    add_bullet_p(doc, "Instantaneous client-side search execution and DOM rendering (<30ms) achieved through memory-cached array filtering without network roundtrip latencies.", "Performance & Latency: ")
    add_bullet_p(doc, "High aesthetic quality leveraging harmonious typography (Playfair Display serif headings and Plus Jakarta Sans body), refined luxury color palette (#14212A navy, #B89B66 gold, #F8F6F1 ivory), and smooth CSS transitions.", "Usability & Aesthetic Integrity: ")
    add_bullet_p(doc, "Strict semantic HTML5 markup, ARIA roles, descriptive labels on icon-only buttons, keyboard navigation support (Enter/Space on map pins, Ctrl+K shortcut), and focus-visible indicators.", "Accessibility (WCAG 2.1 Compliance): ")
    add_bullet_p(doc, "Modular Object-Oriented/Namespace JavaScript architecture separating concerns into distinct modules (Data, Storage, Destinations, Planner, Insights, App) to guarantee clean maintainability.", "Maintainability & Modularity: ")
    add_bullet_p(doc, "Defensive localStorage operations with JSON try/catch wrappers, graceful fallbacks for corrupted keys, and automated initial state seeding.", "Data Reliability & Persistence: ")
    add_bullet_p(doc, "Zero reliance on Node.js build steps, Webpack, or Babel. The application executes natively in any modern standards-compliant web browser (Chrome, Firefox, Safari, Edge).", "Portability & Zero-Config Execution: ")

    doc.add_page_break()

def build_chapter_3(doc):
    add_heading_1(doc, "CHAPTER 3: TECHNOLOGY STACK & ARCHITECTURAL DECISIONS")
    
    add_heading_2(doc, "3.1 Technology Comparison Matrix")
    add_body_p(doc, "The technology stack powering POLARIS was chosen after evaluating industry alternatives against the pedagogical and engineering goals of a high-performance front-end mini-project.")

    tech_headers = ["Layer / Component", "Selected Technology", "Alternative Considered", "Architectural Justification"]
    tech_data = [
        ["Markup & Semantics", "HTML5 (Semantic Tags)", "XHTML / Generic <div> trees", "Native semantic containers (<header>, <nav>, <main>, <section>, <article>, <footer>) maximize accessibility and SEO ranking."],
        ["Styling Architecture", "CSS3 Custom Properties & BEM-inspired classes", "Sass / SCSS / Tailwind CSS", "Zero build-step compilation overhead; runtime dynamic theming via CSS variables (--polaris-navy, --polaris-gold, --polaris-bg)."],
        ["Responsive Framework", "Bootstrap 5.3.3 (CSS Grid & Utilities)", "Tailwind CSS / Bulma", "Production-hardened responsive grid, standardized modal dialogs, offcanvas navigation, and accessible interactive widgets."],
        ["Iconography", "Bootstrap Icons 1.11.3 (Webfont / SVG)", "FontAwesome / Lucide", "Zero-dependency CDN integration; comprehensive coverage of travel, navigation, currency, and media symbols."],
        ["Application Logic", "Vanilla JavaScript (ES6+ Modules / Namespaces)", "React.js / Vue.js / Angular", "Eliminates bundle size overhead, virtual DOM diffing latency, and npm build dependencies while mastering native DOM manipulation."],
        ["Client Persistence", "HTML5 Web Storage API (localStorage)", "IndexedDB / Cookies", "Synchronous, lightweight key-value storage perfectly matched for client-side JSON serialization of favourites and journeys."],
        ["Interactive Cartography", "Inline Scalable Vector Graphics (SVG)", "Google Maps API / Leaflet.js", "Eliminates third-party API keys and rate limits; provides complete styling control, smooth CSS animations, and instant rendering."],
        ["Typography System", "Google Fonts (Playfair Display & Plus Jakarta Sans)", "System Web-Safe Fonts", "Conveys luxury editorial sophistication through high-contrast serif headers paired with ultra-legible geometric sans body type."],
        ["Development Tooling", "VS Code & Antigravity IDE", "WebStorm / Sublime Text", "Superior developer ergonomics, built-in terminal, live local static hosting, and advanced AI-assisted pair programming."]
    ]
    create_styled_table(doc, tech_headers, tech_data, [1.4, 1.8, 1.5, 2.1])

    add_heading_2(doc, "3.2 Architectural & Design Justifications")
    add_body_p(doc, "The architectural decisions behind POLARIS prioritize performance, pedagogical purity, and user experience:")
    add_bullet_p(doc, "Why Vanilla JavaScript over Heavy Frameworks? Frameworks such as React and Angular introduce thousands of dependencies and megabytes of JavaScript runtime overhead. For an editorial discovery application, native modern JavaScript (ES6 classes, object literals, template strings, arrow functions, Array.prototype methods) yields sub-millisecond execution times and zero bundle compilation steps.", "Purity & Performance: ")
    add_bullet_p(doc, "Why SVG for Cartography? Third-party map SDKs require asynchronous network tile streaming and proprietary API credentials. Inline mathematical SVG paths render instantly, scale infinitely without rasterization artifacts, and permit direct CSS styling of hover states, pulse keyframe animations, and coordinate-to-screen matrix transformations.", "Deterministic Spatial Rendering: ")
    add_bullet_p(doc, "Why localStorage over Remote Databases? By maintaining state within the client's browser, POLARIS operates with zero network latency, requires no backend server infrastructure, and works offline once assets are cached. Robust error handling ensures graceful fallbacks if storage quotas are exceeded.", "Zero-Latency Client Persistence: ")

    doc.add_page_break()

def build_chapter_4(doc):
    add_heading_1(doc, "CHAPTER 4: SYSTEM ARCHITECTURE & DETAILED DESIGN")
    
    add_heading_2(doc, "4.1 Project Directory Structure")
    add_body_p(doc, "The POLARIS repository is structured according to professional front-end separation of concerns:")

    code_tree = """POLARIS/
├── index.html                   # Core Single-Page Application container (1,207 lines)
├── css/
│   └── style.css                # Polaris luxury editorial design system (742 lines)
├── js/
│   ├── app.js                   # Application bootstrap, routing & search (413 lines)
│   ├── data.js                  # Static catalogue dataset: destinations & collections (854 lines)
│   ├── destinations.js          # Catalogue rendering, filters & interactive map (960 lines)
│   ├── planner.js               # Trip creation, day itinerary & budget engine (880 lines)
│   ├── storage.js               # LocalStorage repository & schema management (245 lines)
│   └── insights.js              # Travel analytics & persona profiling engine (201 lines)
├── assets/
│   └── images/                  # 12 high-resolution SVG fallback vector illustrations
│       ├── amalfi.svg           # Amalfi Coast coastal cliffscape illustration
│       ├── banff.svg            # Banff National Park alpine lake & peaks
│       ├── cappadocia.svg       # Cappadocia hot air balloon terrain
│       ├── iceland.svg          # Iceland volcanic waterfalls & aurora
│       ├── kerala.svg           # Kerala tranquil backwaters & palms
│       ├── kyoto.svg            # Kyoto traditional pagodas & cherry blossoms
│       ├── ladakh.svg           # Ladakh high-altitude monastery & pass
│       ├── marrakech.svg        # Marrakech Medina architectural arches
│       ├── queenstown.svg       # Queenstown southern alps & fiord
│       ├── santorini.svg        # Santorini Aegean caldera & blue domes
│       ├── swiss-alps.svg       # Swiss Alps Matterhorn & chalet slopes
│       └── uluwatu.svg          # Bali Uluwatu cliffside ocean temple
├── README.md                    # Technical documentation and deployment guide
└── POLARIS_Project_Report.docx  # Comprehensive academic project documentation"""
    from generate_report_helpers import add_code_block
    add_code_block(doc, code_tree)

    add_heading_2(doc, "4.2 Multi-Tier Front-End System Architecture")
    add_body_p(doc, "POLARIS implements a structured, multi-tier client-side architecture that cleanly decouples presentation, application logic, domain data, and persistence:")

    arch_diagram = """+-----------------------------------------------------------------------------------+
|                           PRESENTATION TIER (UI / DOM)                            |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | Header & Sticky Nav|  | Hero Editorial Header|  | Catalogue Filter Bar      |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | SVG World Map View |  | Destination Details  |  | Itinerary Builder Modal   |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | Favourites Grid    |  | Analytics Dashboard  |  | Toast Notifications       |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
+-----------------------------------------+-----------------------------------------+
                                          | Events / State Bindings
                                          v
+-----------------------------------------------------------------------------------+
|                        APPLICATION LOGIC & CONTROLLER TIER                        |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | PolarisApp         |  | PolarisDestinations  |  | PolarisPlanner            |  |
|  | - Hash Routing     |  | - Card Rendering     |  | - Trip Form Validation    |  |
|  | - Global Search    |  | - Multi-Attr Filter  |  | - Activity CRUD           |  |
|  | - Toast Dispatcher |  | - SVG Map & Drawer   |  | - Live Budget Calculator  |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  | PolarisInsights    |  | Event Delegation     |  | Keyboard Shortcuts        |  |
|  | - Continent Breakdown | - Click / Change     |  | - Ctrl+K Quick Search     |  |
|  | - Persona Scoring  |  | - Filter Dispatch    |  | - Escape Modal Close      |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
+-----------------------------------------+-----------------------------------------+
                                          |
                      +-------------------+-------------------+
                      v                                       v
+----------------------------------+     +------------------------------------------+
|        STATIC DATA TIER          |     |           PERSISTENCE TIER               |
|  +----------------------------+  |     |  +------------------------------------+  |
|  | POLARIS_DESTINATIONS (12)  |  |     |  | PolarisStorage Repository          |  |
|  | - Coordinates, Highlights  |  |     |  | - favourites: string[]             |  |
|  | - Suggested Activities     |  |     |  | - journeys: Journey[]              |  |
|  +----------------------------+  |     |  | - preferences: Object              |  |
|  | POLARIS_COLLECTIONS (6)    |  |     |  +------------------------------------+  |
|  | - Mountain, Island, Heritage| |     |  | HTML5 Browser localStorage         |  |
|  +----------------------------+  |     |  | - polaris_favourites_v1            |  |
|  | DEFAULT_SAMPLE_JOURNEYS    |  |     |  | - polaris_journeys_v1              |  |
|  +----------------------------+  |     |  | - polaris_preferences_v1           |  |
+----------------------------------+     +------------------------------------------+"""
    add_code_block(doc, arch_diagram)

    add_heading_2(doc, "4.3 End-to-End Application Workflow")
    add_body_p(doc, "The operational workflow of POLARIS guides the user seamlessly from initial exploration through to detailed itinerary budgeting and data persistence:")
    add_bullet_p(doc, "Application Initialization: On DOMContentLoaded, PolarisApp initializes hash routing, PolarisStorage validates localStorage schema versioning, and PolarisDestinations hydrates destination cards and the interactive map.", "1. Bootstrapping: ")
    add_bullet_p(doc, "Exploration & Search: Users explore destinations via the hero search bar, catalogue filters (continent, travel style, budget slider), or by panning across the interactive SVG world map.", "2. Discovery Phase: ")
    add_bullet_p(doc, "Inspection & Bookmarking: Clicking 'Explore Destination' opens a comprehensive modal with cultural overviews, highlights, and season advisories. Clicking the heart icon toggles bookmark status in localStorage.", "3. Cultural Deep Dive: ")
    add_bullet_p(doc, "Trip Generation: Clicking 'Plan Trip' transfers the destination context to the Travel Planner, initializing dates, group size, and auto-seeding destination activities.", "4. Journey Formulation: ")
    add_bullet_p(doc, "Itinerary Synthesis: Users open the Itinerary Manager to add, edit, or remove day-by-day activities. Each activity cost updates the progress bar and budget health indicator in real time.", "5. Granular Scheduling: ")
    add_bullet_p(doc, "Analytics & Persistence: Modifying journeys triggers immediate re-computation in PolarisInsights (updating continent distribution and travel personas) and commits serialized state to localStorage.", "6. Analytics & State Sync: ")

    add_heading_2(doc, "4.4 Data Schemas & State Specifications")
    add_body_p(doc, "POLARIS enforces strict object schemas across its memory cache and storage layers:")

    schema_headers = ["Entity Name", "Field Name", "Data Type", "Constraint / Description"]
    schema_data = [
        ["Destination", "id", "string", "Unique slug identifier (e.g., 'kyoto', 'santorini')"],
        ["Destination", "name / country", "string", "Display name and sovereign nation"],
        ["Destination", "continent", "string", "Enum: 'Asia', 'Europe', 'North America', 'Africa', 'Oceania'"],
        ["Destination", "dailyBudget", "number", "Estimated baseline daily living cost in USD"],
        ["Destination", "travelStyles", "string[]", "Array of style tags (e.g., ['Cultural', 'Slow Travel'])"],
        ["Destination", "coordinates", "object", "Spatial map coordinates { x: number, y: number } in SVG viewport"],
        ["Destination", "suggestedActivities", "object[]", "Array of seed activity objects { name, cost, category, day }"],
        ["Journey", "id", "string", "Unique trip timestamp slug (e.g., 'journey-1711200000000')"],
        ["Journey", "name", "string", "User-specified expedition title"],
        ["Journey", "destinationId", "string", "Foreign key referencing valid Destination.id"],
        ["Journey", "startDate / endDate", "string (YYYY-MM-DD)", "Trip timeframe validated such that endDate >= startDate"],
        ["Journey", "travellers", "number", "Party size (Integer >= 1)"],
        ["Journey", "budget", "number", "Total allocated expenditure cap in USD"],
        ["Journey", "activities", "Activity[]", "Array of granular day-by-day scheduled activities"],
        ["Activity", "id", "string", "Unique activity UUID/slug"],
        ["Activity", "day", "number", "Day index within itinerary (1 to total duration)"],
        ["Activity", "time", "string", "Scheduled start time (e.g., '09:00', '14:30')"],
        ["Activity", "name", "string", "Activity descriptive title"],
        ["Activity", "category", "string", "Category: 'Sightseeing', 'Food & Dining', 'Adventure', 'Culture'"],
        ["Activity", "cost", "number", "Individual event cost in USD (>= 0)"]
    ]
    create_styled_table(doc, schema_headers, schema_data, [1.1, 1.4, 1.1, 3.2])

    add_heading_2(doc, "4.5 JavaScript Modules & Event Bus Architecture")
    add_body_p(doc, "The front-end logic is organized into distinct namespaces that interact through direct API invocations and standard DOM event bubbling:")

    module_headers = ["Namespace / Object", "Source File", "Lines", "Key Responsibilities & Methods"]
    module_data = [
        ["PolarisApp", "js/app.js", "413", "Hash router (initNavigation), global search modal (initGlobalSearch), toast notification engine (showToast), demo reset modal."],
        ["PolarisData", "js/data.js", "854", "Static repository declaring POLARIS_DESTINATIONS (12 records), POLARIS_COLLECTIONS (6 records), and DEFAULT_SAMPLE_JOURNEYS."],
        ["PolarisStorage", "js/storage.js", "245", "Synchronous localStorage CRUD: getFavourites(), toggleFavourite(), getJourneys(), saveJourney(), deleteJourney(), resetToDefault()."],
        ["PolarisDestinations", "js/destinations.js", "960", "Catalogue grid rendering, multi-parameter filter engine, sorting algorithms, destination modal hydration, SVG world map and drawer."],
        ["PolarisPlanner", "js/planner.js", "880", "Trip form handling & validation, automated activity seeding, itinerary modal timeline rendering, activity CRUD, live budget tracking."],
        ["PolarisInsights", "js/insights.js", "201", "Analytics engine: compute continent distribution percentages, aggregate total expenditure commitments, evaluate travel persona archetype."]
    ]
    create_styled_table(doc, module_headers, module_data, [1.5, 1.2, 0.7, 3.4])

    add_heading_2(doc, "4.6 Validation & Domain Business Logic")
    add_body_p(doc, "POLARIS enforces rigorous domain rules across all user interactions to preserve data integrity:")
    add_bullet_p(doc, "When creating or modifying a journey, the end date cannot precede the start date. Furthermore, past departure dates trigger an immediate validation warning.", "Date Consistency Rule: ")
    add_bullet_p(doc, "Party size must be an integer between 1 and 20. Allocated budget must be a positive number ($50 to $1,000,000).", "Boundary Constraints: ")
    add_bullet_p(doc, "When adding or modifying an activity, the assigned day cannot exceed the total duration of the trip (calculated as (endDate - startDate) + 1). Activity cost must be non-negative.", "Activity Horizon Rule: ")
    add_bullet_p(doc, "The total planned expenditure (sum of all activity costs) is compared continuously against the journey's allocated budget. If expenses exceed 100%, the progress bar shifts to danger red and triggers an alert.", "Budget Health Indicator: ")

    doc.add_page_break()

print("Chapters 1 to 4 module created successfully.")
