import express from "express";
import { services } from "../controllers/services-controller.js";

export const serviceRouter = express.Router();

// ******  CONTACT ROUT  ****** //
serviceRouter.route("/services").get(services);
// ------  CONTACT ROUT  ------ //
