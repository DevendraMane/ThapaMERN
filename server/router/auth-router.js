// express.Router
//? In Express.js, express.Router() is a mini Express application without all the server configurations but with the ability to define ROUTE, middleware, and even have its own set of route handlers. It allows you to modularize your ROUTE and middleware to keep your code organized and maintainable.
//* https://expressjs.com/en/guide/routing.html
//? Use the express. Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

import express from "express";
const authRouter = express.Router();
// we are using it like prop drilling authcontrollers
// import {home , register} from "../controllers/auth-controller.js";
// *instead do it like this:-
import authcontrollers from "../controllers/auth-controller.js";
import { signUpSchema } from "../validators/auth-validators.js";
import { loginSchema } from "../validators/auth-validators.js";
import { validate } from "../middlewares/validate-middleware.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

// ******  HOME ROUTE  ****** //
// *One way of defining ROUTE:-
// router.get("/", (req, res) => {
//   res.status(200).send("Hello Server this is from Router");
// });

// *Onother way of defining ROUTE(we can use chaning here):-
authRouter.route("/").get(authcontrollers.home);
// ------  HOME ROUTE  ------ //

// ******  REGISTRATION ROUTE  ****** //
authRouter
  .route("/register")
  .post(validate(signUpSchema), authcontrollers.register); //here, we are using post req bcoz we want to post data to DB
// ------  REGISTRATION ROUTE  ------ //

// ******  LOGIN ROUTE  ****** //
authRouter.route("/login").post(validate(loginSchema), authcontrollers.login); //here, we are using post req bcoz we want to post data to DB
// ------  LOGIN ROUTE  ------ //

// ******  USER ROUTE - for fetching users data from the DB  ****** //
authRouter.route("/user").get(authMiddleware, authcontrollers.user); //here, we are using post req bcoz we want to post data to DB
// ------  USER ROUTE - for fetching users data from the DB  ------ //

export default authRouter;
