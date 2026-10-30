/**
 * POLARIS — Destination Discovery, Filtering, Details & Interactive SVG Map
 * 
 * Manages catalogue rendering, dynamic multi-attribute filtering, sorting,
 * modal details views, favourite toggles, and the responsive interactive world map.
 */

const PolarisDestinations = {
  // Current active filter state
  filters: {
    query: '',
    continent: 'all',
    style: 'all',
    budget: 'all',
    sortBy: 'name-asc'
  },

  activeMapDestinationId: null,

  /**
   * Initializes destination listeners, filters, catalogue, and map
   */
  init() {
    this.bindFilterEvents();
    this.renderDestinations();
    this.renderCollections();
    this.initWorldMap();
    this.updateGlobalFavouritesCounter();
  },

  /**
   * Binds event listeners for search input, filter selects, and sort
   */
  bindFilterEvents() {
    const searchInput = document.getElementById('destinationSearchInput');
    const continentSelect = document.getElementById('continentFilterSelect');
    const styleSelect = document.getElementById('styleFilterSelect');
    const budgetSelect = document.getElementById('budgetFilterSelect');
    const sortSelect = document.getElementById('sortFilterSelect');
    const resetBtn = document.getElementById('resetFiltersBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim().toLowerCase();
        this.renderDestinations();
      });
      // Handle Enter and Escape
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          this.filters.query = '';
          this.renderDestinations();
        }
      });
    }

    if (continentSelect) {
      continentSelect.addEventListener('change', (e) => {
        this.filters.continent = e.target.value;
        this.renderDestinations();
      });
    }

    if (styleSelect) {
      styleSelect.addEventListener('change', (e) => {
        this.filters.style = e.target.value;
        this.renderDestinations();
      });
    }

    if (budgetSelect) {
      budgetSelect.addEventListener('change', (e) => {
        this.filters.budget = e.target.value;
        this.renderDestinations();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filters.sortBy = e.target.value;
        this.renderDestinations();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
  },

  /**
   * Resets all search and filter fields
   */
  resetFilters() {
    this.filters = {
      query: '',
      continent: 'all',
      style: 'all',
      budget: 'all',
      sortBy: 'name-asc'
    };

    const searchInput = document.getElementById('destinationSearchInput');
    const continentSelect = document.getElementById('continentFilterSelect');
    const styleSelect = document.getElementById('styleFilterSelect');
    const budgetSelect = document.getElementById('budgetFilterSelect');
    const sortSelect = document.getElementById('sortFilterSelect');

    if (searchInput) searchInput.value = '';
    if (continentSelect) continentSelect.value = 'all';
    if (styleSelect) styleSelect.value = 'all';
    if (budgetSelect) budgetSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'name-asc';

    this.renderDestinations();
  },

  /**
   * Filters and sorts destination list based on state
   */
  getFilteredDestinations() {
    return POLARIS_DESTINATIONS.filter(dest => {
      // 1. Text Search (Matches name, country, continent, styles, description)
      if (this.filters.query) {
        const q = this.filters.query;
        const nameMatch = dest.name.toLowerCase().includes(q);
        const countryMatch = dest.country.toLowerCase().includes(q);
        const continentMatch = dest.continent.toLowerCase().includes(q);
        const descMatch = dest.description.toLowerCase().includes(q);
        const styleMatch = dest.travelStyles.some(s => s.toLowerCase().includes(q));
        if (!nameMatch && !countryMatch && !continentMatch && !descMatch && !styleMatch) {
          return false;
        }
      }

      // 2. Continent Filter
      if (this.filters.continent !== 'all' && dest.continent.toLowerCase() !== this.filters.continent.toLowerCase()) {
        return false;
      }

      // 3. Travel Style Filter
      if (this.filters.style !== 'all') {
        const hasStyle = dest.travelStyles.some(s => s.toLowerCase() === this.filters.style.toLowerCase());
        if (!hasStyle) return false;
      }

      // 4. Budget Range Filter
      if (this.filters.budget !== 'all') {
        const b = dest.dailyBudget;
        if (this.filters.budget === 'under-100' && b >= 100) return false;
        if (this.filters.budget === '100-200' && (b < 100 || b > 200)) return false;
        if (this.filters.budget === '200-300' && (b < 200 || b > 300)) return false;
        if (this.filters.budget === 'over-300' && b <= 300) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic
      switch (this.filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'budget-asc':
          return a.dailyBudget - b.dailyBudget;
        case 'budget-desc':
          return b.dailyBudget - a.dailyBudget;
        default:
          return 0;
      }
    });
  },

  /**
   * Renders the destination grid in the catalogue section
   */
  renderDestinations() {
    const grid = document.getElementById('destinationsGrid');
    const countBadge = document.getElementById('destinationResultsCount');
    if (!grid) return;

    const filtered = this.getFilteredDestinations();

    if (countBadge) {
      countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'Destination' : 'Destinations'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="empty-state-editorial p-5 rounded-3">
            <i class="bi bi-compass display-4 text-accent mb-3 d-block"></i>
            <h3 class="font-serif fs-3 mb-2">No Destinations Found</h3>
            <p class="text-muted max-w-md mx-auto mb-4">
              We couldn't find any destinations matching your current combination of filters. Try widening your criteria or reset the search.
            </p>
            <button class="btn btn-polaris-primary" onclick="PolarisDestinations.resetFilters()">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Reset All Filters
            </button>
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(dest => this.createDestinationCardHtml(dest)).join('');
  },

  /**
   * Generates HTML markup for a single destination card
   */
  createDestinationCardHtml(dest) {
    const isFav = PolarisStorage.isFavourite(dest.id);
    const styleBadges = dest.travelStyles
      .slice(0, 2)
      .map(s => `<span class="badge-tag-pill">${s}</span>`)
      .join('');

    return `
      <div class="col-12 col-md-6 col-lg-4 mb-4" data-destination-id="${dest.id}">
        <article class="polaris-card h-100 d-flex flex-column" aria-label="${dest.name}, ${dest.country}">
          <div class="polaris-card-image-wrap position-relative overflow-hidden">
            <img 
              src="${dest.image}" 
              alt="${dest.name}, ${dest.country}" 
              class="polaris-card-img" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='assets/images/${dest.id}.svg';" 
            />
            <div class="polaris-card-badges position-absolute top-0 start-0 p-3 d-flex flex-wrap gap-1">
              <span class="badge-tag-continent">${dest.continent}</span>
              ${styleBadges}
            </div>
            <button 
              type="button" 
              class="btn-fav-round position-absolute top-0 end-0 m-3 ${isFav ? 'active' : ''}" 
              onclick="PolarisDestinations.handleFavouriteToggle(event, '${dest.id}')"
              aria-label="${isFav ? 'Remove from favourites' : 'Save to favourites'}"
              title="${isFav ? 'Saved in Favourites' : 'Save to Favourites'}"
            >
              <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
          </div>

          <div class="polaris-card-body p-4 d-flex flex-column flex-grow-1">
            <div class="d-flex justify-content-between align-items-baseline mb-2">
              <span class="polaris-country-subheading">${dest.country}</span>
              <span class="polaris-card-budget text-accent fw-semibold">
                From $${dest.dailyBudget}<span class="text-muted fw-normal fs-xs"> / day</span>
              </span>
            </div>
            
            <h3 class="polaris-card-title font-serif fs-4 mb-2">${dest.name}</h3>
            <p class="polaris-card-desc text-muted fs-sm mb-4 flex-grow-1">${dest.description}</p>
            
            <div class="polaris-card-footer pt-3 border-top d-flex gap-2">
              <button 
                type="button" 
                class="btn btn-polaris-outline flex-grow-1 btn-sm" 
                onclick="PolarisDestinations.openDetailsModal('${dest.id}')"
                aria-label="View details for ${dest.name}"
              >
                View Details
              </button>
              <button 
                type="button" 
                class="btn btn-polaris-accent btn-sm px-3" 
                onclick="PolarisDestinations.handleAddToJourney('${dest.id}')"
                aria-label="Plan journey to ${dest.name}"
                title="Plan a journey to ${dest.name}"
              >
                <i class="bi bi-calendar-plus me-1"></i>Plan
              </button>
            </div>
          </div>
        </article>
      </div>
    `;
  },

  /**
   * Handles toggle favourite click from card, modal, or map
   */
  handleFavouriteToggle(event, destinationId) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const { isFavourite, count } = PolarisStorage.toggleFavourite(destinationId);
    const dest = POLARIS_DESTINATIONS.find(d => d.id === destinationId);
    const destName = dest ? dest.name : 'Destination';

    // Show toast message
    if (typeof PolarisApp !== 'undefined' && PolarisApp.showToast) {
      PolarisApp.showToast(
        isFavourite ? 'Added to Favourites' : 'Removed from Favourites',
        `${destName} has been ${isFavourite ? 'saved to' : 'removed from'} your curated list.`,
        isFavourite ? 'success' : 'info'
      );
    }

    // Refresh UI components
    this.updateGlobalFavouritesCounter();
    this.renderDestinations();
    this.renderFavouritesView();

    // If details modal or map drawer is open, update its button state
    this.updateModalFavButton(destinationId, isFavourite);
    if (this.activeMapDestinationId === destinationId) {
      this.updateMapDrawerFavButton(destinationId, isFavourite);
    }

    // Refresh travel insights
    if (typeof PolarisInsights !== 'undefined' && PolarisInsights.refresh) {
      PolarisInsights.refresh();
    }
  },

  /**
   * Updates navbar favourites counter badge
   */
  updateGlobalFavouritesCounter() {
    const list = PolarisStorage.getFavourites();
    const badges = document.querySelectorAll('.favourites-count-badge');
    badges.forEach(badge => {
      badge.textContent = list.length;
      badge.style.display = list.length > 0 ? 'inline-block' : 'none';
    });
  },

  /**
   * Opens the destination details modal and populates rich fields
   */
  openDetailsModal(destinationId) {
    const dest = POLARIS_DESTINATIONS.find(d => d.id === destinationId);
    if (!dest) return;

    const modalEl = document.getElementById('destinationDetailsModal');
    if (!modalEl) return;

    const isFav = PolarisStorage.isFavourite(dest.id);

    // Populate modal fields
    document.getElementById('modalDestTitle').textContent = dest.name;
    document.getElementById('modalDestCountry').textContent = `${dest.country} • ${dest.continent}`;
    document.getElementById('modalDestOverview').textContent = dest.overview;
    document.getElementById('modalDestSeason').textContent = dest.bestSeason;
    document.getElementById('modalDestDuration').textContent = dest.duration;
    document.getElementById('modalDestBudget').textContent = `~$${dest.dailyBudget} USD / day (Illustrative)`;

    // Modal Image
    const modalImg = document.getElementById('modalDestImage');
    if (modalImg) {
      modalImg.src = dest.image;
      modalImg.alt = `${dest.name}, ${dest.country}`;
      modalImg.onerror = () => { modalImg.src = `assets/images/${dest.id}.svg`; };
    }

    // Highlights list
    const highlightsContainer = document.getElementById('modalDestHighlights');
    if (highlightsContainer) {
      highlightsContainer.innerHTML = dest.highlights.map(h => `
        <li class="d-flex align-items-center mb-2">
          <i class="bi bi-star-fill text-accent me-2 fs-xs"></i>
          <span>${h}</span>
        </li>
      `).join('');
    }

    // Suggested Activities list
    const activitiesContainer = document.getElementById('modalDestActivities');
    if (activitiesContainer) {
      activitiesContainer.innerHTML = dest.suggestedActivities.map(act => `
        <div class="col-12 col-md-6 mb-3">
          <div class="p-3 rounded-2 bg-secondary-subtle border h-100">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge bg-dark text-white fs-xxs">${act.category}</span>
              <span class="text-accent fw-bold fs-sm">~$${act.cost}</span>
            </div>
            <h5 class="font-serif fs-6 mb-1 text-dark">${act.name}</h5>
            <p class="text-muted fs-xs mb-0">${act.description}</p>
          </div>
        </div>
      `).join('');
    }

    // Travel Tips list
    const tipsContainer = document.getElementById('modalDestTips');
    if (tipsContainer) {
      tipsContainer.innerHTML = dest.travelTips.map(tip => `
        <div class="d-flex align-items-start mb-2">
          <i class="bi bi-info-circle text-accent me-2 mt-1 fs-sm"></i>
          <p class="mb-0 text-muted fs-sm">${tip}</p>
        </div>
      `).join('');
    }

    // Configure Action Buttons
    const favBtn = document.getElementById('modalFavToggleBtn');
    if (favBtn) {
      favBtn.className = `btn ${isFav ? 'btn-danger' : 'btn-outline-danger'}`;
      favBtn.innerHTML = `<i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'} me-1"></i>${isFav ? 'Saved' : 'Save to Favourites'}`;
      favBtn.onclick = (e) => {
        this.handleFavouriteToggle(e, dest.id);
      };
    }

    const planBtn = document.getElementById('modalPlanJourneyBtn');
    if (planBtn) {
      planBtn.onclick = () => {
        // Close modal first
        const bsModal = bootstrap.Modal.getInstance(modalEl);
        if (bsModal) bsModal.hide();
        this.handleAddToJourney(dest.id);
      };
    }

    // Trigger Bootstrap Modal
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  },

  /**
   * Updates modal favourite button state dynamically
   */
  updateModalFavButton(destId, isFav) {
    const favBtn = document.getElementById('modalFavToggleBtn');
    if (favBtn) {
      favBtn.className = `btn ${isFav ? 'btn-danger' : 'btn-outline-danger'}`;
      favBtn.innerHTML = `<i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'} me-1"></i>${isFav ? 'Saved' : 'Save to Favourites'}`;
    }
  },

  /**
   * Action: Add to Journey (opens trip planner with destination prefilled)
   */
  handleAddToJourney(destinationId) {
    if (typeof PolarisApp !== 'undefined' && PolarisApp.navigateTo) {
      PolarisApp.navigateTo('planner');
    }

    // Prefill the destination in planner
    const destSelect = document.getElementById('plannerDestinationSelect');
    if (destSelect) {
      destSelect.value = destinationId;
      destSelect.dispatchEvent(new Event('change'));
    }

    // Pre-suggest a trip title
    const dest = POLARIS_DESTINATIONS.find(d => d.id === destinationId);
    const titleInput = document.getElementById('plannerTripNameInput');
    if (titleInput && dest) {
      titleInput.value = `Grand Tour of ${dest.name}`;
    }
  },

  /* ==========================================================================
     CURATED COLLECTIONS SECTION
     ========================================================================== */

  renderCollections() {
    const container = document.getElementById('collectionsContainer');
    if (!container) return;

    container.innerHTML = POLARIS_COLLECTIONS.map(col => {
      const destNames = col.destinationIds
        .map(id => {
          const d = POLARIS_DESTINATIONS.find(item => item.id === id);
          return d ? d.name : '';
        })
        .filter(Boolean)
        .join(' • ');

      return `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="polaris-collection-card position-relative overflow-hidden h-100 rounded-3">
            <img 
              src="${col.coverImage}" 
              alt="${col.title}" 
              class="polaris-collection-bg-img" 
              loading="lazy" 
            />
            <div class="polaris-collection-overlay p-4 p-lg-5 d-flex flex-column justify-content-end">
              <span class="polaris-collection-sub text-accent-light text-uppercase tracking-wider fs-xs mb-1">
                ${col.subtitle}
              </span>
              <h3 class="polaris-collection-title font-serif fs-3 text-white mb-2">
                ${col.title}
              </h3>
              <p class="polaris-collection-desc text-white-75 fs-sm mb-3">
                ${col.description}
              </p>
              <div class="polaris-collection-dests fs-xs text-accent-light mb-4">
                <i class="bi bi-geo-alt-fill me-1"></i>${destNames}
              </div>
              <div>
                <button 
                  type="button" 
                  class="btn btn-polaris-outline-light btn-sm" 
                  onclick="PolarisDestinations.exploreCollection('${col.id}')"
                  aria-label="Explore collection: ${col.title}"
                >
                  Explore Collection (${col.destinationIds.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Action: Explore collection by applying its destination IDs to filter
   */
  exploreCollection(collectionId) {
    const col = POLARIS_COLLECTIONS.find(c => c.id === collectionId);
    if (!col) return;

    // Reset filters first
    this.resetFilters();

    // Navigate to Destinations section
    if (typeof PolarisApp !== 'undefined' && PolarisApp.navigateTo) {
      PolarisApp.navigateTo('destinations');
    }

    // Filter to collection's destinations
    const grid = document.getElementById('destinationsGrid');
    const countBadge = document.getElementById('destinationResultsCount');
    const matching = POLARIS_DESTINATIONS.filter(d => col.destinationIds.includes(d.id));

    if (countBadge) {
      countBadge.textContent = `${col.title} (${matching.length})`;
    }

    if (grid) {
      grid.innerHTML = matching.map(dest => this.createDestinationCardHtml(dest)).join('');
    }

    // Scroll smoothly to catalogue header
    const destSection = document.getElementById('destinations');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
  },

  /* ==========================================================================
     FAVOURITES SECTION
     ========================================================================== */

  renderFavouritesView() {
    const grid = document.getElementById('favouritesGrid');
    const countBadge = document.getElementById('favouritesPageCount');
    const searchInput = document.getElementById('favouritesSearchInput');
    if (!grid) return;

    const favIds = PolarisStorage.getFavourites();
    let favDestinations = POLARIS_DESTINATIONS.filter(d => favIds.includes(d.id));

    // Support search within favourites
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      favDestinations = favDestinations.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.country.toLowerCase().includes(q) ||
        d.travelStyles.some(s => s.toLowerCase().includes(q))
      );
    }

    if (countBadge) {
      countBadge.textContent = `${favDestinations.length} Saved`;
    }

    if (favDestinations.length === 0) {
      grid.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="empty-state-editorial p-5 rounded-3 border">
            <i class="bi bi-heart text-accent display-4 mb-3 d-block"></i>
            <h3 class="font-serif fs-3 mb-2">No Saved Favourites Yet</h3>
            <p class="text-muted max-w-md mx-auto mb-4">
              Explore our world catalogue and click the heart icon on any destination to curate your personalized wish list.
            </p>
            <button class="btn btn-polaris-primary" onclick="PolarisApp.navigateTo('destinations')">
              <i class="bi bi-compass me-2"></i>Discover Destinations
            </button>
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = favDestinations.map(dest => `
      <div class="col-12 col-md-6 col-lg-4 mb-4" data-fav-id="${dest.id}">
        <article class="polaris-card h-100 d-flex flex-column border rounded-3 overflow-hidden">
          <div class="position-relative">
            <img 
              src="${dest.image}" 
              alt="${dest.name}, ${dest.country}" 
              class="polaris-card-img" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='assets/images/${dest.id}.svg';" 
            />
            <span class="badge-tag-continent position-absolute top-0 start-0 m-3">${dest.continent}</span>
            <button 
              type="button" 
              class="btn-fav-round active position-absolute top-0 end-0 m-3" 
              onclick="PolarisDestinations.handleFavouriteToggle(event, '${dest.id}')"
              aria-label="Remove from favourites"
              title="Remove from favourites"
            >
              <i class="bi bi-heart-fill"></i>
            </button>
          </div>
          <div class="p-4 d-flex flex-column flex-grow-1">
            <div class="d-flex justify-content-between align-items-baseline mb-2">
              <span class="polaris-country-subheading">${dest.country}</span>
              <span class="text-accent fw-bold fs-sm">From $${dest.dailyBudget}/day</span>
            </div>
            <h3 class="font-serif fs-4 mb-2">${dest.name}</h3>
            <p class="text-muted fs-sm mb-4 flex-grow-1">${dest.description}</p>
            <div class="pt-3 border-top d-flex gap-2">
              <button 
                type="button" 
                class="btn btn-polaris-outline flex-grow-1 btn-sm" 
                onclick="PolarisDestinations.openDetailsModal('${dest.id}')"
              >
                View Details
              </button>
              <button 
                type="button" 
                class="btn btn-polaris-accent btn-sm px-3" 
                onclick="PolarisDestinations.handleAddToJourney('${dest.id}')"
              >
                <i class="bi bi-calendar-plus me-1"></i>Plan
              </button>
            </div>
          </div>
        </article>
      </div>
    `).join('');
  },

  /* ==========================================================================
     INTERACTIVE SVG WORLD MAP
     ========================================================================== */

  initWorldMap() {
    const mapContainer = document.getElementById('worldMapSvgContainer');
    if (!mapContainer) return;

    // Renders the responsive SVG world map
    mapContainer.innerHTML = this.generateMapSvg();

    // Bind marker events
    this.bindMapMarkerEvents();

    // Bind map filters (Continent / Style buttons above map)
    this.bindMapFilterButtons();

    // Reset button
    const resetMapBtn = document.getElementById('resetMapSelectionBtn');
    if (resetMapBtn) {
      resetMapBtn.addEventListener('click', () => {
        this.resetMapSelection();
      });
    }
  },

  /**
   * Generates the SVG world map markup with continent paths and pinpoint markers
   */
  generateMapSvg() {
    // Elegant simplified continental outlines on 1000x500 equirectangular canvas
    const continentPaths = `
      <!-- North America -->
      <path class="svg-landmass" d="M 80 80 Q 140 40 220 50 Q 280 40 320 80 Q 280 140 240 180 Q 200 240 170 280 Q 140 260 120 200 Q 70 140 80 80 Z" />
      <path class="svg-landmass" d="M 120 160 Q 200 130 250 160 Q 200 220 140 180 Z" />
      
      <!-- South America -->
      <path class="svg-landmass" d="M 240 290 Q 320 300 350 360 Q 310 440 270 480 Q 240 440 230 360 Q 220 310 240 290 Z" />
      
      <!-- Europe -->
      <path class="svg-landmass" d="M 450 70 Q 560 60 590 110 Q 550 160 480 180 Q 440 140 450 70 Z" />
      <path class="svg-landmass" d="M 470 130 Q 540 120 560 160 Q 500 180 470 130 Z" />

      <!-- Africa -->
      <path class="svg-landmass" d="M 460 190 Q 560 190 590 260 Q 560 360 520 420 Q 460 380 440 280 Q 440 220 460 190 Z" />

      <!-- Asia -->
      <path class="svg-landmass" d="M 590 70 Q 750 50 880 100 Q 920 180 850 250 Q 750 260 680 230 Q 600 210 590 140 Z" />
      <path class="svg-landmass" d="M 680 190 Q 760 180 750 260 Q 700 270 680 190 Z" />

      <!-- Oceania / Australia -->
      <path class="svg-landmass" d="M 780 320 Q 890 310 910 380 Q 860 430 790 410 Q 760 360 780 320 Z" />
      <!-- New Zealand islands -->
      <path class="svg-landmass" d="M 945 390 Q 965 380 970 410 Q 950 430 945 390 Z" />
      <path class="svg-landmass" d="M 960 420 Q 975 410 980 440 Q 960 450 960 420 Z" />
    `;

    // Markers for all 12 destinations
    const markers = POLARIS_DESTINATIONS.map(dest => {
      return `
        <g 
          class="map-marker-group" 
          id="marker-${dest.id}" 
          data-dest-id="${dest.id}" 
          transform="translate(${dest.coordinates.x}, ${dest.coordinates.y})"
          tabindex="0"
          role="button"
          aria-label="Select destination ${dest.name}, ${dest.country}"
        >
          <!-- Animated Radar Pulse -->
          <circle class="marker-pulse" r="14" />
          <!-- Pin Base -->
          <circle class="marker-outer-ring" r="8" />
          <circle class="marker-core" r="4.5" />
          <!-- Tooltip on hover -->
          <g class="marker-tooltip">
            <rect x="-60" y="-36" width="120" height="24" rx="4" class="tooltip-bg" />
            <text x="0" y="-20" class="tooltip-text" text-anchor="middle">${dest.name}</text>
          </g>
        </g>
      `;
    }).join('');

    return `
      <svg 
        viewBox="0 0 1000 500" 
        class="polaris-world-svg" 
        preserveAspectRatio="xMidYMid meet"
        aria-label="Interactive World Map showing destination markers"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#243442" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#14212A" stop-opacity="0.9" />
          </radialGradient>
          <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <!-- Ocean Canvas Background -->
        <rect width="1000" height="500" class="svg-ocean" />
        
        <!-- Subtle Latitude / Longitude Grid lines -->
        <line x1="0" y1="125" x2="1000" y2="125" class="svg-gridline" />
        <line x1="0" y1="250" x2="1000" y2="250" class="svg-gridline-equator" />
        <line x1="0" y1="375" x2="1000" y2="375" class="svg-gridline" />
        <line x1="250" y1="0" x2="250" y2="500" class="svg-gridline" />
        <line x1="500" y1="0" x2="500" y2="500" class="svg-gridline" />
        <line x1="750" y1="0" x2="750" y2="500" class="svg-gridline" />

        <!-- Continents -->
        <g class="svg-continents-group">
          ${continentPaths}
        </g>

        <!-- Destination Markers -->
        <g class="svg-markers-layer">
          ${markers}
        </g>
      </svg>
    `;
  },

  /**
   * Binds click & keyboard accessibility on map markers
   */
  bindMapMarkerEvents() {
    const markerGroups = document.querySelectorAll('.map-marker-group');
    markerGroups.forEach(group => {
      const destId = group.getAttribute('data-dest-id');

      const selectMarker = () => {
        this.selectMapDestination(destId);
      };

      group.addEventListener('click', selectMarker);
      group.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectMarker();
        }
      });
    });
  },

  /**
   * Binds quick filter chips above map (e.g. All, Europe, Asia, Luxury, Adventure)
   */
  bindMapFilterButtons() {
    const buttons = document.querySelectorAll('.map-filter-chip');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterType = btn.getAttribute('data-filter-type');
        const filterVal = btn.getAttribute('data-filter-value');

        this.filterMapMarkers(filterType, filterVal);
      });
    });
  },

  /**
   * Filters map markers visually by highlighting matches and dimming others
   */
  filterMapMarkers(type, value) {
    const markerGroups = document.querySelectorAll('.map-marker-group');
    markerGroups.forEach(group => {
      const destId = group.getAttribute('data-dest-id');
      const dest = POLARIS_DESTINATIONS.find(d => d.id === destId);
      if (!dest) return;

      let isMatch = true;
      if (value !== 'all') {
        if (type === 'continent') {
          isMatch = dest.continent.toLowerCase() === value.toLowerCase();
        } else if (type === 'style') {
          isMatch = dest.travelStyles.some(s => s.toLowerCase() === value.toLowerCase());
        }
      }

      if (isMatch) {
        group.classList.remove('dimmed');
      } else {
        group.classList.add('dimmed');
      }
    });
  },

  /**
   * Highlights a map pin and displays the interactive preview panel
   */
  selectMapDestination(destinationId) {
    this.activeMapDestinationId = destinationId;
    const dest = POLARIS_DESTINATIONS.find(d => d.id === destinationId);
    if (!dest) return;

    // Highlight selected marker
    document.querySelectorAll('.map-marker-group').forEach(g => {
      if (g.getAttribute('data-dest-id') === destinationId) {
        g.classList.add('active-marker');
      } else {
        g.classList.remove('active-marker');
      }
    });

    // Populate and show the bottom/side drawer
    const drawer = document.getElementById('mapSelectedPanel');
    if (!drawer) return;

    const isFav = PolarisStorage.isFavourite(dest.id);
    const stylePills = dest.travelStyles.map(s => `<span class="badge-tag-pill">${s}</span>`).join('');

    drawer.innerHTML = `
      <div class="map-drawer-card p-3 p-md-4 rounded-3 shadow-lg border">
        <div class="row align-items-center g-3">
          <div class="col-12 col-sm-4 col-md-3">
            <div class="map-drawer-img-wrap rounded-2 overflow-hidden position-relative">
              <img 
                src="${dest.image}" 
                alt="${dest.name}, ${dest.country}" 
                class="w-100 h-100 object-fit-cover" 
                style="height: 120px;" 
                onerror="this.onerror=null; this.src='assets/images/${dest.id}.svg';" 
              />
            </div>
          </div>
          <div class="col-12 col-sm-8 col-md-5">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge bg-accent text-dark fw-bold fs-xs">${dest.continent}</span>
              <span class="text-muted fs-xs">${dest.bestSeason}</span>
            </div>
            <h4 class="font-serif fs-4 mb-1 text-white">${dest.name}, ${dest.country}</h4>
            <p class="text-white-50 fs-xs mb-2 line-clamp-2">${dest.description}</p>
            <div class="d-flex flex-wrap gap-1">${stylePills}</div>
          </div>
          <div class="col-12 col-md-4 text-md-end">
            <div class="text-accent fw-bold fs-5 mb-2">
              From $${dest.dailyBudget} <span class="fs-xs text-white-50 fw-normal">/ day</span>
            </div>
            <div class="d-flex justify-content-md-end gap-2">
              <button 
                type="button" 
                class="btn ${isFav ? 'btn-danger' : 'btn-outline-light'} btn-sm" 
                id="mapDrawerFavBtn"
                onclick="PolarisDestinations.handleFavouriteToggle(event, '${dest.id}')"
                aria-label="Toggle favourite"
              >
                <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
              </button>
              <button 
                type="button" 
                class="btn btn-polaris-outline-light btn-sm" 
                onclick="PolarisDestinations.openDetailsModal('${dest.id}')"
              >
                View Details
              </button>
              <button 
                type="button" 
                class="btn btn-polaris-accent btn-sm" 
                onclick="PolarisDestinations.handleAddToJourney('${dest.id}')"
              >
                Plan Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    drawer.classList.remove('d-none');
    drawer.classList.add('animate-slide-up');
  },

  /**
   * Updates favourite button inside the map drawer if active
   */
  updateMapDrawerFavButton(destId, isFav) {
    const btn = document.getElementById('mapDrawerFavBtn');
    if (btn) {
      btn.className = `btn ${isFav ? 'btn-danger' : 'btn-outline-light'} btn-sm`;
      btn.innerHTML = `<i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>`;
    }
  },

  /**
   * Resets map selection and hides preview panel
   */
  resetMapSelection() {
    this.activeMapDestinationId = null;
    document.querySelectorAll('.map-marker-group').forEach(g => {
      g.classList.remove('active-marker');
      g.classList.remove('dimmed');
    });

    const drawer = document.getElementById('mapSelectedPanel');
    if (drawer) {
      drawer.classList.add('d-none');
    }

    // Reset filter chips to "All"
    document.querySelectorAll('.map-filter-chip').forEach(b => {
      b.classList.remove('active');
      if (b.getAttribute('data-filter-value') === 'all') {
        b.classList.add('active');
      }
    });
  }
};
