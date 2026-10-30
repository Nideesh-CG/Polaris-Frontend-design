/**
 * POLARIS — Safe LocalStorage and Persistence Service
 * 
 * Handles graceful error recovery, schema validation, fallback defaults,
 * and resilient CRUD operations for Favourites and Journeys.
 */

const STORAGE_KEYS = {
  FAVOURITES: 'polaris_favourites_v1',
  JOURNEYS: 'polaris_journeys_v1',
  PREFERENCES: 'polaris_preferences_v1'
};

const PolarisStorage = {
  /**
   * Safely reads and parses a JSON item from localStorage
   */
  _get(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`[PolarisStorage] Error reading key "${key}":`, e);
      return defaultValue;
    }
  },

  /**
   * Safely writes a JSON item to localStorage
   */
  _set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[PolarisStorage] Error writing key "${key}":`, e);
      return false;
    }
  },

  /**
   * Initialize storage with starter data if completely empty
   */
  init() {
    try {
      // Initialize favourites if not present
      if (localStorage.getItem(STORAGE_KEYS.FAVOURITES) === null) {
        // Pre-save 2 iconic destinations as initial inspiration
        this._set(STORAGE_KEYS.FAVOURITES, ['kyoto', 'santorini', 'swiss-alps']);
      }

      // Initialize journeys if not present
      if (localStorage.getItem(STORAGE_KEYS.JOURNEYS) === null) {
        this._set(STORAGE_KEYS.JOURNEYS, typeof DEFAULT_SAMPLE_JOURNEYS !== 'undefined' ? DEFAULT_SAMPLE_JOURNEYS : []);
      }
    } catch (e) {
      console.warn('[PolarisStorage] Error initializing default data:', e);
    }
  },

  /* ==========================================================================
     FAVOURITES API
     ========================================================================== */

  /**
   * Returns an array of favourite destination IDs
   */
  getFavourites() {
    const list = this._get(STORAGE_KEYS.FAVOURITES, []);
    return Array.isArray(list) ? list : [];
  },

  /**
   * Checks if a destination ID is favourited
   */
  isFavourite(destinationId) {
    const list = this.getFavourites();
    return list.includes(destinationId);
  },

  /**
   * Toggles a destination in favourites.
   * Returns { isFavourite: boolean, count: number }
   */
  toggleFavourite(destinationId) {
    if (!destinationId) return { isFavourite: false, count: 0 };
    let list = this.getFavourites();
    let isFav = false;

    if (list.includes(destinationId)) {
      list = list.filter(id => id !== destinationId);
      isFav = false;
    } else {
      list.push(destinationId);
      isFav = true;
    }

    this._set(STORAGE_KEYS.FAVOURITES, list);
    return { isFavourite: isFav, count: list.length };
  },

  /**
   * Removes a destination from favourites
   */
  removeFavourite(destinationId) {
    let list = this.getFavourites();
    list = list.filter(id => id !== destinationId);
    this._set(STORAGE_KEYS.FAVOURITES, list);
    return list.length;
  },

  /* ==========================================================================
     JOURNEYS / ITINERARIES API
     ========================================================================== */

  /**
   * Returns all journeys
   */
  getJourneys() {
    const list = this._get(STORAGE_KEYS.JOURNEYS, []);
    if (!Array.isArray(list)) return [];
    
    // Sort journeys: upcoming first, then planning, then completed
    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  },

  /**
   * Retrieves a single journey by ID
   */
  getJourneyById(journeyId) {
    const list = this.getJourneys();
    return list.find(j => j.id === journeyId) || null;
  },

  /**
   * Creates or updates a journey
   */
  saveJourney(journey) {
    if (!journey || !journey.name) return null;
    const list = this.getJourneys();
    const existingIndex = list.findIndex(j => j.id === journey.id);

    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...journey, updatedAt: new Date().toISOString() };
    } else {
      journey.id = journey.id || 'journey-' + Date.now();
      journey.createdAt = journey.createdAt || new Date().toISOString();
      journey.activities = journey.activities || [];
      list.unshift(journey);
    }

    this._set(STORAGE_KEYS.JOURNEYS, list);
    return journey;
  },

  /**
   * Deletes a journey by ID
   */
  deleteJourney(journeyId) {
    let list = this.getJourneys();
    const beforeCount = list.length;
    list = list.filter(j => j.id !== journeyId);
    this._set(STORAGE_KEYS.JOURNEYS, list);
    return list.length < beforeCount;
  },

  /* ==========================================================================
     ACTIVITIES API (Nested within Journey)
     ========================================================================== */

  /**
   * Adds an activity to a specific journey
   */
  addActivity(journeyId, activity) {
    const journey = this.getJourneyById(journeyId);
    if (!journey) return false;

    if (!Array.isArray(journey.activities)) {
      journey.activities = [];
    }

    activity.id = activity.id || 'act-' + Date.now();
    activity.day = parseInt(activity.day, 10) || 1;
    activity.cost = parseFloat(activity.cost) || 0;

    journey.activities.push(activity);
    this.saveJourney(journey);
    return activity;
  },

  /**
   * Updates an existing activity in a journey
   */
  updateActivity(journeyId, activityId, updatedFields) {
    const journey = this.getJourneyById(journeyId);
    if (!journey || !Array.isArray(journey.activities)) return false;

    const index = journey.activities.findIndex(a => a.id === activityId);
    if (index === -1) return false;

    journey.activities[index] = {
      ...journey.activities[index],
      ...updatedFields,
      day: parseInt(updatedFields.day !== undefined ? updatedFields.day : journey.activities[index].day, 10) || 1,
      cost: parseFloat(updatedFields.cost !== undefined ? updatedFields.cost : journey.activities[index].cost) || 0
    };

    this.saveJourney(journey);
    return journey.activities[index];
  },

  /**
   * Deletes an activity from a journey
   */
  deleteActivity(journeyId, activityId) {
    const journey = this.getJourneyById(journeyId);
    if (!journey || !Array.isArray(journey.activities)) return false;

    journey.activities = journey.activities.filter(a => a.id !== activityId);
    this.saveJourney(journey);
    return true;
  },

  /* ==========================================================================
     DEMO DATA RESET & PREFERENCES
     ========================================================================== */

  /**
   * Resets all stored data back to rich defaults
   */
  resetDemoData() {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(['kyoto', 'santorini', 'swiss-alps']));
      localStorage.setItem(STORAGE_KEYS.JOURNEYS, JSON.stringify(typeof DEFAULT_SAMPLE_JOURNEYS !== 'undefined' ? DEFAULT_SAMPLE_JOURNEYS : []));
      return true;
    } catch (e) {
      console.error('[PolarisStorage] Reset failed:', e);
      return false;
    }
  }
};

// Initialize on script load
PolarisStorage.init();
