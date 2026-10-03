import React, { useEffect, useState } from 'react';
import { AlertCircle, MapPin, Ship } from 'lucide-react';

export default function AlertBanner({ scenario, triggerCount }) {
  const [isFlashing, setIsFlashing] = useState(false);
  const isSpanishStrike = scenario?.id === 'spanish-port-strike';

  useEffect(() => {
    if (isSpanishStrike) {
      setIsFlashing(true);
      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [scenario?.id, triggerCount, isSpanishStrike]);

  return (
    <div className="relative">
      {/* Screen red warning flash overlay */}
      {isFlashing && (
        <div 
          className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-700 bg-red-600/15"
          style={{ animation: 'pulse 0.4s ease-in-out 3' }}
        />
      )}

      {/* Modern Red Warning Banner */}
      <div className={`p-4 rounded-xl border transition-all duration-300 ${
        isSpanishStrike
          ? 'bg-gradient-to-r from-red-950/70 via-red-900/30 to-slate-900 border-red-500/80 shadow-lg shadow-red-950/50'
          : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
              isSpanishStrike 
                ? 'bg-red-500 text-white shadow-md shadow-red-500/30' 
                : 'bg-slate-800 text-slate-300'
            }`}>
              <AlertCircle className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                  isSpanishStrike ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isSpanishStrike ? 'Critical Incident' : 'Operational Advisory'}
                </span>
                <span className="text-xs text-slate-400">
                  {scenario?.timeDetected}
                </span>
              </div>

              <h2 className="text-base font-semibold text-white mt-1">
                {scenario?.warningHeadline}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-3xl leading-relaxed">
                {scenario?.warningMessage}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 text-xs text-slate-300 shrink-0 self-start sm:self-center pl-10 sm:pl-0">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{scenario?.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400">
              <Ship className="w-3.5 h-3.5 text-sky-400" />
              <span>{scenario?.vessel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
