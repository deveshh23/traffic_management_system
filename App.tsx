
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AdminDashboard from './views/AdminDashboard';
import CivilianDashboard from './views/CivilianDashboard';
import VideoAnalysisView from './views/VideoAnalysisView';
import LoginView from './views/LoginView';

type View = 'admin' | 'civilian' | 'analysis';
type Role = 'admin' | 'civilian';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [currentView, setCurrentView] = useState<View>('admin');

  const handleLogin = (role: Role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentView(role === 'admin' ? 'admin' : 'civilian');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminDashboard />;
      case 'civilian':
        return <CivilianDashboard />;
      case 'analysis':
        return <VideoAnalysisView />;
      default:
        return userRole === 'admin' ? <AdminDashboard /> : <CivilianDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        userRole={userRole!} 
        onLogout={handleLogout}
      />
      <main className="transition-all duration-300">
        {renderView()}
      </main>
      
      {/* Global Status Banner (Authority View Only) */}
      {userRole === 'admin' && (
        <div className="fixed bottom-6 left-[280px] right-8 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl flex items-center justify-between border border-white/10 shadow-2xl z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">System Status</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <p className="text-sm font-medium">All nodes online. Video-AI latency: 1.1s</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Analysis Mode</p>
              <p className="text-sm font-bold">Recorded-to-Live Agnostic</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
