"""
POLARIS Master Report Generation Script
Assembles and builds POLARIS_Project_Report.docx
"""

import os
import sys
import time
from docx import Document
from generate_report_helpers import add_header_footer
from generate_report_p1 import build_cover_page, build_toc_and_checklist, build_chapter_1, build_chapter_2, build_chapter_3, build_chapter_4
from generate_report_p2 import build_chapter_5, build_chapter_6, build_chapter_7, build_chapter_8
from generate_report_p3 import build_appendix_a, build_appendix_b, build_appendix_c

def main():
    print("==================================================")
    print("POLARIS Project Report Generator (.docx)")
    print("==================================================")
    start_time = time.time()
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_filename = os.path.join(base_dir, "POLARIS_Project_Report.docx")
    
    print(f"Base Directory: {base_dir}")
    print(f"Target Output: {output_filename}")
    
    doc = Document()
    
    print("Configuring document margins, headers, and footers...")
    add_header_footer(doc)
    
    print("Building Cover Page...")
    build_cover_page(doc)
    
    print("Building Table of Contents & Deliverables Checklist...")
    build_toc_and_checklist(doc)
    
    print("Building Chapter 1: Introduction...")
    build_chapter_1(doc)
    
    print("Building Chapter 2: Case Study & Requirements Analysis...")
    build_chapter_2(doc)
    
    print("Building Chapter 3: Technology Stack & Architectural Decisions...")
    build_chapter_3(doc)
    
    print("Building Chapter 4: System Architecture & Detailed Design...")
    build_chapter_4(doc)
    
    print("Building Chapter 5: Implementation & Visual Interface Walkthrough...")
    build_chapter_5(doc)
    
    print("Building Chapter 6: Comprehensive Front-End Testing Report...")
    build_chapter_6(doc)
    
    print("Building Chapter 7: Limitations & Future Research Roadmap...")
    build_chapter_7(doc)
    
    print("Building Chapter 8: Conclusion...")
    build_chapter_8(doc)
    
    print("Building Appendix A: Complete Verbatim Source Code...")
    build_appendix_a(doc, base_dir)
    
    print("Building Appendix B: Operational Deployment & Execution Guide...")
    build_appendix_b(doc)
    
    print("Building Appendix C: Project Folder Structure & Asset Manifest...")
    build_appendix_c(doc, base_dir)
    
    print("Saving document to disk...")
    doc.save(output_filename)
    
    elapsed = time.time() - start_time
    file_size_mb = os.path.getsize(output_filename) / (1024 * 1024)
    print(f"SUCCESS: Report generated successfully in {elapsed:.2f} seconds!")
    print(f"Output File: {output_filename}")
    print(f"File Size: {file_size_mb:.2f} MB")
    print("==================================================")

if __name__ == "__main__":
    main()
