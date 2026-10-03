import React from 'react';
import { Check, CheckCircle2, Circle, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ActionPlanColumn({ 
  scenario, 
  completedActions, 
  onToggleAction,
  onOpenDrawer
}) {
  const steps = scenario.mitigationPlan || [];
  const completedCount = steps.filter(s => completedActions[s.id]).length;

  return (
    <section className="flex flex-col space-y-4">
      {/* Column Title Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Column 2
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Immediate Action Plan (Mitigation)
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {completedCount} of {steps.length} Steps Executed
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-3.5">
        {steps.map((item) => {
          const isDone = !!completedActions[item.id];

          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all duration-200 shadow-sm ${
                isDone
                  ? 'border-emerald-700/60 bg-emerald-950/20'
                  : 'border-slate-800 bg-[#0f1626] hover:border-slate-700'
              }`}
            >
              {/* Top Row: Checkbox, Step Number, Benefit Badge */}
              <div className="flex items-start gap-3.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => onToggleAction(item.id)}
                  className="mt-0.5 shrink-0 focus:outline-none rounded-full p-0.5 transition-colors"
                  aria-label={`Toggle step ${item.step}: ${item.title}`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-sky-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-sky-400">
                      Step {item.step} • {item.systemType || 'PROTOCOL'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-emerald-300 border border-slate-700">
                      {item.benefit}
                    </span>
                  </div>

                  <h3 className={`text-base font-semibold transition-colors ${
                    isDone ? 'text-emerald-300 line-through decoration-emerald-500/60' : 'text-white'
                  }`}>
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed pl-8 mb-4">
                {item.summary}
              </p>

              {/* Action Button & Confirmation */}
              <div className="pl-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                <div className="text-xs">
                  {isDone ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {item.completedMessage}
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      Status: Ready for dispatch
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDrawer(item)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Payload</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onOpenDrawer(item)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isDone
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                    }`}
                  >
                    <span>{isDone ? 'Review Order' : item.actionLabel}</span>
                    {!isDone && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
