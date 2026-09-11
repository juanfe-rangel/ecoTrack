"use client";

import { useState } from "react";
import { calculateFootprint } from "@/lib/calculator/carbon-calculator";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const evaluation = calculateFootprint(input);
    setResult(evaluation);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-emerald-100">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 tracking-tight">EcoTrack AI</h1>
          <p className="text-sm text-slate-500 mt-2">
            Calcula la huella de carbono de tu negocio describiendo tus actividades cotidianas.
          </p>
        </header>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Describe tus actividades de hoy:
            </label>
            <textarea
              className="w-full h-32 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm resize-none"
              placeholder="Ej: Hoy usamos 5 camionetas de reparto y gastamos 200kWh de luz..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-md shadow-emerald-600/20"
          >
            Calcular Huella de Carbono
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">Resultados Estimados</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                <p className="text-xs text-slate-500">Emisión Total</p>
                <p className="text-xl font-bold text-emerald-700">
                  {result.totalKgCO2e?.toFixed(2) || 0} <span className="text-xs font-normal">kg CO₂e</span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                <p className="text-xs text-slate-500">Actividades Detectadas</p>
                <p className="text-xl font-bold text-slate-700">{result.breakdown?.length || 0}</p>
              </div>
            </div>

            {result.warnings && result.warnings.length > 0 && (
              <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                {result.warnings.join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}