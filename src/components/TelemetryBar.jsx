import React from 'react';
import { Terminal, Shield, Cpu, Wifi, Globe, Radio } from 'lucide-react';

export default function TelemetryBar({ activeScenario }) {
  return (
    <footer className="border-t border-command-border bg-command-darkest/95 px-4 py-2 text-[11px] font-mono text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-marine-400" />
            <span className="text-slate-500">FEED:</span>
            <span className="text-slate-300">CADIZ-ALGECIRAS AIS INGEST #0928</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-slate-500">STATUS:</span>
            <span className="text-emerald-400 font-semibold">STREAM LIVE</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-500">LATENCY:</span>
            <span className="text-slate-300">18ms</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-[10px]">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-marine-500" />
            MIL-SPEC AES-256 GCM SECURED
          </span>
          <span>•</span>
          <span>OEC CRISIS OPERATIONS &copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
