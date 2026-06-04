import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MessageCircle, User, Calendar, Home } from 'lucide-react';
import type { Booking } from '../types';

const BookingsManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  };

  const updateStatus = (id: number, status: string, booking: Booking) => {
    fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(() => {
      fetchBookings();
      if (status === 'confirmed') {
        const message = `Hi ${booking.guest_name}! Your ${booking.room_type} booking at Art Lodges from ${booking.check_in} is confirmed. We look forward to welcoming you! 🎨`;
        window.open(`https://wa.me/${booking.phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    });
  };

  const filteredBookings = filter === 'All' 
    ? bookings 
    : bookings.filter(b => b.room_type === filter);

  const roomTabs = ['All', 'Executive Suite', 'King Suite', 'Superior King', 'Deluxe Double', 'Standard Room'];

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <header>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary uppercase tracking-widest text-center md:text-left">Bookings Manager</h2>
        <p className="text-text/60 text-xs md:text-sm mt-1 uppercase tracking-widest font-bold text-center md:text-left">Review and manage guest requests</p>
      </header>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide md:flex-wrap md:border-b md:border-border md:pb-4">
        {roomTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${
              filter === tab ? 'bg-primary text-white border-primary' : 'bg-white text-text/60 border-border hover:bg-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface border-b border-border text-[10px] uppercase tracking-widest font-bold text-text/60">
              <th className="p-4">Guest</th>
              <th className="p-4">Room</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredBookings.map(booking => (
              <tr key={booking.id} className="text-sm hover:bg-surface/50">
                <td className="p-4">
                  <p className="font-bold text-primary">{booking.guest_name}</p>
                  <p className="text-xs text-text/60">{booking.phone}</p>
                </td>
                <td className="p-4">
                  <span className="bg-accent/10 text-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                    {booking.room_type}
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-xs font-bold uppercase tracking-tighter">{booking.check_in}</p>
                  <p className="text-[10px] text-text/40">to {booking.check_out}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    booking.status === 'confirmed' ? 'text-green-600 bg-green-50' : 
                    booking.status === 'cancelled' ? 'text-red-600 bg-red-50' : 
                    'text-orange-600 bg-orange-50'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {booking.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => updateStatus(booking.id, 'confirmed', booking)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Confirm Booking"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button 
                        onClick={() => updateStatus(booking.id, 'cancelled', booking)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Cancel Booking"
                      >
                        <XCircle size={20} />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => window.open(`https://wa.me/${booking.phone}`, '_blank')}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredBookings.map(booking => (
          <div key={booking.id} className="bg-white border border-border shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-bold text-primary leading-none">{booking.guest_name}</p>
                  <p className="text-xs text-text/60 mt-1">{booking.phone}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded ${
                booking.status === 'confirmed' ? 'text-green-600 bg-green-50' : 
                booking.status === 'cancelled' ? 'text-red-600 bg-red-50' : 
                'text-orange-600 bg-orange-50'
              }`}>
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashed border-border">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[8px] uppercase font-bold text-text/40">
                  <Home size={10} /> Room Type
                </div>
                <p className="text-[10px] font-bold text-accent uppercase">{booking.room_type}</p>
              </div>
              <div className="space-y-1 text-right">
                <div className="flex items-center justify-end gap-1 text-[8px] uppercase font-bold text-text/40">
                  <Calendar size={10} /> Stay Dates
                </div>
                <p className="text-[10px] font-bold text-primary uppercase">{booking.check_in}</p>
                <p className="text-[8px] text-text/40">to {booking.check_out}</p>
              </div>
            </div>

            {booking.requests && (
              <div className="p-3 bg-surface text-[10px] text-text/70 italic border-l-2 border-accent">
                "{booking.requests}"
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {booking.status === 'pending' && (
                <>
                  <button 
                    onClick={() => updateStatus(booking.id, 'confirmed', booking)}
                    className="flex-1 bg-green-600 text-white py-3 rounded font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={14} /> Confirm
                  </button>
                  <button 
                    onClick={() => updateStatus(booking.id, 'cancelled', booking)}
                    className="flex-1 bg-red-50 text-red-600 border border-red-100 py-3 rounded font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                  >
                    <XCircle size={14} /> Cancel
                  </button>
                </>
              )}
              <button 
                onClick={() => window.open(`https://wa.me/${booking.phone}`, '_blank')}
                className="flex-1 bg-blue-50 text-blue-600 border border-blue-100 py-3 rounded font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="p-12 text-center text-text/40 italic text-sm bg-white border border-border">
          No bookings found for this category.
        </div>
      )}
    </div>
  );
};

export default BookingsManager;
