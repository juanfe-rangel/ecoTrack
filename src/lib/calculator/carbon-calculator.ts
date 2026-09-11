import { CATEGORY_META, EMISSION_FACTORS } from "@/lib/constants/emission-factors";
import { parseActivities } from "@/lib/parser/activity-parser";
import type {
  CalculationResult,
  EmissionBreakdown,
  EmissionCategory,
  ParsedActivity,
} from "@/lib/types";

function factorFor(category: EmissionCategory): number {
  switch (category) {
    case "electricity":
      return EMISSION_FACTORS.electricityKgPerKwh;
    case "gasoline":
      return EMISSION_FACTORS.gasolineKgPerLiter;
    case "diesel":
      return EMISSION_FACTORS.dieselKgPerLiter;
    case "naturalGas":
      return EMISSION_FACTORS.naturalGasKgPerM3;
    case "deliveryVan":
      return EMISSION_FACTORS.deliveryVanKgPerKm;
    case "car":
      return EMISSION_FACTORS.carKgPerKm;
    case "motorcycle":
      return EMISSION_FACTORS.motorcycleKgPerKm;
    case "truck":
      return EMISSION_FACTORS.truckKgPerKm;
  }
}

function toBreakdown(activity: ParsedActivity): EmissionBreakdown {
  const factorKgCO2e = factorFor(activity.category);
  const kgCO2e = activity.quantity * factorKgCO2e;

  return {
    category: activity.category,
    label: CATEGORY_META[activity.category].label,
    quantity: activity.quantity,
    unit: activity.unit,
    factorKgCO2e,
    kgCO2e,
    sourceText: activity.sourceText,
  };
}

export function calculateFootprint(rawText: string): CalculationResult {
  const parsed = parseActivities(rawText);

  if (parsed.status !== "ok") {
    return {
      status: parsed.status,
      breakdown: [],
      totalKgCO2e: 0,
      message: parsed.message,
      warnings: parsed.warnings,
    };
  }

  const breakdown = parsed.activities
    .map(toBreakdown)
    .sort((a, b) => b.kgCO2e - a.kgCO2e);

  const totalKgCO2e = breakdown.reduce((sum, item) => sum + item.kgCO2e, 0);

  return {
    status: "ok",
    breakdown,
    totalKgCO2e,
    message: parsed.message,
    warnings: parsed.warnings,
  };
}
