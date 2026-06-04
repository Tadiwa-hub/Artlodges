import { motion } from 'framer-motion';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onBook: (roomName: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
  return (
    <motion.div 
      className="bg-surface border border-border overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Images Grid */}
        <div className="md:w-1/2 p-4 grid grid-cols-2 grid-rows-2 gap-2 h-[300px] md:h-[400px]">
          <div className="col-span-1 row-span-2 relative overflow-hidden">
            <img 
              src={room.images[0]} 
              alt={room.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden">
            <img 
              src={room.images[1]} 
              alt={room.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden">
            <img 
              src={room.images[2]} 
              alt={room.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-1">{room.name}</h3>
              <p className="text-accent italic font-serif tracking-wide">{room.tagline}</p>
            </div>
            {room.id !== 'interior' && (
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">${room.price}</span>
                <p className="text-xs text-text/60 uppercase tracking-widest">per night</p>
              </div>
            )}
          </div>
          
          <p className="text-text/80 mb-8 leading-relaxed">
            {room.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="space-x-4 text-xs uppercase tracking-widest text-text/60 font-bold">
              {room.id === 'deluxe' && (
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">Most Popular</span>
              )}
            </div>
            {room.id !== 'interior' && (
              <button 
                onClick={() => onBook(room.name)}
                className="bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300"
              >
                Book Room
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
