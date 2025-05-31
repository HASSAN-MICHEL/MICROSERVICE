import DashboardCard from './DashboardCard';
import { FiHome, FiCalendar, FiCoffee, FiDollarSign } from 'react-icons/fi';

const StatsGrid = ({ stats }) => {
  return (
    <div className="stats-grid">
      <DashboardCard 
        title="Chambres occupées" 
        value={`${stats.chambres.occupied}/${stats.chambres.total}`} 
        change={stats.chambres.occupationRateChange} 
        icon={<FiHome size={24} />} 
        color="bg-blue-500" 
      />
      <DashboardCard 
        title="Réservations" 
        value={stats.reservations.today} 
        change={stats.reservations.change} 
        icon={<FiCalendar size={24} />} 
        color="bg-green-500" 
      />
      <DashboardCard 
        title="Commandes restaurant" 
        value={stats.restaurant.today} 
        change={stats.restaurant.change} 
        icon={<FiCoffee size={24} />} 
        color="bg-orange-500" 
      />
      <DashboardCard 
        title="Ventes bar" 
        value={`${stats.bar.today} €`} 
        change={stats.bar.change} 
        icon={<FiDollarSign size={24} />} 
        color="bg-purple-500" 
      />
    </div>
  );
};

export default StatsGrid;