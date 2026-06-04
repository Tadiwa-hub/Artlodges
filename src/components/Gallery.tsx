import { motion } from 'framer-motion';

const images = [
  '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33.jpeg',
  '/rooms/king/WhatsApp Image 2026-06-03 at 17.02.13.jpeg',
  '/rooms/superior/WhatsApp Image 2026-06-03 at 17.04.41.jpeg',
  '/rooms/deluxe/WhatsApp Image 2026-06-03 at 17.06.33.jpeg',
  '/rooms/standard/WhatsApp Image 2026-06-03 at 17.08.35.jpeg',
  '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.34.jpeg',
  '/rooms/king/WhatsApp Image 2026-06-03 at 17.02.14.jpeg',
  '/rooms/superior/WhatsApp Image 2026-06-03 at 17.04.42 (1).jpeg',
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Our Gallery</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              className="relative group overflow-hidden bg-surface"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-300 pointer-events-none">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-full h-full shimmer-gold opacity-50"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
