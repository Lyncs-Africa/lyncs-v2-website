// Car makes and models for the Lyncs valuation dropdowns.
// Focused on cars common on Nigerian roads (tokunbo and Nigerian used).
// This list only feeds the selects. Prices live in the valuation data source.
// "Other" is handled in the UI: picking it routes to the "couldn't value" state.

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
      "Matrix",
      "RAV4",
      "Sequoia",
      "Sienna",
      "Tacoma",
      "Tundra",
      "Venza",
      "Yaris",
      "4Runner",
    ],
  },
  {
    make: "Lexus",
    models: ["ES 330", "ES 350", "GX 460", "GX 470", "IS 250", "LX 570", "NX 300", "RX 330", "RX 350"],
  },
  {
    make: "Honda",
    models: ["Accord", "Civic", "CR-V", "Element", "HR-V", "Odyssey", "Pilot"],
  },
  {
    make: "Hyundai",
    models: ["Accent", "Creta", "Elantra", "ix35", "Santa Fe", "Sonata", "Tucson"],
  },
  {
    make: "Kia",
    models: ["Cerato", "Optima", "Picanto", "Rio", "Sorento", "Soul", "Sportage"],
  },
  {
    make: "Nissan",
    models: ["Almera", "Altima", "Frontier", "Murano", "Pathfinder", "Patrol", "Rogue", "Sentra", "X-Trail"],
  },
  {
    make: "Mercedes-Benz",
    models: ["C-Class", "E-Class", "GLA", "GLC", "GLE", "GLK", "ML", "S-Class", "Sprinter"],
  },
  {
    make: "BMW",
    models: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X6"],
  },
  {
    make: "Ford",
    models: ["Edge", "Escape", "Explorer", "F-150", "Focus", "Fusion", "Ranger", "Transit"],
  },
  {
    make: "Volkswagen",
    models: ["Golf", "Jetta", "Passat", "Tiguan", "Touareg"],
  },
  {
    make: "Mazda",
    models: ["CX-5", "CX-7", "CX-9", "Mazda3", "Mazda6"],
  },
  {
    make: "Mitsubishi",
    models: ["L200", "Lancer", "Outlander", "Pajero"],
  },
  {
    make: "Peugeot",
    models: ["301", "406", "407", "508", "3008", "Partner"],
  },
  {
    make: "Acura",
    models: ["MDX", "RDX", "TL", "TSX", "ZDX"],
  },
  {
    make: "Chevrolet",
    models: ["Cruze", "Equinox", "Malibu", "Tahoe"],
  },
  {
    make: "Land Rover",
    models: ["Defender", "Discovery", "Range Rover", "Range Rover Evoque", "Range Rover Sport"],
  },
  {
    make: "Suzuki",
    models: ["Dzire", "Ertiga", "Swift", "Vitara"],
  },
  {
    make: "Innoson",
    // Verify current model names with Innoson before launch.
    models: ["IVM Fox", "IVM G5", "IVM Ikenga", "IVM Umu"],
  },
];

export const OTHER_OPTION = "Other";

export function getMakes(): string[] {
  return [...CAR_LIST.map((c) => c.make), OTHER_OPTION];
}

export function getModels(make: string): string[] {
  const found = CAR_LIST.find((c) => c.make === make);
  return found ? [...found.models, OTHER_OPTION] : [OTHER_OPTION];
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
