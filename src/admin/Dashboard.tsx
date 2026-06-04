import { useState, useEffect } from 'react';
import { TrendingUp, Users, CheckCircle, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    estimatedRevenue: 0
  });

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        const confirmed = data.filter((b: any) => b.status === 'confirmed');
        const pending = data.filter((b: any) => b.status === 'pending');
        
        // Mock revenue calculation based on average room price $100
        const revenue = confirmed.length * 100; 

        setStats({
          totalBookings: data.length,
          confirmedBookings: confirmed.length,
          pendingBookings: pending.length,
          estimatedRevenue: revenue
        });
      });
  }, []);

  const statCards = [
    { label: 'Total Requests', value: stats.totalBookings, icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Confirmed', value: stats.confirmedBookings, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Pending', value: stats.pendingBookings, icon: Users, color: 'text-orange-500' },
    { label: 'Est. Revenue', value: `$${stats.estimatedRevenue}`, icon: TrendingUp, color: 'text-accent' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">Dashboard Overview</h2>
        <p className="text-text/60 text-sm mt-1 uppercase tracking-widest font-bold">Welcome back to Art Lodges Admin</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <stat.icon size={24} className={stat.color} />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-text/40 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 border border-border shadow-sm">
        <h3 className="font-serif text-xl font-bold text-primary mb-6 uppercase tracking-widest border-b border-border pb-4">Recent Activity</h3>
        <div className="space-y-4">
          <p className="text-text/60 text-sm italic">No recent activity found.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
