import React from 'react';
import { Compass, LayoutGrid, Map, Sliders, History, FileSpreadsheet } from 'lucide-react';

export default function Header({ 
  activeScenario, 
  activeView, 
  setActiveView, 
  completedCount, 
  totalActions,
  onOpenSitRep
}) {
  const isSpanishStrike = activeScenario?.id === 'spanish-port-strike';

  return (
    <header className="border-b border-slate-800 bg-[#0c121e] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Matrix Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shadow-sm shrink-0">
            <Compass className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
                OEC Incident Response Matrix
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Operations Command
              </span>
            </div>
            <p className="text-xs text-slate-400">
              C-Level Supply Chain Contingency & Crisis Management
            </p>
          </div>
        </div>

        {/* View Switcher Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveView('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              activeView === 'matrix'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Response Matrix</span>
          </button>

          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              activeView === 'map'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Tactical Map</span>
          </button>

          <button
            onClick={() => setActiveView('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              activeView === 'simulator'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>What-If Simulator</span>
          </button>

          <button
            onClick={() => setActiveView('warroom')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              activeView === 'warroom'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>War Room Log</span>
          </button>
        </div>

        {/* Action button: Executive SitRep */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSitRep}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
            <span>Executive SitRep</span>
          </button>
        </div>
      </div>
    </header>
  );
}
