import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Guest Reviews</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-primary fill-primary mr-1" />
                ))}
              </div>
              <p className="text-text italic font-serif mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="text-xs uppercase tracking-widest font-bold text-accent">
                — {testimonial.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
