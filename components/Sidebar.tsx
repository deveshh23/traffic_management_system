
import React from 'react';
import { Users, Map as MapIcon, Camera, AlertTriangle, Settings, Shield, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: 'admin' | 'civilian' | 'analysis';
  setView: (view: 'admin' | 'civilian' | 'analysis') => void;
  userRole: 'admin' | 'civilian';
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, userRole, onLogout }) => {
  const adminNav = [
    { id: 'admin', icon: Shield, label: 'Police Dashboard' },
    { id: 'analysis', icon: Camera, label: 'Video Analysis' },
  ];

  const civilianNav = [
    { id: 'civilian', icon: Users, label: 'Commute Dashboard' },
  ];

  const navItems = userRole === 'admin' ? adminNav : civilianNav;

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">V</div>
        <h1 className="text-xl font-bold tracking-tight">Vitraff</h1>
      </div>
      
      <nav className="flex-1 px-4 mt-6">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">City Resources</p>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors group">
              <MapIcon size={18} className="group-hover:text-indigo-400" />
              <span className="text-sm">Public Grid</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors group">
              <AlertTriangle size={18} className="group-hover:text-orange-400" />
              <span className="text-sm">Critical Info</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-700 overflow-hidden ring-2 ring-slate-600/50">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole}`} alt="avatar" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate">{userRole === 'admin' ? 'ACP Rajesh' : 'Suresh K.'}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{userRole === 'admin' ? 'Traffic Dept' : 'Verified User'}</p>
          </div>
          <Settings size={14} className="text-slate-500 cursor-pointer hover:text-white" />
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
