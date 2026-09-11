"use client";

import { useState, type FormEvent } from "react";
import { CATEGORY_META, EXAMPLE_PROMPTS } from "@/lib/constants/emission-factors";
import { calculateFootprint } from "@/lib/calculator/carbon-calculator";
import { formatKg, formatQuantity } from "@/lib/format";
import type { CalculationResult } from "@/lib/types";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(calculateFootprint(input));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Estimador local para pequeños negocios
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            EcoTrack <span className="text-emerald-600">AI</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Describe lo que ocurrió hoy y recibe una estimación clara de tus emisiones,
            sin formularios complicados ni APIs externas.
          </p>
        </header>

        <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8">
          <form onSubmit={handleCalculate} className="space-y-5">
          <div>
            <label htmlFor="activities" className="mb-2 block text-sm font-semibold text-slate-800">
              ¿Qué actividades realizó tu negocio hoy?
            </label>
            <textarea
              id="activities"
              className="h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              placeholder="Ej.: Hoy usamos 5 camionetas de reparto y gastamos 200 kWh de luz..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-describedby="input-help"
            />
            <p id="input-help" className="mt-2 text-xs text-slate-500">
              Puedes mencionar kWh, litros, m³, kilómetros o cantidades de vehículos.
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
          >
            Calcular huella estimada
          </button>

          </form>

          <div className="border-t border-slate-100 pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Prueba un ejemplo
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.slice(0, 3).map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setInput(example)}
                  className="rounded-full border border-slate-200 px-3 py-2 text-left text-xs text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div
              className={`rounded-2xl border p-5 ${
                result.status === "ok"
                  ? "border-emerald-200 bg-emerald-50/70"
                  : "border-amber-200 bg-amber-50/70"
              }`}
              aria-live="polite"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Resultado de la estimación
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">{result.message}</h2>
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
                  {result.breakdown.length} {result.breakdown.length === 1 ? "actividad" : "actividades"}
                </span>
              </div>

              {result.status === "ok" && (
                <>
                  <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Emisión total estimada</p>
                    <p className="mt-1 text-3xl font-bold text-emerald-700">
                      {formatKg(result.totalKgCO2e)}{" "}
                      <span className="text-sm font-medium text-slate-500">kg CO₂e</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    {result.breakdown.map((item) => (
                      <div
                        key={`${item.category}-${item.unit}`}
                        className="flex items-center justify-between gap-4 rounded-xl bg-white/80 px-4 py-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800">
                            <span
                              className="mr-2 inline-block h-2 w-2 rounded-full"
                              style={{ backgroundColor: CATEGORY_META[item.category].accent }}
                            />
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatQuantity(item.quantity)} {item.unit} × {item.factorKgCO2e} kg CO₂e
                          </p>
                        </div>
                        <p className="shrink-0 font-bold text-slate-800">
                          {formatKg(item.kgCO2e)} kg
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {result.warnings.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                  {result.warnings.map((warning) => (
                    <p key={warning}>⚠ {warning}</p>
                  ))}
                </div>
              )}

              {result.status !== "ok" && (
                <p className="text-sm leading-6 text-amber-800">
                  Intenta describir una cantidad concreta, por ejemplo: “consumimos 150 kWh y 40 litros de gasolina”.
                </p>
              )}
            </div>
          )}

          <p className="text-center text-xs leading-5 text-slate-400">
            Estimación educativa basada en factores estáticos del MVP. No reemplaza un inventario formal de emisiones.
          </p>
        </section>
      </div>
    </main>
  );
}