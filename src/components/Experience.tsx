import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight text-accent">
            The Art Lodges Experience
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed font-serif italic mb-12 opacity-90">
            Step into a world where romantic elegance meets artistic soul. Our lodges are designed to be more than just a place to sleep—they are a sanctuary for connection, inspiration, and unforgettable moments.
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center animate-pulse">
              <span className="text-accent text-2xl font-serif italic">Art</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
