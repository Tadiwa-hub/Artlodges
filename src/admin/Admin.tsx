import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  LayoutDashboard, 
  BookOpen, 
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import AvailabilityManager from './AvailabilityManager';
import BookingsManager from './BookingsManager';
import Dashboard from './Dashboard';
import Settings from './Settings';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'artlodges2026') { // Simple password for demo
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <div className="bg-white p-8 w-full max-w-md shadow-2xl">
          <h1 className="font-serif text-3xl font-bold text-primary mb-8 text-center uppercase tracking-widest">
            Art Lodges Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-text/60 mb-2">Password</label>
              <input 
                type="password"
                className="w-full p-4 border border-border bg-surface focus:outline-none focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300"
            >
              Enter Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-white/10">
          <h1 className="font-serif text-xl font-bold text-accent uppercase tracking-widest">
            Art Lodges
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <Link to="/admin" className="flex items-center gap-4 p-3 hover:bg-white/10 rounded transition-colors">
            <LayoutDashboard size={20} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Dashboard</span>
          </Link>
          <Link to="/admin/bookings" className="flex items-center gap-4 p-3 hover:bg-white/10 rounded transition-colors">
            <BookOpen size={20} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Bookings</span>
          </Link>
          <Link to="/admin/availability" className="flex items-center gap-4 p-3 hover:bg-white/10 rounded transition-colors">
            <CalendarIcon size={20} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Availability</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-4 p-3 hover:bg-white/10 rounded transition-colors">
            <SettingsIcon size={20} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Settings</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-4 p-3 w-full text-white/60 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingsManager />} />
            <Route path="/availability" element={<AvailabilityManager />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Admin;
