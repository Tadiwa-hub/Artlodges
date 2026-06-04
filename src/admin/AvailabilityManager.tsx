import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Shield, ShieldOff } from 'lucide-react';
import { ROOMS } from '../constants';
import type { RoomType } from '../types';

const AvailabilityManager = () => {
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(ROOMS[0].name);
  const [bulkDates, setBulkDates] = useState({ start: '', end: '', reason: 'Maintenance' });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = () => {
    fetch('/api/availability')
      .then(res => res.json())
      .then(data => setBlockedDates(data));
  };

  const handleToggleDate = (date: string) => {
    fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_type: selectedRoom, blocked_date: date, reason: 'Admin Block' })
    }).then(() => fetchAvailability());
  };

  const handleBulkBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkDates.start || !bulkDates.end) return;

    let current = new Date(bulkDates.start);
    const end = new Date(bulkDates.end);
    
    const promises = [];
    while (current <= end) {
      const dateStr = format(current, 'yyyy-MM-dd');
      promises.push(
        fetch('/api/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ room_type: selectedRoom, blocked_date: dateStr, reason: bulkDates.reason })
        })
      );
      current = addDays(current, 1);
    }

    Promise.all(promises).then(() => {
      fetchAvailability();
      alert('Dates updated successfully');
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">Availability</h2>
        <p className="text-text/60 text-sm mt-1 uppercase tracking-widest font-bold">Manage room blocks and maintenance dates</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bulk Actions */}
        <div className="lg:col-span-1 bg-white p-6 border border-border shadow-sm h-fit">
          <h3 className="font-serif font-bold text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
            <Shield size={18} className="text-accent" />
            Bulk Block Dates
          </h3>
          <form onSubmit={handleBulkBlock} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-text/60 mb-1">Select Room</label>
              <select 
                className="w-full p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value as RoomType)}
              >
                {ROOMS.map(room => (
                  <option key={room.id} value={room.name}>{room.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-text/60 mb-1">Start Date</label>
                <input 
                  type="date" required
                  className="w-full p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary"
                  value={bulkDates.start}
                  onChange={(e) => setBulkDates({...bulkDates, start: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-text/60 mb-1">End Date</label>
                <input 
                  type="date" required
                  className="w-full p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary"
                  value={bulkDates.end}
                  onChange={(e) => setBulkDates({...bulkDates, end: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-text/60 mb-1">Reason</label>
              <input 
                type="text"
                className="w-full p-3 border border-border bg-surface text-sm focus:outline-none focus:border-primary"
                placeholder="Maintenance, Holiday, etc."
                value={bulkDates.reason}
                onChange={(e) => setBulkDates({...bulkDates, reason: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 font-bold uppercase tracking-widest hover:bg-accent transition-colors text-xs"
            >
              Update Availability
            </button>
          </form>
        </div>

        {/* Current Blocks */}
        <div className="lg:col-span-2 bg-white p-6 border border-border shadow-sm">
          <h3 className="font-serif font-bold text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
            <CalendarIcon size={18} className="text-accent" />
            Active Blocks ({selectedRoom})
          </h3>
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {blockedDates
                .filter(b => b.room_type === selectedRoom)
                .map((b, i) => (
                  <div key={i} className="p-3 bg-surface border border-border group relative">
                    <p className="text-xs font-bold text-primary">{b.blocked_date}</p>
                    <p className="text-[10px] text-text/40 italic truncate">{b.reason}</p>
                    <button 
                      onClick={() => handleToggleDate(b.blocked_date)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShieldOff size={12} />
                    </button>
                  </div>
                ))}
            </div>
            {blockedDates.filter(b => b.room_type === selectedRoom).length === 0 && (
              <div className="py-12 text-center text-text/40 italic text-sm">
                No dates are currently blocked for this room.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManager;
