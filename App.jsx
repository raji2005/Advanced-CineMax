import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import MoviesEnhanced from './pages/MoviesEnhanced';
import Bookings from './pages/Bookings';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className={`flex h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          <main className="flex-1 overflow-y-auto">
            <div className={`min-h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/movies" element={<MoviesEnhanced />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/tasks" element={<Tasks />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}