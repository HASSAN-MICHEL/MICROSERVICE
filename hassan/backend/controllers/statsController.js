import Chambre from "../models/chambre.js";
import Reservation from "../models/reservation.js";
import Order from "../models/orders.js";
import VenteBoisson from "../models/venteboisson.js";

const statsController = {
  async getDashboardStats(req, res) {
    try {
      const [roomStats, dailyReservations, monthlyReservations, dailyOrders, monthlyOrders, dailySales, monthlySales] = await Promise.all([
        Chambre.getRoomStats(),
        Reservation.getConfirmedReservationsStats('day'),
        Reservation.getConfirmedReservationsStats('month'),
        Order.getOrderStats('day'),
        Order.getOrderStats('month'),
        VenteBoisson.getSalesStats('day'),
        VenteBoisson.getSalesStats('month')
      ]);

      res.json({
        roomStats,
        reservations: {
          daily: dailyReservations,
          monthly: monthlyReservations
        },
        orders: {
          daily: dailyOrders,
          monthly: monthlyOrders
        },
        sales: {
          daily: dailySales,
          monthly: monthlySales
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default statsController;