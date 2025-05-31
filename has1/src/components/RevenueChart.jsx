import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer les composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ restaurantRevenue, barRevenue, bookingsRevenue }) => {
  const data = {
    labels: ['Restaurant', 'Bar', 'Réservations'],
    datasets: [
      {
        label: 'Revenus (€)',
        data: [
          restaurantRevenue, 
          barRevenue, 
          bookingsRevenue
        ],
        backgroundColor: [
          'rgba(255, 159, 64, 0.7)', // Orange pour restaurant
          'rgba(54, 162, 235, 0.7)',  // Bleu pour bar
          'rgba(75, 192, 192, 0.7)'   // Vert pour réservations
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.raw.toFixed(2)} €`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} €`
        }
      }
    }
  };

  return (
    <div style={{ height: '100%', minHeight: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;