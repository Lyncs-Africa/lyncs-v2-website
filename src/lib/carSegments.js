// Car-list condition tabs for /cars. Each tab is a real URL so it can be linked.
// New is the default view (no param); Used filters to used stock.

export const CAR_TABS = [
  {
    key: 'new',
    label: 'New',
    href: '/cars?condition=new',
    headline: 'Brand-new vehicles',
    blurb: 'Factory-fresh vehicles imported and landed for you, ready to register.',
  },
  {
    key: 'used',
    label: 'Used',
    href: '/cars?condition=used',
    headline: 'Certified used vehicles',
    blurb: 'Inspected, warranty-backed vehicles at a lower entry price.',
  },
]

// Use-case filter options for the catalog dropdown. Each value (except "all")
// matches a car's `segments` tag; filtering activates once cars are tagged.
export const USE_CASE_OPTIONS = [
  { value: 'all', label: 'Marketplace' },
  { value: 'businesses', label: 'For businesses' },
  { value: 'top-executives', label: 'For top executives' },
  { value: 'drivers', label: 'For e-hailing drivers' },
  { value: 'schools', label: 'For schools' },
  { value: 'individuals', label: 'For staff members' },
]

export const SEGMENT_KEYS = USE_CASE_OPTIONS.filter((o) => o.value !== 'all').map((o) => o.value)

export const CATALOG_PREFERENCE_STORAGE_KEY = "lyncs_catalog_preference";
export const CATALOG_PREFERENCE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getSavedCatalogPreference() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CATALOG_PREFERENCE_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const now = Date.now();
    // Clear if expired (> 24 hours)
    if (!data.timestamp || now - data.timestamp > CATALOG_PREFERENCE_TTL_MS) {
      localStorage.removeItem(CATALOG_PREFERENCE_STORAGE_KEY);
      return null;
    }
    return data.category || "all";
  } catch {
    return null;
  }
}

export function saveCatalogPreference(category = "all") {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      CATALOG_PREFERENCE_STORAGE_KEY,
      JSON.stringify({
        category,
        timestamp: Date.now(),
      })
    );
  } catch (err) {
    console.error("Failed to save catalog preference:", err);
  }
}

// Resolve the active tab key from the URL's condition param. No param → New.
export function resolveActiveTab(condition) {
  if (condition === 'used') return 'used'
  return 'new'
}

export function getTab(key) {
  return CAR_TABS.find((t) => t.key === key) || null
}
