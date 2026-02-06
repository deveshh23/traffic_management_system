
import React, { useState, useEffect, useMemo } from 'react';
import { Activity, AlertCircle, Siren, Navigation2, Zap, Radio, Clock, Camera, Thermometer, Wind, Eye } from 'lucide-react';
import { Junction, SignalState, Alert, CongestionLevel } from '../types';
import { INITIAL_JUNCTIONS, SIGNAL_COLORS } from '../constants';
import CityMap from '../components/CityMap';

const AdminDashboard: React.FC = () => {
  const [junctions, setJunctions] = useState<Junction[]>(INITIAL_JUNCTIONS);
  const [selectedJunction, setSelectedJunction] = useState<Junction | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  // Stats memoization for simulation
  const avgCongestion = useMemo(() => {
    const total = junctions.reduce((acc, j) => acc + (j.congestion === CongestionLevel.HIGH ? 100 : j.congestion === CongestionLevel.MEDIUM ? 50 : 10), 0);
    return Math.round(total / junctions.length);
  }, [junctions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const type = Math.random() > 0.6 ? 'ILLEGAL_PARKING' : 'CONGESTION';
        const j = junctions[Math.floor(Math.random() * junctions.length)];
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: type as any,
          location: j.name,
          timestamp: new Date(),
          severity: Math.random() > 0.7 ? 'CRITICAL' : 'WARNING',
          message: type === 'ILLEGAL_PARKING' 
            ? 'Vehicle obstructing the arterial flow. Detection confirmed via AI pipeline.' 
            : 'Vehicle density spike detected. Automatic signal timing adjustment suggested.'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 8));
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [junctions]);

  const handleToggleSignal = (junctionId: string) => {
    setJunctions(prev => prev.map(j => {
      if (j.id === junctionId) {
        const nextState = j.signalStatus === SignalState.GREEN ? SignalState.RED : SignalState.GREEN;
        return { ...j, signalStatus: nextState, isEmergencyOverride: false };
      }
      return j;
    }));
  };

  const handleEmergencyOverride = () => {
    const newState = !isEmergencyMode;
    setIsEmergencyMode(newState);
    
    // In emergency mode, create a 'green wave' on a path
    setJunctions(prev => prev.map(j => {
      const isPath = ['j1', 'j2'].includes(j.id); // Simulated path
      if (newState && isPath) {
        return { ...j, signalStatus: SignalState.GREEN, isEmergencyOverride: true };
      }
      return { ...j, isEmergencyOverride: newState ? j.isEmergencyOverride : false };
    }));
  };

  return (
    <div className="p-8 ml-64 bg-slate-50 min-h-screen">
      <header className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Traffic Command</h2>
          <p className="text-slate-500 mt-2 flex items-center gap-2 font-medium">
            <Radio size={16} className="text-red-500 animate-pulse" />
            Active Surveillance: Sector-7 Grid Control
          </p>
        </div>
        
        <div className="flex gap-4">
           <button 
            onClick={handleEmergencyOverride}
            className={`px-8 py-4 rounded-[1.5rem] font-black flex items-center gap-3 transition-all duration-500 shadow-xl ${
              isEmergencyMode 
                ? 'bg-red-600 text-white animate-pulse shadow-red-200 ring-4 ring-red-100 scale-105' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
            }`}
          >
            <Siren size={20} />
            {isEmergencyMode ? 'EMERGENCY CORRIDOR ACTIVE' : 'ACTIVATE SMART CORRIDOR'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Statistics Bar */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Activity} label="Congestion Index" value={`${avgCongestion}%`} trend={avgCongestion > 50 ? "+8%" : "-2%"} color="text-indigo-600" />
          <StatCard icon={Zap} label="Signal Sync" value="94.2%" trend="Optimal" color="text-emerald-600" />
          <StatCard icon={Thermometer} label="Grid Heat" value="Stable" color="text-blue-600" />
          <StatCard icon={AlertCircle} label="Response Readiness" value="100%" color="text-orange-600" />
        </div>

        {/* Map and Controls */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <div className="bg-white p-3 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white">
            <CityMap 
              junctions={junctions} 
              onSelectJunction={setSelectedJunction} 
              selectedId={selectedJunction?.id}
            />
          </div>
        </div>

        {/* Side Panels */}
        <div className="col-span-12 xl:col-span-4 space-y-8">
          {/* Active Control Panel */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Eye className="text-indigo-400" /> 
              {selectedJunction ? 'Junction Control' : 'Select a Node'}
            </h3>
            
            {selectedJunction ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Active Junction</p>
                    <p className="font-black text-lg">{selectedJunction.name}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${SIGNAL_COLORS[selectedJunction.signalStatus]} shadow-lg`} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleToggleSignal(selectedJunction.id)}
                    className="bg-white/10 hover:bg-indigo-600 p-6 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all border border-white/5 hover:border-indigo-400"
                  >
                    <Navigation2 size={24} className="text-white" />
                    <span className="text-xs font-bold uppercase">Manual Toggle</span>
                  </button>
                  <button className="bg-white/10 hover:bg-slate-800 p-6 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all border border-white/5">
                    <Camera size={24} className="text-white" />
                    <span className="text-xs font-bold uppercase">Live Feed</span>
                  </button>
                </div>
                
                <div className="p-5 bg-indigo-600/20 rounded-2xl border border-indigo-400/20">
                  <p className="text-xs font-medium text-indigo-100 leading-relaxed">
                    AI recommendation: Increase green cycle by 15s to clear northbound density.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <MapIcon size={24} className="text-slate-500" />
                 </div>
                 <p className="text-slate-500 text-sm font-medium px-8">Click on a map junction to initialize remote command override.</p>
              </div>
            )}
          </div>

          {/* Real-time Alert Feed */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3"><AlertCircle size={24} className="text-orange-500" /> Alert Feed</div>
              <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-md font-bold uppercase">Live</span>
            </h3>
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {alerts.length === 0 ? (
                <div className="py-20 flex flex-col items-center gap-4 text-slate-300">
                   <Wind size={32} />
                   <p className="italic text-sm">Monitoring city grid...</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className={`group p-5 rounded-[1.5rem] border-2 transition-all ${
                    alert.severity === 'CRITICAL' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        alert.severity === 'CRITICAL' ? 'text-red-600' : 'text-slate-500'
                      }`}>{alert.type.replace('_', ' ')}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="font-black text-slate-900 text-sm mb-1">{alert.location}</p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{alert.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5 hover:scale-105 transition-transform duration-300">
    <div className={`p-4 rounded-2xl bg-slate-50 ${color} shadow-sm`}>
      <Icon size={28} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
            trend.startsWith('+') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

const MapIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
);

export default AdminDashboard;
