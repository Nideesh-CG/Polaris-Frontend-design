/**
 * POLARIS — Travel Planner, Day-by-Day Itinerary Builder & My Journeys
 * 
 * Manages journey creation, input validation, day-by-day itinerary builder,
 * activity CRUD, budget calculations, status tracking, and persistence.
 */

const PolarisPlanner = {
  activeJourneyId: null,
  activeEditingActivityId: null,

  /**
   * Initializes planner form, selects, date listeners, and journeys list
   */
  init() {
    this.populateDestinationSelect();
    this.bindFormEvents();
    this.renderJourneys();
    this.bindActivityModalEvents();
  },

  /**
   * Populates the primary destination dropdown from catalogue
   */
  populateDestinationSelect() {
    const select = document.getElementById('plannerDestinationSelect');
    if (!select) return;

    select.innerHTML = `
      <option value="" disabled selected>Select a curated destination</option>
      ${POLARIS_DESTINATIONS.map(d => `
        <option value="${d.id}">${d.name}, ${d.country} (${d.continent})</option>
      `).join('')}
    `;
  },

  /**
   * Binds form validation, live duration calculation, and submission
   */
  bindFormEvents() {
    const form = document.getElementById('tripPlannerForm');
    const startInput = document.getElementById('plannerStartDate');
    const endInput = document.getElementById('plannerEndDate');
    const destSelect = document.getElementById('plannerDestinationSelect');
    const travellersInput = document.getElementById('plannerTravellersInput');
    const budgetEstimateHint = document.getElementById('plannerBudgetEstimateHint');

    // Dynamic duration and budget hint calculation
    const updateHints = () => {
      const destId = destSelect ? destSelect.value : null;
      const start = startInput ? startInput.value : null;
      const end = endInput ? endInput.value : null;
      const travellers = travellersInput ? parseInt(travellersInput.value, 10) || 1 : 1;

      if (start && end && destId) {
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = d2 - d1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays > 0) {
          const dest = POLARIS_DESTINATIONS.find(d => d.id === destId);
          if (dest && budgetEstimateHint) {
            const estimatedCost = dest.dailyBudget * diffDays * travellers;
            budgetEstimateHint.innerHTML = `
              <i class="bi bi-info-circle me-1"></i>
              Estimated duration: <strong>${diffDays} days</strong>. 
              Suggested baseline budget for ${travellers} ${travellers === 1 ? 'traveler' : 'travelers'}: 
              <strong>~$${estimatedCost.toLocaleString()} USD</strong>.
            `;
            budgetEstimateHint.classList.remove('d-none');
          }
        } else if (budgetEstimateHint) {
          budgetEstimateHint.innerHTML = `<span class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>End date must not precede start date.</span>`;
          budgetEstimateHint.classList.remove('d-none');
        }
      }
    };

    if (startInput) startInput.addEventListener('change', updateHints);
    if (endInput) endInput.addEventListener('change', updateHints);
    if (destSelect) destSelect.addEventListener('change', updateHints);
    if (travellersInput) travellersInput.addEventListener('input', updateHints);

    // Form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTripSubmit();
      });
    }

    // Reset planner form button
    const resetBtn = document.getElementById('plannerResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        if (budgetEstimateHint) budgetEstimateHint.classList.add('d-none');
      });
    }
  },

  /**
   * Validates and submits a new journey
   */
  handleTripSubmit() {
    const nameInput = document.getElementById('plannerTripNameInput');
    const destSelect = document.getElementById('plannerDestinationSelect');
    const startInput = document.getElementById('plannerStartDate');
    const endInput = document.getElementById('plannerEndDate');
    const travellersInput = document.getElementById('plannerTravellersInput');
    const budgetInput = document.getElementById('plannerBudgetInput');
    const styleSelect = document.getElementById('plannerStyleSelect');

    const name = nameInput.value.trim();
    const destId = destSelect.value;
    const start = startInput.value;
    const end = endInput.value;
    const travellers = parseInt(travellersInput.value, 10);
    const budget = parseFloat(budgetInput.value);
    const travelStyle = styleSelect.value;

    // Strict Validations
    if (!name) {
      this.showValidationError('Please enter a journey name.');
      nameInput.focus();
      return;
    }

    if (!destId) {
      this.showValidationError('Please select a primary destination.');
      destSelect.focus();
      return;
    }

    if (!start || !end) {
      this.showValidationError('Please select both start and end travel dates.');
      return;
    }

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    if (endDateObj < startDateObj) {
      this.showValidationError('End date cannot be earlier than start date.');
      endInput.focus();
      return;
    }

    if (isNaN(travellers) || travellers < 1) {
      this.showValidationError('Traveller count must be at least 1.');
      travellersInput.focus();
      return;
    }

    if (isNaN(budget) || budget < 0) {
      this.showValidationError('Budget must be a valid non-negative number.');
      budgetInput.focus();
      return;
    }

    // Pre-populate sample editable activities from destination highlights
    const dest = POLARIS_DESTINATIONS.find(d => d.id === destId);
    let initialActivities = [];
    if (dest && Array.isArray(dest.suggestedActivities)) {
      initialActivities = dest.suggestedActivities.map((act, index) => ({
        id: `act-${Date.now()}-${index}`,
        day: act.day || 1,
        time: act.time || '10:00 AM',
        name: act.name,
        category: act.category || 'Sightseeing',
        cost: act.cost || 0,
        description: act.description || ''
      }));
    }

    // Determine status: Upcoming / Planning / Completed
    const todayStr = new Date().toISOString().split('T')[0];
    let status = 'Planning';
    if (end < todayStr) {
      status = 'Completed';
    } else if (start <= todayStr && end >= todayStr) {
      status = 'Upcoming';
    } else {
      status = 'Upcoming';
    }

    const newJourney = {
      id: 'journey-' + Date.now(),
      name,
      destinationId: destId,
      startDate: start,
      endDate: end,
      travellers,
      budget,
      travelStyle,
      status,
      createdAt: new Date().toISOString(),
      activities: initialActivities
    };

    // Save to storage
    PolarisStorage.saveJourney(newJourney);

    // Reset Form
    document.getElementById('tripPlannerForm').reset();
    const hint = document.getElementById('plannerBudgetEstimateHint');
    if (hint) hint.classList.add('d-none');

    // Show Toast
    if (typeof PolarisApp !== 'undefined' && PolarisApp.showToast) {
      PolarisApp.showToast(
        'Journey Created',
        `"${newJourney.name}" has been saved. Day-by-day itinerary is ready!`,
        'success'
      );
    }

    // Refresh views
    this.renderJourneys();
    if (typeof PolarisInsights !== 'undefined' && PolarisInsights.refresh) {
      PolarisInsights.refresh();
    }

    // Navigate to My Journeys section and open the newly created journey
    if (typeof PolarisApp !== 'undefined' && PolarisApp.navigateTo) {
      PolarisApp.navigateTo('journeys');
    }

    // Open Day-by-Day builder for this trip
    setTimeout(() => {
      this.openItineraryManager(newJourney.id);
    }, 300);
  },

  /**
   * Helper to display validation alert
   */
  showValidationError(message) {
    if (typeof PolarisApp !== 'undefined' && PolarisApp.showToast) {
      PolarisApp.showToast('Validation Error', message, 'warning');
    } else {
      alert(message);
    }
  },

  /* ==========================================================================
     MY JOURNEYS SECTION
     ========================================================================== */

  /**
   * Renders saved journeys in the My Journeys section
   */
  renderJourneys() {
    const container = document.getElementById('journeysListContainer');
    const countBadge = document.getElementById('journeysPageCount');
    if (!container) return;

    const journeys = PolarisStorage.getJourneys();

    if (countBadge) {
      countBadge.textContent = `${journeys.length} ${journeys.length === 1 ? 'Journey' : 'Journeys'}`;
    }

    if (journeys.length === 0) {
      container.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="empty-state-editorial p-5 rounded-3 border">
            <i class="bi bi-briefcase text-accent display-4 mb-3 d-block"></i>
            <h3 class="font-serif fs-3 mb-2">No Journeys Planned Yet</h3>
            <p class="text-muted max-w-md mx-auto mb-4">
              Design a bespoke itinerary tailored to your rhythm. Estimate budgets, schedule daily excursions, and organize travel memories.
            </p>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-polaris-primary" onclick="PolarisApp.navigateTo('planner')">
                <i class="bi bi-calendar-plus me-2"></i>Create New Journey
              </button>
              <button class="btn btn-polaris-outline" onclick="PolarisPlanner.loadSampleJourney()">
                <i class="bi bi-magic me-2"></i>Load Sample Itinerary
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = journeys.map(journey => {
      const dest = POLARIS_DESTINATIONS.find(d => d.id === journey.destinationId) || {
        name: 'Custom Destination',
        country: '',
        image: 'assets/images/kyoto.svg',
        dailyBudget: 150
      };

      const durationDays = this.calculateDays(journey.startDate, journey.endDate);
      const totalActivityCost = (journey.activities || []).reduce((sum, a) => sum + (parseFloat(a.cost) || 0), 0);
      const estimatedLivingCost = dest.dailyBudget * durationDays * (journey.travellers || 1);
      const totalEstimatedCost = totalActivityCost + estimatedLivingCost;

      // Status badge styling
      let statusBadgeClass = 'bg-primary-subtle text-primary';
      if (journey.status === 'Completed') statusBadgeClass = 'bg-secondary-subtle text-secondary';
      if (journey.status === 'Upcoming') statusBadgeClass = 'bg-success-subtle text-success';

      // Budget health
      const budgetDiff = journey.budget - totalEstimatedCost;
      let budgetStatusHtml = '';
      if (budgetDiff >= 0) {
        budgetStatusHtml = `<span class="badge bg-success-subtle text-success fs-xs"><i class="bi bi-check-circle me-1"></i>Within Budget ($${Math.round(budgetDiff)} remaining)</span>`;
      } else {
        budgetStatusHtml = `<span class="badge bg-danger-subtle text-danger fs-xs"><i class="bi bi-exclamation-circle me-1"></i>Exceeds by $${Math.abs(Math.round(budgetDiff))}</span>`;
      }

      return `
        <div class="col-12 col-lg-6 mb-4" data-journey-card-id="${journey.id}">
          <article class="polaris-card h-100 d-flex flex-column border rounded-3 overflow-hidden shadow-sm">
            <div class="row g-0 flex-grow-1">
              <div class="col-sm-4 position-relative">
                <img 
                  src="${dest.image}" 
                  alt="${dest.name}" 
                  class="w-100 h-100 object-fit-cover" 
                  style="min-height: 200px;" 
                  onerror="this.onerror=null; this.src='assets/images/${dest.id || 'kyoto'}.svg';" 
                />
                <span class="badge ${statusBadgeClass} position-absolute top-0 start-0 m-2 fw-semibold">
                  ${journey.status || 'Planning'}
                </span>
              </div>
              
              <div class="col-sm-8 p-3 p-md-4 d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex justify-content-between align-items-baseline mb-1">
                    <span class="polaris-country-subheading">${dest.name}, ${dest.country}</span>
                    <span class="text-muted fs-xs">${journey.travelStyle || 'Bespoke'}</span>
                  </div>
                  <h3 class="font-serif fs-4 mb-2 text-dark">${journey.name}</h3>
                  
                  <div class="journey-meta-grid text-muted fs-xs mb-3">
                    <div class="d-flex align-items-center mb-1">
                      <i class="bi bi-calendar3 text-accent me-2"></i>
                      <span>${journey.startDate} to ${journey.endDate} (${durationDays} days)</span>
                    </div>
                    <div class="d-flex align-items-center mb-1">
                      <i class="bi bi-people text-accent me-2"></i>
                      <span>${journey.travellers} ${journey.travellers === 1 ? 'Traveler' : 'Travelers'}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-list-task text-accent me-2"></i>
                      <span>${(journey.activities || []).length} scheduled activities</span>
                    </div>
                  </div>

                  <div class="budget-summary-box p-2 rounded-2 bg-light border mb-3">
                    <div class="d-flex justify-content-between fs-xs mb-1">
                      <span class="text-muted">Planned Budget:</span>
                      <strong class="text-dark">$${Number(journey.budget).toLocaleString()}</strong>
                    </div>
                    <div class="d-flex justify-content-between fs-xs mb-2">
                      <span class="text-muted">Est. Total Cost:</span>
                      <strong class="text-dark">$${Math.round(totalEstimatedCost).toLocaleString()}</strong>
                    </div>
                    <div>${budgetStatusHtml}</div>
                  </div>
                </div>

                <div class="d-flex flex-wrap gap-2 pt-2 border-top">
                  <button 
                    type="button" 
                    class="btn btn-polaris-primary btn-sm flex-grow-1" 
                    onclick="PolarisPlanner.openItineraryManager('${journey.id}')"
                    aria-label="Manage itinerary for ${journey.name}"
                  >
                    <i class="bi bi-calendar2-range me-1"></i>Manage Itinerary
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-polaris-outline btn-sm" 
                    onclick="PolarisPlanner.openEditTripModal('${journey.id}')"
                    title="Edit Trip Details"
                    aria-label="Edit trip details"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-danger btn-sm" 
                    onclick="PolarisPlanner.confirmDeleteTrip('${journey.id}')"
                    title="Delete Trip"
                    aria-label="Delete journey"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join('');
  },

  /**
   * Helper to load sample journey if user requested
   */
  loadSampleJourney() {
    PolarisStorage.resetDemoData();
    this.renderJourneys();
    if (typeof PolarisDestinations !== 'undefined') {
      PolarisDestinations.renderFavouritesView();
      PolarisDestinations.updateGlobalFavouritesCounter();
    }
    if (typeof PolarisInsights !== 'undefined') {
      PolarisInsights.refresh();
    }
    if (typeof PolarisApp !== 'undefined' && PolarisApp.showToast) {
      PolarisApp.showToast('Sample Loaded', 'Demo itineraries and favourites restored.', 'info');
    }
  },

  /* ==========================================================================
     DAY-BY-DAY ITINERARY BUILDER
     ========================================================================== */

  /**
   * Opens the Day-by-Day Itinerary modal/manager for a specific journey
   */
  openItineraryManager(journeyId) {
    this.activeJourneyId = journeyId;
    const journey = PolarisStorage.getJourneyById(journeyId);
    if (!journey) return;

    const modalEl = document.getElementById('itineraryManagerModal');
    if (!modalEl) return;

    const dest = POLARIS_DESTINATIONS.find(d => d.id === journey.destinationId) || {
      name: 'Custom',
      country: '',
      dailyBudget: 150
    };

    const daysCount = this.calculateDays(journey.startDate, journey.endDate);

    // Set modal headers
    document.getElementById('itineraryModalTripName').textContent = journey.name;
    document.getElementById('itineraryModalSubtitle').textContent = 
      `${dest.name}, ${dest.country} • ${journey.startDate} to ${journey.endDate} (${daysCount} Days, ${journey.travellers} Travellers)`;

    // Calculate budget metrics
    this.renderItineraryBudgetSummary(journey, dest, daysCount);

    // Render day-by-day activities
    this.renderItineraryDays(journey, daysCount);

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  },

  /**
   * Calculates and renders the budget comparison bar and totals
   */
  renderItineraryBudgetSummary(journey, dest, daysCount) {
    const container = document.getElementById('itineraryBudgetBarContainer');
    if (!container) return;

    const totalActivityCost = (journey.activities || []).reduce((sum, a) => sum + (parseFloat(a.cost) || 0), 0);
    const estimatedDailyLiving = dest.dailyBudget * daysCount * (journey.travellers || 1);
    const totalEst = totalActivityCost + estimatedDailyLiving;
    const budget = Number(journey.budget) || 0;

    const percentUsed = budget > 0 ? Math.min(Math.round((totalEst / budget) * 100), 100) : 0;
    const diff = budget - totalEst;

    let barColor = 'bg-accent';
    let statusText = 'On Track';
    let statusBadge = '<span class="badge bg-success text-white">Under Budget</span>';

    if (diff < 0) {
      barColor = 'bg-danger';
      statusText = 'Over Budget';
      statusBadge = `<span class="badge bg-danger text-white">Exceeds by $${Math.abs(Math.round(diff)).toLocaleString()}</span>`;
    } else if (percentUsed > 85) {
      barColor = 'bg-warning';
      statusText = 'Near Limit';
      statusBadge = `<span class="badge bg-warning text-dark">$${Math.round(diff).toLocaleString()} Remaining</span>`;
    } else {
      statusBadge = `<span class="badge bg-success text-white">$${Math.round(diff).toLocaleString()} Remaining</span>`;
    }

    container.innerHTML = `
      <div class="p-3 bg-secondary-subtle rounded-3 mb-4 border">
        <div class="row align-items-center g-3">
          <div class="col-12 col-md-4">
            <div class="fs-xs text-muted">Planned Trip Budget</div>
            <div class="fs-4 font-serif fw-bold text-dark">$${budget.toLocaleString()}</div>
          </div>
          <div class="col-12 col-md-4">
            <div class="fs-xs text-muted">Est. Total Costs (Living + Activities)</div>
            <div class="fs-4 font-serif fw-bold text-dark">$${Math.round(totalEst).toLocaleString()}</div>
          </div>
          <div class="col-12 col-md-4 text-md-end">
            <div class="fs-xs text-muted mb-1">Status</div>
            ${statusBadge}
          </div>
        </div>

        <div class="mt-3">
          <div class="d-flex justify-content-between fs-xs text-muted mb-1">
            <span>Expenses & Accommodations: $${Math.round(totalEst).toLocaleString()}</span>
            <span>${percentUsed}% of total budget</span>
          </div>
          <div class="progress" style="height: 8px;">
            <div class="progress-bar ${barColor}" role="progressbar" style="width: ${percentUsed}%;" aria-valuenow="${percentUsed}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="d-flex justify-content-between fs-xxs text-muted mt-1">
            <span>Activities: $${Math.round(totalActivityCost).toLocaleString()}</span>
            <span>Living/Hospitality Baseline: $${Math.round(estimatedDailyLiving).toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renders the Day tabs and activity cards grouped by day
   */
  renderItineraryDays(journey, daysCount) {
    const container = document.getElementById('itineraryDaysContainer');
    if (!container) return;

    const activities = journey.activities || [];

    let daysHtml = '';
    for (let dayNum = 1; dayNum <= Math.max(daysCount, 1); dayNum++) {
      const dayActivities = activities.filter(a => parseInt(a.day, 10) === dayNum);
      const dayCostSum = dayActivities.reduce((sum, a) => sum + (parseFloat(a.cost) || 0), 0);

      daysHtml += `
        <div class="itinerary-day-block mb-4 p-3 rounded-3 border bg-surface">
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3 border-bottom">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-dark text-white fs-xs px-2 py-1">Day ${dayNum}</span>
              <h4 class="font-serif fs-5 mb-0 text-dark">Daily Schedule</h4>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="text-accent fs-xs fw-bold me-2">Activities Subtotal: $${dayCostSum}</span>
              <button 
                type="button" 
                class="btn btn-polaris-accent btn-sm py-1 px-2" 
                onclick="PolarisPlanner.openAddActivityModal('${journey.id}', ${dayNum})"
                aria-label="Add activity to Day ${dayNum}"
              >
                <i class="bi bi-plus-lg me-1"></i>Add Activity
              </button>
            </div>
          </div>

          <div class="day-activities-list">
            ${dayActivities.length === 0 ? `
              <div class="text-center py-3 text-muted fs-sm border border-dashed rounded-2 bg-light">
                <i class="bi bi-calendar-event me-1"></i>No activities scheduled for Day ${dayNum}. Click "Add Activity" above to plan excursions or dining.
              </div>
            ` : dayActivities.map(act => `
              <div class="activity-card p-3 rounded-2 border bg-light mb-2 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-start gap-3">
                  <div class="activity-time-badge text-center bg-white px-2 py-1 rounded border fs-xs fw-bold text-accent">
                    ${act.time || 'All Day'}
                  </div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1">
                      <span class="badge bg-secondary-subtle text-dark fs-xxs">${act.category || 'Sightseeing'}</span>
                      <h5 class="fs-6 font-serif mb-0 text-dark">${act.name}</h5>
                    </div>
                    ${act.description ? `<p class="fs-xs text-muted mb-0">${act.description}</p>` : ''}
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3">
                  <span class="fw-bold fs-sm text-dark">$${act.cost || 0}</span>
                  <div class="btn-group btn-group-sm">
                    <button 
                      type="button" 
                      class="btn btn-outline-secondary btn-sm" 
                      onclick="PolarisPlanner.openEditActivityModal('${journey.id}', '${act.id}')"
                      title="Edit Activity"
                      aria-label="Edit activity"
                    >
                      <i class="bi bi-pencil fs-xs"></i>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-outline-danger btn-sm" 
                      onclick="PolarisPlanner.deleteActivity('${journey.id}', '${act.id}')"
                      title="Delete Activity"
                      aria-label="Delete activity"
                    >
                      <i class="bi bi-trash fs-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = daysHtml;
  },

  /**
   * Helper to calculate day count between dates
   */
  calculateDays(start, end) {
    if (!start || !end) return 1;
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = d2 - d1;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 1;
  },

  /* ==========================================================================
     ACTIVITY MODAL CRUD
     ========================================================================== */

  bindActivityModalEvents() {
    const saveBtn = document.getElementById('saveActivityModalBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveActivityFromModal();
      });
    }
  },

  /**
   * Opens the Add Activity modal
   */
  openAddActivityModal(journeyId, defaultDay = 1) {
    this.activeJourneyId = journeyId;
    this.activeEditingActivityId = null;

    const journey = PolarisStorage.getJourneyById(journeyId);
    if (!journey) return;

    const modalEl = document.getElementById('activityEditorModal');
    if (!modalEl) return;

    document.getElementById('activityModalTitle').textContent = 'Add Activity';
    document.getElementById('activityNameInput').value = '';
    document.getElementById('activityTimeInput').value = '10:00 AM';
    document.getElementById('activityCategorySelect').value = 'Sightseeing';
    document.getElementById('activityCostInput').value = '50';
    document.getElementById('activityDescriptionInput').value = '';

    // Populate day selector options
    const daySelect = document.getElementById('activityDaySelect');
    const daysCount = this.calculateDays(journey.startDate, journey.endDate);
    if (daySelect) {
      daySelect.innerHTML = Array.from({ length: daysCount }, (_, i) => i + 1)
        .map(d => `<option value="${d}" ${d === defaultDay ? 'selected' : ''}>Day ${d}</option>`)
        .join('');
    }

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  },

  /**
   * Opens the Edit Activity modal
   */
  openEditActivityModal(journeyId, activityId) {
    this.activeJourneyId = journeyId;
    this.activeEditingActivityId = activityId;

    const journey = PolarisStorage.getJourneyById(journeyId);
    if (!journey) return;

    const activity = (journey.activities || []).find(a => a.id === activityId);
    if (!activity) return;

    const modalEl = document.getElementById('activityEditorModal');
    if (!modalEl) return;

    document.getElementById('activityModalTitle').textContent = 'Edit Activity';
    document.getElementById('activityNameInput').value = activity.name || '';
    document.getElementById('activityTimeInput').value = activity.time || '';
    document.getElementById('activityCategorySelect').value = activity.category || 'Sightseeing';
    document.getElementById('activityCostInput').value = activity.cost || 0;
    document.getElementById('activityDescriptionInput').value = activity.description || '';

    // Populate day selector options
    const daySelect = document.getElementById('activityDaySelect');
    const daysCount = this.calculateDays(journey.startDate, journey.endDate);
    if (daySelect) {
      daySelect.innerHTML = Array.from({ length: daysCount }, (_, i) => i + 1)
        .map(d => `<option value="${d}" ${d === activity.day ? 'selected' : ''}>Day ${d}</option>`)
        .join('');
    }

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  },

  /**
   * Saves activity from the editor modal (creates or updates)
   */
  saveActivityFromModal() {
    const name = document.getElementById('activityNameInput').value.trim();
    const day = parseInt(document.getElementById('activityDaySelect').value, 10) || 1;
    const time = document.getElementById('activityTimeInput').value.trim();
    const category = document.getElementById('activityCategorySelect').value;
    const cost = parseFloat(document.getElementById('activityCostInput').value) || 0;
    const description = document.getElementById('activityDescriptionInput').value.trim();

    if (!name) {
      alert('Please enter an activity name.');
      return;
    }

    if (this.activeEditingActivityId) {
      // Update
      PolarisStorage.updateActivity(this.activeJourneyId, this.activeEditingActivityId, {
        name,
        day,
        time,
        category,
        cost,
        description
      });
    } else {
      // Create
      PolarisStorage.addActivity(this.activeJourneyId, {
        name,
        day,
        time,
        category,
        cost,
        description
      });
    }

    // Close Activity modal
    const modalEl = document.getElementById('activityEditorModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();

    // Re-render Itinerary modal & Journey list
    const updatedJourney = PolarisStorage.getJourneyById(this.activeJourneyId);
    if (updatedJourney) {
      const dest = POLARIS_DESTINATIONS.find(d => d.id === updatedJourney.destinationId) || { dailyBudget: 150 };
      const daysCount = this.calculateDays(updatedJourney.startDate, updatedJourney.endDate);
      this.renderItineraryBudgetSummary(updatedJourney, dest, daysCount);
      this.renderItineraryDays(updatedJourney, daysCount);
    }
    this.renderJourneys();

    if (typeof PolarisInsights !== 'undefined' && PolarisInsights.refresh) {
      PolarisInsights.refresh();
    }
  },

  /**
   * Deletes an activity with confirmation
   */
  deleteActivity(journeyId, activityId) {
    if (!confirm('Are you sure you wish to delete this scheduled activity?')) return;

    PolarisStorage.deleteActivity(journeyId, activityId);

    const updatedJourney = PolarisStorage.getJourneyById(journeyId);
    if (updatedJourney) {
      const dest = POLARIS_DESTINATIONS.find(d => d.id === updatedJourney.destinationId) || { dailyBudget: 150 };
      const daysCount = this.calculateDays(updatedJourney.startDate, updatedJourney.endDate);
      this.renderItineraryBudgetSummary(updatedJourney, dest, daysCount);
      this.renderItineraryDays(updatedJourney, daysCount);
    }
    this.renderJourneys();

    if (typeof PolarisInsights !== 'undefined' && PolarisInsights.refresh) {
      PolarisInsights.refresh();
    }
  },

  /* ==========================================================================
     EDIT & DELETE TRIP
     ========================================================================== */

  /**
   * Opens the modal to edit overall journey metadata (dates, travellers, budget)
   */
  openEditTripModal(journeyId) {
    const journey = PolarisStorage.getJourneyById(journeyId);
    if (!journey) return;

    const modalEl = document.getElementById('editJourneyModal');
    if (!modalEl) return;

    document.getElementById('editTripId').value = journey.id;
    document.getElementById('editTripName').value = journey.name;
    document.getElementById('editTripStartDate').value = journey.startDate;
    document.getElementById('editTripEndDate').value = journey.endDate;
    document.getElementById('editTripTravellers').value = journey.travellers;
    document.getElementById('editTripBudget').value = journey.budget;
    document.getElementById('editTripStatus').value = journey.status || 'Planning';

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  },

  /**
   * Saves updated trip metadata from edit modal
   */
  saveEditedTrip() {
    const journeyId = document.getElementById('editTripId').value;
    const name = document.getElementById('editTripName').value.trim();
    const start = document.getElementById('editTripStartDate').value;
    const end = document.getElementById('editTripEndDate').value;
    const travellers = parseInt(document.getElementById('editTripTravellers').value, 10);
    const budget = parseFloat(document.getElementById('editTripBudget').value);
    const status = document.getElementById('editTripStatus').value;

    if (!name || !start || !end || isNaN(travellers) || isNaN(budget)) {
      alert('Please fill out all required fields with valid values.');
      return;
    }

    if (new Date(end) < new Date(start)) {
      alert('End date cannot precede start date.');
      return;
    }

    const journey = PolarisStorage.getJourneyById(journeyId);
    if (!journey) return;

    journey.name = name;
    journey.startDate = start;
    journey.endDate = end;
    journey.travellers = travellers;
    journey.budget = budget;
    journey.status = status;

    PolarisStorage.saveJourney(journey);

    // Close Modal
    const modalEl = document.getElementById('editJourneyModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();

    this.renderJourneys();
    if (typeof PolarisInsights !== 'undefined' && PolarisInsights.refresh) {
      PolarisInsights.refresh();
    }

    if (typeof PolarisApp !== 'undefined' && PolarisApp.showToast) {
      PolarisApp.showToast('Journey Updated', `"${journey.name}" was successfully updated.`, 'success');
    }
  },

  /**
   * Confirms and deletes an entire journey
   */
  confirmDeleteTrip(journeyId) {
    const journey = PolarisStorage.getJourneyById(journeyId);
    if (!journey) return;

    if (confirm(`Are you sure you want to permanently delete the journey "${journey.name}"? This action cannot be undone.`)) {
      PolarisStorage.deleteJourney(journeyId);
      this.renderJourneys();

      if (typeof PolarisInsights !== 'undefined' && PolarisInsights.refresh) {
        PolarisInsights.refresh();
      }

      if (typeof PolarisApp !== 'undefined' && PolarisApp.showToast) {
        PolarisApp.showToast('Journey Deleted', `"${journey.name}" was removed.`, 'info');
      }
    }
  }
};
