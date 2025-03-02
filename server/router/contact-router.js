import express from "express";
const contactRouter = express.Router();
import contactControllers from "../controllers/contact-controller.js";

// ******  CONTACT ROUT  ****** //
contactRouter.route("/contact").post(contactControllers.contact); //here, we are using post req bcoz we want to post data to DB
// ------  CONTACT ROUT  ------ //

export default contactRouter;
