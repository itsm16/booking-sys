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

export {
    book,
    getSeats
}