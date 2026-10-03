import React, { useState } from 'react';
import Header from './components/Header';
import SidebarScenarios from './components/SidebarScenarios';
import AlertBanner from './components/AlertBanner';
import BlastRadiusColumn from './components/BlastRadiusColumn';
import ActionPlanColumn from './components/ActionPlanColumn';
import TacticalMap from './components/TacticalMap';
import FinancialSimulator from './components/FinancialSimulator';
import WarRoomLog from './components/WarRoomLog';
import ActionDrawer from './components/ActionDrawer';
import ExecutiveSitRepModal from './components/ExecutiveSitRepModal';
import { SCENARIOS } from './data/scenarios';
import { LayoutGrid, Map, Sliders, History } from 'lucide-react';

export default function App() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('spanish-port-strike');
  const [triggerCount, setTriggerCount] = useState(0);
  const [activeView, setActiveView] = useState('matrix'); // 'matrix', 'map', 'simulator', 'warroom'
  
  // Drawer & Modal states
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  const [showSitRepModal, setShowSitRepModal] = useState(false);

  // Track completed mitigation items per scenario
  const [completedActionsMap, setCompletedActionsMap] = useState({
    'spanish-port-strike': {
      'hold-vessel': true // default pre-executed for demo realism or user can toggle
    },
    'severe-weather-delay': {},
    'shipyard-vendor-default': {}
  });

  const currentScenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];
  const currentCompletedActions = completedActionsMap[selectedScenarioId] || {};
  const completedCount = Object.values(currentCompletedActions).filter(Boolean).length;
  const totalActions = currentScenario.mitigationPlan?.length || 3;

  // Calculate total savings
  const calculateTotalSaved = () => {
    let sum = 0;
    currentScenario.mitigationPlan?.forEach(item => {
      if (currentCompletedActions[item.id]) {
        sum += item.estimatedSavings || 0;
      }
    });
    return sum;
  };

  const totalSaved = calculateTotalSaved();

  const handleSelectScenario = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setTriggerCount(prev => prev + 1);
  };

  const handleToggleAction = (itemId) => {
    setCompletedActionsMap(prev => ({
      ...prev,
      [selectedScenarioId]: {
        ...prev[selectedScenarioId],
        [itemId]: !prev[selectedScenarioId]?.[itemId]
      }
    }));
  };

  const handleConfirmActionFromDrawer = (itemId) => {
    setCompletedActionsMap(prev => ({
      ...prev,
      [selectedScenarioId]: {
        ...prev[selectedScenarioId],
        [itemId]: true
      }
    }));
    setSelectedDrawerItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-sky-600 selection:text-white">
      {/* Top Header */}
      <Header 
        activeScenario={currentScenario}
        activeView={activeView}
        setActiveView={setActiveView}
        completedCount={completedCount}
        totalActions={totalActions}
        onOpenSitRep={() => setShowSitRepModal(true)}
      />

      {/* Main Command Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        {/* Left Sidebar: Active Scenarios Menu */}
        <SidebarScenarios 
          scenarios={SCENARIOS}
          selectedScenarioId={selectedScenarioId}
          onSelectScenario={handleSelectScenario}
        />

        {/* Main Operations Deck */}
        <main className="flex-1 p-5 md:p-8 space-y-6 overflow-y-auto">
          {/* Red Warning Banner & Flash Trigger */}
          <AlertBanner 
            scenario={currentScenario} 
            triggerCount={triggerCount}
          />

          {/* Quick Tab Selector for Mobile / Secondary Nav */}
          <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveView('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeView === 'matrix' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Response Matrix</span>
              </button>

              <button
                onClick={() => setActiveView('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeView === 'map' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Tactical Map</span>
              </button>

              <button
                onClick={() => setActiveView('simulator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeView === 'simulator' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>What-If Simulator</span>
              </button>

              <button
                onClick={() => setActiveView('warroom')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeView === 'warroom' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>War Room Log</span>
              </button>
            </div>

            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              Preserved OPEX: <strong className="text-emerald-400">+€{totalSaved.toLocaleString()}</strong>
            </span>
          </div>

          {/* Conditional View Rendering */}
          {activeView === 'matrix' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Column 1: Blast Radius (Impact) */}
              <BlastRadiusColumn scenario={currentScenario} />

              {/* Column 2: Immediate Action Plan (Mitigation) */}
              <ActionPlanColumn 
                scenario={currentScenario}
                completedActions={currentCompletedActions}
                onToggleAction={handleToggleAction}
                onOpenDrawer={(item) => setSelectedDrawerItem(item)}
              />
            </div>
          )}

          {activeView === 'map' && (
            <TacticalMap scenario={currentScenario} />
          )}

          {activeView === 'simulator' && (
            <FinancialSimulator 
              scenario={currentScenario} 
              completedActions={currentCompletedActions}
            />
          )}

          {activeView === 'warroom' && (
            <WarRoomLog 
              scenario={currentScenario}
              completedActions={currentCompletedActions}
            />
          )}
        </main>
      </div>

      {/* Action Execution Drawer Modal */}
      {selectedDrawerItem && (
        <ActionDrawer 
          item={selectedDrawerItem}
          scenario={currentScenario}
          isCompleted={!!currentCompletedActions[selectedDrawerItem.id]}
          onConfirmAction={handleConfirmActionFromDrawer}
          onClose={() => setSelectedDrawerItem(null)}
        />
      )}

      {/* Executive SitRep Dossier Modal */}
      {showSitRepModal && (
        <ExecutiveSitRepModal 
          scenario={currentScenario}
          completedActions={currentCompletedActions}
          totalSaved={totalSaved}
          onClose={() => setShowSitRepModal(false)}
        />
      )}

      {/* Clean Corporate Footer */}
      <footer className="border-t border-slate-800/80 py-3 px-6 text-center text-xs text-slate-500">
        OEC Logistics Operations • Global Crisis Management Console
      </footer>
    </div>
  );
}
