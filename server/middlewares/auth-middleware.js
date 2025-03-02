import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
export const authMiddleware = async (req, res, next) => {
  const token = await req.header("Authorization");
  console.log("token from Authorization:", token);

  if (!token) {
    // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("jwtToken:", jwtToken);

  try {
    const isVarified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVarified);

    //?↓↓↓ here, we have used projection for giving the data except password from DB
    const userData = await User.findOne({ email: isVarified.email }).select({
      password: 0,
    });

    // custom properties:
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    console.log(userData);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
  }
};
