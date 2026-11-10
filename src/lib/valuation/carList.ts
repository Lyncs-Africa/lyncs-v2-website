// Car makes and models for the Lyncs valuation dropdowns.
// Focused on cars common on Nigerian roads (tokunbo and Nigerian used).
// This list only feeds the selects. Prices live in the valuation data source.
// "Other" is handled in the UI: picking it routes to the "couldn't value" state.

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
