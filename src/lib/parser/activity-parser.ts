import { CATEGORY_META, DEFAULT_DAILY_KM } from "@/lib/constants/emission-factors";
import type {
  ActivityUnit,
  EmissionCategory,
  ParsedActivity,
  ParseResult,
} from "@/lib/types";

const NUMBER = String.raw`(\d+(?:[.,]\d+)?)`;

interface ExtractorMatch {
  start: number;
  end: number;
  activity: ParsedActivity;
}

function parseQuantity(raw: string): number {
  const normalized = raw.includes(",") && !raw.includes(".")
    ? raw.replace(",", ".")
    : raw.replace(/,/g, "");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : Number.NaN;
}

function normalizeInput(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function isValidQuantity(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

function pushMatch(
  matches: ExtractorMatch[],
  full: string,
  index: number,
  length: number,
  category: EmissionCategory,
  quantity: number,
  unit: ActivityUnit,
  sourceText: string,
): void {
  if (!isValidQuantity(quantity)) {
    return;
  }

  matches.push({
    start: index,
    end: index + length,
    activity: {
      category,
      quantity,
      unit,
      label: CATEGORY_META[category].label,
      sourceText,
    },
  });
}

function collectElectricity(text: string, matches: ExtractorMatch[]): void {
  const patterns = [
    new RegExp(
      `${NUMBER}\\s*(?:kwh|kw\\s*h|kilovatios?\\s*hora|kilowatts?\\s*hora)`,
      "gi",
    ),
    new RegExp(
      `${NUMBER}\\s*(?:de\\s+)?(?:luz|electricidad|energia|energy|electricity)`,
      "gi",
    ),
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      if (match.index === undefined || match[1] === undefined) {
        continue;
      }
      pushMatch(
        matches,
        text,
        match.index,
        match[0].length,
        "electricity",
        parseQuantity(match[1]),
        "kWh",
        match[0].trim(),
      );
    }
  }
}

function collectFuel(text: string, matches: ExtractorMatch[]): void {
  const patterns: Array<{
    regex: RegExp;
    category: EmissionCategory;
    unit: ActivityUnit;
    litersPerUnit?: number;
  }> = [
    {
      regex: new RegExp(
        `${NUMBER}\\s*(?:l|lt|lts|litro|litros)\\s*(?:de\\s+)?(?:gasolina|nafta|gasoline|petrol)`,
        "gi",
      ),
      category: "gasoline",
      unit: "L",
    },
    {
      regex: new RegExp(
        `${NUMBER}\\s*(?:gal(?:on(?:es)?)?|gallons?)\\s*(?:de\\s+)?(?:gasolina|nafta|gasoline)?`,
        "gi",
      ),
      category: "gasoline",
      unit: "L",
      litersPerUnit: 3.785,
    },
    {
      regex: new RegExp(
        `${NUMBER}\\s*(?:l|lt|lts|litro|litros)\\s*(?:de\\s+)?(?:diesel|diesel|gasoil|acpm)`,
        "gi",
      ),
      category: "diesel",
      unit: "L",
    },
    {
      regex: new RegExp(
        `${NUMBER}\\s*(?:m3|m\\^3|metros?\\s*cubicos?)\\s*(?:de\\s+)?(?:gas(?:\\s+natural)?)`,
        "gi",
      ),
      category: "naturalGas",
      unit: "m³",
    },
  ];

  for (const { regex, category, unit, litersPerUnit } of patterns) {
    for (const match of text.matchAll(regex)) {
      if (match.index === undefined || match[1] === undefined) {
        continue;
      }
      const quantity = parseQuantity(match[1]) * (litersPerUnit ?? 1);
      pushMatch(
        matches,
        text,
        match.index,
        match[0].length,
        category,
        quantity,
        unit,
        match[0].trim(),
      );
    }
  }
}

function collectVehicles(text: string, matches: ExtractorMatch[]): void {
  const vehiclePatterns: Array<{
    regex: RegExp;
    category: EmissionCategory;
    defaultKm: number;
  }> = [
    {
      regex: new RegExp(
        `${NUMBER}\\s*(?:camionetas?|vans?|furgonetas?|vehiculos?\\s+de\\s+reparto)`,
        "gi",
      ),
      category: "deliveryVan",
      defaultKm: DEFAULT_DAILY_KM.deliveryVan,
    },
    {
      regex: new RegExp(`${NUMBER}\\s*(?:camiones?|trucks?)`, "gi"),
      category: "truck",
      defaultKm: DEFAULT_DAILY_KM.truck,
    },
    {
      regex: new RegExp(`${NUMBER}\\s*(?:motos?|motocicletas?|motorcycles?)`, "gi"),
      category: "motorcycle",
      defaultKm: DEFAULT_DAILY_KM.motorcycle,
    },
    {
      regex: new RegExp(`${NUMBER}\\s*(?:autos?|carros?|coches?|cars?)`, "gi"),
      category: "car",
      defaultKm: DEFAULT_DAILY_KM.car,
    },
  ];

  const kmMatches = [...text.matchAll(new RegExp(`${NUMBER}\\s*(?:km|kilometros?)`, "gi"))];
  const totalKm = kmMatches.reduce((sum, match) => {
    const value = match[1] ? parseQuantity(match[1]) : Number.NaN;
    return sum + (isValidQuantity(value) ? value : 0);
  }, 0);

  const vehicleHits: ExtractorMatch[] = [];

  for (const { regex, category, defaultKm } of vehiclePatterns) {
    for (const match of text.matchAll(regex)) {
      if (match.index === undefined || match[1] === undefined) {
        continue;
      }
      const count = parseQuantity(match[1]);
      if (!isValidQuantity(count)) {
        continue;
      }
      vehicleHits.push({
        start: match.index,
        end: match.index + match[0].length,
        activity: {
          category,
          quantity: count,
          unit: "vehículo-día",
          label: CATEGORY_META[category].label,
          sourceText: match[0].trim(),
        },
      });
      void defaultKm;
    }
  }

  if (vehicleHits.length === 0 && totalKm > 0) {
    for (const match of kmMatches) {
      if (match.index === undefined || match[1] === undefined) {
        continue;
      }
      pushMatch(
        matches,
        text,
        match.index,
        match[0].length,
        "car",
        parseQuantity(match[1]),
        "km",
        match[0].trim(),
      );
    }
    return;
  }

  const totalVehicles = vehicleHits.reduce(
    (sum, hit) => sum + hit.activity.quantity,
    0,
  );

  for (const hit of vehicleHits) {
    const count = hit.activity.quantity;
    const category = hit.activity.category;
    const defaultKm =
      category === "deliveryVan"
        ? DEFAULT_DAILY_KM.deliveryVan
        : category === "truck"
          ? DEFAULT_DAILY_KM.truck
          : category === "motorcycle"
            ? DEFAULT_DAILY_KM.motorcycle
            : DEFAULT_DAILY_KM.car;

    const km =
      totalKm > 0 && totalVehicles > 0
        ? (totalKm * count) / totalVehicles
        : count * defaultKm;

    matches.push({
      start: hit.start,
      end: hit.end,
      activity: {
        category,
        quantity: km,
        unit: "km",
        label: CATEGORY_META[category].label,
        sourceText: hit.activity.sourceText,
      },
    });
  }
}

function overlaps(a: ExtractorMatch, b: ExtractorMatch): boolean {
  return a.start < b.end && b.start < a.end;
}

function resolveOverlaps(matches: ExtractorMatch[]): ParsedActivity[] {
  const sorted = [...matches].sort((a, b) => {
    const lengthDelta = b.end - b.start - (a.end - a.start);
    if (lengthDelta !== 0) {
      return lengthDelta;
    }
    return a.start - b.start;
  });

  const accepted: ExtractorMatch[] = [];

  for (const candidate of sorted) {
    const isDuplicateSpan = accepted.some((item) => overlaps(item, candidate));
    if (isDuplicateSpan) {
      continue;
    }
    accepted.push(candidate);
  }

  return accepted
    .sort((a, b) => a.start - b.start)
    .filter((item) => item.activity.unit !== "vehículo-día")
    .reduce<ParsedActivity[]>((acc, item) => {
      const existing = acc.find(
        (activity) =>
          activity.category === item.activity.category &&
          activity.unit === item.activity.unit,
      );
      if (existing) {
        existing.quantity += item.activity.quantity;
        return acc;
      }
      acc.push({ ...item.activity });
      return acc;
    }, []);
}

export function parseActivities(rawText: string): ParseResult {
  const trimmed = rawText.trim();

  if (!trimmed) {
    return {
      status: "empty",
      activities: [],
      warnings: [],
      message:
        "Escribe una actividad del negocio para estimar la huella. Por ejemplo: “Hoy usamos 5 camionetas y 200 kWh de luz”.",
    };
  }

  const text = normalizeInput(trimmed);
  const matches: ExtractorMatch[] = [];

  collectElectricity(text, matches);
  collectFuel(text, matches);
  collectVehicles(text, matches);

  const activities = resolveOverlaps(matches).filter((activity) =>
    isValidQuantity(activity.quantity),
  );

  if (activities.length === 0) {
    return {
      status: "unrecognized",
      activities: [],
      warnings: [],
      message:
        "No reconocimos cantidades de energía, combustible o transporte. Prueba con kWh, litros, km o el número de vehículos.",
    };
  }

  const warnings: string[] = [];
  const assumedDistance = activities.some(
    (activity) =>
      activity.unit === "km" &&
      /camionet|van|furgonet|camion|truck|moto|auto|carro|coche|car/.test(
        activity.sourceText,
      ),
  );
  const hasExplicitKm = /(?:km|kilometros?)/i.test(text);
  if (assumedDistance && !hasExplicitKm) {
    warnings.push(
      "No indicaste kilómetros: usamos una distancia diaria típica por vehículo para la estimación.",
    );
  }

  return {
    status: "ok",
    activities,
    warnings,
    message: "Actividades identificadas a partir del texto.",
  };
}
