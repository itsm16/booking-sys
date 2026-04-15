import * as bookingService from './booking.service.js'
import ApiResponse from '../../common/utils/api-response.js'

const book = async (req, res) => {
    const ticket = await bookingService.book(req.body)
    ApiResponse.ok(res, "Ticket booked successfully", ticket)
}

const getSeats = async (req, res) => {
    const seats = await bookingService.getSeats()
    ApiResponse.ok(res, "Available seats", seats)
}

const getUserBookings = async (req, res) => {
    const booking = await bookingService.getUserBookings(req.params.id)
    ApiResponse.ok(res, "Booking found", booking)
}

const cancelBooking = async (req, res) => {
    const cancel = await bookingService.cancelBooking(req.params.id)
    ApiResponse.ok(res, "Booking cancelled", cancel)
}

const cancelSeat = async (req, res) => {
    const cancel = await bookingService.cancelSeat(req.params.id)
    ApiResponse.ok(res, "Seat cancelled", cancel)
}

export {
    book,
    getSeats,
    getUserBookings,
    cancelBooking,
    cancelSeat
}