import { FiHome, FiCoffee, FiDollarSign, FiClock } from 'react-icons/fi';

const typeConfig = {
  reservation: {
    icon: <FiHome />,
    color: 'bg-blue-500',
    getDescription: (item) => `Réservation #${item.id}`,
    getTime: (item) => new Date(item.createdAt).toLocaleTimeString()
  },
  order: {
    icon: <FiCoffee />,
    color: 'bg-green-500',
    getDescription: (item) => `Commande #${item.id} - ${item.montant} €`,
    getTime: (item) => new Date(item.createdAt).toLocaleTimeString()
  },
  sale: {
    icon: <FiDollarSign />,
    color: 'bg-purple-500',
    getDescription: (item) => `Vente #${item.id} - ${item.montant} €`,
    getTime: (item) => new Date(item.createdAt).toLocaleTimeString()
  }
};

const ActivityCard = ({ title, type, items }) => {
  const config = typeConfig[type] || {
    icon: <FiClock />,
    color: 'bg-gray-500',
    getDescription: (item) => `Activité #${item.id}`,
    getTime: (item) => new Date(item.createdAt).toLocaleTimeString()
  };

  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="activity-list">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon ${config.color}`}>
                {config.icon}
              </div>
              <div className="activity-details">
                <p>{config.getDescription(item)}</p>
                <p className="activity-time">{config.getTime(item)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Aucune activité pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;