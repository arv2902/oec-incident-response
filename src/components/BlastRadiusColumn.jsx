import React from 'react';
import { Ship, Truck, Factory } from 'lucide-react';

export default function BlastRadiusColumn({ scenario }) {
  const getIcon = (id) => {
    switch (id) {
      case 'vessel':
      case 'weather-vessel':
      case 'shipyard-propulsion':
        return <Ship className="w-5 h-5 text-sky-400" />;
      case 'trucks':
      case 'weather-port':
      case 'shipyard-charter':
        return <Truck className="w-5 h-5 text-amber-400" />;
      case 'factory':
      case 'weather-pharma':
      case 'shipyard-parts':
        return <Factory className="w-5 h-5 text-red-400" />;
      default:
        return <Ship className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section className="flex flex-col space-y-4">
      {/* Column Title Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Column 1
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Blast Radius (Impact)
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-400">
          3 Operational Exposures
        </span>
      </div>

      {/* 3 Impact Cards */}
      <div className="space-y-3.5">
        {scenario.impactItems?.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-slate-800 bg-[#0f1626] hover:border-slate-700 transition-colors shadow-sm"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
                  {getIcon(item.id)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-400">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.highlight && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/60 text-red-300 border border-red-800/50 shrink-0">
                  {item.highlight}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-3.5">
              {item.description}
            </p>

            {/* Metrics List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
              {item.metrics?.map((m, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                  <div className="text-slate-400 text-[11px]">{m.label}</div>
                  <div className="text-slate-200 font-semibold mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
