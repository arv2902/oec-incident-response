import React, { useState } from 'react';
import { Sliders, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck, DollarSign, Clock, Check } from 'lucide-react';

export default function FinancialSimulator({ scenario, completedActions }) {
  const [durationHours, setDurationHours] = useState(36);
  const [selectedStrategy, setSelectedStrategy] = useState('hold'); // 'hold' or 'divert'

  const rates = scenario.rates || {
    demurragePerDay: 24000,
    detentionPerHour: 8500,
    factoryShiftCost: 145000,
    factoryBufferHours: 8.5,
    diversionFuelCost: 42000,
    diversionPortFee: 28000,
    diversionExtraTruckingCost: 35000
  };

  // Calculations for Unmitigated Status
  const days = durationHours / 24;
  const unmitigatedDemurrage = Math.round(days * rates.demurragePerDay);
  const unmitigatedDetention = Math.round(durationHours * rates.detentionPerHour);
  
  // Factory idle cost (after buffer hours)
  const idleHours = Math.max(0, durationHours - rates.factoryBufferHours);
  const idleShifts = Math.ceil(idleHours / 8);
  const unmitigatedFactoryCost = idleShifts * rates.factoryShiftCost;

  const totalUnmitigatedCost = unmitigatedDemurrage + unmitigatedDetention + unmitigatedFactoryCost;

  // Mitigations applied from current state
  const isVesselHeld = !!completedActions['hold-vessel'];
  const isTonuExecuted = !!completedActions['tonu-protocol'];
  const isMaintenanceShifted = !!completedActions['maintenance-shift'];

  // Cost under Strategy A: Hold Offshore (with executed mitigations)
  const heldDemurrage = isVesselHeld ? 0 : unmitigatedDemurrage;
  const heldDetention = isTonuExecuted ? 142 * 180 : unmitigatedDetention; // flat TONU cancellation fee (€25.5k)
  const heldFactoryCost = isMaintenanceShifted ? 0 : unmitigatedFactoryCost;
  const totalHeldCost = heldDemurrage + heldDetention + heldFactoryCost;
  const totalHeldSavings = totalUnmitigatedCost - totalHeldCost;

  // Cost under Strategy B: Divert to Tangier Med / Valencia
  const diversionDirectCosts = rates.diversionFuelCost + rates.diversionPortFee + rates.diversionExtraTruckingCost;
  // Diversion takes 24 hours to dock and cross-haul, so factory gets parts at T+30h:
  const diversionFactoryImpactHours = Math.max(0, 30 - rates.factoryBufferHours);
  const diversionShifts = isMaintenanceShifted ? 0 : Math.ceil(diversionFactoryImpactHours / 8);
  const diversionFactoryCost = diversionShifts * rates.factoryShiftCost;
  const totalDiversionCost = diversionDirectCosts + diversionFactoryCost;
  const totalDiversionSavings = totalUnmitigatedCost - totalDiversionCost;

  // Buffer percentage
  const bufferPercent = Math.min(100, Math.max(0, Math.round((rates.factoryBufferHours / durationHours) * 100)));

  return (
    <div className="bg-[#0f1626] border border-slate-800 rounded-2xl p-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-800">
              Interactive Financial Model
            </span>
            <span className="text-xs text-slate-400">• Real-Time Trade-off Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-1">
            "What-If" Crisis Duration & Cost Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Slide incident duration to simulate financial exposure curves and compare response strategies.
          </p>
        </div>

        {/* Live Duration Readout */}
        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700/80">
          <Clock className="w-5 h-5 text-sky-400" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Simulated Duration</div>
            <div className="text-lg font-bold text-white">{durationHours} Hours ({(durationHours / 24).toFixed(1)} Days)</div>
          </div>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-slate-400">
          <span>12 Hours (Minor Shift)</span>
          <span className="text-sky-400 font-bold">Selected: {durationHours}h</span>
          <span>48 Hours</span>
          <span>72 Hours</span>
          <span>96 Hours (Extended Strike)</span>
        </div>
        <input
          type="range"
          min="12"
          max="96"
          step="6"
          value={durationHours}
          onChange={(e) => setDurationHours(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
      </div>

      {/* Exposure Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Demurrage Bleed</div>
          <div className="text-lg font-bold text-red-400 mt-1">€{unmitigatedDemurrage.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">€24k/day port lock</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">3PL Truck Detention</div>
          <div className="text-lg font-bold text-amber-400 mt-1">€{unmitigatedDetention.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">142 trucks @ €8.5k/hr</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Factory Idle Downtime</div>
          <div className="text-lg font-bold text-red-400 mt-1">€{unmitigatedFactoryCost.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{idleShifts} shift(s) idled</div>
        </div>

        <div className="bg-red-950/30 p-4 rounded-xl border border-red-800/60">
          <div className="text-xs text-red-300 font-semibold">Total Unmitigated Loss</div>
          <div className="text-xl font-black text-red-400 mt-1">€{totalUnmitigatedCost.toLocaleString()}</div>
          <div className="text-[11px] text-red-400/80 mt-0.5">If no action is taken</div>
        </div>
      </div>

      {/* Factory Safety Buffer Countdown */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${durationHours > rates.factoryBufferHours ? 'text-red-400' : 'text-emerald-400'}`} />
            <span className="font-semibold text-slate-200">Cadiz Factory JIT Inventory Depletion</span>
          </div>
          <span className="text-slate-400 font-medium">
            {durationHours > rates.factoryBufferHours ? (
              <span className="text-red-400 font-bold">CRITICAL: Stock exhausted {(durationHours - rates.factoryBufferHours).toFixed(1)}h ago</span>
            ) : (
              <span className="text-emerald-400 font-bold">SAFE: {(rates.factoryBufferHours - durationHours).toFixed(1)}h buffer remaining</span>
            )}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${durationHours > rates.factoryBufferHours ? 'bg-red-500' : 'bg-emerald-500'}`} 
            style={{ width: `${bufferPercent}%` }}
          />
        </div>
      </div>

      {/* Strategy Comparison Engine */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Strategy Comparison: Hold vs. Divert Decision Matrix
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strategy 1: Hold Offshore */}
          <div className={`p-5 rounded-xl border transition-all ${
            selectedStrategy === 'hold' 
              ? 'bg-sky-950/30 border-sky-500 ring-1 ring-sky-500/40' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">Strategy 1 (Recommended)</span>
              <button 
                onClick={() => setSelectedStrategy('hold')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                {selectedStrategy === 'hold' ? 'Active Focus' : 'Select'}
              </button>
            </div>
            <h4 className="text-base font-bold text-white">Hold M/V Elli F Offshore + TONU Protocol</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Order vessel to drift outside territorial waters. Issue flat TONU payments to release trucks. Shift factory to tooling maintenance.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Mitigated Net Cost:</span>
                <span className="font-bold text-white">€{totalHeldCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Net Preserved Capital:</span>
                <span>+€{totalHeldSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Strategy 2: Divert to Tangier Med */}
          <div className={`p-5 rounded-xl border transition-all ${
            selectedStrategy === 'divert' 
              ? 'bg-sky-950/30 border-sky-500 ring-1 ring-sky-500/40' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Strategy 2 (Contingency)</span>
              <button 
                onClick={() => setSelectedStrategy('divert')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                {selectedStrategy === 'divert' ? 'Active Focus' : 'Select'}
              </button>
            </div>
            <h4 className="text-base font-bold text-white">Divert to Port of Tangier Med (Morocco)</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Steer across Gibraltar strait. Discharge at Tangier Med and ferry containers back to Spain via Algeciras roll-on/roll-off.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Diversion & Ferry Surcharges:</span>
                <span className="font-bold text-white">€{totalDiversionCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sky-400 font-semibold">
                <span>Net Saved vs Unmitigated:</span>
                <span>+€{totalDiversionSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Recommendation Pill */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">C-Level Decision Threshold:</strong> For strikes under <strong>60 hours</strong>, Holding Offshore + TONU saves <strong className="text-emerald-400">€{(totalHeldSavings - totalDiversionSavings > 0 ? totalHeldSavings - totalDiversionSavings : 0).toLocaleString()} more</strong> than diverting.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
