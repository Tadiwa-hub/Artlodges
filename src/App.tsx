import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import Features from './components/Features';
import BookingForm from './components/BookingForm';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { ROOMS } from './constants';

function App() {
  const [selectedRoom, setSelectedRoom] = useState<string>('Executive Suite');
  const [blockedDates, setBlockedDates] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Fetch availability from API
    fetch('/api/availability')
      .then(res => res.json())
      .then(data => {
        const grouped: Record<string, string[]> = {};
        data.forEach((item: any) => {
          if (!grouped[item.room_type]) grouped[item.room_type] = [];
          grouped[item.room_type].push(item.blocked_date);
        });
        setBlockedDates(grouped);
      })
      .catch(err => console.error('Error fetching availability:', err));
  }, []);

  const handleBookClick = (roomName: string) => {
    setSelectedRoom(roomName);
    const element = document.getElementById('book');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />
        
        <section id="rooms" className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Our Accommodations</h2>
            <p className="text-text/60 font-serif italic tracking-wide">Five room types. One standard of excellence.</p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </div>

          <div className="flex flex-col gap-12">
            {ROOMS.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onBook={handleBookClick} 
              />
            ))}
          </div>
        </section>

        <Features />
        
        <Experience />

        <BookingForm 
          initialRoom={selectedRoom} 
          blockedDates={blockedDates} 
        />

        <Gallery />
        
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

export default App;
