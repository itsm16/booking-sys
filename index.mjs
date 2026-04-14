//  CREATE TABLE seats (
//      id SERIAL PRIMARY KEY,
//      name VARCHAR(255),
//      isbooked INT DEFAULT 0
//  );
// INSERT INTO seats (isbooked)
// SELECT 0 FROM generate_series(1, 20);

import express from "express";
import "dotenv/config"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/modules/auth/auth.route.js";
import bookingRoutes from "./src/modules/booking/booking.route.js";


const port = process.env.PORT || 8080;

const app = new express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/booking", bookingRoutes)

app.listen(port, () => console.log("Server starting on port: " + port));
