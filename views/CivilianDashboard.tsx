
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Navigation, Car, Bookmark, BellRing, Filter, Siren, Info, Clock, CheckCircle } from 'lucide-react';
import { INITIAL_PARKING_ZONES, INITIAL_JUNCTIONS } from '../constants';
import { ParkingZone, CongestionLevel } from '../types';

const CivilianDashboard: React.FC = () => {
  const [parkingZones] = useState<ParkingZone[]>(INITIAL_PARKING_ZONES);
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);

  // Simulated logic to suggest routes avoiding HIGH congestion
  const routes = useMemo(() => {
    const congestedCount = INITIAL_JUNCTIONS.filter(j => j.congestion === CongestionLevel.HIGH).length;
    return [
      { 
        id: 'r1', 
        name: 'Main Arterial', 
        time: 32, 
        congestion: 'HIGH', 
        dist: '8.4 km',
        desc: 'Direct but heavily congested near Hebbal.'
      },
      { 
        id: 'r2', 
        name: 'Vitraff Smart Path', 
        time: 19, 
        congestion: 'LOW', 
        dist: '10.2 km', 
        isSmart: true,
        desc: 'Bypasses major bottlenecks using real-time data.'
      }
    ];
  }, []);

  const handleNavigate = () => {
    if (!destination) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowRoutes(true);
    }, 1200);
  };

  return (
    <div className="p-8 ml-64 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Plan Your Commute</h2>
            <div className="mt-6 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Where are you going today?"
                className="w-full bg-white pl-14 pr-32 py-5 rounded-3xl shadow-xl shadow-slate-200/50 border-none text-lg focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
              />
              <button 
                onClick={handleNavigate}
                disabled={isSearching}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
              >
                {isSearching ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Navigation size={20} />}
                Navigate
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-w-[100px] cursor-pointer hover:bg-slate-50 transition-colors">
              <Bookmark className="text-indigo-500 mb-1" size={20} />
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Saved</span>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-w-[100px] cursor-pointer hover:bg-slate-50 transition-colors">
              <BellRing className="text-orange-500 mb-1" size={20} />
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Alerts</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Conditional Route Suggestions */}
            {showRoutes && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-500">
                {routes.map(route => (
                  <div key={route.id} className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
                    route.isSmart ? 'bg-indigo-600 text-white border-indigo-700 shadow-xl shadow-indigo-100' : 'bg-white text-slate-900 border-slate-100'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-xl bg-white/20">
                         {route.isSmart ? <Zap className="text-yellow-400" size={20} /> : <Clock className="text-slate-400" size={20} />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-80">{route.dist}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{route.name}</h3>
                    <p className={`text-xs mb-6 ${route.isSmart ? 'text-indigo-100' : 'text-slate-500'}`}>{route.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black">{route.time} min</span>
                      {route.isSmart && <span className="bg-emerald-400/20 text-emerald-300 text-[10px] px-2 py-1 rounded-md font-bold uppercase">Optimal</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group aspect-[16/9]">
               <img src="https://picsum.photos/seed/mapview/1200/800" alt="Map" className="w-full h-full object-cover grayscale-[0.2]" />
               <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none" />
               
               {/* Hotspots Simulation */}
               <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
               <div className="absolute top-[20%] left-[30%]">
                  <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-lg border border-red-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-extrabold uppercase text-slate-700">High Density</span>
                  </div>
               </div>

               <div className="absolute bottom-10 left-10 right-10">
                 <div className="bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl flex items-center gap-6 border border-white">
                   <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
                     <Navigation size={28} />
                   </div>
                   <div className="flex-1">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Routing Summary</p>
                     <p className="text-lg font-extrabold text-slate-900 leading-tight">Avoiding 3 congestion hotspots via Hebbal Bypass.</p>
                   </div>
                   <div className="hidden md:block h-10 w-px bg-slate-100 mx-2" />
                   <div className="hidden md:flex flex-col items-end">
                      <p className="text-2xl font-black text-slate-900">14:20</p>
                      <p className="text-[10px] font-bold text-slate-500">ETA</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Info className="text-blue-600" size={20} />
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Vitraff Tip:</strong> Parking is currently 90% full at Phoenix Mall. We recommend stationing at <strong>City Hospital Main</strong> for a shorter walk and lower fees.
              </p>
            </div>
          </div>

          {/* Smart Parking Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
                  <Car className="text-indigo-600" /> Smart Parking
                </h3>
                <button className="p-2 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-colors"><Filter size={18} /></button>
              </div>

              <div className="space-y-4">
                {parkingZones.map(zone => {
                  const occupancy = (zone.occupiedSpots / zone.totalSpots) * 100;
                  return (
                    <div key={zone.id} className="group relative p-5 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer overflow-hidden">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-slate-800">{zone.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{zone.type} Parking • 1.2km</p>
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                          occupancy > 90 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {Math.max(0, zone.totalSpots - zone.occupiedSpots)} Slots
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full transition-all duration-1000 ${occupancy > 90 ? 'bg-red-500' : 'bg-indigo-500'}`}
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <p className="text-xs font-bold text-slate-900">₹40/hr</p>
                        <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100">Book Slot</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3">
                <MapPin size={18} /> View Multi-Level lots
              </button>
            </div>
            
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-xl font-bold mb-2">Emergency Hub</h4>
                 <p className="text-indigo-100 text-sm leading-relaxed mb-6">Instantly alert emergency services. This will trigger Smart Corridor signals for priority vehicles.</p>
                 <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                   <Siren size={18} /> Alert Emergency Services
                 </button>
               </div>
               <Siren className="absolute -bottom-10 -right-10 text-indigo-500/20 w-48 h-48 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Zap = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

export default CivilianDashboard;
