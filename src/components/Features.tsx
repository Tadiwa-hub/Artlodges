import { FEATURES } from '../constants';

const Features = () => {
  return (
    <section id="facilities" className="py-16 bg-white border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {FEATURES.map((feature) => (
            <div key={feature.name} className="flex flex-col items-center group">
              <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-text/60">
                {feature.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-accent font-serif italic">Available in every room</p>
      </div>
    </section>
  );
};

export default Features;
