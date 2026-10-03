import React, { useState } from 'react';
import { X, Send, Radio, CheckCircle2, ShieldCheck, Terminal, Server, FileText, Loader2 } from 'lucide-react';

export default function ActionDrawer({ 
  item, 
  scenario, 
  isCompleted, 
  onConfirmAction, 
  onClose 
}) {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'payload'

  if (!item) return null;

  const handleExecute = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      onConfirmAction(item.id);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1626] border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0c121e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-700 flex items-center justify-center text-sky-400">
              {item.systemType === 'SATCOM_TELEX' && <Radio className="w-5 h-5" />}
              {item.systemType === 'EDI_214' && <Server className="w-5 h-5" />}
              {item.systemType === 'SAP_ERP' && <Terminal className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                  {item.systemType || 'OPERATIONAL SYSTEM'}
                </span>
                <span className="text-xs text-slate-400">Step 0{item.step}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 pt-3 border-b border-slate-800 bg-slate-900/40 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'overview' ? 'border-sky-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Action Directive Details
          </button>
          <button
            onClick={() => setActiveTab('payload')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'payload' ? 'border-sky-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Integration Payload / Dispatch Feed
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'overview' ? (
            <>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Operational Objective
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {item.summary}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Financial Benefit: {item.benefit}</span>
                </div>
              </div>

              {/* Specific Subsystem details */}
              {item.systemType === 'SATCOM_TELEX' && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Satellite Dispatch Parameters
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">RECIPIENT CALLSIGN</span>
                      <span className="text-slate-200 font-mono font-bold">M/V ELLI F (IMO 9482184)</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">TRANSMISSION CHANNEL</span>
                      <span className="text-sky-400 font-mono font-bold">INMARSAT-C PRIORITY 01</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800 space-y-1">
                    <div className="text-slate-500">// TELEX DIRECTIVE TO BRIDGE</div>
                    <div>FROM: OEC GLOBAL LOGISTICS CRISIS DESK</div>
                    <div>TO: MASTER // M/V ELLI F</div>
                    <div>INSTRUCTION: DROP SPEED TO 0.3 KNOTS. HOLD OUTSIDE 12NM TERRITORIAL LIMIT (ZONE 4B). DO NOT EMBARK PILOT. BERTHING CANCELLED DUE TO WILDCAT STRIKE. AWAIT FURTHER ORDERS.</div>
                  </div>
                </div>
              )}

              {item.systemType === 'EDI_214' && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    3PL Drayage Carrier Broadcast List (142 Units)
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="font-semibold text-slate-200">Primafrio Logistics (Terminal Gate A)</span>
                      <span className="text-slate-400">52 Chassis • Status: Ready for TONU ACK</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="font-semibold text-slate-200">Carreras Grupo (N-340 Staging Lane)</span>
                      <span className="text-slate-400">48 Chassis • Status: Ready for TONU ACK</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="font-semibold text-slate-200">DHL Freight Iberia (Outer Perimeter)</span>
                      <span className="text-slate-400">42 Chassis • Status: Ready for TONU ACK</span>
                    </div>
                  </div>
                </div>
              )}

              {item.systemType === 'SAP_ERP' && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    SAP ERP Work Order Override Specs
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 space-y-1.5">
                    <div>TARGET MODULE: SAP S/4HANA Plant Maintenance (PM)</div>
                    <div>FACILITY: Cadiz EV Assembly Plant #082</div>
                    <div>WORK ORDER: MO-8831 (Q4 Tooling Overhaul Advance)</div>
                    <div>REALLOCATION: 420 Line Technicians shifted from Powertrain Assembly to Robotic Calibration</div>
                    <div>NET LABOR EFFECT: Zero idle payroll loss (€145,000 preserved)</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Raw JSON / EDI Webhook Payload
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
{JSON.stringify({
  action_id: item.id,
  step_number: item.step,
  scenario_code: scenario.id,
  system_target: item.systemType,
  authorized_by: "VP_GLOBAL_LOGISTICS",
  timestamp: new Date().toISOString(),
  payload: {
    event_type: item.systemType === 'EDI_214' ? "TONU_CARRIER_CANCELLATION" : "DIRECTIVE_DISPATCH",
    affected_asset: scenario.vessel,
    financial_saving_projected: item.estimatedSavings,
    status: isCompleted ? "VERIFIED_AUDITED" : "PENDING_TRANSMISSION"
  }
}, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Drawer Action Footer */}
        <div className="p-5 border-t border-slate-800 bg-[#0c121e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {isCompleted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Directive Executed & Acknowledged by Subsystem
              </span>
            ) : (
              <span>Ready for executive authorization and broadcast</span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleExecute}
              disabled={isTransmitting}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-900/30'
              }`}
            >
              {isTransmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Re-Broadcast Directive</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Authorize & Dispatch</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
