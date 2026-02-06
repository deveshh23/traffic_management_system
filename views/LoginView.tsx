
import React, { useState } from 'react';
import { Shield, Users, ArrowRight, Lock, MapPin, Info } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: 'admin' | 'civilian') => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [hoveredRole, setHoveredRole] = useState<'admin' | 'civilian' | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />

      <div className="max-w-4xl w-full z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 mb-6 font-bold text-3xl">V</div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Vitraff Smart City Portal</h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto">Unified Traffic & Parking Management System for Indian Municipalities</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Police / Admin Card */}
          <div 
            onMouseEnter={() => setHoveredRole('admin')}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={() => onLogin('admin')}
            className={`group relative bg-white p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer overflow-hidden shadow-xl shadow-slate-200/50 ${
              hoveredRole === 'admin' ? 'border-indigo-600 translate-y-[-8px]' : 'border-transparent'
            }`}
          >
            <div className={`absolute top-0 right-0 p-6 transition-transform duration-500 ${hoveredRole === 'admin' ? 'scale-110 opacity-10' : 'opacity-5'}`}>
              <Shield size={180} />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Shield size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Authority Login</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Access the command center to monitor live congestion, override signals, and manage emergency corridors.</p>
              
              <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-4 transition-all">
                <span>Enter Command Center</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

          {/* Civilian Card */}
          <div 
            onMouseEnter={() => setHoveredRole('civilian')}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={() => onLogin('civilian')}
            className={`group relative bg-white p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer overflow-hidden shadow-xl shadow-slate-200/50 ${
              hoveredRole === 'civilian' ? 'border-emerald-500 translate-y-[-8px]' : 'border-transparent'
            }`}
          >
             <div className={`absolute top-0 right-0 p-6 transition-transform duration-500 ${hoveredRole === 'civilian' ? 'scale-110 opacity-10' : 'opacity-5'}`}>
              <Users size={180} />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Users size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Civilian Access</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Real-time traffic updates, smart route suggestions avoiding congestion, and live parking occupancy tracking.</p>
              
              <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                <span>Access Dashboard</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
           <div className="flex items-center gap-2"><Lock size={14} /> Encrypted Session</div>
           <div className="flex items-center gap-2"><MapPin size={14} /> Multi-City Grid</div>
           <div className="flex items-center gap-2"><Info size={14} /> Prototype v1.0</div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
