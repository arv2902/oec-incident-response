import React, { useState } from 'react';
import { History, ShieldAlert, Radio, CheckCircle, FileText, Filter, Download } from 'lucide-react';

export default function WarRoomLog({ scenario, completedActions }) {
  const [filter, setFilter] = useState('all');

  const baseLogs = [
    {
      id: 1,
      time: 'T-02:44:12',
      type: 'sensor',
      sender: 'Cadiz Port Authority (VTS)',
      message: 'Notice to Mariners: Port Stevedoring Union declared wildcat strike. All berths closed.',
      status: 'CRITICAL'
    },
    {
      id: 2,
      time: 'T-02:18:00',
      type: 'marine',
      sender: 'Harbor Pilot Station',
      message: 'Inbound boarding denied for M/V Elli F (IMO 9482184). Vessel advised to seek outer holding.',
      status: 'ALERT'
    },
    {
      id: 3,
      time: 'T-01:45:30',
      type: 'inland',
      sender: 'Primafrio Drayage Dispatch',
      message: '142 tractor-trailers stalled at Cadiz Terminal Gate 3 and Highway N-340. Detention clock running.',
      status: 'WARNING'
    },
    {
      id: 4,
      time: 'T-00:52:10',
      type: 'plant',
      sender: 'Cadiz EV Assembly Plant',
      message: 'JIT safety stock threshold alert: 8.5 hours remaining until full assembly shutdown.',
      status: 'ALERT'
    }
  ];

  // Dynamic logs from user actions
  const dynamicLogs = [];
  if (completedActions['hold-vessel']) {
    dynamicLogs.push({
      id: 101,
      time: 'T-00:12:04',
      type: 'action',
      sender: 'OEC Crisis Desk -> Inmarsat SatCom',
      message: 'SatCom Directive delivered to Master of M/V Elli F. Vessel holding 15nm offshore outside fee zone.',
      status: 'EXECUTED'
    });
  }
  if (completedActions['tonu-protocol']) {
    dynamicLogs.push({
      id: 102,
      time: 'T-00:08:42',
      type: 'action',
      sender: 'OEC Drayage Desk -> EDI 214 Gateway',
      message: 'TONU Cancellation broadcast to Primafrio, Carreras, and DHL. 142 chassis released. Detention halted.',
      status: 'EXECUTED'
    });
  }
  if (completedActions['maintenance-shift']) {
    dynamicLogs.push({
      id: 103,
      time: 'T-00:03:15',
      type: 'action',
      sender: 'OEC Plant Ops -> SAP S/4HANA',
      message: 'Maintenance Order MO-8831 executed. 420 workers reassigned to tooling overhaul. Zero idle loss.',
      status: 'EXECUTED'
    });
  }

  const allLogs = [...dynamicLogs, ...baseLogs];
  const filteredLogs = allLogs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'actions') return log.type === 'action';
    if (filter === 'sensors') return log.type === 'sensor' || log.type === 'marine';
    if (filter === 'carrier') return log.type === 'inland';
    return true;
  });

  return (
    <div className="bg-[#0f1626] border border-slate-800 rounded-2xl p-6 space-y-5">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-800">
              Live Audit Trail
            </span>
            <span className="text-xs text-slate-400">• Chain of Custody</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-1">
            Incident War Room Event Log
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Events ({allLogs.length})
          </button>
          <button
            onClick={() => setFilter('actions')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filter === 'actions' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Mitigation Orders ({dynamicLogs.length})
          </button>
          <button
            onClick={() => setFilter('sensors')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filter === 'sensors' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Port & AIS Feeds
          </button>
        </div>
      </div>

      {/* Log Feed */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {filteredLogs.map(log => {
          const isAction = log.type === 'action';

          return (
            <div
              key={log.id}
              className={`p-4 rounded-xl border transition-all text-xs font-mono ${
                isAction
                  ? 'bg-emerald-950/20 border-emerald-700/60'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">{log.time}</span>
                  <span className="text-slate-600">•</span>
                  <span className={`font-semibold ${isAction ? 'text-emerald-400' : 'text-sky-400'}`}>
                    {log.sender}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  isAction 
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' 
                    : log.status === 'CRITICAL' 
                      ? 'bg-red-950 text-red-400 border border-red-800' 
                      : 'bg-slate-800 text-slate-300'
                }`}>
                  {log.status}
                </span>
              </div>
              <p className="text-slate-200 font-sans text-xs leading-relaxed">
                {log.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
