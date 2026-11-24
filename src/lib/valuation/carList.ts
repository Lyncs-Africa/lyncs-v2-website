// Car makes and models accepted for swap valuation (the dropdowns).
// This IS the accept-list: we only swap these makes/models. Anything not here
// is a car we don't accept for swap, so the swap selects offer no "Other" escape
// hatch — the UI tells the seller plainly that only the listed vehicles qualify.
// Trimmed to the fastest-moving, highest-liquidity tokunbo/Nigerian-used models
// (Toyota/Honda/Lexus/Hyundai/Mercedes/BMW/Ford) so the swap book stays to cars
// we can resell quickly.
// This list only feeds the selects. Prices live in the valuation data source.
// NOTE: OTHER_OPTION and the getCatalog* helpers below are NOT part of the swap
// accept-list; they serve the separate "request a vehicle to buy" flow.

import carsCatalog from "../../../cars.json";

export type CarMake = {
  make: string;
  models: string[];
};

export const CAR_LIST: CarMake[] = [
  {
    make: "Toyota",
    models: [
      "Avalon",
      "Camry",
      "Corolla",
      "Hiace",
      "Highlander",
      "Hilux",
      "Land Cruiser",
      "Land Cruiser Prado",
      "RAV4",
      "Sienna",
      "Venza",
      "Yaris",
      "4Runner",
    ],
  },
  {
    make: "Lexus",
    models: ["ES 350", "GX 460", "GX 470", "LX 570", "NX 300", "RX 350"],
  },
  {
    make: "Honda",
    models: ["Accord", "Civic", "CR-V", "HR-V", "Pilot"],
  },
  {
    make: "Hyundai",
    models: ["Accent", "Creta", "Elantra", "Santa Fe", "Sonata", "Tucson"],
  },
  {
    make: "Mercedes-Benz",
    models: ["C-Class", "E-Class", "GLA", "GLC", "GLE"],
  },
  {
    make: "BMW",
    models: ["3 Series", "5 Series", "X3", "X5"],
  },
  {
    make: "Ford",
    models: ["Edge", "Escape", "Explorer"],
  },
];

export const OTHER_OPTION = "Other";

// Swap accept-list only — no "Other": a make we don't list is one we don't swap.
export function getMakes(): string[] {
  return CAR_LIST.map((c) => c.make);
}

// Swap accept-list only — no "Other": a model we don't list is one we don't swap.
export function getModels(make: string): string[] {
  const found = CAR_LIST.find((c) => c.make === make);
  return found ? [...found.models] : [];
}

export function getYears(from = 2005): number[] {
  const current = new Date().getFullYear();
  return Array.from({ length: current - from + 1 }, (_, i) => current - i);
}

const MAKE_ALIASES: Record<string, string> = {
  "Mercedes Benz": "Mercedes-Benz",
};

const CATALOG_MODEL_MAP: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  for (const entry of CAR_LIST) {
    map[entry.make] = [...entry.models];
  }
  for (const item of carsCatalog as Array<{ make?: string; model?: string }>) {
    const rawMake = item.make?.trim();
    const rawModel = item.model?.trim();
    if (!rawMake || !rawModel) continue;
    const make = MAKE_ALIASES[rawMake] || rawMake;
    if (!map[make]) map[make] = [];
    if (!map[make].includes(rawModel)) {
      map[make].push(rawModel);
    }
  }
  return map;
})();

export function getCatalogMakes(): string[] {
  return [...Object.keys(CATALOG_MODEL_MAP), OTHER_OPTION];
}

export function getCatalogModels(make: string): string[] {
  if (!make) return [OTHER_OPTION];
  const models = CATALOG_MODEL_MAP[make];
  return models ? [...models, OTHER_OPTION] : [OTHER_OPTION];
}
