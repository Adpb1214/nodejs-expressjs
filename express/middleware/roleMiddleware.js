const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  };
  
  const verifyUser = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied. Users only." });
    }
    next();
  };
  
  module.exports = { verifyAdmin, verifyUser };
  