"""
Captures real, pixel-perfect screenshots of the running POLARIS application using Playwright
with an embedded HTTP server thread.
"""
import os
import sys
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOT_DIR = os.path.join(BASE_DIR, "report_screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 8765

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)
    def log_message(self, format, *args):
        pass  # suppress console log noise

def start_server():
    server = socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler)
    t = threading.Thread(target=server.serve_forever)
    t.daemon = True
    t.start()
    return server

def capture_all():
    print(f"Starting local HTTP server on port {PORT}...")
    server = start_server()
    time.sleep(0.5)
    
    url = f"http://127.0.0.1:{PORT}/index.html"
    print(f"Connecting to {url}...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1.5)
        page = context.new_page()
        
        # 1. Home / Hero
        print("1. Capturing Home / Hero...")
        page.goto(url + "#home")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_1_home.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 820})
        
        # 2. Destinations Catalogue with Filters
        print("2. Capturing Destinations Catalogue...")
        page.goto(url + "#destinations")
        page.wait_for_timeout(800)
        page.select_option("#continentFilterSelect", "Europe")
        page.dispatch_event("#continentFilterSelect", "change")
        page.wait_for_timeout(600)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_2_destinations.png"), clip={"x": 0, "y": 70, "width": 1440, "height": 820})
        # Reset filter
        page.select_option("#continentFilterSelect", "all")
        page.dispatch_event("#continentFilterSelect", "change")
        page.wait_for_timeout(300)
        
        # 3. Destination Details Modal
        print("3. Capturing Destination Details Modal...")
        page.evaluate("PolarisDestinations.openDetailsModal('kyoto')")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_3_details_modal.png"))
        page.evaluate("bootstrap.Modal.getInstance(document.getElementById('destinationDetailsModal')).hide()")
        page.wait_for_timeout(500)
        
        # 4. Interactive Map & Selected Destination Drawer
        print("4. Capturing Interactive Map...")
        page.goto(url + "#map")
        page.wait_for_timeout(800)
        page.evaluate("PolarisDestinations.selectMapDestination('uluwatu')")
        page.wait_for_timeout(600)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_4_map.png"), clip={"x": 0, "y": 70, "width": 1440, "height": 820})
        
        # 5. Travel Collections
        print("5. Capturing Travel Collections...")
        page.goto(url + "#collections")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_5_collections.png"), clip={"x": 0, "y": 70, "width": 1440, "height": 820})
        
        # 6. Travel Planner Form
        print("6. Capturing Travel Planner...")
        page.goto(url + "#planner")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_6_planner.png"), clip={"x": 0, "y": 70, "width": 1440, "height": 820})
        
        # 7. Itinerary Management Modal & Budget Estimation
        print("7. Capturing Itinerary Management...")
        journeys = page.evaluate("PolarisStorage.getJourneys()")
        if journeys and len(journeys) > 0:
            jid = journeys[0]['id']
            page.evaluate(f"PolarisPlanner.openItineraryManager('{jid}')")
            page.wait_for_timeout(800)
            page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_7_itinerary.png"))
            page.evaluate("bootstrap.Modal.getInstance(document.getElementById('itineraryManagerModal')).hide()")
            page.wait_for_timeout(500)
            
        # 8. Saved Journeys & Favourites
        print("8. Capturing Saved Journeys & Favourites...")
        page.goto(url + "#favourites")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_8_favourites.png"), clip={"x": 0, "y": 70, "width": 1440, "height": 820})
        
        # 9. Travel Insights Dashboard
        print("9. Capturing Travel Insights...")
        page.goto(url + "#insights")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_9_insights.png"), clip={"x": 0, "y": 70, "width": 1440, "height": 820})
        
        # 10. Global Search Modal (Ctrl+K)
        print("10. Capturing Global Search Modal...")
        page.evaluate("bootstrap.Modal.getOrCreateInstance(document.getElementById('searchModal')).show()")
        page.wait_for_timeout(400)
        page.fill("#globalSearchInput", "Santorini")
        page.wait_for_timeout(500)
        page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_10_search.png"))
        page.evaluate("bootstrap.Modal.getInstance(document.getElementById('searchModal')).hide()")
        page.wait_for_timeout(400)
        
        # 11. Mobile Viewport Responsive
        print("11. Capturing Mobile Responsive Viewport...")
        context_mobile = browser.new_context(viewport={"width": 412, "height": 850}, device_scale_factor=1.5)
        page_m = context_mobile.new_page()
        page_m.goto(url + "#destinations")
        page_m.wait_for_timeout(800)
        page_m.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_11_mobile.png"), clip={"x": 0, "y": 0, "width": 412, "height": 850})
        
        browser.close()
        print("SUCCESS: All 11 screenshots successfully captured and saved to report_screenshots/!")

if __name__ == "__main__":
    capture_all()
