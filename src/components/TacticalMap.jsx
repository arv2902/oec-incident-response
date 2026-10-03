import React, { useState } from 'react';
import { Ship, Anchor, AlertOctagon, Truck, Factory, Compass, Navigation, Radio, Info, Layers, Eye } from 'lucide-react';

export default function TacticalMap({ scenario }) {
  const mapData = scenario.mapData || { nodes: [] };
  const [selectedNodeId, setSelectedNodeId] = useState('node-vessel');
  const [filterLayer, setFilterLayer] = useState('all'); // 'all', 'marine', 'inland'

  const selectedNode = mapData.nodes.find(n => n.id === selectedNodeId) || mapData.nodes[0];

  const getNodeIcon = (type) => {
    switch (type) {
      case 'vessel':
        return <Ship className="w-4 h-4 text-sky-400" />;
      case 'port':
        return <AlertOctagon className="w-4 h-4 text-red-400" />;
      case 'trucks':
        return <Truck className="w-4 h-4 text-amber-400" />;
      case 'factory':
        return <Factory className="w-4 h-4 text-emerald-400" />;
      default:
        return <Radio className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-[#0f1626] border border-slate-800 rounded-2xl p-6 space-y-5">
      {/* Map Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-800">
              Live Geospatial Fleet Radar
            </span>
            <span className="text-xs text-slate-400">• Sector Cadiz / Algeciras</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-1">
            Tactical Asset & Exclusion Zone Map
          </h3>
        </div>

        {/* Quick Node Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {mapData.nodes.map(node => (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedNodeId === node.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {node.name.split(' ')[0]} {node.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Canvas & Inspection Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* SVG Tactical Map View (2 Cols) */}
        <div className="lg:col-span-2 relative h-[380px] bg-[#090d16] rounded-xl border border-slate-800 overflow-hidden select-none">
          {/* Subtle Grid Backdrop */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Coastline & Maritime Vectors */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Water Deep Tone */}
            <rect width="100" height="100" fill="#090d16" />

            {/* Coastline Polygon (Simulated Cadiz / Andalusia Coast) */}
            <path
              d="M 35,0 Q 40,25 45,35 T 60,45 Q 75,50 85,35 T 100,20 L 100,100 L 40,100 Q 30,80 35,60 Z"
              fill="#131c2e"
              stroke="#1e293b"
              strokeWidth="0.8"
            />

            {/* Maritime Territorial 12nm Boundary Line */}
            <path
              d="M 15,0 Q 20,35 25,60 T 35,100"
              fill="none"
              stroke="#0284c7"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.6"
            />

            {/* Red Strike Exclusion Zone around Port */}
            <circle
              cx="42"
              cy="38"
              r="9"
              fill="rgba(239, 68, 68, 0.15)"
              stroke="#ef4444"
              strokeWidth="0.7"
              strokeDasharray="1.5,1.5"
              className="animate-pulse"
            />

            {/* Highway N-340 Connecting Port to Plant */}
            <path
              d="M 42,38 Q 50,42 58,46 T 82,52"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
              strokeDasharray="1,1"
            />

            {/* Vessel Holding Drift Radius */}
            <circle
              cx="22"
              cy="68"
              r="6"
              fill="rgba(2, 132, 199, 0.12)"
              stroke="#0284c7"
              strokeWidth="0.6"
            />
          </svg>

          {/* Territorial Waters Label */}
          <div className="absolute left-3 top-3 text-[10px] font-mono text-sky-500/70 tracking-wider">
            INTERNATIONAL WATERS (HOLDING AREA)
          </div>
          <div className="absolute right-4 top-3 text-[10px] font-mono text-slate-500 tracking-wider">
            ANDALUSIA MAINLAND (CADIZ)
          </div>

          {/* Interactive Node Markers */}
          {mapData.nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isVessel = node.type === 'vessel';
            const isPort = node.type === 'port';
            const isTrucks = node.type === 'trucks';
            const isFactory = node.type === 'factory';

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              >
                {/* Outer Ping Ring for Active/Selected */}
                {isSelected && (
                  <div className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                    isPort ? 'bg-red-500' : isVessel ? 'bg-sky-500' : isTrucks ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                )}

                {/* Node Button Pin */}
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${
                  isSelected
                    ? isPort
                      ? 'bg-red-600 border-white text-white'
                      : isVessel
                        ? 'bg-sky-600 border-white text-white'
                        : isTrucks
                          ? 'bg-amber-500 border-white text-white'
                          : 'bg-emerald-600 border-white text-white'
                    : isPort
                      ? 'bg-red-950/80 border-red-700 text-red-300'
                      : isVessel
                        ? 'bg-sky-950/80 border-sky-700 text-sky-300'
                        : isTrucks
                          ? 'bg-amber-950/80 border-amber-700 text-amber-300'
                          : 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                }`}>
                  {getNodeIcon(node.type)}
                </div>

                {/* Floating Tag */}
                <div className={`absolute left-1/2 -translate-x-1/2 top-9 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap border pointer-events-none transition-opacity ${
                  isSelected ? 'bg-slate-900 border-slate-600 text-white shadow' : 'bg-slate-900/80 border-slate-800 text-slate-400'
                }`}>
                  {node.name.split(' ')[0]} {node.name.split(' ')[1] || ''}
                </div>
              </div>
            );
          })}

          {/* Map Compass */}
          <div className="absolute right-3 bottom-3 flex items-center gap-1 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded text-[10px] text-slate-400 font-mono">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>N 36° / W 005°</span>
          </div>
        </div>

        {/* Selected Node Telemetry Card (1 Col) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                Asset Telemetry
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                LIVE AIS FEED
              </span>
            </div>

            <div className="mt-3">
              <h4 className="text-base font-bold text-white">{selectedNode?.name}</h4>
              <div className="text-xs font-semibold text-amber-400 mt-0.5">
                {selectedNode?.status}
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {selectedNode?.details}
            </p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Manifest / Payload</span>
                <span className="text-slate-200 font-semibold">{selectedNode?.cargo}</span>
              </div>

              <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Motion / Velocity</span>
                <span className="text-slate-200 font-semibold">{selectedNode?.speed}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Direct Inmarsat/EDI Telemetry Linked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
