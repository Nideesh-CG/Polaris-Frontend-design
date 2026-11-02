import os
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOT_DIR = os.path.join(BASE_DIR, "report_screenshots")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 8766

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

server = socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler)
t = threading.Thread(target=server.serve_forever)
t.daemon = True
t.start()
time.sleep(0.5)

url = f"http://127.0.0.1:{PORT}/index.html"

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1.5)
    page = context.new_page()
    page.goto(url)
    page.wait_for_timeout(800)
    
    # 10. Global Search Modal
    print("Capturing 5.10 Global Search...")
    page.click("button[data-bs-target='#globalSearchModal']")
    page.wait_for_timeout(500)
    page.fill("#globalSearchInput", "Santorini")
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_10_search.png"))
    
    # 11. Mobile Responsive
    print("Capturing 5.11 Mobile Responsive...")
    context_mobile = browser.new_context(viewport={"width": 412, "height": 850}, device_scale_factor=1.5)
    page_m = context_mobile.new_page()
    page_m.goto(url + "#destinations")
    page_m.wait_for_timeout(800)
    page_m.screenshot(path=os.path.join(SCREENSHOT_DIR, "fig_5_11_mobile.png"), clip={"x": 0, "y": 0, "width": 412, "height": 850})
    
    browser.close()
    print("Successfully captured remaining screenshots!")
