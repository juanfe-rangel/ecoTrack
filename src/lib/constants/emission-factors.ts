import type { EmissionCategory } from "@/lib/types";

/**
 * Factores estáticos de emisión (kg CO2e) para el MVP.
 * Valores de orden de magnitud típicos (red eléctrica y combustión),
 * no sustituyen un inventario formal ni APIs de terceros.
 */
export const EMISSION_FACTORS = {
  electricityKgPerKwh: 0.4,
  gasolineKgPerLiter: 2.31,
  dieselKgPerLiter: 2.68,
  naturalGasKgPerM3: 2.02,
  deliveryVanKgPerKm: 0.25,
  carKgPerKm: 0.17,
  motorcycleKgPerKm: 0.08,
  truckKgPerKm: 0.75,
} as const;

/** Distancia diaria estimada cuando solo se menciona la cantidad de vehículos. */
export const DEFAULT_DAILY_KM = {
  deliveryVan: 60,
  car: 35,
  motorcycle: 25,
  truck: 80,
} as const;

export const CATEGORY_META: Record<
  EmissionCategory,
  { label: string; shortLabel: string; accent: string }
> = {
  electricity: {
    label: "Electricidad",
    shortLabel: "Energía",
    accent: "#0f766e",
  },
  gasoline: {
    label: "Gasolina",
    shortLabel: "Combustible",
    accent: "#b45309",
  },
  diesel: {
    label: "Diésel",
    shortLabel: "Combustible",
    accent: "#92400e",
  },
  naturalGas: {
    label: "Gas natural",
    shortLabel: "Gas",
    accent: "#0369a1",
  },
  deliveryVan: {
    label: "Camionetas / vans",
    shortLabel: "Reparto",
    accent: "#15803d",
  },
  car: {
    label: "Autos",
    shortLabel: "Autos",
    accent: "#166534",
  },
  motorcycle: {
    label: "Motos",
    shortLabel: "Motos",
    accent: "#3f6212",
  },
  truck: {
    label: "Camiones",
    shortLabel: "Carga",
    accent: "#14532d",
  },
};

export const EXAMPLE_PROMPTS = [
  "Hoy usamos 5 camionetas de reparto y gastamos 200kWh de luz",
  "Consumimos 150 kWh y 40 litros de gasolina",
  "3 motos recorrieron 80 km y usamos 20 litros de diésel",
  "El local gastó 90 kWh y 12 m3 de gas natural",
] as const;
