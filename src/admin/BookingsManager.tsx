import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';
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

  const roomTabs = ['All', 'Executive Suite', 'King Suite', 'Superior King', 'Deluxe Double', 'Standard Room', 'Art Lodges Interior'];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">Bookings Manager</h2>
          <p className="text-text/60 text-sm mt-1 uppercase tracking-widest font-bold">Review and manage guest requests</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {roomTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
              filter === tab ? 'bg-primary text-white' : 'bg-white text-text/60 hover:bg-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border shadow-sm overflow-hidden">
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
        {filteredBookings.length === 0 && (
          <div className="p-12 text-center text-text/40 italic text-sm">
            No bookings found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsManager;
