export const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    console.log(req.user); //this is getting from the auth-middleware.js
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an Admin" });
    }
    // res.status(200).json({ message: adminRole });
    // ?If user is an admin procees to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};
