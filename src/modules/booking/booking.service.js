
import { cancelBookingBySeatId, createBooking, getAvailableSeats, getBookingById, getBookingBySeatId, getBookingByUserId } from "../../common/config/query-functions.js"
import ApiError from "../../common/utils/api-error.js";

const book = async ({userId, seatOne, seatTwo}) => {
    const booking = await createBooking({userId, seatOne, seatTwo});
    return booking;
}

const getSeats = async () => {
    const seats = await getAvailableSeats()
    return seats
}

const getUserBookings = async (id) => {
    const booking = await getBookingByUserId(id)

    if(!booking) {
        throw ApiError.notFound("Bookings not found")
    }

    return booking
}

const cancelBooking = async (id) => {
    const booking = await getBookingById(id)

    if(!booking) {
        throw ApiError.notFound("Booking not found")
    }

    const deleted = await cancelBookingBySeatId(booking.seat_id)

    return deleted
}

const cancelSeat = async (id) => {
    const booking = await getBookingBySeatId(id)

    if(!booking || (Array.isArray(booking) && booking.length === 0)) {
        throw ApiError.notFound("Booking not found")
    }

    const seat = await cancelBookingBySeatId(id)

    return seat
}

export {
    book,
    getSeats,
    getUserBookings,
    cancelBooking,
    cancelSeat
}