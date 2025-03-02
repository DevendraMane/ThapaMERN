import express from "express";
export const adminRouter = express.Router();
import adminController from "../controllers/admin-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";
// ******  USERS-DATA ROUT  ****** //
adminRouter
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.usersData);
// ------  USERS-DATA ROUT  ------ //

// ******  CONTACT ROUT  ****** //
adminRouter
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.contactsData);
// ------  CONTACT ROUT  ------ //

// ******  CONTACT-DELETE ROUT  ****** //
adminRouter
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
// ------  CONTACT-DELETE ROUT  ------ //

// ******  ROUT FOR DELETING USERS  ****** //
adminRouter
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
// ------  ROUT FOR DELETING USERS  ------ //

// ******  ROUT FOR GETTING USER ID's  ****** //
adminRouter
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
// ------  ROUT FOR GETTING USER ID's  ------ //

// ******  ROUT FOR UPDATING USERS BY ID's  ****** //
adminRouter
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);
// ------  ROUT FOR UPDATING USERS BY ID's  ------ //
