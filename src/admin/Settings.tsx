import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">Portal Settings</h2>
        <p className="text-text/60 text-sm mt-1 uppercase tracking-widest font-bold">Configure your admin experience</p>
      </header>

      <div className="bg-white p-8 border border-border shadow-sm max-w-2xl">
        <h3 className="font-serif font-bold text-primary mb-8 uppercase tracking-widest flex items-center gap-2 border-b border-border pb-4">
          <SettingsIcon size={18} className="text-accent" />
          General Configuration
        </h3>
        
        <form className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-text/60">Admin Password</label>
            <input 
              type="password"
              className="p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary"
              defaultValue="artlodges2026"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-text/60">WhatsApp Notification Number</label>
            <input 
              type="tel"
              className="p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary"
              placeholder="+263772123456"
            />
            <p className="text-[10px] text-text/40 italic">This number will receive booking requests.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-text/60">Currency Symbol</label>
            <input 
              type="text"
              className="p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary w-20"
              defaultValue="$"
            />
          </div>

          <div className="pt-4">
            <button 
              type="button"
              className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-accent transition-colors text-xs"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
