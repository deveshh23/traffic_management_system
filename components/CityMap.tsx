
import React from 'react';
import { Junction, CongestionLevel } from '../types';
import { COLORS } from '../constants';

interface CityMapProps {
  junctions: Junction[];
  onSelectJunction: (junction: Junction) => void;
  selectedId?: string;
}

const CityMap: React.FC<CityMapProps> = ({ junctions, onSelectJunction, selectedId }) => {
  return (
    <div className="relative w-full h-[600px] bg-slate-200 rounded-2xl overflow-hidden border-4 border-white shadow-inner">
      {/* Background Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Roads Layer */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="3" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#94a3b8" strokeWidth="3" />
        <line x1="10" y1="10" x2="90" y2="10" stroke="#94a3b8" strokeWidth="3" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="3" />
        <line x1="90" y1="10" x2="90" y2="90" stroke="#94a3b8" strokeWidth="3" />
      </svg>

      {/* Junction Hotspots */}
      {junctions.map((j) => (
        <div
          key={j.id}
          onClick={() => onSelectJunction(j)}
          style={{ 
            left: `${j.lat}%`, 
            top: `${j.lng}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className={`absolute cursor-pointer transition-all duration-300 ${
            selectedId === j.id ? 'ring-4 ring-indigo-400 scale-125 z-10' : ''
          }`}
        >
          {/* Congestion Glow */}
          <div className={`absolute -inset-4 rounded-full opacity-20 blur-md animate-pulse ${COLORS[j.congestion]}`} />
          
          <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${COLORS[j.congestion]}`}>
            <span className="text-[10px] text-white font-bold">{j.vehicleCount}</span>
          </div>
          
          <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold shadow-sm border border-slate-200 uppercase">
            {j.name}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-sm text-xs flex flex-col gap-2">
        <p className="font-bold uppercase tracking-wider text-slate-500">Live Congestion</p>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /> High Traffic</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /> Moderate</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /> Free Flow</div>
      </div>
    </div>
  );
};

export default CityMap;
