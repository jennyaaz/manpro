export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.session.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden"
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
};