import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SidebarScenarios({ 
  scenarios, 
  selectedScenarioId, 
  onSelectScenario 
}) {
  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-slate-800 bg-[#0d1322] p-5 flex flex-col justify-between">
      <div>
        {/* Menu Header */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Active Scenarios
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a crisis to review impact and execute responses.
          </p>
        </div>

        {/* Buttons List */}
        <div className="space-y-2" role="menu">
          {scenarios.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            const isCritical = scenario.severity === 'Critical';
            const isModerate = scenario.severity === 'Moderate';

            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? isCritical
                      ? 'bg-red-950/40 border-red-500/80 text-white shadow-sm ring-1 ring-red-500/40'
                      : 'bg-sky-950/40 border-sky-500/80 text-white shadow-sm ring-1 ring-sky-500/40'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Status Indicator Dot */}
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    isCritical 
                      ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                      : isModerate 
                        ? 'bg-amber-400' 
                        : 'bg-slate-500'
                  }`} />
                  
                  <div>
                    <div className="font-semibold text-sm leading-snug">
                      {scenario.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {scenario.severity} • {scenario.vessel}
                    </div>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${
                  isSelected ? 'text-sky-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle footnote */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
        European Logistics Operations • 3 scenarios active
      </div>
    </aside>
  );
}
