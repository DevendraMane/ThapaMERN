import express from "express";
import authRouter from "./router/auth-router.js";
import contactRouter from "./router/contact-router.js";
import connectDB from "./utils/db.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import cors from "cors";
import { serviceRouter } from "./router/service-router.js";
import { adminRouter } from "./router/admin-router.js";
const PORT = process.env.PORT;
const app = express();

// ***** HANDLING CORS ***** //
const corsOptions = {
  origin: `http://localhost:5173`,
  methods: `GET, POST, PUT, DELETE, PATCH, HEAD`,
  credentials: true,
};
// ***** CORS Handling-MIDDLEWARE ***** //
app.use(cors(corsOptions));
// ----- CORS Handling-MIDDLEWARE ----- //
// ----- HANDLING CORS ----- //

// ***** JSON Data Handling-MIDDLEWARE ***** //
app.use(express.json());
// ----- JSON Data Handling-MIDDLEWARE ----- //

// ***** AUTH ROUTES Handling-MIDDLEWARE ***** //
// ?Don't define all the routes over here, use auth-router.js
// app.get("/", (req, res) => {
//   res.status(200).send("Hello Server");
// });
app.use("/api/auth", authRouter);
// ----- AUTH ROUTES Handling-MIDDLEWARE ----- //

// ***** CONTACT ROUTES Handling-MIDDLEWARE ***** //
app.use("/api/form", contactRouter);
// ----- CONTACT ROUTES Handling-MIDDLEWARE ----- //

// ***** SERVICES ROUTES Handling-MIDDLEWARE ***** //
app.use("/api/data", serviceRouter);
// ----- SERVICES ROUTES Handling-MIDDLEWARE ----- //

// ***** ADMIN ROUTES Handling-MIDDLEWARE ***** //
app.use("/api/admin", adminRouter);
// ----- ADMIN ROUTES Handling-MIDDLEWARE ----- //

// ***** ERROR-MIDDLEWARE ***** //
app.use(errorMiddleware);
// ----- ERROR-MIDDLEWARE ----- //

// ***********DATA-BASE CONNECTION & SERVER STARTING*********** //
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT} `);
  });
});
// ************************************ //
