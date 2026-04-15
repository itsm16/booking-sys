import * as bookingController from './booking.controller.js'
import { Router } from "express";
import { authenticateToken } from "../../modules/auth/auth.middleware.js";
import validate from '../../common/middleware/validate.middleware.js'
import { CreateBookingDto } from './dto/booking.dto.js'

const bookingRoutes = Router()

bookingRoutes.post("/book", authenticateToken, validate(CreateBookingDto), bookingController.book)
bookingRoutes.get("/seats", authenticateToken, bookingController.getSeats)
bookingRoutes.get("/user-bookings/:id", authenticateToken, bookingController.getUserBookings)
bookingRoutes.delete("/cancel/:id", authenticateToken, bookingController.cancelBooking)
bookingRoutes.delete("/cancel-seat/:id", authenticateToken, bookingController.cancelSeat)

export default bookingRoutes