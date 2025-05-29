import Order from "../models/orders.js";
import { broadcast } from "../server.js";

export const createOrder = async (req, res) => {
  const { menu_id, client_id, montant_total, quantite, type_commande } = req.body;

  if (!menu_id || !client_id || !montant_total || !quantite || !type_commande) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const newOrder = await Order.create({
      menu_id,
      client_id,
      montant_total,
      quantite,
      type_commande,
    });

    broadcast('commande', {
      type: 'restaurant',
      montant_total: newOrder.montant_total,
      timestamp: Date.now()
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erreur création commande:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getRestaurantOrders = async (req, res) => {
  try {
    const orders = await Order.getCommandesRestaurant();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur récupération commandes:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const { period = 'day' } = req.query;
    const today = new Date().toISOString().split('T')[0];
    const orders = await Order.getCommandesRestaurant();
    
    const filteredOrders = period === 'day'
      ? orders.filter(o => new Date(o.date_commande).toISOString().split('T')[0] === today)
      : orders;

    res.status(200).json({
      count: filteredOrders.length,
      revenue: filteredOrders.reduce((sum, o) => sum + o.montant_total, 0),
      average: filteredOrders.length > 0 
        ? (filteredOrders.reduce((sum, o) => sum + o.montant_total, 0) / filteredOrders.length).toFixed(2)
        : 0
    });
  } catch (error) {
    console.error("Erreur statistiques commandes:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getTodayOrders = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const orders = await Order.getCommandesRestaurant();
    const todayOrders = orders.filter(o => 
      new Date(o.date_commande).toISOString().split('T')[0] === today
    );
    
    res.status(200).json(todayOrders);
  } catch (error) {
    console.error("Erreur commandes du jour:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};