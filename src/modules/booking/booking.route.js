import * as bookingController from './booking.controller.js'
import { Router } from "express";
import { authenticateToken } from "../../modules/auth/auth.middleware.js";

const bookingRoutes = Router()

bookingRoutes.post("/book", authenticateToken, bookingController.book)
bookingRoutes.get("/seats", authenticateToken, bookingController.getSeats)

export default bookingRoutes