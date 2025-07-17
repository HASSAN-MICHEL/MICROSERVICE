export const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Non connecté" });
  }

   req.user = req.session.user;
  next();
};

export const onlyAdmin = (req, res, next) => {
  if (req.session.user?.nom_role !== 'administrateur') {
    return res.status(403).json({ error: "Accès refusé" });
  }
  next();
};
