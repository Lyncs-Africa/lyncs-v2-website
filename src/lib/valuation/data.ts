// Mock valuation dataset for the swap estimator.
//
// This is a stand-in for a real pricing source (an API or a Payload
// collection). Values are indicative Nigerian used-market prices in NGN for a
// clean "Tokunbo" example of each model at the REFERENCE_YEAR. getCarValuation
// adjusts from here for year, mileage and condition.
//
// To swap for production, replace fetchCarValuation() in ./getCarValuation.ts;
// the component never reads this file directly.

export type Condition = 'Tokunbo' | 'Nigerian used' | 'Needs work'
export const CONDITIONS: Condition[] = ['Tokunbo', 'Needs work']

export const REFERENCE_YEAR = 2020
export const OLDEST_YEAR = 2005

// make -> model -> base value (clean Tokunbo, REFERENCE_YEAR), in NGN.
//
// INDICATIVE placeholder figures to exercise the UI — NOT confirmed market
// prices. Keys match ./carList exactly. Replace with a real pricing source
// before launch (see fetchCarValuation in ./getCarValuation.ts). Models/makes
// absent here (and "Other") fall through to the "couldn't value" state.
export const CAR_VALUES: Record<string, Record<string, number>> = {
    Toyota: {
        Avalon: 13_000_000,
        Camry: 12_500_000,
        Corolla: 9_500_000,
        Hiace: 16_000_000,
        Highlander: 26_000_000,
        Hilux: 22_000_000,
        'Land Cruiser': 55_000_000,
        'Land Cruiser Prado': 40_000_000,
        Matrix: 7_000_000,
        RAV4: 21_000_000,
        Sequoia: 30_000_000,
        Sienna: 17_000_000,
        Tacoma: 20_000_000,
        Tundra: 28_000_000,
        Venza: 15_000_000,
        Yaris: 8_000_000,
        '4Runner': 27_000_000,
    },
    Lexus: {
        'ES 330': 9_000_000,
        'ES 350': 15_000_000,
        'GX 460': 38_000_000,
        'GX 470': 22_000_000,
        'IS 250': 12_000_000,
        'LX 570': 60_000_000,
        'NX 300': 24_000_000,
        'RX 330': 12_000_000,
        'RX 350': 30_000_000,
    },
    Honda: {
        Accord: 11_000_000,
        Civic: 10_000_000,
        'CR-V': 17_000_000,
        Element: 9_000_000,
        'HR-V': 13_000_000,
        Odyssey: 12_000_000,
        Pilot: 16_000_000,
    },
    Hyundai: {
        Accent: 7_500_000,
        Creta: 14_000_000,
        Elantra: 9_000_000,
        ix35: 11_000_000,
        'Santa Fe': 15_000_000,
        Sonata: 9_500_000,
        Tucson: 14_000_000,
    },
    Kia: {
        Cerato: 8_500_000,
        Optima: 10_000_000,
        Picanto: 6_500_000,
        Rio: 7_500_000,
        Sorento: 15_000_000,
        Soul: 9_000_000,
        Sportage: 13_000_000,
    },
    Nissan: {
        Almera: 7_000_000,
        Altima: 10_000_000,
        Frontier: 14_000_000,
        Murano: 13_000_000,
        Pathfinder: 15_000_000,
        Patrol: 35_000_000,
        Rogue: 13_000_000,
        Sentra: 8_500_000,
        'X-Trail': 13_000_000,
    },
    'Mercedes-Benz': {
        'C-Class': 15_000_000,
        'E-Class': 20_000_000,
        GLA: 18_000_000,
        GLC: 28_000_000,
        GLE: 38_000_000,
        GLK: 16_000_000,
        ML: 18_000_000,
        'S-Class': 45_000_000,
        Sprinter: 22_000_000,
    },
    BMW: {
        '3 Series': 14_000_000,
        '5 Series': 20_000_000,
        '7 Series': 35_000_000,
        X3: 20_000_000,
        X5: 30_000_000,
        X6: 33_000_000,
    },
    Ford: {
        Edge: 15_000_000,
        Escape: 11_000_000,
        Explorer: 16_000_000,
        'F-150': 22_000_000,
        Focus: 8_000_000,
        Fusion: 10_000_000,
        Ranger: 18_000_000,
        Transit: 17_000_000,
    },
    Volkswagen: {
        Golf: 8_000_000,
        Jetta: 9_000_000,
        Passat: 11_000_000,
        Tiguan: 14_000_000,
        Touareg: 20_000_000,
    },
    Mazda: {
        'CX-5': 13_000_000,
        'CX-7': 10_000_000,
        'CX-9': 13_000_000,
        Mazda3: 8_500_000,
        Mazda6: 9_500_000,
    },
    Mitsubishi: {
        L200: 14_000_000,
        Lancer: 8_000_000,
        Outlander: 12_000_000,
        Pajero: 20_000_000,
    },
    Peugeot: {
        '301': 7_000_000,
        '406': 4_500_000,
        '407': 5_500_000,
        '508': 10_000_000,
        '3008': 14_000_000,
        Partner: 8_000_000,
    },
    Acura: {
        MDX: 15_000_000,
        RDX: 14_000_000,
        TL: 9_000_000,
        TSX: 8_500_000,
        ZDX: 13_000_000,
    },
    Chevrolet: {
        Cruze: 7_500_000,
        Equinox: 12_000_000,
        Malibu: 10_000_000,
        Tahoe: 28_000_000,
    },
    'Land Rover': {
        Defender: 45_000_000,
        Discovery: 30_000_000,
        'Range Rover': 65_000_000,
        'Range Rover Evoque': 28_000_000,
        'Range Rover Sport': 45_000_000,
    },
    Suzuki: {
        Dzire: 7_000_000,
        Ertiga: 9_000_000,
        Swift: 7_000_000,
        Vitara: 11_000_000,
    },
    Innoson: {
        'IVM Fox': 9_000_000,
        'IVM G5': 14_000_000,
        'IVM Ikenga': 16_000_000,
        'IVM Umu': 10_000_000,
    },
}

// The dropdown makes/models/years come from ./carList (the full catalogue).
// This file is only the pricing source: a model missing from CAR_VALUES (or
// an "Other" pick) resolves to null -> the "couldn't value" state.
