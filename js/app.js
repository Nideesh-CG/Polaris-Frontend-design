/**
 * POLARIS — Application Core, SPA Navigation, Global Search & Event Orchestrator
 * Brand Tagline: "Find your next somewhere."
 */

const PolarisApp = {
  currentSection: 'home',

  /**
   * Initializes the entire POLARIS application
   */
  init() {
    // 1. Initialize Sub-modules
    if (typeof PolarisDestinations !== 'undefined') PolarisDestinations.init();
    if (typeof PolarisPlanner !== 'undefined') PolarisPlanner.init();
    if (typeof PolarisInsights !== 'undefined') PolarisInsights.init();

    // 2. Setup SPA Navigation
    this.bindNavigationEvents();
    this.handleInitialRoute();

    // 3. Setup Global Search Modal
    this.bindGlobalSearch();

    // 4. Setup Hero Search Bar
    this.bindHeroSearch();

    // 5. Setup Reset Demo Data Modal & Triggers
    this.bindResetDemoEvents();

    // 6. Global Keyboard Shortcuts
    this.bindKeyboardShortcuts();

    console.log('[POLARIS] Application initialized successfully.');
  },

  /* ==========================================================================
     SPA NAVIGATION ROUTING
     ========================================================================== */

  /**
   * Handles hash changes and initial page load route
   */
  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '').trim();
    const validSections = ['home', 'explore', 'destinations', 'collections', 'planner', 'journeys', 'favourites', 'insights'];
    
    if (hash && validSections.includes(hash)) {
      this.navigateTo(hash, false);
    } else {
      this.navigateTo('home', false);
    }

    // Listen to browser back/forward buttons
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '').trim();
      if (newHash && validSections.includes(newHash) && newHash !== this.currentSection) {
        this.navigateTo(newHash, false);
      }
    });
  },

  /**
   * Binds click events on all SPA navigation links
   */
  bindNavigationEvents() {
    const navLinks = document.querySelectorAll('[data-nav-target]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-nav-target');
        if (targetSection) {
          this.navigateTo(targetSection);
        }
      });
    });
  },

  /**
   * Switches views to the target section without a full-page reload
   */
  navigateTo(sectionId, updateHash = true) {
    const validSections = ['home', 'explore', 'destinations', 'collections', 'planner', 'journeys', 'favourites', 'insights'];
    if (!validSections.includes(sectionId)) sectionId = 'home';

    this.currentSection = sectionId;

    // Dismiss any open modal and backdrops to ensure clean view switching
    document.querySelectorAll('.modal.show').forEach(m => {
      const instance = bootstrap.Modal.getInstance(m);
      if (instance) instance.hide();
    });
    document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');

    // 1. Update Section Visibility
    validSections.forEach(id => {
      const secEl = document.getElementById(id);
      if (secEl) {
        if (id === sectionId) {
          secEl.classList.remove('d-none');
          secEl.classList.add('fade-in-section');
        } else {
          secEl.classList.add('d-none');
          secEl.classList.remove('fade-in-section');
        }
      }
    });

    // 2. Update Navbar Active State
    document.querySelectorAll('.nav-link[data-nav-target]').forEach(link => {
      if (link.getAttribute('data-nav-target') === sectionId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // 3. Update URL Hash
    if (updateHash) {
      window.location.hash = sectionId;
    }

    // 4. Close mobile navbar collapse if open
    const navbarCollapse = document.getElementById('polarisNavbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }

    // 5. Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 6. Section-specific refreshes
    if (sectionId === 'destinations' && typeof PolarisDestinations !== 'undefined') {
      PolarisDestinations.renderDestinations();
    } else if (sectionId === 'favourites' && typeof PolarisDestinations !== 'undefined') {
      PolarisDestinations.renderFavouritesView();
    } else if (sectionId === 'journeys' && typeof PolarisPlanner !== 'undefined') {
      PolarisPlanner.renderJourneys();
    } else if (sectionId === 'insights' && typeof PolarisInsights !== 'undefined') {
      PolarisInsights.refresh();
    }
  },

  /* ==========================================================================
     GLOBAL DESTINATION SEARCH (SECTION 15)
     ========================================================================== */

  bindGlobalSearch() {
    const searchModal = document.getElementById('globalSearchModal');
    const searchInput = document.getElementById('globalSearchInput');
    const resultsContainer = document.getElementById('globalSearchResultsContainer');
    const clearBtn = document.getElementById('globalSearchClearBtn');

    if (!searchInput || !resultsContainer) return;

    const performSearch = () => {
      const q = searchInput.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.style.display = q ? 'block' : 'none';
      }

      if (!q) {
        resultsContainer.innerHTML = `
          <div class="p-4 text-center text-muted fs-sm">
            Type a destination name, country, continent, or travel style to search.
          </div>
        `;
        return;
      }

      const matches = POLARIS_DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.continent.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.travelStyles.some(s => s.toLowerCase().includes(q))
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="p-4 text-center">
            <i class="bi bi-search text-muted fs-3 mb-2 d-block"></i>
            <p class="text-muted fs-sm mb-0">No destinations matched "<strong>${escapeHtml(q)}</strong>".</p>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = matches.map(dest => `
        <div 
          class="global-search-result-item p-3 border-bottom d-flex align-items-center gap-3 cursor-pointer"
          onclick="PolarisApp.handleGlobalSearchResultSelect('${dest.id}')"
          role="button"
          tabindex="0"
        >
          <img 
            src="${dest.image}" 
            alt="${dest.name}" 
            class="rounded-2 object-fit-cover" 
            style="width: 54px; height: 54px;" 
            onerror="this.onerror=null; this.src='assets/images/${dest.id}.svg';" 
          />
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-baseline">
              <h5 class="fs-6 font-serif mb-0 text-dark">${dest.name}</h5>
              <span class="fs-xs text-accent fw-bold">From $${dest.dailyBudget}/day</span>
            </div>
            <p class="fs-xs text-muted mb-0">${dest.country} • ${dest.continent} &bull; ${dest.travelStyles.join(', ')}</p>
          </div>
          <i class="bi bi-chevron-right text-muted fs-sm"></i>
        </div>
      `).join('');
    };

    searchInput.addEventListener('input', performSearch);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
      });
    }

    // Auto-focus search input when modal opens
    if (searchModal) {
      searchModal.addEventListener('shown.bs.modal', () => {
        searchInput.focus();
      });
    }
  },

  /**
   * Action when selecting a search result from global modal
   */
  handleGlobalSearchResultSelect(destinationId) {
    const searchModal = document.getElementById('globalSearchModal');
    if (searchModal) {
      const bsModal = bootstrap.Modal.getInstance(searchModal);
      if (bsModal) bsModal.hide();
    }

    // Open destination details directly
    if (typeof PolarisDestinations !== 'undefined') {
      PolarisDestinations.openDetailsModal(destinationId);
    }
  },

  /* ==========================================================================
     HERO SEARCH WIDGET (SECTION 4)
     ========================================================================== */

  bindHeroSearch() {
    const heroForm = document.getElementById('heroSearchForm');
    if (!heroForm) return;

    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const queryInput = document.getElementById('heroSearchDestinationInput');
      const styleSelect = document.getElementById('heroSearchStyleSelect');
      const budgetSelect = document.getElementById('heroSearchBudgetSelect');

      const q = queryInput ? queryInput.value.trim() : '';
      const style = styleSelect ? styleSelect.value : 'all';
      const budget = budgetSelect ? budgetSelect.value : 'all';

      // Transfer values to Destinations catalogue filters
      if (typeof PolarisDestinations !== 'undefined') {
        PolarisDestinations.filters.query = q.toLowerCase();
        PolarisDestinations.filters.style = style;
        PolarisDestinations.filters.budget = budget;

        // Sync input values in catalogue UI
        const catInput = document.getElementById('destinationSearchInput');
        const catStyle = document.getElementById('styleFilterSelect');
        const catBudget = document.getElementById('budgetFilterSelect');

        if (catInput) catInput.value = q;
        if (catStyle) catStyle.value = style;
        if (catBudget) catBudget.value = budget;

        PolarisDestinations.renderDestinations();
      }

      // Navigate to Destinations section
      this.navigateTo('destinations');
    });
  },

  /* ==========================================================================
     RESET DEMO DATA MODAL
     ========================================================================== */

  bindResetDemoEvents() {
    const confirmResetBtn = document.getElementById('confirmResetDemoDataBtn');
    if (confirmResetBtn) {
      confirmResetBtn.addEventListener('click', () => {
        PolarisStorage.resetDemoData();

        // Refresh all components
        if (typeof PolarisDestinations !== 'undefined') {
          PolarisDestinations.resetFilters();
          PolarisDestinations.updateGlobalFavouritesCounter();
          PolarisDestinations.renderFavouritesView();
        }
        if (typeof PolarisPlanner !== 'undefined') {
          PolarisPlanner.renderJourneys();
        }
        if (typeof PolarisInsights !== 'undefined') {
          PolarisInsights.refresh();
        }

        // Close modal
        const modalEl = document.getElementById('resetDataConfirmModal');
        if (modalEl) {
          const bsModal = bootstrap.Modal.getInstance(modalEl);
          if (bsModal) bsModal.hide();
        }

        this.showToast('Demo Data Reset', 'Initial luxury destinations, favourites, and itineraries restored.', 'info');
      });
    }
  },

  /* ==========================================================================
     GLOBAL KEYBOARD SHORTCUTS
     ========================================================================== */

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K or '/' when not typing in an input
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchModal = document.getElementById('globalSearchModal');
        if (searchModal) {
          const bsModal = bootstrap.Modal.getOrCreateInstance(searchModal);
          bsModal.show();
        }
      }
    });
  },

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */

  /**
   * Displays a luxury animated toast notification
   */
  showToast(title, message, type = 'info') {
    const container = document.getElementById('polarisToastContainer');
    if (!container) return;

    let iconClass = 'bi-info-circle text-accent';
    if (type === 'success') iconClass = 'bi-check-circle-fill text-success';
    if (type === 'warning') iconClass = 'bi-exclamation-triangle-fill text-warning';
    if (type === 'danger') iconClass = 'bi-x-circle-fill text-danger';

    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast polaris-toast shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
        <div class="toast-header bg-white border-bottom">
          <i class="bi ${iconClass} me-2 fs-5"></i>
          <strong class="me-auto font-serif text-dark">${title}</strong>
          <small class="text-muted">Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-white fs-xs text-muted">
          ${message}
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHtml);

    const toastEl = document.getElementById(toastId);
    if (toastEl) {
      const bsToast = new bootstrap.Toast(toastEl);
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
    }
  }
};

/**
 * Utility: Safe HTML Escaping
 */
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PolarisApp.init();
});
