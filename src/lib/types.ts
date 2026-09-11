export type EmissionCategory =
  | "electricity"
  | "gasoline"
  | "diesel"
  | "naturalGas"
  | "deliveryVan"
  | "car"
  | "motorcycle"
  | "truck";

export type ActivityUnit =
  | "kWh"
  | "L"
  | "m³"
  | "km"
  | "vehículo-día";

export interface ParsedActivity {
  category: EmissionCategory;
  quantity: number;
  unit: ActivityUnit;
  label: string;
  sourceText: string;
}

export type ParseStatus = "ok" | "empty" | "unrecognized";

export interface ParseResult {
  status: ParseStatus;
  activities: ParsedActivity[];
  message: string;
  warnings: string[];
}

export interface EmissionBreakdown {
  category: EmissionCategory;
  label: string;
  quantity: number;
  unit: ActivityUnit;
  factorKgCO2e: number;
  kgCO2e: number;
  sourceText: string;
}

export interface CalculationResult {
  status: ParseStatus;
  breakdown: EmissionBreakdown[];
  totalKgCO2e: number;
  message: string;
  warnings: string[];
}
