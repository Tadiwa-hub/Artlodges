import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar from './Calendar';
import { ROOMS } from '../constants';
import type { RoomType } from '../types';

interface BookingFormProps {
  initialRoom?: string;
  blockedDates: Record<string, string[]>; // room_type -> [dates]
}

const BookingForm: React.FC<BookingFormProps> = ({ initialRoom = 'Executive Suite', blockedDates }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roomType: initialRoom as RoomType,
    guests: '1',
    occasion: 'None',
    requests: ''
  });

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [activePicker, setActivePicker] = useState<'checkIn' | 'checkOut' | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialRoom) {
      setFormData(prev => ({ ...prev, roomType: initialRoom as RoomType }));
    }
  }, [initialRoom]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActivePicker(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    if (activePicker === 'checkIn') {
      setCheckIn(date);
      // If a check-out was already selected but is now before check-in, clear it
      if (checkOut && date >= checkOut) {
        setCheckOut(null);
      }
      setActivePicker(null); // Auto-close after selection
    } else if (activePicker === 'checkOut') {
      if (checkIn && date <= checkIn) {
        alert("Check-out must be after check-in");
        return;
      }
      setCheckOut(date);
      setActivePicker(null); // Auto-close after selection
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select your stay dates.");
      setActivePicker('checkIn');
      return;
    }

    const message = `Hello Art Lodges! I would like to book:
Room: ${formData.roomType}
Check-in: ${format(checkIn, 'MMM dd, yyyy')}
Check-out: ${format(checkOut, 'MMM dd, yyyy')}
Guests: ${formData.guests}
Occasion: ${formData.occasion}
Name: ${formData.name}
Phone: ${formData.phone}
Special requests: ${formData.requests || 'None'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/263778194594?text=${encodedMessage}`, '_blank');

    // Also send to backend
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_type: formData.roomType,
        check_in: format(checkIn, 'yyyy-MM-dd'),
        check_out: format(checkOut, 'yyyy-MM-dd'),
        guest_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        guests_count: parseInt(formData.guests),
        occasion: formData.occasion,
        requests: formData.requests
      })
    });

    // Auto-block dates in availability table
    let current = new Date(checkIn);
    const end = new Date(checkOut);
    while (current <= end) {
      fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_type: formData.roomType,
          blocked_date: format(current, 'yyyy-MM-dd'),
          reason: `Booking for ${formData.name}`
        })
      });
      current.setDate(current.getDate() + 1);
    }
  };

  return (
    <section id="book" className="py-24 bg-surface border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Book Your Experience</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl border border-border" ref={containerRef}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Room Selection */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Select Your Sanctuary</label>
              <select 
                className="p-4 border border-border bg-surface focus:outline-none focus:border-accent transition-colors font-serif italic text-lg"
                value={formData.roomType}
                onChange={(e) => setFormData({...formData, roomType: e.target.value as RoomType})}
              >
                {ROOMS.filter(r => r.id !== 'interior').map(room => (
                  <option key={room.id} value={room.name}>{room.name} — ${room.price}/night</option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Check-in</label>
              <div 
                onClick={() => setActivePicker('checkIn')}
                className={`p-4 border border-border bg-surface cursor-pointer flex justify-between items-center hover:border-accent transition-colors ${activePicker === 'checkIn' ? 'border-accent ring-1 ring-accent/20' : ''}`}
              >
                <span className={checkIn ? "text-primary font-bold" : "text-text/30"}>
                  {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select Date'}
                </span>
                <CalendarIcon size={18} className="text-accent" />
              </div>

              {/* Check-in Calendar Pop-out */}
              <AnimatePresence>
                {activePicker === 'checkIn' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 z-50 mt-2 bg-white shadow-2xl border border-border p-4 w-[320px]"
                  >
                    <Calendar 
                      blockedDates={blockedDates[formData.roomType] || []}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onDateClick={handleDateClick}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Check-out</label>
              <div 
                onClick={() => setActivePicker('checkOut')}
                className={`p-4 border border-border bg-surface cursor-pointer flex justify-between items-center hover:border-accent transition-colors ${activePicker === 'checkOut' ? 'border-accent ring-1 ring-accent/20' : ''}`}
              >
                <span className={checkOut ? "text-primary font-bold" : "text-text/30"}>
                  {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select Date'}
                </span>
                <CalendarIcon size={18} className="text-accent" />
              </div>

              {/* Check-out Calendar Pop-out */}
              <AnimatePresence>
                {activePicker === 'checkOut' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 z-50 mt-2 bg-white shadow-2xl border border-border p-4 w-[320px]"
                  >
                    <Calendar 
                      blockedDates={blockedDates[formData.roomType] || []}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onDateClick={handleDateClick}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Full Name</label>
              <input 
                type="text" required
                className="p-4 border border-border bg-surface focus:outline-none focus:border-accent transition-colors"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Phone Number</label>
              <input 
                type="tel" required
                className="p-4 border border-border bg-surface focus:outline-none focus:border-accent transition-colors"
                placeholder="+263 ..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Number of Guests</label>
              <select 
                className="p-4 border border-border bg-surface focus:outline-none focus:border-accent transition-colors"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n===1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Special Occasion</label>
              <select 
                className="p-4 border border-border bg-surface focus:outline-none focus:border-accent transition-colors"
                value={formData.occasion}
                onChange={(e) => setFormData({...formData, occasion: e.target.value})}
              >
                <option>None</option>
                <option>Anniversary</option>
                <option>Birthday</option>
                <option>Honeymoon</option>
                <option>Business</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest font-bold text-text/60">Special Requests</label>
              <textarea 
                className="p-4 border border-border bg-surface focus:outline-none focus:border-accent transition-colors h-24 resize-none"
                placeholder="Any specific needs or requests..."
                value={formData.requests}
                onChange={(e) => setFormData({...formData, requests: e.target.value})}
              ></textarea>
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                className="w-full bg-primary text-white py-5 font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-primary transition-all duration-500 shadow-xl"
              >
                Request Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
