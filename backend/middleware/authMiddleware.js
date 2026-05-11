export const authMiddleware = (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
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