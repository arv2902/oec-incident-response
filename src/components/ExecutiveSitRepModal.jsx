import React from 'react';
import { X, Printer, ShieldCheck, Download, FileText, CheckCircle } from 'lucide-react';

export default function ExecutiveSitRepModal({ 
  scenario, 
  completedActions, 
  totalSaved, 
  onClose 
}) {
  const steps = scenario.mitigationPlan || [];
  const completedSteps = steps.filter(s => completedActions[s.id]);
  const isAllComplete = completedSteps.length === steps.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f1626] border border-slate-700 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800">
                SITREP // EXECUTIVE DOSSIER
              </span>
              <span className="text-xs text-slate-400">Classification: C-Level Confidential</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              OEC Incident Briefing: {scenario.name}
            </h2>
            <p className="text-xs text-slate-400">
              Corridor: {scenario.location} • Target Asset: {scenario.vessel}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-sky-400 uppercase tracking-wider">Executive Overview</div>
          <p className="text-slate-300 leading-relaxed text-sm">
            {scenario.warningHeadline}. {scenario.warningMessage} Cross-functional contingency operations have been initiated under Global Logistics COO directive to insulate operations from open-ended detention, vessel demurrage, and manufacturing downtime.
          </p>
        </div>

        {/* Financial KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[11px]">MITIGATED SAVINGS ACHIEVED</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">+€{totalSaved.toLocaleString()}</span>
            <span className="text-slate-500 text-[10px]">Avoided port dues & detention</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[11px]">MITIGATION STATUS</span>
            <span className="text-2xl font-black text-sky-400 mt-1 block">
              {completedSteps.length} / {steps.length}
            </span>
            <span className="text-slate-500 text-[10px]">
              {isAllComplete ? 'All Protocols Executed' : 'Execution in progress'}
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[11px]">CARGO UNDER PROTECTION</span>
            <span className="text-2xl font-black text-white mt-1 block">3,200 TEU</span>
            <span className="text-slate-500 text-[10px]">Automotive battery modules</span>
          </div>
        </div>

        {/* Actions Audit Table */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-slate-400 uppercase tracking-wider">Mitigation Plan Audit Record</div>
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Step</th>
                  <th className="p-3">Mitigation Action</th>
                  <th className="p-3">System Interface</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {steps.map(s => {
                  const done = !!completedActions[s.id];
                  return (
                    <tr key={s.id}>
                      <td className="p-3 font-mono font-bold text-slate-400">0{s.step}</td>
                      <td className="p-3 text-slate-200 font-medium">{s.title}</td>
                      <td className="p-3 text-slate-400 font-mono">{s.systemType}</td>
                      <td className="p-3 text-right">
                        {done ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold text-[10px]">
                            <CheckCircle className="w-3 h-3" /> EXECUTED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold text-[10px]">
                            PENDING
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sign-off Block */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-semibold text-slate-300">Authorized by OEC Global Operations Crisis Executive Desk</div>
            <div className="text-slate-500 font-mono text-[10px] mt-0.5">
              Hash: 8a4f91b-c720-4e12-b94d • Date: {new Date().toLocaleDateString()}
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold text-center">
            EXECUTIVE AUDIT PASSED
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
