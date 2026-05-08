export const isAuth = (req, res, next) => {
  try {
    if (!req.session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.error("isAuth ERROR:", err);
    res.status(500).json({ message: "Auth error" });
  }
};

export const checkRole = (...roles) => {
  return (req, res, next) => {
    try {
      const user = req.session?.user;

      if (!user) {
        return res.status(401).json({ message: "Not logged in" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error("checkRole ERROR:", err);
      res.status(500).json({ message: "Role error" });
    }
  };
};