"""
POLARIS Project Report - Appendices A, B, and C Generator
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from generate_report_helpers import (
    COLOR_NAVY, COLOR_GOLD, COLOR_BODY, COLOR_MUTED, HEX_NAVY, HEX_GOLD, HEX_LIGHT_GRAY,
    add_heading_1, add_heading_2, add_heading_3, add_body_p, add_bullet_p,
    add_callout_box, create_styled_table, add_code_block
)

def add_full_code_file(doc, title, filepath, base_dir="."):
    full_path = os.path.join(base_dir, filepath)
    add_heading_2(doc, title)
    
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            code_text = f.read()
        line_count = len(code_text.splitlines())
        byte_size = len(code_text.encode("utf-8"))
        add_body_p(doc, f"File Location: {filepath} | Total Lines: {line_count:,} lines | Size: {byte_size:,} bytes | Status: Complete & Unaltered")
        add_code_block(doc, code_text)
    else:
        add_body_p(doc, f"File Location: {filepath} | Status: File not found at path")
        add_code_block(doc, f"// File not found: {filepath}")

def build_appendix_a(doc, base_dir="."):
    add_heading_1(doc, "APPENDIX A: COMPLETE VERBATIM SOURCE CODE LISTINGS")
    add_body_p(doc, "In accordance with academic mini-project documentation standards, this appendix provides the complete, unabridged, verbatim source code for all primary modules comprising the POLARIS application. No logic has been truncated or omitted.")

    files = [
        ("A.1 index.html — Single-Page Application Markup & Component Containers", "index.html"),
        ("A.2 css/style.css — Luxury Editorial Design System & Responsive Stylesheet", "css/style.css"),
        ("A.3 js/app.js — Application Bootstrap, SPA Routing & Global Search Controller", "js/app.js"),
        ("A.4 js/data.js — Static Catalogue Dataset: Destinations, Collections & Seed Journeys", "js/data.js"),
        ("A.5 js/destinations.js — Catalogue Rendering, Filters, Details Modal & SVG World Map", "js/destinations.js"),
        ("A.6 js/planner.js — Trip Creation, Itinerary Manager, Activity CRUD & Budget Engine", "js/planner.js"),
        ("A.7 js/storage.js — LocalStorage Repository, Versioning & State Management", "js/storage.js"),
        ("A.8 js/insights.js — Travel Analytics & Persona Profiling Engine", "js/insights.js")
    ]

    for title, rel_path in files:
        add_full_code_file(doc, title, rel_path, base_dir)
        doc.add_page_break()

def build_appendix_b(doc):
    add_heading_1(doc, "APPENDIX B: OPERATIONAL DEPLOYMENT & EXECUTION GUIDE")
    add_body_p(doc, "POLARIS is designed as a zero-dependency, standards-compliant web application. It requires no complex build systems, transpilation steps, or package installation to run.")

    add_heading_2(doc, "B.1 System Prerequisites")
    add_bullet_p(doc, "Any modern standards-compliant web browser supporting ES6 JavaScript, HTML5 Web Storage, and SVG rendering: Google Chrome (version 100+), Mozilla Firefox (version 100+), Microsoft Edge (version 100+), or Apple Safari (version 15+).", "Supported Web Browsers: ")
    add_bullet_p(doc, "Python 3.x (recommended for quick local hosting), Node.js (optional), or Visual Studio Code with the 'Live Server' extension.", "Local Web Server: ")

    add_heading_2(doc, "B.2 Method 1: Execution via Visual Studio Code Live Server (Recommended)")
    add_body_p(doc, "1. Launch Visual Studio Code.")
    add_body_p(doc, "2. Select 'File' -> 'Open Folder...' and navigate to the root directory `POLARIS`.")
    add_body_p(doc, "3. Ensure the 'Live Server' extension (by Ritwick Dey) is installed from the Extensions Marketplace.")
    add_body_p(doc, "4. Right-click `index.html` in the file explorer and select 'Open with Live Server'.")
    add_body_p(doc, "5. The browser will automatically open at `http://127.0.0.1:5500/index.html` with hot-reloading enabled.")

    add_heading_2(doc, "B.3 Method 2: Execution via Python Built-in HTTP Server")
    add_body_p(doc, "1. Open a terminal or command prompt (PowerShell on Windows, Terminal on macOS/Linux).")
    add_body_p(doc, "2. Navigate to the project root directory:")
    add_code_block(doc, "cd \"d:\\Frontend desgin\\Polaris\"")
    add_body_p(doc, "3. Execute Python's built-in HTTP server:")
    add_code_block(doc, "python -m http.server 8000")
    add_body_p(doc, "4. Open your web browser and navigate to:")
    add_code_block(doc, "http://localhost:8000")

    add_heading_2(doc, "B.4 Method 3: Execution via Node.js `npx serve`")
    add_body_p(doc, "1. In the terminal, navigate to the project directory and execute:")
    add_code_block(doc, "npx serve -l 3000")
    add_body_p(doc, "2. Navigate to `http://localhost:3000`.")

    add_heading_2(doc, "B.5 Verification & Troubleshooting")
    add_bullet_p(doc, "If destination photos do not appear due to network firewalls or offline execution, the dual-tier image fallback immediately swaps broken URLs for the local vector SVGs stored in assets/images/*.svg.", "Offline Fallback Graphics: ")
    add_bullet_p(doc, "If data appears out of sync or modified, click the 'Reset Demo Data' button in the application footer or top navigation to re-seed pristine records.", "Local Storage Reset: ")

    doc.add_page_break()

def build_appendix_c(doc, base_dir="."):
    add_heading_1(doc, "APPENDIX C: PROJECT FOLDER STRUCTURE & ASSET MANIFEST")
    add_body_p(doc, "This appendix provides an official audit and verification manifest of all production source files, styles, scripts, and vector assets comprising the POLARIS distribution.")

    manifest_headers = ["File Path / Component", "Role & Description", "Lines of Code", "File Size"]
    
    files_to_check = [
        ("index.html", "Core SPA Application Markup & Modals"),
        ("css/style.css", "Design System & Responsive Styles"),
        ("js/app.js", "Application Controller & Search Engine"),
        ("js/data.js", "Static Catalogue & Collections Data"),
        ("js/destinations.js", "Catalogue & SVG Map Controller"),
        ("js/planner.js", "Itinerary Planner & Budget Engine"),
        ("js/storage.js", "LocalStorage Repository"),
        ("js/insights.js", "Travel Analytics & Profiler"),
        ("README.md", "Project Overview & Quickstart Guide")
    ]

    manifest_data = []
    total_lines = 0
    total_bytes = 0

    for rel_path, desc in files_to_check:
        full_p = os.path.join(base_dir, rel_path)
        if os.path.exists(full_p):
            with open(full_p, "r", encoding="utf-8") as f:
                content = f.read()
            lines = len(content.splitlines())
            size = len(content.encode("utf-8"))
            total_lines += lines
            total_bytes += size
            manifest_data.append([rel_path, desc, f"{lines:,}", f"{size / 1024:.1f} KB"])
        else:
            manifest_data.append([rel_path, desc, "N/A", "N/A"])

    # Add 12 SVGs summary
    svg_dir = os.path.join(base_dir, "assets", "images")
    if os.path.exists(svg_dir):
        svg_files = [f for f in os.listdir(svg_dir) if f.endswith(".svg")]
        svg_size = sum(os.path.getsize(os.path.join(svg_dir, f)) for f in svg_files)
        total_bytes += svg_size
        manifest_data.append([f"assets/images/ (12 SVGs)", "Fallback Vector Illustrations", "Vector Paths", f"{svg_size / 1024:.1f} KB"])

    create_styled_table(doc, manifest_headers, manifest_data, [1.8, 2.6, 1.2, 1.2])

    summary_headers = ["Project Metric", "Verified Measurement"]
    summary_data = [
        ["Total Source Code Lines (HTML + CSS + JS)", f"{total_lines:,} Lines"],
        ["Total Package Disk Footprint", f"{total_bytes / (1024 * 1024):.2f} MB"],
        ["Core JavaScript Modules", "6 Independent Namespaces"],
        ["Curated Destinations in Catalogue", "12 Worldwide Locations"],
        ["Curated Travel Collections", "6 Editorial Themes"],
        ["Tested Breakpoint Ranges", "Mobile (<576px), Tablet (768px), Desktop (992px+)"]
    ]
    create_styled_table(doc, summary_headers, summary_data, [3.4, 3.4])

print("Appendices module created successfully.")

