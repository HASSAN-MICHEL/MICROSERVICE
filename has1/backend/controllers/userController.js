import User from "../models/user.js";
import bcrypt from "bcrypt"; // Pour le hachage des mots de passe

const userController = {
  // Récupérer tous les utilisateurs
  async getAll(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: err.message });
    }
  },

  // Récupérer un utilisateur par son ID
  async getById(req, res) {
    try {
      const user = await User.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error: err.message });
    }
  },

  // Connexion de l'utilisateur
  async login(req, res) {
    const { email, mot_de_passe } = req.body;

    try {
      // Vérifier si l'utilisateur existe
      const user = await User.getByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
      if (!isMatch) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      // Retourner les informations de l'utilisateur
      res.json({
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur du serveur" });
    }
  },

  // Créer un nouvel utilisateur
  async create(req, res) {
    try {
      const { nom, email, mot_de_passe, role } = req.body;

      // Création de l'utilisateur
      const newUser = await User.create({ nom, email, mot_de_passe, role });

      res.status(201).json({
        message: "Utilisateur créé avec succès !",
        user: newUser,
      });
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur :", err);
      res.status(500).json({ message: err.message || "Erreur lors de la création de l'utilisateur", error: err.message });
    }
  },

  // Mettre à jour un utilisateur
  async update(req, res) {
    try {
      const { nom, email, role } = req.body;

      const updatedUser = await User.update(req.params.id, { nom, email, role });

      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.json({
        message: "Utilisateur mis à jour avec succès !",
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error: err.message });
    }
  },

  // Mettre à jour le mot de passe d'un utilisateur
  async updatePassword(req, res) {
    try {
      const { newPassword } = req.body;

      const updatedUser = await User.updatePassword(req.params.id, newPassword);

      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.json({
        message: "Mot de passe mis à jour avec succès !",
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe", error: err.message });
    }
  },

  // Supprimer un utilisateur
  async delete(req, res) {
    try {
      const userId = req.params.id;
      console.log("ID de l'utilisateur à supprimer :", userId);

      const user = await User.getById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      await User.delete(userId);
      console.log("Utilisateur supprimé :", userId);

      res.status(204).json({ message: "Utilisateur supprimé avec succès !" });
    } catch (err) {
      console.error("Erreur lors de la suppression :", err.message);
      res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: err.message });
    }
  },
};

export const { getAll, getById, create, update, updatePassword, login } = userController;
export const deleteUser = userController.delete;