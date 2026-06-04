import { ROOMS } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-accent mb-6">ART LODGES</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A boutique lodge where every room tells a story. Experience intimate luxury and artistic charm.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/263778194594', '_blank')}
              className="bg-primary text-white px-6 py-3 font-bold uppercase text-xs tracking-widest hover:bg-accent transition-colors"
            >
              Book via WhatsApp
            </button>
          </div>

          {/* Room Types */}
          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-bold text-accent mb-6">Accommodations</h4>
            <ul className="space-y-3">
              {ROOMS.map(room => (
                <li key={room.id} className="flex justify-between items-center text-sm text-white/60">
                  <span>{room.name}</span>
                  {room.price > 0 && <span className="text-accent">${room.price}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-bold text-accent mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#rooms" className="hover:text-accent">Our Rooms</a></li>
              <li><a href="#facilities" className="hover:text-accent">Facilities</a></li>
              <li><a href="#gallery" className="hover:text-accent">Gallery</a></li>
              <li><a href="#book" className="hover:text-accent">Book Now</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-bold text-accent mb-6">Contact Us</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              40 Armadale Rd<br />
              Harare, Zimbabwe<br /><br />
              T: +263 77 819 4594<br />
              E: hello@artlodges.com
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/40">
          <p>© 2026 Art Lodges. All rights reserved.</p>
          <p>Site by <span className="text-accent">Tadiwa</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
