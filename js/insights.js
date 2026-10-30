/**
 * POLARIS — Travel Insights and Real-Time Analytics Engine
 * 
 * Computes live metrics from saved journeys, itineraries, and favourites:
 * - Saved destinations count
 * - Planned and upcoming journeys
 * - Total planned and estimated travel budget
 * - Most preferred travel style
 * - Geographic continent distribution percentages and visual bars
 */

const PolarisInsights = {
  /**
   * Initializes or recalculates all insights
   */
  init() {
    this.refresh();
  },

  /**
   * Recalculates metrics and updates DOM elements
   */
  refresh() {
    const favourites = PolarisStorage.getFavourites();
    const journeys = PolarisStorage.getJourneys();

    // 1. Saved destinations count
    const favCount = favourites.length;
    const favCountEl = document.getElementById('insightFavCount');
    if (favCountEl) favCountEl.textContent = favCount;

    // 2. Planned journeys count
    const journeyCount = journeys.length;
    const journeyCountEl = document.getElementById('insightJourneysCount');
    if (journeyCountEl) journeyCountEl.textContent = journeyCount;

    // 3. Upcoming journeys
    const todayStr = new Date().toISOString().split('T')[0];
    const upcomingJourneys = journeys.filter(j => j.status === 'Upcoming' || (j.startDate && j.startDate >= todayStr));
    const upcomingCountEl = document.getElementById('insightUpcomingCount');
    if (upcomingCountEl) upcomingCountEl.textContent = upcomingJourneys.length;

    // 4. Total planned budget & activity costs
    let totalBudget = 0;
    let totalEstimatedSpend = 0;
    let totalTravelDays = 0;

    journeys.forEach(j => {
      totalBudget += Number(j.budget) || 0;

      const dest = POLARIS_DESTINATIONS.find(d => d.id === j.destinationId) || { dailyBudget: 150 };
      const d1 = new Date(j.startDate);
      const d2 = new Date(j.endDate);
      const days = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);
      totalTravelDays += days;

      const actCost = (j.activities || []).reduce((sum, a) => sum + (parseFloat(a.cost) || 0), 0);
      const livingCost = dest.dailyBudget * days * (j.travellers || 1);
      totalEstimatedSpend += (actCost + livingCost);
    });

    const budgetEl = document.getElementById('insightTotalBudget');
    if (budgetEl) budgetEl.textContent = `$${Math.round(totalBudget).toLocaleString()}`;

    const estSpendEl = document.getElementById('insightEstimatedSpend');
    if (estSpendEl) estSpendEl.textContent = `$${Math.round(totalEstimatedSpend).toLocaleString()}`;

    // 5. Most frequently selected travel style
    const styleCounts = {};
    // From journeys
    journeys.forEach(j => {
      if (j.travelStyle) {
        styleCounts[j.travelStyle] = (styleCounts[j.travelStyle] || 0) + 2; // Weight active journeys higher
      }
    });
    // From favourited destinations
    favourites.forEach(destId => {
      const dest = POLARIS_DESTINATIONS.find(d => d.id === destId);
      if (dest && Array.isArray(dest.travelStyles)) {
        dest.travelStyles.forEach(s => {
          styleCounts[s] = (styleCounts[s] || 0) + 1;
        });
      }
    });

    let topStyle = 'Bespoke Discovery';
    let maxStyleCount = 0;
    Object.entries(styleCounts).forEach(([style, count]) => {
      if (count > maxStyleCount) {
        maxStyleCount = count;
        topStyle = style;
      }
    });

    const topStyleEl = document.getElementById('insightTopStyle');
    if (topStyleEl) topStyleEl.textContent = topStyle;

    // 6. Continent Distribution
    this.renderContinentDistribution(favourites, journeys);

    // 7. Travel Persona / Style Breakdown List
    this.renderStyleBreakdown(styleCounts);
  },

  /**
   * Calculates and renders continent distribution bars
   */
  renderContinentDistribution(favourites, journeys) {
    const container = document.getElementById('insightContinentBars');
    if (!container) return;

    // Tally continents from both favourites and planned journeys
    const continentCounts = {
      'Europe': 0,
      'Asia': 0,
      'North America': 0,
      'Africa': 0,
      'Oceania': 0
    };

    let totalPoints = 0;

    // Favourites
    favourites.forEach(id => {
      const dest = POLARIS_DESTINATIONS.find(d => d.id === id);
      if (dest && continentCounts[dest.continent] !== undefined) {
        continentCounts[dest.continent]++;
        totalPoints++;
      }
    });

    // Journeys
    journeys.forEach(j => {
      const dest = POLARIS_DESTINATIONS.find(d => d.id === j.destinationId);
      if (dest && continentCounts[dest.continent] !== undefined) {
        continentCounts[dest.continent] += 2; // Higher weight for actual trips
        totalPoints += 2;
      }
    });

    if (totalPoints === 0) {
      container.innerHTML = `
        <div class="text-muted text-center py-4 fs-sm">
          Save destinations or plan journeys to see your geographic distribution.
        </div>
      `;
      return;
    }

    const continentColors = {
      'Europe': 'bg-accent',
      'Asia': 'bg-primary',
      'North America': 'bg-info',
      'Africa': 'bg-warning',
      'Oceania': 'bg-success'
    };

    const barsHtml = Object.entries(continentCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([continent, count]) => {
        const pct = Math.round((count / totalPoints) * 100);
        const colorClass = continentColors[continent] || 'bg-secondary';
        return `
          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center fs-xs mb-1">
              <span class="fw-semibold text-dark">${continent}</span>
              <span class="text-muted">${pct}% (${count} ${count === 1 ? 'affinity point' : 'affinity points'})</span>
            </div>
            <div class="progress" style="height: 7px;">
              <div class="progress-bar ${colorClass}" role="progressbar" style="width: ${pct}%;" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        `;
      }).join('');

    container.innerHTML = barsHtml;
  },

  /**
   * Renders the styled pill tags for travel preferences
   */
  renderStyleBreakdown(styleCounts) {
    const container = document.getElementById('insightStyleTagsContainer');
    if (!container) return;

    const entries = Object.entries(styleCounts).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
      container.innerHTML = `<span class="text-muted fs-xs">No style preferences recorded yet.</span>`;
      return;
    }

    container.innerHTML = entries.map(([style, count]) => `
      <span class="badge rounded-pill bg-light text-dark border p-2 px-3 fs-xs me-2 mb-2 d-inline-flex align-items-center">
        <i class="bi bi-compass text-accent me-1"></i>
        <span>${style}</span>
        <span class="badge bg-dark text-white rounded-pill ms-2 fs-xxs">${count}</span>
      </span>
    `).join('');
  }
};
