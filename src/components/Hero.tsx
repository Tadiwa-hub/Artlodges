import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToRooms = () => {
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBook = () => {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Red Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33.jpeg")', // Swan towel image placeholder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-serif text-white font-bold mb-4 tracking-tight"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ART LODGES
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-accent font-serif italic mb-12 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            "Where Every Room Tells a Story"
          </motion.p>

          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              onClick={scrollToRooms}
              className="w-full md:w-auto bg-accent text-primary px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-xl"
            >
              View Our Rooms
            </button>
            <button 
              onClick={scrollToBook}
              className="w-full md:w-auto border-2 border-white text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
            >
              Book Your Stay
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-white/50 relative overflow-hidden">
          <div className="w-full h-1/2 bg-accent absolute top-0 animate-scroll-indicator"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
